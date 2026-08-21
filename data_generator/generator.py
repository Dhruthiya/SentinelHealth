#!/usr/bin/env python3
"""
SentinelHealth — Synthetic Data Generator
Generates realistic Primary Health Centre (PHC) datasets, medicine stock records,
30-day demand time-series with confidence bands, early warning alerts,
SciPy transfer recommendations, and BRICS Federated Learning node metrics.
"""

import os
import csv
import json
import random
import math
from datetime import datetime, timedelta
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

def ensure_data_dir():
    DATA_DIR.mkdir(parents=True, exist_ok=True)

# -----------------------------------------------------------------------------
# Data Definitions & Constants
# -----------------------------------------------------------------------------

DISTRICTS = [
    {"name": "District A (North)", "phcs": ["PHC-009", "PHC-055"]},
    {"name": "District B (East)", "phcs": ["PHC-017", "PHC-042", "PHC-062"]},
    {"name": "District C (South)", "phcs": ["PHC-031"]}
]

PHC_MASTERS = [
    {
        "id": "PHC-017",
        "name": "Primary Health Centre 017 (Rampur)",
        "district": "District B (East)",
        "state": "Uttar Pradesh Node",
        "country": "India",
        "lat": 26.8467,
        "lng": 80.9462,
        "population": 18500,
        "beds_total": 25,
        "beds_occupied": 22,
        "staff_present": 8,
        "staff_scheduled": 10,
        "status": "CRITICAL"
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
        "beds_total": 40,
        "beds_occupied": 18,
        "staff_present": 14,
        "staff_scheduled": 15,
        "status": "HEALTHY"
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
        "beds_total": 50,
        "beds_occupied": 46,
        "staff_present": 18,
        "staff_scheduled": 20,
        "status": "WARNING"
    },
    {
        "id": "PHC-031",
        "name": "Primary Health Centre 031 (Rae Bareli)",
        "district": "District C (South)",
        "state": "Uttar Pradesh Node",
        "country": "India",
        "lat": 26.2300,
        "lng": 81.2400,
        "population": 15000,
        "beds_total": 20,
        "beds_occupied": 11,
        "staff_present": 7,
        "staff_scheduled": 8,
        "status": "HEALTHY"
    },
    {
        "id": "PHC-055",
        "name": "Primary Health Centre 055 (Unnao)",
        "district": "District A (North)",
        "state": "Uttar Pradesh Node",
        "country": "India",
        "lat": 26.5400,
        "lng": 80.4900,
        "population": 22500,
        "beds_total": 30,
        "beds_occupied": 27,
        "staff_present": 11,
        "staff_scheduled": 12,
        "status": "CRITICAL"
    },
    {
        "id": "PHC-062",
        "name": "Primary Health Centre 062 (Hardoi)",
        "district": "District B (East)",
        "state": "Uttar Pradesh Node",
        "country": "India",
        "lat": 27.4000,
        "lng": 80.1300,
        "population": 19800,
        "beds_total": 35,
        "beds_occupied": 19,
        "staff_present": 10,
        "staff_scheduled": 10,
        "status": "HEALTHY"
    }
]

MEDICINES = [
    {"name": "Paracetamol 500mg", "category": "Analgesics & Antipyretics", "default_threshold": 300},
    {"name": "ORS Packets", "category": "Rehydration", "default_threshold": 400},
    {"name": "Amoxicillin 250mg", "category": "Antibiotics", "default_threshold": 250},
    {"name": "Artemether Injection", "category": "Antimalarial", "default_threshold": 100},
    {"name": "IV Saline 500ml", "category": "Fluid Therapy", "default_threshold": 150},
    {"name": "Oral Cholera Vaccine", "category": "Vaccines", "default_threshold": 100}
]

# -----------------------------------------------------------------------------
# Generator Functions
# -----------------------------------------------------------------------------

def generate_phcs_csv():
    filepath = DATA_DIR / "phcs.csv"
    fieldnames = [
        "id", "name", "district", "state", "country", "lat", "lng", 
        "population", "beds_total", "beds_occupied", "staff_present", 
        "staff_scheduled", "status", "last_updated"
    ]

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for phc in PHC_MASTERS:
            phc_copy = dict(phc)
            phc_copy["last_updated"] = f"{random.randint(1, 15)} mins ago"
            writer.writerow(phc_copy)
    
    print(f"✅ Generated {filepath}")

