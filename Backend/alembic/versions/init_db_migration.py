"""init_db_migration

Revision ID: init_db
Revises: 
Create Date: 2025-02-25 05:40:00.000000

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime, timezone

# revision identifiers, used by Alembic.
revision = 'init_db'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create users table first
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('email', sa.String(255), unique=True, nullable=False),
        sa.Column('hashed_password', sa.String(255), nullable=False),
        sa.Column('tier', sa.String(50), server_default='Free'),
        sa.Column('role', sa.String(50), server_default='user'),
        sa.Column('email_verified', sa.Boolean(), server_default='0'),
        sa.Column('first_name', sa.String(100)),
        sa.Column('last_name', sa.String(100)),
        sa.Column('organization', sa.String(255)),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('last_login', sa.DateTime(timezone=True)),
        sa.Column('is_active', sa.Boolean(), server_default='1'),
        sa.PrimaryKeyConstraint('id')
    )

    # Create email verification tokens table
    op.create_table('email_verification_tokens',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('token', sa.String(100), unique=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('used', sa.Boolean(), nullable=False, server_default='0'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    # Create password reset tokens table
    op.create_table('password_reset_tokens',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('token', sa.String(255), unique=True, nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )

    # Create teams table
    op.create_table('teams',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('organization', sa.String(100), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('created_by', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['created_by'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )

    # Create team members table
    op.create_table('team_members',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('team_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('role', sa.String(50), nullable=False),
        sa.Column('joined_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('team_id', 'user_id', name='unique_team_member')
    )

    # Create team activity logs table
    op.create_table('team_activity_logs',
        sa.Column('id', sa.Integer(), nullable=False, autoincrement=True),
        sa.Column('team_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('action', sa.String(50), nullable=False),
        sa.Column('details', sa.String(255)),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.ForeignKeyConstraint(['team_id'], ['teams.id']),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id')
    )

    # Add indexes
    op.create_index('ix_users_email', 'users', ['email'], unique=True)
    op.create_index('ix_email_verification_tokens_token', 'email_verification_tokens', ['token'], unique=True)
    op.create_index('ix_password_reset_tokens_email', 'password_reset_tokens', ['email'])
    op.create_index('ix_password_reset_tokens_token', 'password_reset_tokens', ['token'], unique=True)

def downgrade():
    # Drop tables in reverse order (respecting foreign key constraints)
    op.drop_table('team_activity_logs')
    op.drop_table('team_members')
    op.drop_table('teams')
    op.drop_table('password_reset_tokens')
    op.drop_table('email_verification_tokens')
    op.drop_table('users') 