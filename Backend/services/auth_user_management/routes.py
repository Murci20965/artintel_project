"""
services/auth_user_management/routes.py

Auth microservice using MySQL + SQLAlchemy. Includes:
- Register/Login with hashed passwords
- Forgot/Reset Password stored in DB
- Tier updates
- Basic protected endpoints
"""
from fastapi import APIRouter, HTTPException, status, Depends, Request, Body
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, OAuth2PasswordBearer, OAuth2PasswordRequestForm
import random
import string
import time
from datetime import datetime, timezone, timedelta
from sqlalchemy.exc import OperationalError
from typing import Optional, List, Dict, Any
from enum import Enum
from typing_extensions import Literal

from sqlalchemy.orm import Session
from services.auth_user_management.database import get_db, verify_db_connection
from services.auth_user_management.models import User, PasswordResetToken, EmailVerificationToken, Team, TeamMember, TeamActivityLog
from services.auth_user_management.email import send_verification_email, send_password_reset_email
from services.auth_user_management.rate_limiter import RateLimiter
from services.auth_user_management.logger import setup_logger
from services.auth_user_management.config import get_settings, Settings
from services.auth_user_management.rbac import Permission, requires_permission, Role, ROLE_PERMISSIONS
from services.auth_user_management.team_logger import log_team_activity

# -----------------------------------------------------------------------------
# Constants & Utilities
# -----------------------------------------------------------------------------

# Define new tags metadata
tags_metadata = [
    {
        "name": "Authentication and User Management Endpoints",
    },
    {
        "name": "Authentication",
    },
    {
        "name": "User Management",
    },
    {
        "name": "Team Management",
    },
    {
        "name": "Admin Controls",
    },
    {
        "name": "System",
    }
]

# Basic router without tags
router = APIRouter(
    responses={404: {"description": "Not found"}}
)
bearer_scheme = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

settings = get_settings()

# Remove hardcoded values
SECRET_KEY = settings.JWT_SECRET_KEY
ACCESS_TOKEN_EXPIRE_SECONDS = settings.ACCESS_TOKEN_EXPIRE_SECONDS

ALLOWED_TIERS = ["Free", "Advanced", "Enterprise"]

# rate limiter instance
rate_limiter = RateLimiter()

logger = setup_logger("auth_routes")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# -----------------------------------------------------------------------------
# Pydantic Schemas
# -----------------------------------------------------------------------------
class UserRegister(BaseModel):
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., description="User's password - must be at least 8 characters with uppercase, lowercase, number and special character")
    first_name: Optional[str] = Field(None, description="User's first name")
    last_name: Optional[str] = Field(None, description="User's last name")
    
    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "SecureP@ss123",
                "first_name": "John",
                "last_name": "Doe"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserProfileResponse(BaseModel):
    email: EmailStr
    tier: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class TierUpdate(BaseModel):
    email: EmailStr
    new_tier: str

class TeamCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    organization: str = Field(..., min_length=1, max_length=100)
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "My Team",
                "organization": "My Organization"
            }
        }
    )

class TeamRole(str, Enum):
    ADMIN = "team_admin"
    MEMBER = "team_member"

class TeamMemberAdd(BaseModel):
    user_email: str
    role: str = "team_member"

    model_config = {
        "json_schema_extra": {
            "example": {
                "user_email": "user@example.com",
                "role": "team_member"
            }
        }
    }

class TeamUpdate(BaseModel):
    name: str
    organization: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Updated Team Name",
                "organization": "Updated Organization"
            }
        }
    }

# Add new Pydantic model for admin registration
class AdminRegister(BaseModel):
    email: EmailStr
    password: str
    registration_key: str

class RoleUpdate(BaseModel):
    new_role: str

class TeamResponse(BaseModel):
    id: int
    name: str
    organization: str
    created_at: datetime
    created_by: int

class TeamMemberResponse(BaseModel):
    email: str
    role: str
    joined_at: datetime

class TeamActivityResponse(BaseModel):
    action: str
    details: str
    user_email: str
    created_at: datetime

class UserResponse(BaseModel):
    id: int
    email: str
    role: str
    tier: str
    email_verified: bool
    created_at: Optional[datetime]
    last_login: Optional[datetime]
    is_active: bool = True

    model_config = ConfigDict(from_attributes=True)