def generate_inventory_csv():
    filepath = DATA_DIR / "inventory.csv"
    fieldnames = [
        "id", "phc_id", "phc_name", "medicine_name", "category", 
        "current_stock", "daily_consumption", "safety_threshold", 
        "days_remaining", "status", "batch_no", "expiry_date"
    ]

    inventory_rows = [
        {
            "id": "INV-101",
            "phc_id": "PHC-017",
            "phc_name": "PHC 017 (Rampur)",
            "medicine_name": "Paracetamol 500mg",
            "category": "Analgesics & Antipyretics",
            "current_stock": 120,
            "daily_consumption": 42,
            "safety_threshold": 300,
            "days_remaining": 2.8,
            "status": "CRITICAL",
            "batch_no": "PCM-2026-08A",
            "expiry_date": "2027-11"
        },
        {
            "id": "INV-102",
            "phc_id": "PHC-017",
            "phc_name": "PHC 017 (Rampur)",
            "medicine_name": "ORS Packets",
            "category": "Rehydration",
            "current_stock": 180,
            "daily_consumption": 75,
            "safety_threshold": 400,
            "days_remaining": 2.4,
            "status": "CRITICAL",
            "batch_no": "ORS-9912B",
            "expiry_date": "2028-04"
        },
        {
            "id": "INV-103",
            "phc_id": "PHC-042",
            "phc_name": "PHC 042 (Sitapur)",
            "medicine_name": "Paracetamol 500mg",
            "category": "Analgesics & Antipyretics",
            "current_stock": 1450,
            "daily_consumption": 35,
            "safety_threshold": 300,
            "days_remaining": 41.4,
            "status": "HEALTHY",
            "batch_no": "PCM-2026-04C",
            "expiry_date": "2027-09"
        },
        {
            "id": "INV-104",
            "phc_id": "PHC-009",
            "phc_name": "PHC 009 (Barabanki)",
            "medicine_name": "Amoxicillin 250mg",
            "category": "Antibiotics",
            "current_stock": 290,
            "daily_consumption": 55,
            "safety_threshold": 250,
            "days_remaining": 5.2,
            "status": "WARNING",
            "batch_no": "AMX-4410X",
            "expiry_date": "2026-12"
        },
        {
            "id": "INV-105",
            "phc_id": "PHC-055",
            "phc_name": "PHC 055 (Unnao)",
            "medicine_name": "Artemether Injection",
            "category": "Antimalarial",
            "current_stock": 45,
            "daily_consumption": 18,
            "safety_threshold": 100,
            "days_remaining": 2.5,
            "status": "CRITICAL",
            "batch_no": "ART-8821Z",
            "expiry_date": "2027-05"
        },
        {
            "id": "INV-106",
            "phc_id": "PHC-055",
            "phc_name": "PHC 055 (Unnao)",
            "medicine_name": "IV Saline 500ml",
            "category": "Fluid Therapy",
            "current_stock": 90,
            "daily_consumption": 32,
            "safety_threshold": 150,
            "days_remaining": 2.8,
            "status": "CRITICAL",
            "batch_no": "SAL-1102A",
            "expiry_date": "2028-01"
        },
        {
            "id": "INV-107",
            "phc_id": "PHC-031",
            "phc_name": "PHC 031 (Rae Bareli)",
            "medicine_name": "Oral Cholera Vaccine",
            "category": "Vaccines",
            "current_stock": 600,
            "daily_consumption": 15,
            "safety_threshold": 100,
            "days_remaining": 40.0,
            "status": "HEALTHY",
            "batch_no": "OCV-5541K",
            "expiry_date": "2026-10"
        },
        {
            "id": "INV-108",
            "phc_id": "PHC-062",
            "phc_name": "PHC 062 (Hardoi)",
            "medicine_name": "ORS Packets",
            "category": "Rehydration",
            "current_stock": 820,
            "daily_consumption": 25,
            "safety_threshold": 200,
            "days_remaining": 32.8,
            "status": "HEALTHY",
            "batch_no": "ORS-7711A",
            "expiry_date": "2027-08"
        }
    ]

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in inventory_rows:
            writer.writerow(row)
    
    print(f"✅ Generated {filepath}")

