import pytest
from backend.ml.alerts_engine import (
    calculate_days_to_stockout,
    detect_demand_anomaly,
    EarlyWarningEngine
)

def test_days_to_stockout_calculation():
    # Normal case: (420 + 0 - 100) / 40 = 8.0 days
    days = calculate_days_to_stockout(current_stock=420, predicted_daily_demand=40, safety_threshold=100)
    assert days == 8.0

    # Below safety threshold: (80 + 0 - 200) / 40 = stockout in 2.0 days based on total stock
    days_breach = calculate_days_to_stockout(current_stock=80, predicted_daily_demand=40, safety_threshold=200)
    assert days_breach == 2.0

def test_demand_anomaly_detection_z_score():
    history = [20, 22, 21, 19, 23, 20, 22]
    
    # Normal consumption (24 units -> Z score ~1.5)
    is_anomaly, z_score = detect_demand_anomaly(current_consumption=24, historical_consumption=history, z_threshold=2.5)
    assert is_anomaly is False

    # Outbreak surge (95 units -> Z score > 20)
    is_anomaly_surge, z_score_surge = detect_demand_anomaly(current_consumption=95, historical_consumption=history, z_threshold=2.5)
    assert is_anomaly_surge is True
    assert z_score_surge > 5.0

def test_early_warning_engine_eval():
    engine = EarlyWarningEngine()
    alerts = engine.evaluate_inventory_item(
        phc_id="PHC-017",
        phc_name="PHC 017 (Rampur)",
        medicine_name="ORS Packets",
        current_stock=180,
        daily_consumption=75.0,
        safety_threshold=400,
        historical_consumption=[25, 28, 30, 32, 29]
    )

    assert len(alerts) >= 1
    severities = [a["severity"] for a in alerts]
    assert "CRITICAL" in severities
