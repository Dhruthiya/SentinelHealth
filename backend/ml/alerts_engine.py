#!/usr/bin/env python3
"""
SentinelHealth — Early Warning & Stock-Out Risk Engine
Calculates days-to-stockout lead times, detects demand anomalies via Z-score,
and classifies early warning alerts into CRITICAL / WARNING severity rankings.
"""

import math
import numpy as np
from typing import List, Dict, Tuple, Any, Optional
from datetime import datetime, timedelta

def calculate_days_to_stockout(
    current_stock: float, 
    predicted_daily_demand: float, 
    safety_threshold: float = 0.0, 
    replenishment: float = 0.0
) -> float:
    """
    Calculates remaining autonomy days until stock-out:
    Days = (Current Stock + Replenishment - Safety Threshold) / Predicted Daily Demand
    """
    if predicted_daily_demand <= 0:
        return 999.0  # Infinite stock availability if no demand

    net_available = current_stock + replenishment - safety_threshold
    if net_available <= 0:
        # Stock already below safety threshold
        raw_days = current_stock / predicted_daily_demand
        return round(max(0.1, raw_days), 1)

    days = net_available / predicted_daily_demand
    return round(max(0.0, days), 1)


def detect_demand_anomaly(
    current_consumption: float, 
    historical_consumption: List[float], 
    z_threshold: float = 2.5
) -> Tuple[bool, float]:
    """
    Calculates Z-score deviation of current consumption against historical series:
    Z = (Current - Mean) / StdDev
    Returns (is_anomaly, z_score).
    """
    if len(historical_consumption) < 3:
        return False, 0.0

    arr = np.array(historical_consumption, dtype=float)
    mean_val = np.mean(arr)
    std_val = np.std(arr)

    if std_val == 0:
        return False, 0.0

    z_score = (current_consumption - mean_val) / std_val
    is_anomaly = bool(z_score >= z_threshold)
    return is_anomaly, round(float(z_score), 2)


class EarlyWarningEngine:
    """
    Evaluates inventory records across facilities and classifies early warnings.
    """

    def evaluate_inventory_item(
        self,
        phc_id: str,
        phc_name: str,
        medicine_name: str,
        current_stock: int,
        daily_consumption: float,
        safety_threshold: int,
        historical_consumption: Optional[List[float]] = None
    ) -> List[Dict[str, Any]]:
        """
        Evaluates a single inventory item and generates ranked alerts.
        """
        alerts = []
        today = datetime.now()

        # 1. Calculate Days to Stockout
        days_remaining = calculate_days_to_stockout(current_stock, daily_consumption, safety_threshold)
        predicted_date = (today + timedelta(days=math.ceil(days_remaining))).strftime("%Y-%m-%d")

        # 2. Check Safety Threshold Breach
        if current_stock < safety_threshold:
            alerts.append({
                "phc_id": phc_id,
                "phc_name": phc_name,
                "medicine_name": medicine_name,
                "severity": "CRITICAL",
                "type": "SAFETY_THRESHOLD_BREACH",
                "days_to_stockout": int(math.ceil(days_remaining)),
                "predicted_date": predicted_date,
                "message": f"Current stock ({current_stock} units) has fallen below safety buffer ({safety_threshold} units)."
            })

        # 3. Check Forecast Stockout Risk (< 7 Days)
        elif days_remaining <= 3.0:
            alerts.append({
                "phc_id": phc_id,
                "phc_name": phc_name,
                "medicine_name": medicine_name,
                "severity": "CRITICAL",
                "type": "FORECAST_STOCKOUT",
                "days_to_stockout": int(math.ceil(days_remaining)),
                "predicted_date": predicted_date,
                "message": f"Predicted critical stock-out in {days_remaining} days due to high daily consumption velocity ({daily_consumption} units/day)."
            })
        elif days_remaining <= 7.0:
            alerts.append({
                "phc_id": phc_id,
                "phc_name": phc_name,
                "medicine_name": medicine_name,
                "severity": "WARNING",
                "type": "FORECAST_STOCKOUT",
                "days_to_stockout": int(math.ceil(days_remaining)),
                "predicted_date": predicted_date,
                "message": f"Stock projected to breach safety threshold within {days_remaining} days."
            })

        # 4. Check Demand Anomaly Surge
        if historical_consumption:
            is_anomaly, z_score = detect_demand_anomaly(daily_consumption, historical_consumption)
            if is_anomaly:
                alerts.append({
                    "phc_id": phc_id,
                    "phc_name": phc_name,
                    "medicine_name": medicine_name,
                    "severity": "WARNING",
                    "type": "DEMAND_ANOMALY",
                    "days_to_stockout": int(math.ceil(days_remaining)),
                    "predicted_date": predicted_date,
                    "message": f"Abnormal demand spike detected (+{z_score}σ above historical baseline)."
                })

        return alerts


# Quick test execution
if __name__ == "__main__":
    engine = EarlyWarningEngine()
    test_alerts = engine.evaluate_inventory_item(
        phc_id="PHC-017",
        phc_name="PHC 017 (Rampur)",
        medicine_name="ORS Packets",
        current_stock=180,
        daily_consumption=75.0,
        safety_threshold=400,
        historical_consumption=[25, 28, 30, 32, 29, 31]
    )
    print("🚀 EarlyWarningEngine Test Output:")
    for a in test_alerts:
        print(f"[{a['severity']}] {a['type']}: {a['message']} (Stock-out in {a['days_to_stockout']} days)")