def generate_demand_timeseries_csv():
    filepath = DATA_DIR / "demand_timeseries.csv"
    fieldnames = [
        "date", "phc_id", "medicine_name", "actual_demand", 
        "predicted_demand", "ci_upper", "ci_lower", "safety_stock"
    ]

    base_date = datetime(2026, 8, 8)
    rows = []

    # 13 Historical Days (Aug 08 to Aug 20)
    base_demand = 35
    for i in range(13):
        dt_str = (base_date + timedelta(days=i)).strftime("%b %d")
        demand_val = base_demand + (i * 4.5) + random.uniform(-3, 3)
        rows.append({
            "date": dt_str,
            "phc_id": "PHC-017",
            "medicine_name": "ORS Packets",
            "actual_demand": round(demand_val, 1),
            "predicted_demand": "",
            "ci_upper": "",
            "ci_lower": "",
            "safety_stock": 25
        })

    # Today (Aug 20) - Transition
    rows.append({
        "date": "Aug 20",
        "phc_id": "PHC-017",
        "medicine_name": "ORS Packets",
        "actual_demand": 95.0,
        "predicted_demand": 95.0,
        "ci_upper": 95.0,
        "ci_lower": 95.0,
        "safety_stock": 25
    })

    # 10 Forecast Days (Aug 21 to Aug 30)
    forecast_values = [102, 108, 115, 122, 120, 112, 105, 98, 90, 82]
    for i, pred in enumerate(forecast_values):
        dt_str = (base_date + timedelta(days=13 + i + 1)).strftime("%b %d")
        if i == 0:
            dt_str += " (Today)"
        
        ci_upper = round(pred * 1.12, 1)
        ci_lower = round(pred * 0.88, 1)
        rows.append({
            "date": dt_str,
            "phc_id": "PHC-017",
            "medicine_name": "ORS Packets",
            "actual_demand": "",
            "predicted_demand": pred,
            "ci_upper": ci_upper,
            "ci_lower": ci_lower,
            "safety_stock": 25
        })

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)
    
    print(f"✅ Generated {filepath}")

def generate_alerts_csv():
    filepath = DATA_DIR / "alerts.csv"
    fieldnames = [
        "id", "phc_id", "phc_name", "medicine_name", "severity", 
        "type", "days_to_stockout", "predicted_date", "message", 
        "created_at", "acknowledged"
    ]

    alerts_rows = [
        {
            "id": "ALT-801",
            "phc_id": "PHC-017",
            "phc_name": "PHC 017 (Rampur)",
            "medicine_name": "ORS Packets",
            "severity": "CRITICAL",
            "type": "FORECAST_STOCKOUT",
            "days_to_stockout": 2,
            "predicted_date": "2026-08-23",
            "message": "Predicted stock-out in 2.4 days due to 3.2x consumption spike (Dengue Outbreak cluster).",
            "created_at": "12 mins ago",
            "acknowledged": False
        },
        {
            "id": "ALT-802",
            "phc_id": "PHC-055",
            "phc_name": "PHC 055 (Unnao)",
            "medicine_name": "Artemether Injection",
            "severity": "CRITICAL",
            "type": "SAFETY_THRESHOLD_BREACH",
            "days_to_stockout": 2,
            "predicted_date": "2026-08-23",
            "message": "Current stock (45 units) fallen below safety threshold (100 units). Severe Malaria cases detected.",
            "created_at": "25 mins ago",
            "acknowledged": False
        },
        {
            "id": "ALT-803",
            "phc_id": "PHC-017",
            "phc_name": "PHC 017 (Rampur)",
            "medicine_name": "Paracetamol 500mg",
            "severity": "CRITICAL",
            "type": "FORECAST_STOCKOUT",
            "days_to_stockout": 3,
            "predicted_date": "2026-08-24",
            "message": "Predicted stock-out in 2.8 days. Urgent cross-district transfer recommended.",
            "created_at": "40 mins ago",
            "acknowledged": False
        },
        {
            "id": "ALT-804",
            "phc_id": "PHC-009",
            "phc_name": "PHC 009 (Barabanki)",
            "medicine_name": "Amoxicillin 250mg",
            "severity": "WARNING",
            "type": "DEMAND_ANOMALY",
            "days_to_stockout": 5,
            "predicted_date": "2026-08-26",
            "message": "Abnormal consumption rate (+45% week-over-week). Respiratory infection surge.",
            "created_at": "1 hour ago",
            "acknowledged": True
        },
        {
            "id": "ALT-805",
            "phc_id": "PHC-055",
            "phc_name": "PHC 055 (Unnao)",
            "medicine_name": "IV Saline 500ml",
            "severity": "WARNING",
            "type": "FORECAST_STOCKOUT",
            "days_to_stockout": 3,
            "predicted_date": "2026-08-24",
            "message": "Stock projected to breach minimum safety buffer within 72 hours.",
            "created_at": "2 hours ago",
            "acknowledged": False
        }
    ]

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in alerts_rows:
            writer.writerow(row)
    
    print(f"✅ Generated {filepath}")

