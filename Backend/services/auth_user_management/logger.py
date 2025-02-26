import logging
import sys
from pathlib import Path
from logging.handlers import RotatingFileHandler
from datetime import datetime
from typing import Optional
from fastapi import Request

# Create logs directory if it doesn't exist
logs_dir = Path("logs")
logs_dir.mkdir(exist_ok=True)

class SecurityLogger(logging.Logger):
    def security(self, msg, *args, **kwargs):
        """Log security-related events"""
        self.log(25, msg, *args, **kwargs)  # Level 25 is between INFO and WARNING

class AuditLogger:
    def __init__(self, logger: logging.Logger):
        self.logger = logger

    def log_security_event(
        self, 
        event_type: str,
        user_email: Optional[str],
        request: Request,
        details: str
    ):
        """Log security-related events with context"""
        self.logger.security(
            f"Security Event: {event_type} | "
            f"User: {user_email or 'anonymous'} | "
            f"IP: {request.client.host} | "
            f"Details: {details} | "
            f"Timestamp: {datetime.utcnow()}"
        )

    def log_admin_action(
        self,
        action: str,
        admin_email: str,
        target: str,
        details: str
    ):
        """Log administrative actions"""
        self.logger.info(
            f"Admin Action: {action} | "
            f"Admin: {admin_email} | "
            f"Target: {target} | "
            f"Details: {details} | "
            f"Timestamp: {datetime.utcnow()}"
        )

# Register custom log level
logging.addLevelName(25, "SECURITY")

# Create logger instance
def setup_logger(name: str) -> logging.Logger:
    logger = SecurityLogger(name)
    
    # Set format
    formatter = logging.Formatter(
        '%(asctime)s | %(levelname)s | %(name)s | %(message)s'
    )
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    # File handler for security events
    security_handler = logging.FileHandler('security.log')
    security_handler.setFormatter(formatter)
    security_handler.setLevel(25)  # SECURITY level
    logger.addHandler(security_handler)
    
    # Set overall level
    logger.setLevel(logging.DEBUG)
    
    return logger 