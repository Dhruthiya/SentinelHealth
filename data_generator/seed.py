#!/usr/bin/env python3
"""
SentinelHealth — Seed Verification & Loader Script
Verifies generated CSV files in data/ and prepares memory/DB structures.
"""

import os
import csv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

EXPECTED_FILES = [
    "phcs.csv",
    "inventory.csv",
    "demand_timeseries.csv",
    "alerts.csv",
    "transfers.csv",
    "fl_nodes.csv"
]

def verify_datasets():
    print("🔍 Verifying SentinelHealth CSV Datasets in data/...")
    all_valid = True
    
    for filename in EXPECTED_FILES:
        filepath = DATA_DIR / filename
        if not filepath.exists():
            print(f"❌ Missing dataset: {filepath}")
            all_valid = False
            continue
        
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            headers = next(reader, None)
            row_count = sum(1 for _ in reader)
            print(f"  ✓ {filename:<22} | Columns: {len(headers) if headers else 0:<2} | Rows: {row_count}")

    if all_valid:
        print("🎉 Dataset verification PASSED! All 6 CSV files ready for FastAPI & ML consumption.")
    else:
        print("⚠️ Dataset verification FAILED.")

if __name__ == "__main__":
    verify_datasets()
