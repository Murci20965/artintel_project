from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from dotenv import load_dotenv

# Load .env file explicitly
load_dotenv(override=True)

class Settings(BaseSettings):
    # Database settings
    DB_USERNAME: str = os.getenv("DB_USERNAME")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: int = int(os.getenv("DB_PORT", "3306"))
    DB_NAME: str = os.getenv("DB_NAME")

    # JWT settings
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_SECONDS: int = 3600

    # Email settings
    SMTP_SERVER: str
    SMTP_PORT: int
    SMTP_USERNAME: str
    SMTP_PASSWORD: str
    FROM_EMAIL: str

    # Frontend URLs
    FRONTEND_URL: str

    # Rate limiting settings
    VERIFY_EMAIL_MAX_ATTEMPTS: int = 5
    VERIFY_EMAIL_WINDOW_HOURS: int = 24
    RESET_PASSWORD_MAX_ATTEMPTS: int = 3
    RESET_PASSWORD_WINDOW_MINUTES: int = 30
    IP_VERIFY_MAX_ATTEMPTS: int = 10
    IP_RESET_MAX_ATTEMPTS: int = 5

    # Admin registration
    ADMIN_REGISTRATION_KEY: str = os.getenv("ADMIN_REGISTRATION_KEY", "your-secure-key-here")
    ALLOWED_ADMIN_DOMAINS: str = os.getenv("ALLOWED_ADMIN_DOMAINS", "*")  # Comma-separated domains or * for any

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

@lru_cache()
def get_settings() -> Settings:
    return Settings() 