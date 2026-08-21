from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database.database import Base

class PHCModel(Base):
    __tablename__ = "phcs"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    district = Column(String, nullable=False, index=True)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False, default="India")
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    population = Column(Integer, nullable=False)
    beds_total = Column(Integer, nullable=False)
    beds_occupied = Column(Integer, nullable=False)
    staff_present = Column(Integer, nullable=False)
    staff_scheduled = Column(Integer, nullable=False)
    status = Column(String, nullable=False, default="HEALTHY", index=True) # CRITICAL, WARNING, HEALTHY
    last_updated = Column(String, nullable=False, default="Just now")

    # Relationships
    stock_records = relationship("StockRecordModel", back_populates="phc", cascade="all, delete-orphan")
    alerts = relationship("AlertModel", back_populates="phc", cascade="all, delete-orphan")


class MedicineModel(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False, unique=True, index=True)
    category = Column(String, nullable=False, index=True)
    safety_stock_threshold = Column(Integer, nullable=False, default=100)


class StockRecordModel(Base):
    __tablename__ = "stock_records"

    id = Column(String, primary_key=True, index=True)
    phc_id = Column(String, ForeignKey("phcs.id"), nullable=False, index=True)
    phc_name = Column(String, nullable=False)
    medicine_name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False)
    current_stock = Column(Integer, nullable=False)
    daily_consumption = Column(Float, nullable=False)
    safety_threshold = Column(Integer, nullable=False)
    days_remaining = Column(Float, nullable=False)
    status = Column(String, nullable=False, index=True) # CRITICAL, WARNING, HEALTHY
    batch_no = Column(String, nullable=False)
    expiry_date = Column(String, nullable=False)

    phc = relationship("PHCModel", back_populates="stock_records")


class ForecastResultModel(Base):
    __tablename__ = "forecast_results"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(String, nullable=False, index=True)
    phc_id = Column(String, nullable=False, index=True)
    medicine_name = Column(String, nullable=False, index=True)
    actual_demand = Column(Float, nullable=True)
    predicted_demand = Column(Float, nullable=True)
    ci_upper = Column(Float, nullable=True)
    ci_lower = Column(Float, nullable=True)
    safety_stock = Column(Float, nullable=False, default=25.0)


class AlertModel(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)
    phc_id = Column(String, ForeignKey("phcs.id"), nullable=False, index=True)
    phc_name = Column(String, nullable=False)
    medicine_name = Column(String, nullable=False, index=True)
    severity = Column(String, nullable=False, index=True) # CRITICAL, WARNING
    type = Column(String, nullable=False, index=True) # FORECAST_STOCKOUT, SAFETY_THRESHOLD_BREACH, DEMAND_ANOMALY
    days_to_stockout = Column(Integer, nullable=False)
    predicted_date = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(String, nullable=False)
    acknowledged = Column(Boolean, nullable=False, default=False)

    phc = relationship("PHCModel", back_populates="alerts")


class RedistributionRecommendationModel(Base):
    __tablename__ = "redistribution_recommendations"

    id = Column(String, primary_key=True, index=True)
    medicine_name = Column(String, nullable=False, index=True)
    source_phc_id = Column(String, nullable=False)
    source_phc_name = Column(String, nullable=False)
    source_surplus = Column(Integer, nullable=False)
    dest_phc_id = Column(String, nullable=False)
    dest_phc_name = Column(String, nullable=False)
    dest_shortage_days = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    priority = Column(String, nullable=False, index=True) # CRITICAL, HIGH
    urgency_score = Column(Integer, nullable=False)
    distance_km = Column(Float, nullable=False)
    est_time_mins = Column(Integer, nullable=False)
    impact_message = Column(Text, nullable=False)
    scipy_score = Column(String, nullable=False)
    status = Column(String, nullable=False, default="PENDING", index=True) # PENDING, APPROVED, REJECTED


class FLRoundModel(Base):
    __tablename__ = "fl_nodes"

    id = Column(String, primary_key=True, index=True)
    country = Column(String, nullable=False)
    flag = Column(String, nullable=False)
    node_name = Column(String, nullable=False)
    phc_count = Column(Integer, nullable=False)
    records_trained = Column(String, nullable=False)
    local_loss = Column(Float, nullable=False)
    privacy_status = Column(String, nullable=False)
    status = Column(String, nullable=False, default="ONLINE")
    round_status = Column(String, nullable=False, default="Local Model Ready")
