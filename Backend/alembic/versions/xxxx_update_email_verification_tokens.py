"""update_email_verification_tokens

Revision ID: xxxx
Revises: previous_revision
Create Date: 2025-02-25

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime, timezone

# revision identifiers, used by Alembic.
revision = 'xxxx'
down_revision = 'previous_revision'
branch_labels = None
depends_on = None

def upgrade():
    # Drop existing table
    op.drop_table('email_verification_tokens')
    
    # Create new table with updated schema
    op.create_table('email_verification_tokens',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('token', sa.String(100), unique=True, nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('used', sa.Boolean(), default=False),
    )
    
    # Add index on token
    op.create_index(op.f('ix_email_verification_tokens_token'), 
                   'email_verification_tokens', ['token'], unique=True)

def downgrade():
    # Drop new table
    op.drop_table('email_verification_tokens')
    
    # Recreate original table
    op.create_table('email_verification_tokens',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('email', sa.String(255), index=True, nullable=False),
        sa.Column('token', sa.String(255), unique=True, nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now())
    ) 