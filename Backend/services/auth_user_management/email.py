import smtplib
import base64
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from services.auth_user_management.config import get_settings
from services.auth_user_management.logger import setup_logger

settings = get_settings()

def get_logo_base64():
    """Get base64 encoded logo"""
    logo_path = os.path.join('static', 'images', 'Logo_artintel.jpg')
    with open(logo_path, 'rb') as f:
        image_data = f.read()
        return base64.b64encode(image_data).decode()

def get_verification_template(verify_url: str) -> str:
    """HTML template for verification email"""
    logo_base64 = get_logo_base64()
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #ffffff;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                text-align: center;
                padding: 20px 0;
            }}
            .logo-placeholder {{
                width: 150px;
                height: 60px;
                background-color: #e0e0e0;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 12px;
            }}
            .content {{
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                border: 1px solid #e0e0e0;
            }}
            .button {{
                display: inline-block;
                padding: 12px 24px;
                background-color: #00B4D8;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 12px;
            }}
            h1 {{
                color: #0077B6;
                margin-bottom: 20px;
            }}
            p {{
                color: #333;
                line-height: 1.6;
            }}
            .logo {{
                max-width: 200px;
                height: auto;
                margin: 0 auto;
                display: block;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="data:image/jpeg;base64,{logo_base64}" alt="Artintel LLMs Logo" class="logo">
            </div>
            <div class="content">
                <h1>Welcome to Artintel LLMs!</h1>
                <p>Thank you for registering. Please verify your email address to get started.</p>
                <p style="text-align: center;">
                    <a href="{verify_url}" class="button">Verify Email Address</a>
                </p>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>© 2024 Artintel LLMs. All rights reserved.</p>
                <p>If you have any questions, please contact our support team.</p>
            </div>
        </div>
    </body>
    </html>
    """

def get_reset_password_template(reset_url: str) -> str:
    """HTML template for password reset email"""
    logo_base64 = get_logo_base64()
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #ffffff;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                text-align: center;
                padding: 20px 0;
            }}
            .logo-placeholder {{
                width: 150px;
                height: 60px;
                background-color: #e0e0e0;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 12px;
            }}
            .content {{
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                border: 1px solid #e0e0e0;
            }}
            .button {{
                display: inline-block;
                padding: 12px 24px;
                background-color: #00B4D8;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                padding: 20px;
                color: #666;
                font-size: 12px;
            }}
            h1 {{
                color: #0077B6;
                margin-bottom: 20px;
            }}
            p {{
                color: #333;
                line-height: 1.6;
            }}
            .logo {{
                max-width: 200px;
                height: auto;
                margin: 0 auto;
                display: block;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="data:image/jpeg;base64,{logo_base64}" alt="Artintel LLMs Logo" class="logo">
            </div>
            <div class="content">
                <h1>Reset Your Password</h1>
                <p>We received a request to reset your password. Click the button below to set a new password.</p>
                <p style="text-align: center;">
                    <a href="{reset_url}" class="button">Reset Password</a>
                </p>
                <p>This link will expire in 30 minutes.</p>
                <p>If you didn't request this change, please ignore this email or contact support if you have concerns.</p>
            </div>
            <div class="footer">
                <p>© 2024 Artintel LLMs. All rights reserved.</p>
                <p>If you have any questions, please contact our support team.</p>
            </div>
        </div>
    </body>
    </html>
    """

def send_verification_email(to_email: str, verification_token: str):
    """Sends an email verification link to the user."""
    # verify_url = f"{settings.FRONTEND_URL}/verify-email?token={verification_token}"
    verify_url = f"http://localhost:3000/verify-email?token={verification_token}"
    
    msg = MIMEMultipart('alternative')
    msg['From'] = settings.FROM_EMAIL
    msg['To'] = to_email
    msg['Subject'] = "Verify your email address - Artintel LLMs"
    
    html_content = get_verification_template(verify_url)
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise

def send_password_reset_email(to_email: str, reset_token: str):
    """Sends a password reset link to the user."""
    reset_url = f"{settings.FRONTEND_URL}/reset-password?token={reset_token}"
    
    msg = MIMEMultipart('alternative')
    msg['From'] = settings.FROM_EMAIL
    msg['To'] = to_email
    msg['Subject'] = "Reset your password - Artintel LLMs"
    
    html_content = get_reset_password_template(reset_url)
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise 