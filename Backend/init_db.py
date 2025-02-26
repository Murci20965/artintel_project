from services.auth_user_management.database import Base, engine
from services.auth_user_management.models import User, EmailVerificationToken, PasswordResetToken, Team, TeamMember, TeamActivityLog

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db() 