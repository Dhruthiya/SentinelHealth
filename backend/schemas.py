from pydantic import BaseModel, Field
from typing import List, Optional

# PHC Schemas
class PHCBase(BaseModel):
    id: str
    name: str
    district: str
    state: str
    country: str = "India"
    lat: float
    lng: float
    population: int
    beds_total: int
    beds_occupied: int
    staff_present: int
    staff_scheduled: int
    status: str
    last_updated: str

    class Config:
        from_attributes = True

# Stock Inventory Schemas
class StockRecordBase(BaseModel):
    id: str
    phc_id: str
    phc_name: str
    medicine_name: str
    category: str
    current_stock: int
    daily_consumption: float
    safety_threshold: int
    days_remaining: float
    status: str
    batch_no: str
    expiry_date: str

    class Config:
        from_attributes = True

# Forecast Schemas
class ForecastPoint(BaseModel):
    date: str
    phc_id: str
    medicine_name: str
    actual_demand: Optional[float] = None
    predicted_demand: Optional[float] = None
    ci_upper: Optional[float] = None
    ci_lower: Optional[float] = None
    safety_stock: float = 25.0

    class Config:
        from_attributes = True

# Alert Schemas
class AlertBase(BaseModel):
    id: str
    phc_id: str
    phc_name: str
    medicine_name: str
    severity: str
    type: str
    days_to_stockout: int
    predicted_date: str
    message: str
    created_at: str
    acknowledged: bool

    class Config:
        from_attributes = True

# Transfer Schemas
class TransferBase(BaseModel):
    id: str
    medicine_name: str
    source_phc_id: str
    source_phc_name: str
    source_surplus: int
    dest_phc_id: str
    dest_phc_name: str
    dest_shortage_days: float
    quantity: int
    priority: str
    urgency_score: int
    distance_km: float
    est_time_mins: int
    impact_message: str
    scipy_score: str
    status: str

    class Config:
        from_attributes = True

# FL Node Schemas
class FLNodeBase(BaseModel):
    id: str
    country: str
    flag: str
    node_name: str
    phc_count: int
    records_trained: str
    local_loss: float
    privacy_status: str
    status: str
    round_status: str

    class Config:
        from_attributes = True

class HealthCheckResponse(BaseModel):
    status: str
    database: str
    version: str = "1.0.0"
