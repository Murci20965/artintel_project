# Authentication & User Management API Documentation

## Overview
This API provides comprehensive authentication, user management, and team collaboration features.

## Base URL
`/auth`

## CORS Configuration
The API supports Cross-Origin Resource Sharing (CORS) with the following settings:
- **Allowed Origins**: 
  - Frontend URL (from environment settings)
  - `http://localhost:3000` (for local development)
- **Credentials**: Allowed (supports cookies and auth headers)
- **Methods**: All HTTP methods supported (GET, POST, PUT, DELETE, etc.)
- **Headers**: All headers allowed

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required | Rate Limit |
|--------|----------|-------------|---------------|------------|
| POST | `/register` | Register new user | No | None |
| POST | `/verify-email` | Verify email address | No | 5/24h per email |
| POST | `/login` | User login | No | None |
| POST | `/forgot-password` | Request password reset | No | 3/30m per email |
| POST | `/reset-password` | Reset password | No | None |

### Admin Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/register` | Register admin user | No* |
| POST | `/admin/login` | Admin login | No |
| GET | `/users` | List all users | Yes (Admin) |
| PUT | `/users/{user_id}/role` | Update user role | Yes (Admin) |
| PUT | `/set-tier` | Update user tier | Yes (Admin) |

### Team Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/teams` | Create new team | Yes |
| GET | `/teams` | List user's teams | Yes |
| PUT | `/teams/{team_id}` | Update team | Yes |
| DELETE | `/teams/{team_id}` | Delete team | Yes |
| GET | `/teams/{team_id}/activity` | Get team activity | Yes |

### Team Members
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/teams/{team_id}/members` | Add team member | Yes |
| GET | `/teams/{team_id}/members` | List team members | Yes |
| DELETE | `/teams/{team_id}/members/{user_id}` | Remove member | Yes |
| PUT | `/teams/{team_id}/members/{user_id}/role` | Update member role | Yes |

## Monitoring & Metrics

### Health Checks
- `GET /auth/health`: Basic health check
- `GET /auth/health/detailed`: Detailed component status

### Prometheus Metrics
Available metrics:
- `http_requests_total`: Request count by method/endpoint
- `http_request_duration_seconds`: Request duration
- `active_users_total`: Active user count
- `teams_total`: Total teams count
- `login_attempts_total`: Login attempts
- `rate_limit_hits_total`: Rate limit violations

### Logging
The service implements:
- Security event logging
- Admin action auditing
- Team activity tracking
- Rate limit monitoring

## Security Features

### Rate Limiting
- Email verification: 5 attempts per 24 hours
- Password reset: 3 attempts per 30 minutes
- IP-based limits:
  - Verification: 10 attempts per hour
  - Password reset: 5 attempts per hour

### Role-Based Access
- User roles: user, admin
- Team roles: team_member, team_admin
- Tier levels: Free, Advanced, Enterprise

### Domain Restrictions
Admin registration restricted to allowed domains (configurable)

## Error Handling
All endpoints return standardized error responses:
```json
{
    "detail": "Error description"
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Server Error

## Detailed Documentation
Full API documentation available at `/docs` (Swagger UI) or `/redoc` (ReDoc).

## Database Schema
Key tables:
- users
- teams
- team_members
- team_activity_logs
- email_verification_tokens
- password_reset_tokens

## Environment Configuration
Required environment variables:
```env
# Database
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=3306
DB_NAME=your_db_name

# JWT
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_SECONDS=3600

# Email
SMTP_SERVER=your_smtp_server
SMTP_PORT=587
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_password
FROM_EMAIL=noreply@your-domain.com

# Frontend
FRONTEND_URL=http://your-frontend-url.com
```

## API Documentation
- Swagger UI: `/docs`
- ReDoc: `/redoc`

## Monitoring
- Health check endpoint: `/health`
- Prometheus metrics: `/metrics`
- Request logging
- Activity auditing