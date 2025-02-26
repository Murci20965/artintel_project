from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from services.auth_user_management.database import Base
from datetime import datetime, timezone, timedelta

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    tier = Column(String(50), default="Free")
    role = Column(String(50), default="user")
    email_verified = Column(Boolean, default=False)
    
    # New fields
    first_name = Column(String(100))
    last_name = Column(String(100))
    organization = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_login = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=True)

    # Relationships
    teams = relationship("TeamMember", back_populates="user")
    verification_tokens = relationship("EmailVerificationToken", back_populates="user", cascade="all, delete-orphan")

class EmailVerificationToken(Base):
    __tablename__ = "email_verification_tokens"

    id = Column(Integer, primary_key=True)
    token = Column(String(100), unique=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    expires_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc) + timedelta(days=1))
    used = Column(Boolean, default=False)

    # Add relationship
    user = relationship("User", back_populates="verification_tokens")

class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), index=True, nullable=False)
    token = Column(String(255), unique=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    organization = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(Integer, ForeignKey("users.id"))

    # Relationships
    members = relationship("TeamMember", back_populates="team")
    creator = relationship("User", foreign_keys=[created_by])

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(50), nullable=False)
    joined_at = Column(DateTime(timezone=True), server_default=func.now())

    # Unique constraint to prevent duplicate memberships
    __table_args__ = (UniqueConstraint('team_id', 'user_id', name='unique_team_member'),)

    # Relationships
    team = relationship("Team", back_populates="members")
    user = relationship("User", back_populates="teams")

class TeamActivityLog(Base):
    __tablename__ = "team_activity_logs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    team_id = Column(Integer, ForeignKey('teams.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    action = Column(String(50))  # e.g., "member_added", "member_removed"
    details = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
