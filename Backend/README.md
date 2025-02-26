# Auth User Management Service

## Overview
Authentication and user management microservice built with FastAPI, SQLAlchemy, and MySQL.

## Features
- 👤 User Authentication & Registration
- ✉️ Email Verification
- 🔑 Password Reset
- 👥 Team Management
- 🔐 Role-Based Access Control
- 📊 Activity Logging
- ⚡ Rate Limiting

## Tech Stack
- FastAPI
- SQLAlchemy
- MySQL
- Alembic (migrations)
- JWT Authentication
- Pydantic
- Python 3.8+

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables (.env):
```env
# Database Configuration
DB_USERNAME=artintelUser
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=artintel_db

# JWT Configuration
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_SECONDS=3600

# Email Configuration
SMTP_SERVER=smtp.your-server.com
SMTP_PORT=587
SMTP_USERNAME=your_username
SMTP_PASSWORD=your_password
FROM_EMAIL=noreply@your-domain.com

# Admin Configuration
ADMIN_REGISTRATION_KEY=your-secure-key
ALLOWED_ADMIN_DOMAINS=company.com,admin.com
```

3. Initialize database:
```bash
alembic upgrade head
```

4. Run the server:
```bash
uvicorn main:app --reload
```

## API Documentation
- Swagger UI: `/docs`
- ReDoc: `/redoc`
- Detailed API Doc: [Authentication_API_Doc.md](services/auth_user_management/Authentication_API_Doc.md)

## Development

### Database Migrations
```bash
# Create migration
alembic revision --autogenerate -m "Description"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Testing
```bash
pytest tests/
```

## Security Features
- Password Hashing (bcrypt)
- JWT Authentication
- Rate Limiting
- Role-Based Access Control
- Email Verification
- Domain Restrictions for Admin

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
[License information to be added]

## Testing

### Running Tests
```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with coverage report
pytest --cov=services
```

### Test Structure
- `tests/test_auth.py`: Authentication endpoints
- `tests/test_teams.py`: Team management
- `tests/test_admin.py`: Admin functionality
- `tests/conftest.py`: Test configuration and fixtures

### Metrics and Monitoring
The service includes:
- Prometheus metrics
- Custom logging
- Health checks
- Activity auditing

### Security Features
- Rate limiting
- JWT authentication
- Role-based access control
- Security event logging
- Domain restrictions for admin

# Artintel Project

## Project Structure
- `/backend` - FastAPI backend service
- `/frontend` - Node.js frontend application

## Backend Setup
1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configurations
```

4. Run migrations:
```bash
alembic upgrade head
```

5. Start the server:
```bash
uvicorn main:app --reload
```

## API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Frontend Setup
(To be added by frontend team)