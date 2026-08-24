#!/usr/bin/env python3
"""
SentinelHealth — Outbreak & Scenario Simulation Pipeline
Injects demand spikes (Dengue surge, Cholera outbreak, Logistics disruption),
dynamically triggers early warnings, and recalculates SciPy redistribution transfers.
"""

from typing import Dict, Any, List
from sqlalchemy.orm import Session
from backend.database.models import PHCModel, StockRecordModel, AlertModel, RedistributionRecommendationModel
from backend.ml.alerts_engine import EarlyWarningEngine, calculate_days_to_stockout
from backend.ml.redistribution import RedistributionOptimizer
from backend.database.seed_db import main as seed_database

class OutbreakSimulator:
    """
    Simulation Engine for Stress-Testing Supply Chain Resilience.
    """

    def __init__(self):
        self.alerts_engine = EarlyWarningEngine()
        self.optimizer = RedistributionOptimizer()

    def inject_outbreak_scenario(self, db: Session, scenario_type: str = "DENGUE_DISTRICT_B") -> Dict[str, Any]:
        """
        Injects demand multiplier spike, recalculates days to stockout,
        generates early warning alerts, and runs SciPy linear optimization for transfers.
        """
        if scenario_type == "CHOLERA_DISTRICT_A":
            target_phcs = ["PHC-009", "PHC-055"]
            target_medicines = ["ORS Packets", "IV Saline 500ml", "Oral Cholera Vaccine"]
            multiplier = 4.2
            scenario_name = "Cholera Outbreak Surge (District A)"
        elif scenario_type == "LOGISTICS_DISRUPTION":
            target_phcs = ["PHC-017", "PHC-031", "PHC-062"]
            target_medicines = ["Paracetamol 500mg", "Artemether Injection"]
            multiplier = 2.8
            scenario_name = "Logistics Route Interruption"
        else:
            # Default: DENGUE_DISTRICT_B
            target_phcs = ["PHC-017", "PHC-055"]
            target_medicines = ["Paracetamol 500mg", "ORS Packets"]
            multiplier = 3.2
            scenario_name = "Dengue Fever Outbreak Surge (District B)"

        # 1. Update PHC operational status
        for pid in target_phcs:
            phc = db.query(PHCModel).filter(PHCModel.id == pid).first()
            if phc:
                phc.status = "CRITICAL"
                phc.beds_occupied = min(phc.beds_total, phc.beds_occupied + 4)

        # 2. Update inventory daily consumption rates & stock autonomy
        for pid in target_phcs:
            stocks = db.query(StockRecordModel).filter(StockRecordModel.phc_id == pid).all()
            for stock in stocks:
                if stock.medicine_name in target_medicines or len(target_medicines) == 0:
                    stock.daily_consumption = round(stock.daily_consumption * multiplier, 1)
                    stock.days_remaining = calculate_days_to_stockout(
                        stock.current_stock, 
                        stock.daily_consumption, 
                        stock.safety_threshold
                    )
                    stock.status = "CRITICAL" if stock.days_remaining < 3.0 else "WARNING"

                    # Generate & Store Critical Alert in DB
                    new_alert = AlertModel(
                        id=f"ALT-SIM-{pid}-{stock.medicine_name[:3]}",
                        phc_id=pid,
                        phc_name=stock.phc_name,
                        medicine_name=stock.medicine_name,
                        severity="CRITICAL",
                        type="FORECAST_STOCKOUT",
                        days_to_stockout=max(1, int(stock.days_remaining)),
                        predicted_date="2026-08-23",
                        message=f"Outbreak Spike: Consumption increased {multiplier}x. Predicted stock-out in {stock.days_remaining} days.",
                        created_at="Just now",
                        acknowledged=False
                    )
                    db.merge(new_alert)

        # 3. Recalculate SciPy Redistribution Transfers
        sources = []
        dests = []

        all_phcs = db.query(PHCModel).all()
        for p in all_phcs:
            stocks = db.query(StockRecordModel).filter(StockRecordModel.phc_id == p.id).all()
            for s in stocks:
                if s.days_remaining > 15.0 and s.current_stock > s.safety_threshold:
                    sources.append({
                        "id": p.id,
                        "name": p.name,
                        "stock": s.current_stock,
                        "safety_threshold": s.safety_threshold,
                        "lat": p.lat,
                        "lng": p.lng
                    })
                elif s.days_remaining < 3.0 or s.status == "CRITICAL":
                    dests.append({
                        "id": p.id,
                        "name": p.name,
                        "shortage_qty": max(200, s.safety_threshold * 2 - s.current_stock),
                        "days_left": s.days_remaining,
                        "urgency": 96,
                        "lat": p.lat,
                        "lng": p.lng,
                        "daily_rate": s.daily_consumption
                    })

        if sources and dests:
            opt_res = self.optimizer.optimize_transfers(sources, dests, "ORS Packets")
            for rec in opt_res["recommendations"]:
                db_rec = RedistributionRecommendationModel(
                    id=rec["id"],
                    medicine_name=rec["medicine_name"],
                    source_phc_id=rec["source_phc_id"],
                    source_phc_name=rec["source_phc_name"],
                    source_surplus=rec["source_surplus"],
                    dest_phc_id=rec["dest_phc_id"],
                    dest_phc_name=rec["dest_phc_name"],
                    dest_shortage_days=rec["dest_shortage_days"],
                    quantity=rec["quantity"],
                    priority=rec["priority"],
                    urgency_score=rec["urgency_score"],
                    distance_km=rec["distance_km"],
                    est_time_mins=rec["est_time_mins"],
                    impact_message=rec["impact_message"],
                    scipy_score=rec["scipy_score"],
                    status="PENDING"
                )
                db.merge(db_rec)

        db.commit()

        return {
            "status": "ACTIVE",
            "scenario": scenario_name,
            "multiplier": multiplier,
            "affected_phcs": target_phcs,
            "new_alerts_generated": len(target_phcs),
            "optimization_updated": True
        }

    def reset_baseline_scenario(self, db: Session) -> Dict[str, Any]:
        """Resets simulation environment to standard operational baseline."""
        seed_database()
        return {
            "status": "NORMAL",
            "message": "Operational baseline restored. All synthetic telemetry reset."
        }
