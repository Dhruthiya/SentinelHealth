import pytest
from backend.ml.redistribution import RedistributionOptimizer, calculate_haversine_distance

def test_haversine_distance_calculation():
    # Distance between Rampur and Sitapur (~70-80 km)
    dist = calculate_haversine_distance(26.8467, 80.9462, 27.5667, 80.6833)
    assert dist > 50.0
    assert dist < 120.0

def test_scipy_optimization_solver_returns_optimal_payload():
    optimizer = RedistributionOptimizer()
    sources = [
        {"id": "PHC-042", "name": "PHC 042 (Sitapur)", "stock": 1450, "safety_threshold": 300, "lat": 27.5667, "lng": 80.6833},
        {"id": "PHC-062", "name": "PHC 062 (Hardoi)", "stock": 820, "safety_threshold": 200, "lat": 27.4000, "lng": 80.1300}
    ]
    dests = [
        {"id": "PHC-017", "name": "PHC 017 (Rampur)", "shortage_qty": 400, "days_left": 2.4, "urgency": 96, "lat": 26.8467, "lng": 80.9462, "daily_rate": 42}
    ]

    res = optimizer.optimize_transfers(sources, dests, "Paracetamol 500mg")

    assert res["status"] == "OPTIMAL"
    assert isinstance(res["recommendations"], list)
    assert "Optimization Succeeded" in res["scipy_status"]

def test_optimization_zero_surplus_handling():
    optimizer = RedistributionOptimizer()
    sources_no_surplus = [
        {"id": "PHC-001", "name": "PHC 001", "stock": 50, "safety_threshold": 100, "lat": 26.0, "lng": 80.0}
    ]
    dests = [
        {"id": "PHC-017", "name": "PHC 017", "shortage_qty": 200, "days_left": 1.0, "urgency": 95, "lat": 26.8, "lng": 80.9}
    ]

    res = optimizer.optimize_transfers(sources_no_surplus, dests, "ORS Packets")
    assert res["status"] == "ZERO_SURPLUS"
    assert len(res["recommendations"]) == 0
