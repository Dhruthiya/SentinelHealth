import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "database" in data
    assert data["version"] == "1.0.0"

def test_get_phcs_endpoint():
    response = client.get("/api/phcs")
    assert response.status_code == 200
    phcs = response.json()
    assert isinstance(phcs, list)
    assert len(phcs) >= 6
    assert phcs[0]["id"] == "PHC-017"

def test_get_phc_by_id_endpoint():
    response = client.get("/api/phcs/PHC-017")
    assert response.status_code == 200
    phc = response.json()
    assert phc["id"] == "PHC-017"
    assert phc["name"] == "Primary Health Centre 017 (Rampur)"

def test_get_inventory_endpoint():
    response = client.get("/api/inventory")
    assert response.status_code == 200
    items = response.json()
    assert isinstance(items, list)
    assert len(items) >= 8

def test_get_forecast_endpoint():
    response = client.get("/api/forecast/PHC-017/ORS%20Packets")
    assert response.status_code == 200
    points = response.json()
    assert isinstance(points, list)
    assert len(points) >= 10
    # Check that predictions have 95% confidence bands
    for p in points:
        if p["predicted_demand"] is not None:
            assert p["ci_upper"] >= p["predicted_demand"]
            assert p["ci_lower"] <= p["predicted_demand"]

def test_get_alerts_endpoint():
    response = client.get("/api/alerts")
    assert response.status_code == 200
    alerts = response.json()
    assert isinstance(alerts, list)
    assert len(alerts) >= 5

def test_acknowledge_alert_endpoint():
    response = client.post("/api/alerts/ALT-801/acknowledge")
    assert response.status_code == 200
    alert = response.json()
    assert alert["id"] == "ALT-801"
    assert alert["acknowledged"] is True

def test_get_redistribution_recommendations_endpoint():
    response = client.get("/api/redistribution/recommendations")
    assert response.status_code == 200
    transfers = response.json()
    assert isinstance(transfers, list)
    assert len(transfers) >= 3

def test_approve_transfer_endpoint():
    response = client.post("/api/redistribution/TRF-301/approve")
    assert response.status_code == 200
    transfer = response.json()
    assert transfer["id"] == "TRF-301"
    assert transfer["status"] == "APPROVED"

def test_get_fl_status_endpoint():
    response = client.get("/api/fl/status")
    assert response.status_code == 200
    nodes = response.json()
    assert isinstance(nodes, list)
    assert len(nodes) == 3

def test_trigger_fl_round_endpoint():
    response = client.post("/api/fl/round")
    assert response.status_code == 200
    res = response.json()
    assert res["status"] == "success"
    assert "global_mae" in res

def test_outbreak_simulation_lifecycle_endpoints():
    # Inject outbreak
    resp1 = client.post("/api/simulation/outbreak")
    assert resp1.status_code == 200
    res1 = resp1.json()
    assert res1["status"] == "ACTIVE"

    # Reset baseline
    resp2 = client.post("/api/simulation/reset")
    assert resp2.status_code == 200
    res2 = resp2.json()
    assert res2["status"] == "NORMAL"
