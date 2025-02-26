from fastapi import HTTPException, status
from datetime import datetime, timedelta
from typing import Dict, Tuple
import time
from services.auth_user_management.logger import setup_logger
from services.auth_user_management.config import get_settings

logger = setup_logger("rate_limiter")

settings = get_settings()

class RateLimitExceeded(HTTPException):
    """Custom exception for rate limit errors"""
    def __init__(self, minutes_left: int, action: str):
        super().__init__(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many {action} attempts. Please try again in {minutes_left} minutes."
        )

class RateLimiter:
    def __init__(self):
        # Store attempts as: {'email:action': (count, first_attempt_timestamp)}
        self._attempts: Dict[str, Tuple[int, datetime]] = {}
        
        # Configure limits from environment
        self.VERIFY_EMAIL_MAX_ATTEMPTS = settings.VERIFY_EMAIL_MAX_ATTEMPTS
        self.VERIFY_EMAIL_WINDOW = timedelta(hours=settings.VERIFY_EMAIL_WINDOW_HOURS)
        
        self.RESET_PASSWORD_MAX_ATTEMPTS = settings.RESET_PASSWORD_MAX_ATTEMPTS
        self.RESET_PASSWORD_WINDOW = timedelta(minutes=settings.RESET_PASSWORD_WINDOW_MINUTES)

        self.IP_VERIFY_MAX_ATTEMPTS = settings.IP_VERIFY_MAX_ATTEMPTS
        self.IP_RESET_MAX_ATTEMPTS = settings.IP_RESET_MAX_ATTEMPTS

        logger.info("Rate limiter initialized with following limits:")
        logger.info(f"Verify Email: {self.VERIFY_EMAIL_MAX_ATTEMPTS} attempts per {self.VERIFY_EMAIL_WINDOW}")
        logger.info(f"Reset Password: {self.RESET_PASSWORD_MAX_ATTEMPTS} attempts per {self.RESET_PASSWORD_WINDOW}")

    def _get_key(self, identifier: str, action: str) -> str:
        """Generate key for rate limiting"""
        return f"{identifier}:{action}"

    def check_verify_email_rate(self, email: str, ip: str = None):
        """Check if user can request another verification email"""
        try:
            # Check email-based limit
            self._check_rate(
                email, 
                "verify_email", 
                self.VERIFY_EMAIL_MAX_ATTEMPTS,
                self.VERIFY_EMAIL_WINDOW
            )
            
            # Check IP-based limit if provided
            if ip:
                self._check_rate(
                    ip,
                    "verify_email_ip",
                    self.IP_VERIFY_MAX_ATTEMPTS,
                    self.VERIFY_EMAIL_WINDOW
                )
            
            logger.info(f"Rate check passed for email verification: {email}")
        except RateLimitExceeded as e:
            logger.warning(f"Rate limit exceeded for email verification: {email}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error in verify email rate check: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error checking rate limit"
            )

    def check_reset_password_rate(self, email: str, ip: str = None):
        """Check if user can request another password reset"""
        try:
            # Check email-based limit
            self._check_rate(
                email,
                "reset_password",
                self.RESET_PASSWORD_MAX_ATTEMPTS,
                self.RESET_PASSWORD_WINDOW
            )
            
            # Check IP-based limit if provided
            if ip:
                self._check_rate(
                    ip,
                    "reset_password_ip",
                    self.IP_RESET_MAX_ATTEMPTS,
                    self.RESET_PASSWORD_WINDOW
                )
            
            logger.info(f"Rate check passed for password reset: {email}")
        except RateLimitExceeded as e:
            logger.warning(f"Rate limit exceeded for password reset: {email}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error in password reset rate check: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error checking rate limit"
            )

    def _check_rate(self, identifier: str, action: str, max_attempts: int, window: timedelta):
        """Generic rate check logic"""
        try:
            key = self._get_key(identifier, action)
            now = datetime.now()

            # Clean up old entries periodically
            self._cleanup_old_entries()
            
            if key in self._attempts:
                count, first_attempt = self._attempts[key]
                
                # Reset if outside window
                if now - first_attempt > window:
                    self._attempts[key] = (1, now)
                    logger.debug(f"Reset rate limit counter for {key}")
                    return
                
                # Check limit
                if count >= max_attempts:
                    time_left = window - (now - first_attempt)
                    minutes_left = int(time_left.total_seconds() / 60)
                    raise RateLimitExceeded(minutes_left, action)
                
                # Increment counter
                self._attempts[key] = (count + 1, first_attempt)
                logger.debug(f"Incremented rate limit counter for {key}: {count + 1}")
            else:
                # First attempt
                self._attempts[key] = (1, now)
                logger.debug(f"Initial rate limit entry for {key}")

        except RateLimitExceeded:
            raise
        except Exception as e:
            logger.error(f"Error in rate limit check: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error checking rate limit"
            )

    def _cleanup_old_entries(self):
        """Remove expired entries to prevent memory growth"""
        try:
            now = datetime.now()
            keys_to_delete = []
            
            for key, (_, timestamp) in self._attempts.items():
                # Use the longer window (24 hours) for cleanup
                if now - timestamp > timedelta(hours=24):
                    keys_to_delete.append(key)
            
            for key in keys_to_delete:
                del self._attempts[key]
                logger.debug(f"Cleaned up expired rate limit entry: {key}")

            if keys_to_delete:
                logger.info(f"Cleaned up {len(keys_to_delete)} expired rate limit entries")
        except Exception as e:
            logger.error(f"Error cleaning up rate limit entries: {str(e)}") 