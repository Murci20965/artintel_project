# main.py
# ------------------------------------------------------
# This file is entry point for running the FastAPI server.

from fastapi import FastAPI
from services.auth_user_management.routes import router as auth_router, tags_metadata
from services.auth_user_management.database import verify_db_connection
from services.auth_user_management.config import get_settings
import logging
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
# from services.model_catalog.routes import router as model_router
# from services.data_integration.routes import router as data_router
# from services.deployment.routes import router as deploy_router
# from services.monitoring.routes import router as monitor_router
# from services.finetuning.routes import router as finetune_router

logger = logging.getLogger(__name__)
settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Verify configuration and database connection on startup"""
    # Check required environment variables
    required_vars = ["DB_USERNAME", "DB_PASSWORD", "DB_HOST", "DB_PORT", "DB_NAME"]
    missing_vars = [var for var in required_vars if not getattr(settings, var)]
    
    if missing_vars:
        logger.error(f"Missing required environment variables: {', '.join(missing_vars)}")
        raise SystemExit(1)
        
    logger.info("Environment variables loaded successfully")
    
    # Verify database connection
    if not verify_db_connection():
        logger.error("Failed to connect to database. Please check your database configuration.")
        raise SystemExit(1)
    
    logger.info("Application startup complete")
    yield
    # Cleanup code here if needed

# Instantiate our FastAPI application
app = FastAPI(
    title="Artintel LLMs Platform API",
    description="""
    Welcome to Artintel's Large Language Model Platform API documentation.
    """,
    openapi_tags=tags_metadata
)

# -----------------------------------------------------------------------------
# Include the auth microservice routes
# prefix="/auth" means all endpoints in auth will be under /auth.
# tags=["auth"] helps group these routes in API docs (Swagger).
# -----------------------------------------------------------------------------
app.include_router(auth_router, prefix="/auth")
# app.include_router(model_router, prefix="/models", tags=["Model Catalog"])
# app.include_router(data_router, prefix="/data", tags=["Data Integration"])
# app.include_router(deploy_router, prefix="/deploy", tags=["Deployment"])
# app.include_router(monitor_router, prefix="/monitor", tags=["Monitoring"])
# app.include_router(finetune_router, prefix="/finetune", tags=["Fine-tuning"])

@app.get("/")
def read_root():
    """
    GET /
    Returns a basic welcome message to verify our server runs.
    """
    return {"Welcome to the Artintel Backend!"}

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,  # e.g., "http://localhost:3000"
        "http://localhost:3000",  # Local development
    ],
    allow_credentials=True,  # Allow cookies
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
