import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json

# Create a simple FastAPI app for Vercel deployment
app = FastAPI(
    title="SentinelHealth API",
    description="Federated AI Platform for Health Resource & Supply Chain Resilience API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data models
class PHC(BaseModel):
    id: str
    name: str
    district: str
    state: str
    country: str
    lat: float
    lng: float
    population: int
    bedsTotal: int
    bedsOccupied: int
    staffPresent: int
    staffScheduled: int
    status: str
    criticalMedicines: List[str]
    lastUpdated: str
    patientFootfall: int
    patientFootfallTrend: str
    forecastedFootfall: int

class Alert(BaseModel):
    id: str
    phcId: str
    phcName: str
    medicineName: str
    severity: str
    type: str
    daysToStockout: int
    predictedDate: str
    message: str
    createdAt: str
    acknowledged: bool

class Transfer(BaseModel):
    id: str
    medicineName: str
    sourcePhcId: str
    sourcePhcName: str
    sourceSurplus: int
    destPhcId: str
    destPhcName: str
    destShortageDays: float
    quantity: int
    priority: str
    urgencyScore: int
    distanceKm: float
    estTimeMins: int
    impactMessage: str
    scipyOptimizationScore: str
    status: str

class FLNode(BaseModel):
    id: str
    country: str
    flag: str
    nodeName: str
    phcCount: int
    recordsTrained: str
    localLoss: float
    privacyStatus: str
    status: str
    roundStatus: str

class HealthCheck(BaseModel):
    status: str
    database: str
    version: str

# Mock data
MOCK_PHCS = [
    {
        "id": "PHC-017",
        "name": "Primary Health Centre 017 (Rampur)",
        "district": "District B (East)",
        "state": "Uttar Pradesh Node",
        "country": "India",
        "lat": 26.8467,
        "lng": 80.9462,
        "population": 18500,
        "bedsTotal": 25,
        "bedsOccupied": 22,
        "staffPresent": 8,
        "staffScheduled": 10,
        "status": "CRITICAL",
        "criticalMedicines": ["Paracetamol 500mg", "ORS Packets"],
        "lastUpdated": "10 mins ago",
        "patientFootfall": 145,
        "patientFootfallTrend": "+27%",
        "forecastedFootfall": 184
    },
    {
        "id": "PHC-042",
        "name": "Primary Health Centre 042 (Sitapur)",
        "district": "District B (East)",
        "state": "Uttar Pradesh Node",
        "country": "India",
        "lat": 27.5667,
        "lng": 80.6833,
        "population": 24000,
        "bedsTotal": 40,
        "bedsOccupied": 18,
        "staffPresent": 14,
        "staffScheduled": 15,
        "status": "HEALTHY",
        "criticalMedicines": [],
        "lastUpdated": "4 mins ago",
        "patientFootfall": 89,
        "patientFootfallTrend": "+5%",
        "forecastedFootfall": 94
    },
    {
        "id": "PHC-009",
        "name": "Primary Health Centre 009 (Barabanki)",
        "district": "District A (North)",
        "state": "Uttar Pradesh Node",
        "country": "India",
        "lat": 26.9200,
        "lng": 81.1800,
        "population": 31000,
        "bedsTotal": 50,
        "bedsOccupied": 46,
        "staffPresent": 18,
        "staffScheduled": 20,
        "status": "WARNING",
        "criticalMedicines": ["Amoxicillin 250mg"],
        "lastUpdated": "2 mins ago",
        "patientFootfall": 178,
        "patientFootfallTrend": "+12%",
        "forecastedFootfall": 199
    }
]

MOCK_ALERTS = [
    {
        "id": "ALT-801",
        "phcId": "PHC-017",
        "phcName": "PHC 017 (Rampur)",
        "medicineName": "ORS Packets",
        "severity": "CRITICAL",
        "type": "FORECAST_STOCKOUT",
        "daysToStockout": 2,
        "predictedDate": "2026-08-23",
        "message": "Predicted stock-out in 2.4 days due to 3.2x consumption spike (Dengue Outbreak cluster).",
        "createdAt": "12 mins ago",
        "acknowledged": False
    },
    {
        "id": "ALT-802",
        "phcId": "PHC-009",
        "phcName": "PHC 009 (Barabanki)",
        "medicineName": "Amoxicillin 250mg",
        "severity": "WARNING",
        "type": "DEMAND_ANOMALY",
        "daysToStockout": 5,
        "predictedDate": "2026-08-26",
        "message": "Abnormal consumption rate (+45% week-over-week). Respiratory infection surge.",
        "createdAt": "1 hour ago",
        "acknowledged": True
    }
]

MOCK_TRANSFERS = [
    {
        "id": "TRF-301",
        "medicineName": "Paracetamol 500mg",
        "sourcePhcId": "PHC-042",
        "sourcePhcName": "PHC 042 (Sitapur)",
        "sourceSurplus": 850,
        "destPhcId": "PHC-017",
        "destPhcName": "PHC 017 (Rampur)",
        "destShortageDays": 2.8,
        "quantity": 400,
        "priority": "CRITICAL",
        "urgencyScore": 96,
        "distanceKm": 24.5,
        "estTimeMins": 38,
        "impactMessage": "Extends PHC 017 stock coverage by +9.5 days",
        "scipyOptimizationScore": "Linear Program Optimal (0.002s)",
        "status": "PENDING"
    }
]

MOCK_FL_NODES = [
    {
        "id": "NODE-IND",
        "country": "India",
        "flag": "🇮🇳",
        "nodeName": "AIIMS Delhi / UP State Health Node",
        "phcCount": 142,
        "recordsTrained": "1,240,500",
        "localLoss": 0.0412,
        "privacyStatus": "100% Local Data Preserved",
        "status": "ONLINE",
        "roundStatus": "Local Model Ready"
    },
    {
        "id": "NODE-BRA",
        "country": "Brazil",
        "flag": "🇧🇷",
        "nodeName": "Fiocruz Rio / SUS Network Node",
        "phcCount": 98,
        "recordsTrained": "890,200",
        "localLoss": 0.0485,
        "privacyStatus": "100% Local Data Preserved",
        "status": "ONLINE",
        "roundStatus": "Local Model Ready"
    },
    {
        "id": "NODE-ZAF",
        "country": "South Africa",
        "flag": "🇿🇦",
        "nodeName": "SAMRC Cape Town / National Node",
        "phcCount": 76,
        "recordsTrained": "610,000",
        "localLoss": 0.0512,
        "privacyStatus": "100% Local Data Preserved",
        "status": "ONLINE",
        "roundStatus": "Local Model Ready"
    }
]

# API Endpoints
@app.get("/api/health", response_model=HealthCheck)
def health_check():
    """Backend health check."""
    return {
        "status": "healthy",
        "database": "mock data (Vercel deployment)",
        "version": "1.0.0"
    }

@app.get("/api/phcs", response_model=List[PHC])
def get_phcs(
    district: Optional[str] = None,
    status: Optional[str] = None
):
    """Retrieve PHCs with optional filtering."""
    phcs = MOCK_PHCS.copy()
    if district and district != "ALL":
        phcs = [p for p in phcs if p["district"] == district]
    if status and status != "ALL":
        phcs = [p for p in phcs if p["status"] == status]
    return phcs

@app.get("/api/phcs/{phc_id}", response_model=PHC)
def get_phc_by_id(phc_id: str):
    """Retrieve single PHC details."""
    phc = next((p for p in MOCK_PHCS if p["id"] == phc_id), None)
    if not phc:
        raise HTTPException(status_code=404, detail=f"PHC '{phc_id}' not found")
    return phc

@app.get("/api/alerts", response_model=List[Alert])
def get_alerts(severity: Optional[str] = None):
    """Retrieve alerts."""
    alerts = MOCK_ALERTS.copy()
    if severity and severity != "ALL":
        alerts = [a for a in alerts if a["severity"] == severity]
    return alerts

@app.post("/api/alerts/{alert_id}/acknowledge", response_model=Alert)
def acknowledge_alert(alert_id: str):
    """Acknowledge an alert."""
    alert = next((a for a in MOCK_ALERTS if a["id"] == alert_id), None)
    if not alert:
        raise HTTPException(status_code=404, detail=f"Alert '{alert_id}' not found")
    alert["acknowledged"] = True
    return alert

@app.get("/api/redistribution/recommendations", response_model=List[Transfer])
def get_redistribution_recommendations():
    """Retrieve transfer recommendations."""
    return MOCK_TRANSFERS

@app.post("/api/redistribution/{transfer_id}/approve", response_model=Transfer)
def approve_transfer(transfer_id: str):
    """Approve a transfer recommendation."""
    transfer = next((t for t in MOCK_TRANSFERS if t["id"] == transfer_id), None)
    if not transfer:
        raise HTTPException(status_code=404, detail=f"Transfer '{transfer_id}' not found")
    transfer["status"] = "APPROVED"
    return transfer

@app.get("/api/fl/status", response_model=List[FLNode])
def get_fl_status():
    """Retrieve FL status."""
    return MOCK_FL_NODES

@app.post("/api/fl/round")
def trigger_fl_round():
    """Trigger FL round."""
    return {
        "status": "success",
        "round_number": 15,
        "global_mae": 4.12,
        "privacy_guarantee": "100% Local Data Preserved"
    }

@app.post("/api/simulation/outbreak")
def trigger_outbreak_simulation(scenario: str = "DENGUE_DISTRICT_B"):
    """Trigger outbreak simulation."""
    return {
        "status": "success",
        "scenario": scenario,
        "message": "Outbreak simulation injected successfully"
    }

@app.post("/api/simulation/reset")
def reset_simulation():
    """Reset simulation."""
    return {
        "status": "success",
        "message": "Simulation reset to baseline"
    }

# Vercel serverless handler
from mangum import Mangum
handler = Mangum(app)

# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)