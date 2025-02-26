# services/auth_user_management/database.py

from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from services.auth_user_management.config import get_settings
import time
import logging

settings = get_settings()

# Configure logging
logger = logging.getLogger(__name__)

def create_db_engine(retries=3, delay=1):
    """Create database engine with retry logic"""
    for attempt in range(retries):
        try:
            # Log settings (without password)
            logger.info(f"Database settings: HOST={settings.DB_HOST}, "
                       f"PORT={settings.DB_PORT}, USER={settings.DB_USERNAME}, "
                       f"DB={settings.DB_NAME}")
            
            DATABASE_URL = f"mysql+mysqlconnector://{settings.DB_USERNAME}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
            
            logger.info(f"Attempting to connect to database (attempt {attempt + 1}/{retries})")
            
            engine = create_engine(
                DATABASE_URL,
                pool_pre_ping=True,
                pool_recycle=3600,
                pool_size=5,
                max_overflow=10,
                pool_timeout=30
            )
            
            # Test the connection
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
                logger.info("Database connection successful!")
            return engine
            
        except Exception as e:
            logger.error(f"Database connection error: {str(e)}")
            if attempt == retries - 1:
                raise
            logger.warning(f"Retrying in {delay} seconds...")
            time.sleep(delay)
            delay *= 2

# Create engine with retry logic
engine = create_db_engine()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Get database session with error handling"""
    db = SessionLocal()
    try:
        yield db
    except OperationalError as e:
        logger.error(f"Database operation failed: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()

def verify_db_connection():
    """Verify database connection is working"""
    with SessionLocal() as session:
        try:
            session.execute(text("SELECT 1"))
            return True
        except Exception as e:
            logger.error(f"Database connection failed: {str(e)}")
            return False

