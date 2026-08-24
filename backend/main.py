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
from backend.ml.forecasting import DemandForecaster
from backend.ml.alerts_engine import EarlyWarningEngine, calculate_days_to_stockout
from backend.ml.redistribution import RedistributionOptimizer
from backend.ml.outbreak_simulator import OutbreakSimulator
from fl_simulation.server import FederatedServer
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
def get_forecast(phc_id: str, medicine_name: str, horizon: int = Query(14, description="Forecast horizon in days"), db: Session = Depends(get_db)):
    """Retrieve historical & predictive demand time series calculated dynamically using DemandForecaster ML engine."""
    results = db.query(ForecastResultModel).filter(
        ForecastResultModel.phc_id == phc_id,
        ForecastResultModel.medicine_name == medicine_name
    ).all()
    
    # Fallback if specific combo not found in initial dataset
    if not results:
        results = db.query(ForecastResultModel).filter(
            ForecastResultModel.phc_id == "PHC-017"
        ).all()

    # Extract historical actual consumption series
    actual_history = [r.actual_demand for r in results if r.actual_demand is not None]
    
    if len(actual_history) > 0:
        forecaster = DemandForecaster()
        forecast_res = forecaster.fit_predict(actual_history, horizon_days=min(30, horizon))
        
        # Attach metric headers if needed
        # Overwrite forecast predictions with ML model output
        forecast_idx = 0
        for r in results:
            if r.predicted_demand is not None and forecast_idx < len(forecast_res["predictions"]):
                r.predicted_demand = forecast_res["predictions"][forecast_idx]
                r.ci_upper = forecast_res["ci_upper"][forecast_idx]
                r.ci_lower = forecast_res["ci_lower"][forecast_idx]
                forecast_idx += 1
        
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
    """Simulate execution of a Flower FedAvg aggregation round across BRICS nodes."""
    server = FederatedServer()
    res = server.run_fl_round()

    nodes = db.query(FLRoundModel).all()
    for node in nodes:
        node.local_loss = max(0.02, round(node.local_loss * 0.94, 4))
        node.round_status = f"FedAvg Round #{res['round_number']} Completed"
    db.commit()

    return {
        "status": "success",
        "round_number": res["round_number"],
        "global_mae": res["aggregated_global_mae"],
        "privacy_guarantee": res["privacy_guarantee"]
    }


@app.post("/api/simulation/outbreak")
def trigger_outbreak_simulation(
    scenario: str = Query("DENGUE_DISTRICT_B", description="Scenario type (DENGUE_DISTRICT_B, CHOLERA_DISTRICT_A, LOGISTICS_DISRUPTION)"),
    db: Session = Depends(get_db)
):
    """Inject simulated outbreak demand spike, trigger alerts, and run SciPy optimization."""
    simulator = OutbreakSimulator()
    res = simulator.inject_outbreak_scenario(db, scenario_type=scenario)
    return res


@app.post("/api/simulation/reset")
def reset_simulation(db: Session = Depends(get_db)):
    """Reset system to baseline operational state."""
    simulator = OutbreakSimulator()
    res = simulator.reset_baseline_scenario(db)
    return res

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
