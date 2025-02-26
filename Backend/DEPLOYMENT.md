# Deployment Guide

## Environment Setup

### 1. Environment Variables
Copy `.env.example` to create your `.env` file:
```bash
cp .env.example .env
```

Update the following variables in your `.env` file:

#### Database Settings
- `DB_USERNAME`: Your MySQL username
- `DB_PASSWORD`: Your MySQL password
- `DB_HOST`: Database host (e.g., localhost or your DB server)
- `DB_PORT`: Database port (default: 3306)
- `DB_NAME`: Your database name

#### JWT Settings
- `JWT_SECRET_KEY`: Generate a secure random key for JWT signing
  ```python
  # Generate using Python:
  import secrets
  print(secrets.token_urlsafe(32))
  ```
- `JWT_ALGORITHM`: Keep as HS256 unless you have specific requirements
- `ACCESS_TOKEN_EXPIRE_SECONDS`: Token expiry in seconds (default: 3600)

#### Email Settings
- `SMTP_SERVER`: Your SMTP server address
- `SMTP_PORT`: SMTP port (usually 587 for TLS)
- `SMTP_USERNAME`: Email username/address
- `SMTP_PASSWORD`: Email password or app-specific password
- `FROM_EMAIL`: Sender email address

#### Frontend URL
- `FRONTEND_URL`: Your frontend application URL (no trailing slash)

#### Rate Limiting (Optional)
Adjust these values based on your requirements:
- `VERIFY_EMAIL_MAX_ATTEMPTS`: Max verification emails per user
- `VERIFY_EMAIL_WINDOW_HOURS`: Time window for verification attempts
- `RESET_PASSWORD_MAX_ATTEMPTS`: Max password reset attempts
- `RESET_PASSWORD_WINDOW_MINUTES`: Time window for reset attempts
- `IP_VERIFY_MAX_ATTEMPTS`: Max verifications per IP
- `IP_RESET_MAX_ATTEMPTS`: Max resets per IP

### 2. Database Setup
1. Create MySQL database:
```sql
CREATE DATABASE your_db_name;
```

2. Run migrations:
```bash
alembic upgrade head
```

### 3. Python Dependencies
Install required packages:
```bash
pip install -r requirements.txt
```

### 4. Xneelo Specific Setup
1. Configure Python Path:
```bash
export PYTHONPATH=/path/to/your/project
```

2. Create logs directory:
```bash
mkdir logs
chmod 755 logs
```

3. Set file permissions:
```bash
chmod 600 .env
```

### 5. Running the Application
1. Development:
```bash
uvicorn main:app --reload
```

2. Production:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Security Checklist
- [ ] Generated secure JWT secret key
- [ ] Set restrictive file permissions on .env
- [ ] Updated all placeholder credentials
- [ ] Configured proper CORS settings
- [ ] Set up SSL/TLS
- [ ] Configured logging
- [ ] Set up monitoring

## Monitoring
The application logs are stored in the `logs` directory:
- `auth_routes.log`: Authentication endpoint logs
- `rate_limiter.log`: Rate limiting logs

Each log file is rotated at 10MB with 5 backup files maintained.

## Troubleshooting
1. Database Connection Issues:
   - Verify database credentials
   - Check database server accessibility
   - Ensure proper port is open

2. Email Issues:
   - Verify SMTP credentials
   - Check if SMTP server allows authentication
   - Verify port is not blocked

3. Rate Limiting:
   - Check logs for rate limit violations
   - Adjust limits if needed
   - Monitor for abuse patterns

## Maintenance
1. Regular Tasks:
   - Monitor log files
   - Check database performance
   - Update dependencies
   - Rotate JWT secret key

2. Backup:
   - Database backup
   - Environment configuration backup
   - Log rotation

## Support
For issues or questions:
1. Check the logs in `logs/` directory
2. Review error messages in the application output
3. Contact system administrator 