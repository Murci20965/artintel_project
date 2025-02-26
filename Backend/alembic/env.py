from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
import logging

# Import your model's Base and settings
from services.auth_user_management.models import Base
from services.auth_user_management.config import get_settings

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("alembic.env")

# Alembic Config object
config = context.config

# Get database URL from settings
settings = get_settings()

# Log the database connection info (without password)
logger.info(f"Connecting to database: {settings.DB_USERNAME}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}")

config.set_main_option(
    "sqlalchemy.url",
    f"mysql+mysqlconnector://{settings.DB_USERNAME}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
)

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set target metadata
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            render_as_batch=True,
            compare_type=True,
            compare_server_default=True
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
