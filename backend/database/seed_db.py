#!/usr/bin/env python3
"""
SentinelHealth — Database Seeder Script
Reads synthetic CSV datasets from data/ and populates SQLAlchemy database.
"""

import sys
import csv
from pathlib import Path

# Add project root to path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.database.database import engine, SessionLocal, Base
from backend.database.models import (
    PHCModel,
    MedicineModel,
    StockRecordModel,
    ForecastResultModel,
    AlertModel,
    RedistributionRecommendationModel,
    FLRoundModel
)

DATA_DIR = BASE_DIR / "data"

def init_db():
    print("🛠️ Creating SQLAlchemy Database Tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully.")

def seed_phcs(db):
    filepath = DATA_DIR / "phcs.csv"
    if not filepath.exists():
        print(f"⚠️ {filepath} not found.")
        return

    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            phc = PHCModel(
                id=row["id"],
                name=row["name"],
                district=row["district"],
                state=row["state"],
                country=row["country"],
                lat=float(row["lat"]),
                lng=float(row["lng"]),
                population=int(row["population"]),
                beds_total=int(row["beds_total"]),
                beds_occupied=int(row["beds_occupied"]),
                staff_present=int(row["staff_present"]),
                staff_scheduled=int(row["staff_scheduled"]),
                status=row["status"],
                last_updated=row["last_updated"]
            )
            db.add(phc)
    db.commit()
    print("✅ Seeded PHCs")

def seed_inventory(db):
    filepath = DATA_DIR / "inventory.csv"
    if not filepath.exists():
        return

    medicines_seen = set()

    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Seed medicine catalog item if new
            med_name = row["medicine_name"]
            if med_name not in medicines_seen:
                med = MedicineModel(
                    name=med_name,
                    category=row["category"],
                    safety_stock_threshold=int(row["safety_threshold"])
                )
                db.add(med)
                medicines_seen.add(med_name)

            stock = StockRecordModel(
                id=row["id"],
                phc_id=row["phc_id"],
                phc_name=row["phc_name"],
                medicine_name=row["medicine_name"],
                category=row["category"],
                current_stock=int(row["current_stock"]),
                daily_consumption=float(row["daily_consumption"]),
                safety_threshold=int(row["safety_threshold"]),
                days_remaining=float(row["days_remaining"]),
                status=row["status"],
                batch_no=row["batch_no"],
                expiry_date=row["expiry_date"]
            )
            db.add(stock)
    db.commit()
    print("✅ Seeded Inventory & Medicine catalog")

def seed_forecasts(db):
    filepath = DATA_DIR / "demand_timeseries.csv"
    if not filepath.exists():
        return

    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            fc = ForecastResultModel(
                date=row["date"],
                phc_id=row["phc_id"],
                medicine_name=row["medicine_name"],
                actual_demand=float(row["actual_demand"]) if row["actual_demand"] != "" else None,
                predicted_demand=float(row["predicted_demand"]) if row["predicted_demand"] != "" else None,
                ci_upper=float(row["ci_upper"]) if row["ci_upper"] != "" else None,
                ci_lower=float(row["ci_lower"]) if row["ci_lower"] != "" else None,
                safety_stock=float(row["safety_stock"]) if row["safety_stock"] != "" else 25.0
            )
            db.add(fc)
    db.commit()
    print("✅ Seeded Forecast Time-Series")

def seed_alerts(db):
    filepath = DATA_DIR / "alerts.csv"
    if not filepath.exists():
        return

    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            alert = AlertModel(
                id=row["id"],
                phc_id=row["phc_id"],
                phc_name=row["phc_name"],
                medicine_name=row["medicine_name"],
                severity=row["severity"],
                type=row["type"],
                days_to_stockout=int(row["days_to_stockout"]),
                predicted_date=row["predicted_date"],
                message=row["message"],
                created_at=row["created_at"],
                acknowledged=row["acknowledged"].lower() in ("true", "1", "t")
            )
            db.add(alert)
    db.commit()
    print("✅ Seeded Alerts")

def seed_transfers(db):
    filepath = DATA_DIR / "transfers.csv"
    if not filepath.exists():
        return

    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            trf = RedistributionRecommendationModel(
                id=row["id"],
                medicine_name=row["medicine_name"],
                source_phc_id=row["source_phc_id"],
                source_phc_name=row["source_phc_name"],
                source_surplus=int(row["source_surplus"]),
                dest_phc_id=row["dest_phc_id"],
                dest_phc_name=row["dest_phc_name"],
                dest_shortage_days=float(row["dest_shortage_days"]),
                quantity=int(row["quantity"]),
                priority=row["priority"],
                urgency_score=int(row["urgency_score"]),
                distance_km=float(row["distance_km"]),
                est_time_mins=int(row["est_time_mins"]),
                impact_message=row["impact_message"],
                scipy_score=row["scipy_score"],
                status=row["status"]
            )
            db.add(trf)
    db.commit()
    print("✅ Seeded Transfers")

def seed_fl_nodes(db):
    filepath = DATA_DIR / "fl_nodes.csv"
    if not filepath.exists():
        return

    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            node = FLRoundModel(
                id=row["id"],
                country=row["country"],
                flag=row["flag"],
                node_name=row["node_name"],
                phc_count=int(row["phc_count"]),
                records_trained=row["records_trained"],
                local_loss=float(row["local_loss"]),
                privacy_status=row["privacy_status"],
                status=row["status"],
                round_status=row["round_status"]
            )
            db.add(node)
    db.commit()
    print("✅ Seeded FL Nodes")

def main():
    print("🚀 Seeding Database from Module 1 Datasets...")
    init_db()
    db = SessionLocal()
    try:
        seed_phcs(db)
        seed_inventory(db)
        seed_forecasts(db)
        seed_alerts(db)
        seed_transfers(db)
        seed_fl_nodes(db)
        print("🎉 Database seeding completed successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    main()
