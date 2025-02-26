from fastapi import APIRouter

router = APIRouter()

@router.get("/", tags=["Monitoring"])
async def get_metrics():
    """Get monitoring metrics"""
    return {"message": "Monitoring endpoint - Coming soon"} 