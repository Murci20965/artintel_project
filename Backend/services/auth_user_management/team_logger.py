from datetime import datetime, timezone
from sqlalchemy.orm import Session
from services.auth_user_management.models import TeamActivityLog, User, Team
from services.auth_user_management.logger import setup_logger

logger = setup_logger("team_logger")

class TeamActivityLogger:
    def __init__(self, db: Session):
        self.db = db

    def log_activity(
        self,
        team_id: int,
        user_id: int,
        action: str,
        details: str
    ):
        """Log team activity with enhanced error handling"""
        try:
            # Verify team and user exist
            team = self.db.query(Team).filter(Team.id == team_id).first()
            user = self.db.query(User).filter(User.id == user_id).first()
            
            if not team or not user:
                logger.error(
                    f"Failed to log activity: Team {team_id} or User {user_id} not found"
                )
                return
            
            # Create activity log
            activity = TeamActivityLog(
                team_id=team_id,
                user_id=user_id,
                action=action,
                details=details,
                created_at=datetime.now(timezone.utc)
            )
            
            self.db.add(activity)
            self.db.commit()
            
            logger.info(
                f"Team activity logged | "
                f"Team: {team.name} | "
                f"User: {user.email} | "
                f"Action: {action}"
            )
            
        except Exception as e:
            logger.error(f"Error logging team activity: {str(e)}")
            self.db.rollback()
            raise

def log_team_activity(
    db: Session,
    team_id: int,
    user_id: int,
    action: str,
    details: str
):
    """Convenience function for logging team activity"""
    logger = TeamActivityLogger(db)
    logger.log_activity(team_id, user_id, action, details) 