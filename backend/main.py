import json
import asyncio
from fastapi import FastAPI, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.database.database import engine, get_db, Base
from backend.database.models import (
    PHCModel,
    StockRecordModel,
    ForecastResultModel,
    AlertModel,
    RedistributionRecommendationModel,
    FLRoundModel
)
from backend.database.seed_db import main as seed_database
from backend.schemas import (
    PHCBase,
    StockRecordBase,
    ForecastPoint,
    AlertBase,
    TransferBase,
    FLNodeBase,
    HealthCheckResponse
)

# Ensure database tables are created and seeded if empty
Base.metadata.create_all(bind=engine)
db_session = next(get_db())
if db_session.query(PHCModel).count() == 0:
    seed_database()

app = FastAPI(
    title="SentinelHealth API",
    description="Federated AI Platform for Health Resource & Supply Chain Resilience API",
    version="1.0.0"
)

# Enable CORS for local React Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket Connection Manager for Live Telemetry Stream
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

# -----------------------------------------------------------------------------
# REST API Endpoints
# -----------------------------------------------------------------------------

@app.get("/api/health", response_model=HealthCheckResponse)
def health_check(db: Session = Depends(get_db)):
    """Backend & Database Health Check."""
    try:
        phc_count = db.query(PHCModel).count()
        return {
            "status": "healthy",
            "database": f"connected ({phc_count} PHCs active)",
            "version": "1.0.0"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")


@app.get("/api/phcs", response_model=List[PHCBase])
def get_phcs(
    district: Optional[str] = Query(None, description="Filter by district name"),
    status: Optional[str] = Query(None, description="Filter by status (CRITICAL, WARNING, HEALTHY)"),
    db: Session = Depends(get_db)
):
    """Retrieve Primary Health Centres with optional filtering."""
    query = db.query(PHCModel)
    if district and district != "ALL":
        query = query.filter(PHCModel.district == district)
    if status and status != "ALL":
        query = query.filter(PHCModel.status == status)
    return query.all()


@app.get("/api/phcs/{phc_id}", response_model=PHCBase)
def get_phc_by_id(phc_id: str, db: Session = Depends(get_db)):
    """Retrieve single PHC facility details."""
    phc = db.query(PHCModel).filter(PHCModel.id == phc_id).first()
    if not phc:
        raise HTTPException(status_code=404, detail=f"PHC '{phc_id}' not found")
    return phc


@app.get("/api/inventory", response_model=List[StockRecordBase])
def get_inventory(
    category: Optional[str] = Query(None, description="Filter by category"),
    status: Optional[str] = Query(None, description="Filter by status"),
    db: Session = Depends(get_db)
):
    """Retrieve medicine inventory records across PHCs."""
    query = db.query(StockRecordModel)
    if category and category != "ALL":
        query = query.filter(StockRecordModel.category == category)
    if status and status != "ALL":
        query = query.filter(StockRecordModel.status == status)
    return query.all()


@app.get("/api/forecast/{phc_id}/{medicine_name}", response_model=List[ForecastPoint])
def get_forecast(phc_id: str, medicine_name: str, db: Session = Depends(get_db)):
    """Retrieve historical & 7/14/30-day predictive demand time series for a PHC and medicine."""
    results = db.query(ForecastResultModel).filter(
        ForecastResultModel.phc_id == phc_id,
        ForecastResultModel.medicine_name == medicine_name
    ).all()
    
    # Fallback to general forecast time series if specific combo not found
    if not results:
        results = db.query(ForecastResultModel).filter(
            ForecastResultModel.phc_id == "PHC-017"
        ).all()
        
    return results


@app.get("/api/alerts", response_model=List[AlertBase])
def get_alerts(
    severity: Optional[str] = Query(None, description="Filter by severity (CRITICAL, WARNING)"),
    db: Session = Depends(get_db)
):
    """Retrieve ranked early warning alerts."""
    query = db.query(AlertModel)
    if severity and severity != "ALL":
        query = query.filter(AlertModel.severity == severity)
    return query.order_by(AlertModel.severity.asc()).all()


@app.post("/api/alerts/{alert_id}/acknowledge", response_model=AlertBase)
def acknowledge_alert(alert_id: str, db: Session = Depends(get_db)):
    """Acknowledge an early warning alert."""
    alert = db.query(AlertModel).filter(AlertModel.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail=f"Alert '{alert_id}' not found")
    alert.acknowledged = True
    db.commit()
    db.refresh(alert)
    return alert


@app.get("/api/redistribution/recommendations", response_model=List[TransferBase])
def get_redistribution_recommendations(db: Session = Depends(get_db)):
    """Retrieve SciPy linear programming optimized redistribution transfer recommendations."""
    return db.query(RedistributionRecommendationModel).all()


@app.post("/api/redistribution/{transfer_id}/approve", response_model=TransferBase)
def approve_transfer(transfer_id: str, db: Session = Depends(get_db)):
    """Authorize a transfer recommendation (Human-in-the-Loop decision)."""
    transfer = db.query(RedistributionRecommendationModel).filter(
        RedistributionRecommendationModel.id == transfer_id
    ).first()
    if not transfer:
        raise HTTPException(status_code=404, detail=f"Transfer '{transfer_id}' not found")
    
    transfer.status = "APPROVED"
    db.commit()
    db.refresh(transfer)
    return transfer


@app.get("/api/fl/status", response_model=List[FLNodeBase])
def get_fl_status(db: Session = Depends(get_db)):
    """Retrieve BRICS Federated Learning nodes status."""
    return db.query(FLRoundModel).all()


@app.post("/api/fl/round")
def trigger_fl_round(db: Session = Depends(get_db)):
    """Simulate execution of a Flower FedAvg aggregation round."""
    nodes = db.query(FLRoundModel).all()
    for node in nodes:
        node.local_loss = max(0.02, round(node.local_loss * 0.94, 4))
        node.round_status = "Global Aggregation Completed"
    db.commit()
    return {
        "status": "success",
        "message": "FL Aggregation Round executed across BRICS nodes.",
        "global_mae": 4.08
    }


@app.post("/api/simulation/outbreak")
def trigger_outbreak_simulation(db: Session = Depends(get_db)):
    """Inject simulated outbreak demand spike in District B."""
    phc17 = db.query(PHCModel).filter(PHCModel.id == "PHC-017").first()
    phc55 = db.query(PHCModel).filter(PHCModel.id == "PHC-055").first()
    if phc17: phc17.status = "CRITICAL"
    if phc55: phc55.status = "CRITICAL"
    
    # Update inventory consumption rates
    inv101 = db.query(StockRecordModel).filter(StockRecordModel.id == "INV-101").first()
    inv102 = db.query(StockRecordModel).filter(StockRecordModel.id == "INV-102").first()
    if inv101:
        inv101.daily_consumption = 105.0
        inv101.days_remaining = 1.1
        inv101.status = "CRITICAL"
    if inv102:
        inv102.daily_consumption = 187.5
        inv102.days_remaining = 0.9
        inv102.status = "CRITICAL"
        
    db.commit()
    return {
        "status": "active",
        "scenario": "Dengue Surge (District B)",
        "affected_phcs": ["PHC-017", "PHC-055"],
        "demand_multiplier": 3.2
    }


@app.post("/api/simulation/reset")
def reset_simulation(db: Session = Depends(get_db)):
    """Reset system to baseline operational state."""
    seed_database()
    return {
        "status": "normal",
        "message": "System baseline restored."
    }

# -----------------------------------------------------------------------------
# WebSocket Telemetry Channel
# -----------------------------------------------------------------------------

@app.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Broadcast simulated periodic heartbeat every 5 seconds
            await asyncio.sleep(5)
            await websocket.send_json({
                "event": "TELEMETRY_HEARTBEAT",
                "timestamp": "Just now",
                "system_status": "NORMAL_OPERATIONS",
                "active_connections": len(manager.active_connections)
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