# -----------------------------------------------------------------------------
# Helper Functions
# -----------------------------------------------------------------------------
def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(email: str) -> str:
    """Create JWT access token with timezone-aware timestamps"""
    now = datetime.now(timezone.utc)
    expire = now + timedelta(seconds=settings.ACCESS_TOKEN_EXPIRE_SECONDS)
    
    payload = {
        "sub": email,
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp())
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

def create_random_token(length=20) -> str:
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Role-based access control decorator
def require_role(required_role: str):
    def decorator(func):
        async def wrapper(*args, current_user: User = Depends(get_current_user), **kwargs):
            if current_user.role != required_role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"This action requires {required_role} role"
                )
            return await func(*args, current_user=current_user, **kwargs)
        return wrapper
    return decorator

# Domain restriction check for admin registration
def validate_admin_domain(email: str, settings: Settings = Depends(get_settings)):
    try:
        if not settings or settings.ALLOWED_ADMIN_DOMAINS == "*":
            return
        
        allowed_domains = settings.ALLOWED_ADMIN_DOMAINS.split(",")
        domain = email.split("@")[1]
        if domain not in allowed_domains:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Email domain not allowed for admin registration"
            )
    except Exception as e:
        logger.error(f"Error validating admin domain: {str(e)}")
        # Allow registration if validation fails
        return

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate user with email and password"""
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    if not user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified"
        )
    return user

# -----------------------------------------------------------------------------
# Endpoints
# -----------------------------------------------------------------------------

# Authentication Endpoints
@router.post("/register", 
    tags=["Authentication"],
    response_model=Dict[str, str],
    status_code=status.HTTP_201_CREATED
)
async def register_user(
    user: UserRegister,
    request: Request,
    db: Session = Depends(get_db)
):
    """Register a new user account"""
    # Check if user exists
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    try:
        # Create user
        hashed_password = hash_password(user.password)
        db_user = User(
            email=user.email,
            hashed_password=hashed_password,
            first_name=user.first_name,
            last_name=user.last_name,
            role="user",
            tier="Free"
        )
        db.add(db_user)
        db.flush()  # Get the user ID without committing
        
        # Create verification token
        token = create_random_token()
        verification = EmailVerificationToken(
            token=token,
            user=db_user  # Use relationship instead of user_id
        )
        db.add(verification)
        db.commit()
        
        # Send verification email
        send_verification_email(user.email, token)
        
        return {"message": "User registered successfully. Please check your email for verification."}
    except Exception as e:
        db.rollback()
        logger.error(f"Error registering user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/login",
    tags=["Authentication"],
    response_model=TokenResponse
)
async def login(
    form_data: UserLogin,
    db: Session = Depends(get_db)
):
    """Authenticate user and get access token"""
    user = authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Update last login
    user.last_login = datetime.now(timezone.utc)
    db.commit()
    
    access_token = create_access_token(user.email)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/verify-email", tags=["Authentication"])
async def verify_email():
    """Verify user's email address"""

@router.post("/forgot-password", tags=["Authentication"])
async def forgot_password():
    """Request password reset token"""

@router.post("/reset-password", tags=["Authentication"])
async def reset_password():
    """Reset password using token"""

# User Management Endpoints
@router.get("/users/me", tags=["User Management"])
async def get_profile():
    """Get current user's profile"""

@router.put("/users/me", tags=["User Management"])
async def update_profile():
    """Update user profile settings"""