def generate_transfers_csv():
    filepath = DATA_DIR / "transfers.csv"
    fieldnames = [
        "id", "medicine_name", "source_phc_id", "source_phc_name", 
        "source_surplus", "dest_phc_id", "dest_phc_name", "dest_shortage_days", 
        "quantity", "priority", "urgency_score", "distance_km", "est_time_mins", 
        "impact_message", "scipy_score", "status"
    ]

    transfers_rows = [
        {
            "id": "TRF-301",
            "medicine_name": "Paracetamol 500mg",
            "source_phc_id": "PHC-042",
            "source_phc_name": "PHC 042 (Sitapur)",
            "source_surplus": 850,
            "dest_phc_id": "PHC-017",
            "dest_phc_name": "PHC 017 (Rampur)",
            "dest_shortage_days": 2.8,
            "quantity": 400,
            "priority": "CRITICAL",
            "urgency_score": 96,
            "distance_km": 24.5,
            "est_time_mins": 38,
            "impact_message": "Extends PHC 017 stock coverage by +9.5 days",
            "scipy_score": "Linear Program Optimal (0.002s)",
            "status": "PENDING"
        },
        {
            "id": "TRF-302",
            "medicine_name": "ORS Packets",
            "source_phc_id": "PHC-062",
            "source_phc_name": "PHC 062 (Hardoi)",
            "source_surplus": 520,
            "dest_phc_id": "PHC-017",
            "dest_phc_name": "PHC 017 (Rampur)",
            "dest_shortage_days": 2.4,
            "quantity": 350,
            "priority": "CRITICAL",
            "urgency_score": 94,
            "distance_km": 31.2,
            "est_time_mins": 45,
            "impact_message": "Prevents total stock-out during outbreak peak",
            "scipy_score": "Linear Program Optimal (0.003s)",
            "status": "PENDING"
        },
        {
            "id": "TRF-303",
            "medicine_name": "Artemether Injection",
            "source_phc_id": "PHC-031",
            "source_phc_name": "PHC 031 (Rae Bareli)",
            "source_surplus": 220,
            "dest_phc_id": "PHC-055",
            "dest_phc_name": "PHC 055 (Unnao)",
            "dest_shortage_days": 2.5,
            "quantity": 120,
            "priority": "HIGH",
            "urgency_score": 88,
            "distance_km": 42.0,
            "est_time_mins": 55,
            "impact_message": "Restores Artemether stock to +6.6 days safety level",
            "scipy_score": "Linear Program Optimal (0.001s)",
            "status": "PENDING"
        }
    ]

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in transfers_rows:
            writer.writerow(row)
    
    print(f"✅ Generated {filepath}")

def generate_fl_nodes_csv():
    filepath = DATA_DIR / "fl_nodes.csv"
    fieldnames = [
        "id", "country", "flag", "node_name", "phc_count", 
        "records_trained", "local_loss", "privacy_status", "status", "round_status"
    ]

    fl_rows = [
        {
            "id": "NODE-IND",
            "country": "India",
            "flag": "🇮🇳",
            "node_name": "AIIMS Delhi / UP State Health Node",
            "phc_count": 142,
            "records_trained": "1,240,500",
            "local_loss": 0.0412,
            "privacy_status": "100% Local Data Preserved",
            "status": "ONLINE",
            "round_status": "Local Model Ready"
        },
        {
            "id": "NODE-BRA",
            "country": "Brazil",
            "flag": "🇧🇷",
            "node_name": "Fiocruz Rio / SUS Network Node",
            "phc_count": 98,
            "records_trained": "890,200",
            "local_loss": 0.0485,
            "privacy_status": "100% Local Data Preserved",
            "status": "ONLINE",
            "round_status": "Local Model Ready"
        },
        {
            "id": "NODE-ZAF",
            "country": "South Africa",
            "flag": "🇿🇦",
            "node_name": "SAMRC Cape Town / National Node",
            "phc_count": 76,
            "records_trained": "610,000",
            "local_loss": 0.0512,
            "privacy_status": "100% Local Data Preserved",
            "status": "ONLINE",
            "round_status": "Local Model Ready"
        }
    ]

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in fl_rows:
            writer.writerow(row)
    
    print(f"✅ Generated {filepath}")

def main():
    ensure_data_dir()
    print("🚀 SentinelHealth Data Generator Starting...")
    generate_phcs_csv()
    generate_inventory_csv()
    generate_demand_timeseries_csv()
    generate_alerts_csv()
    generate_transfers_csv()
    generate_fl_nodes_csv()
    print("🎉 All 6 Module 1 synthetic CSV datasets generated successfully in data/")

if __name__ == "__main__":
    main()
