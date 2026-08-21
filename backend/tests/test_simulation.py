import pytest
from backend.database.database import SessionLocal
from backend.ml.outbreak_simulator import OutbreakSimulator
from backend.database.models import PHCModel, AlertModel

def test_outbreak_simulator_injection_and_reset():
    db = SessionLocal()
    try:
        simulator = OutbreakSimulator()

        # Inject Dengue scenario
        res_inject = simulator.inject_outbreak_scenario(db, scenario_type="DENGUE_DISTRICT_B")
        assert res_inject["status"] == "ACTIVE"
        assert res_inject["multiplier"] == 3.2
        assert "PHC-017" in res_inject["affected_phcs"]

        # Verify database updated PHC-017 status to CRITICAL
        phc17 = db.query(PHCModel).filter(PHCModel.id == "PHC-017").first()
        assert phc17 is not None
        assert phc17.status == "CRITICAL"

        # Reset baseline
        res_reset = simulator.reset_baseline_scenario(db)
        assert res_reset["status"] == "NORMAL"

    finally:
        db.close()