# Team Management Endpoints
@router.post("/teams", 
    tags=["Team Management"],
    response_model=TeamResponse
)
async def create_team(
    team: TeamCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new team"""
    try:
        # Create team
        db_team = Team(
            name=team.name,
            organization=team.organization,
            created_by=current_user.id
        )
        db.add(db_team)
        db.flush()  # Get team ID without committing

        # Add creator as team admin
        team_member = TeamMember(
            team_id=db_team.id,
            user_id=current_user.id,
            role="team_admin"
        )
        db.add(team_member)
        
        # Log team creation
        log = TeamActivityLog(
            team_id=db_team.id,
            user_id=current_user.id,
            action="team_created",
            details=f"Team {team.name} created"
        )
        db.add(log)
        
        db.commit()
        db.refresh(db_team)
        
        return db_team
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating team: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/teams", tags=["Team Management"])
async def list_teams():
    """List all teams for current user"""

@router.get("/teams/{team_id}", tags=["Team Management"])
async def get_team():
    """Get team details"""

@router.put("/teams/{team_id}",
    tags=["Team Management"],
    response_model=Dict[str, str]
)
async def update_team(
    team_id: int,
    team_update: TeamUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update team settings"""
    try:
        team = db.query(Team).filter(Team.id == team_id).first()
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")
            
        # Check permissions
        team_member = db.query(TeamMember).filter(
            TeamMember.team_id == team_id,
            TeamMember.user_id == current_user.id,
            TeamMember.role == "team_admin"
        ).first()
        
        if not team_member and current_user.role != "admin":
            raise HTTPException(status_code=403, detail="Not authorized")
        
        # Update team
        team.name = team_update.name
        team.organization = team_update.organization
        
        # Log update
        log = TeamActivityLog(
            team_id=team_id,
            user_id=current_user.id,
            action="team_updated",
            details=f"Team details updated"
        )
        db.add(log)
        
        db.commit()
        return {"message": "Team updated successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating team: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/teams/{team_id}/members",
    tags=["Team Management"],
    response_model=Dict[str, str]
)
async def add_team_member(
    team_id: int,
    member: TeamMemberAdd,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a member to a team"""
    try:
        # Check if team exists
        team = db.query(Team).filter(Team.id == team_id).first()
        if not team:
            raise HTTPException(status_code=404, detail="Team not found")
            
        # Check if current user is team admin
        team_admin = db.query(TeamMember).filter(
            TeamMember.team_id == team_id,
            TeamMember.user_id == current_user.id,
            TeamMember.role == "team_admin"
        ).first()
        
        if not team_admin and current_user.role != "admin":
            raise HTTPException(status_code=403, detail="Not authorized")
            
        # Get user to add
        new_member = db.query(User).filter(User.email == member.user_email).first()
        if not new_member:
            raise HTTPException(status_code=404, detail="User not found")
            
        # Check if already a member
        existing = db.query(TeamMember).filter(
            TeamMember.team_id == team_id,
            TeamMember.user_id == new_member.id
        ).first()
        
        if existing:
            raise HTTPException(status_code=400, detail="User is already a team member")
            
        # Add member
        team_member = TeamMember(
            team_id=team_id,
            user_id=new_member.id,
            role=member.role
        )
        db.add(team_member)
        
        # Log activity
        log = TeamActivityLog(
            team_id=team_id,
            user_id=current_user.id,
            action="member_added",
            details=f"Added {member.user_email} as {member.role}"
        )
        db.add(log)
        
        db.commit()
        return {"message": "Team member added successfully"}
        
    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        logger.error(f"Error adding team member: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

# Admin Control Endpoints
@router.get("/users", tags=["Admin Controls"])
@require_role("admin")
async def list_users():
    """List all system users (Admin only)"""

@router.put("/users/{user_id}/role", tags=["Admin Controls"])
async def update_user_role():
    """Update user role (Admin only)"""

@router.put("/teams/{team_id}/members/{user_id}/role", tags=["Admin Controls"])
async def update_member_role():
    """Update team member role (Admin only)"""

@router.post("/admin/register",
    tags=["Admin Controls"],
    response_model=Dict[str, str]
)
async def register_admin(
    form_data: AdminRegister,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings)
):
    """Register an admin user"""
    try:
        if form_data.registration_key != settings.ADMIN_REGISTRATION_KEY:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid registration key"
            )
        
        # Create admin user
        hashed_password = hash_password(form_data.password)
        db_user = User(
            email=form_data.email,
            hashed_password=hashed_password,
            role="admin",
            tier="Enterprise",
            email_verified=True  # Auto-verify admin accounts
        )
        db.add(db_user)
        db.commit()
        
        return {"message": "Admin user created successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        logger.error(f"Error registering admin: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/admin/login",
    tags=["Admin Controls"],
    response_model=TokenResponse
)
async def admin_login(
    form_data: UserLogin,
    db: Session = Depends(get_db)
):
    """Admin login endpoint"""
    user = authenticate_user(db, form_data.email, form_data.password)
    if not user or user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials"
        )
    
    # Update last login
    user.last_login = datetime.now(timezone.utc)
    db.commit()
    
    access_token = create_access_token(user.email)
    return {"access_token": access_token, "token_type": "bearer"}

# System Endpoints
@router.get("/health", tags=["System"])
async def health_check():
    """Basic health check"""

@router.get("/health/detailed", tags=["System"])
async def detailed_health_check():
    """Detailed system health status"""
