from enum import Enum, auto
from typing import Dict, List, Set
from fastapi import HTTPException, status

class Role(str, Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    DEVELOPER = "developer"
    VIEWER = "viewer"
    USER = "user"

class Permission(str, Enum):
    # Model Management
    VIEW_MODELS = "view_models"
    DEPLOY_MODELS = "deploy_models"
    FINE_TUNE_MODELS = "fine_tune_models"
    
    # User Management
    VIEW_USERS = "view_users"
    MANAGE_USERS = "manage_users"
    MANAGE_ROLES = "manage_roles"
    
    # Team Management
    VIEW_TEAM = "view_team"
    MANAGE_TEAM = "manage_team"
    CREATE_TEAM = "create_team"
    DELETE_TEAM = "delete_team"
    INVITE_MEMBER = "invite_member"
    REMOVE_MEMBER = "remove_member"
    
    # Billing & Usage
    VIEW_BILLING = "view_billing"
    MANAGE_BILLING = "manage_billing"
    
    # API Keys
    MANAGE_API_KEYS = "manage_api_keys"
    
    # Compliance & Audit
    VIEW_AUDIT_LOGS = "view_audit_logs"
    MANAGE_COMPLIANCE = "manage_compliance"

    # Team-specific permissions
    TEAM_VIEW_MODELS = "team_view_models"
    TEAM_DEPLOY_MODELS = "team_deploy_models"
    TEAM_MANAGE_API_KEYS = "team_manage_api_keys"
    TEAM_VIEW_ANALYTICS = "team_view_analytics"
    TEAM_MANAGE_SETTINGS = "team_manage_settings"

# Define role-permission mappings
ROLE_PERMISSIONS: Dict[Role, Set[Permission]] = {
    Role.ADMIN: {p for p in Permission},  # Admin has all permissions
    Role.MANAGER: {
        Permission.VIEW_MODELS,
        Permission.DEPLOY_MODELS,
        Permission.VIEW_USERS,
        Permission.MANAGE_USERS,
        Permission.VIEW_TEAM,
        Permission.MANAGE_TEAM,
        Permission.VIEW_BILLING,
        Permission.VIEW_AUDIT_LOGS,
        Permission.TEAM_VIEW_MODELS,
        Permission.TEAM_DEPLOY_MODELS,
        Permission.TEAM_MANAGE_API_KEYS,
        Permission.TEAM_VIEW_ANALYTICS,
        Permission.TEAM_MANAGE_SETTINGS,
        Permission.CREATE_TEAM,
        Permission.INVITE_MEMBER,
        Permission.REMOVE_MEMBER,
    },
    Role.DEVELOPER: {
        Permission.VIEW_MODELS,
        Permission.DEPLOY_MODELS,
        Permission.FINE_TUNE_MODELS,
        Permission.VIEW_TEAM,
        Permission.MANAGE_API_KEYS,
    },
    Role.VIEWER: {
        Permission.VIEW_MODELS,
        Permission.VIEW_TEAM,
    },
    Role.USER: {
        Permission.VIEW_MODELS,
        Permission.VIEW_TEAM,
        Permission.CREATE_TEAM,
    }
}

# Add team role permissions
TEAM_ROLE_PERMISSIONS = {
    "team_admin": {
        Permission.TEAM_VIEW_MODELS,
        Permission.TEAM_DEPLOY_MODELS,
        Permission.TEAM_MANAGE_API_KEYS,
        Permission.TEAM_VIEW_ANALYTICS,
        Permission.TEAM_MANAGE_SETTINGS,
    },
    "team_member": {
        Permission.TEAM_VIEW_MODELS,
        Permission.TEAM_VIEW_ANALYTICS,
    }
}

def check_permission(user_role: str, required_permission: Permission):
    """Check if a role has a specific permission"""
    try:
        role = Role(user_role)
        if required_permission not in ROLE_PERMISSIONS[role]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied: {required_permission} required"
            )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Invalid role: {user_role}"
        )

def requires_permission(permission: Permission):
    """Decorator to check if user has required permission"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            current_user = kwargs.get('current_user')
            if not current_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            check_permission(current_user.role, permission)
            return await func(*args, **kwargs)
        return wrapper
    return decorator 