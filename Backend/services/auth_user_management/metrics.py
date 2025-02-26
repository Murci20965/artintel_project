from prometheus_client import Counter, Histogram, Gauge
import time

# Request metrics
http_requests_total = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

http_request_duration_seconds = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration',
    ['method', 'endpoint']
)

# User metrics
active_users_total = Gauge(
    'active_users_total',
    'Total number of active users'
)

team_count = Gauge(
    'teams_total',
    'Total number of teams'
)

# Authentication metrics
login_attempts_total = Counter(
    'login_attempts_total',
    'Total login attempts',
    ['status']
)

password_reset_requests = Counter(
    'password_reset_requests_total',
    'Total password reset requests'
)

# Rate limiting metrics
rate_limit_hits = Counter(
    'rate_limit_hits_total',
    'Total number of rate limit hits',
    ['endpoint']
)

class MetricsMiddleware:
    async def __call__(self, request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        # Record request metrics
        duration = time.time() - start_time
        http_requests_total.labels(
            method=request.method,
            endpoint=request.url.path,
            status=response.status_code
        ).inc()
        
        http_request_duration_seconds.labels(
            method=request.method,
            endpoint=request.url.path
        ).observe(duration)
        
        return response 