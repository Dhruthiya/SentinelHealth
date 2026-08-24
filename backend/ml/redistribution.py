#!/usr/bin/env python3
"""
SentinelHealth — SciPy Resource Redistribution Optimization Engine
Uses scipy.optimize.linprog to solve cross-district medicine redistribution
while enforcing safety-stock floor constraints and human-in-the-loop approval.
"""

import math
import numpy as np
from scipy.optimize import linprog
from typing import List, Dict, Any, Tuple, Optional

def calculate_haversine_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculates approximate geographic distance in km between two lat/lng points."""
    R = 6371.0  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = (math.sin(dlat / 2) ** 2 + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 1)


class RedistributionOptimizer:
    """
    Linear Programming Solver for Healthcare Supply Chain Redistribution.
    """

    def optimize_transfers(
        self,
        sources: List[Dict[str, Any]],
        destinations: List[Dict[str, Any]],
        medicine_name: str
    ) -> Dict[str, Any]:
        """
        Formulates and solves linear optimization problem using scipy.optimize.linprog.
        
        sources: List of dicts [{'id', 'name', 'stock', 'safety_threshold', 'lat', 'lng'}]
        destinations: List of dicts [{'id', 'name', 'shortage_qty', 'days_left', 'urgency', 'lat', 'lng'}]
        """
        num_sources = len(sources)
        num_dests = len(destinations)

        if num_sources == 0 or num_dests == 0:
            return {
                "status": "NO_FEASIBLE_TRANSFERS",
                "recommendations": [],
                "scipy_status": "No matching surplus/shortage pairs."
            }

        # Calculate surplus for sources (Stock - Safety Floor)
        surplus_caps = []
        for s in sources:
            available = max(0, s["stock"] - s["safety_threshold"])
            surplus_caps.append(available)

        # Shortage demand for destinations
        shortage_reqs = []
        for d in destinations:
            shortage_reqs.append(max(0, d["shortage_qty"]))

        if sum(surplus_caps) == 0:
            return {
                "status": "ZERO_SURPLUS",
                "recommendations": [],
                "scipy_status": "No source facilities hold surplus above safety floor."
            }

        # Cost matrix: Cost = Distance - (0.5 * Urgency)
        # Minimize total transport distance weighted by urgency
        c = []
        bounds = []
        for i, s in enumerate(sources):
            for j, d in enumerate(destinations):
                dist = calculate_haversine_distance(s["lat"], s["lng"], d["lat"], d["lng"])
                urgency = d.get("urgency", 80)
                unit_cost = dist - (0.2 * urgency)
                c.append(unit_cost)
                bounds.append((0, None))  # x_ij >= 0

        # Inequality constraints A_ub * x <= b_ub
        # 1. Source capacity constraints: sum_j x_ij <= surplus_i
        A_ub = []
        b_ub = []

        for i in range(num_sources):
            row = [0] * (num_sources * num_dests)
            for j in range(num_dests):
                row[i * num_dests + j] = 1
            A_ub.append(row)
            b_ub.append(surplus_caps[i])

        # Execute SciPy linprog solver (HiGHS algorithm)
        res = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=bounds, method='highs')

        recommendations = []

        if res.success:
            x_opt = res.x
            rec_id_counter = 301
            for i, s in enumerate(sources):
                for j, d in enumerate(destinations):
                    idx = i * num_dests + j
                    qty = int(round(x_opt[idx]))
                    if qty > 10:
                        dist = calculate_haversine_distance(s["lat"], s["lng"], d["lat"], d["lng"])
                        est_time = int(round(dist * 1.5 + 5))
                        urgency = d.get("urgency", 90)
                        priority = "CRITICAL" if urgency >= 90 else "HIGH"

                        recommendations.append({
                            "id": f"TRF-{rec_id_counter}",
                            "medicine_name": medicine_name,
                            "source_phc_id": s["id"],
                            "source_phc_name": s["name"],
                            "source_surplus": surplus_caps[i],
                            "dest_phc_id": d["id"],
                            "dest_phc_name": d["name"],
                            "dest_shortage_days": d.get("days_left", 2.5),
                            "quantity": qty,
                            "priority": priority,
                            "urgency_score": urgency,
                            "distance_km": dist,
                            "est_time_mins": est_time,
                            "impact_message": f"Extends stock coverage at {d['name']} by +{round(qty / max(1, d.get('daily_rate', 40)), 1)} days",
                            "scipy_score": f"Linear Program Optimal ({round(res.execution_time, 4)}s)",
                            "status": "PENDING"
                        })
                        rec_id_counter += 1

            return {
                "status": "OPTIMAL",
                "recommendations": recommendations,
                "scipy_status": f"Optimization Succeeded ({res.message})"
            }

        else:
            # Fallback Rule-Based Heuristic Solver
            return self._heuristic_fallback(sources, destinations, medicine_name)

    def _heuristic_fallback(self, sources, destinations, medicine_name) -> Dict[str, Any]:
        """Heuristic greedy distance solver fallback."""
        recommendations = []
        counter = 301
        for d in destinations:
            best_source = min(sources, key=lambda s: calculate_haversine_distance(s["lat"], s["lng"], d["lat"], d["lng"]))
            surplus = max(0, best_source["stock"] - best_source["safety_threshold"])
            if surplus > 20:
                dist = calculate_haversine_distance(best_source["lat"], best_source["lng"], d["lat"], d["lng"])
                qty = min(surplus, d["shortage_qty"])
                recommendations.append({
                    "id": f"TRF-{counter}",
                    "medicine_name": medicine_name,
                    "source_phc_id": best_source["id"],
                    "source_phc_name": best_source["name"],
                    "source_surplus": surplus,
                    "dest_phc_id": d["id"],
                    "dest_phc_name": d["name"],
                    "dest_shortage_days": d.get("days_left", 2.5),
                    "quantity": qty,
                    "priority": "HIGH",
                    "urgency_score": d.get("urgency", 85),
                    "distance_km": dist,
                    "est_time_mins": int(dist * 1.5 + 5),
                    "impact_message": f"Heuristic transfer allocated {qty} units",
                    "scipy_score": "Greedy Heuristic Fallback",
                    "status": "PENDING"
                })
                counter += 1

        return {
            "status": "HEURISTIC_FALLBACK",
            "recommendations": recommendations,
            "scipy_status": "Rule-based greedy fallback solver executed."
        }


# Quick test routine
if __name__ == "__main__":
    test_sources = [
        {"id": "PHC-042", "name": "PHC 042 (Sitapur)", "stock": 1450, "safety_threshold": 300, "lat": 27.5667, "lng": 80.6833},
        {"id": "PHC-062", "name": "PHC 062 (Hardoi)", "stock": 820, "safety_threshold": 200, "lat": 27.4000, "lng": 80.1300}
    ]
    test_dests = [
        {"id": "PHC-017", "name": "PHC 017 (Rampur)", "shortage_qty": 400, "days_left": 2.4, "urgency": 96, "lat": 26.8467, "lng": 80.9462, "daily_rate": 42}
    ]

    optimizer = RedistributionOptimizer()
    output = optimizer.optimize_transfers(test_sources, test_dests, "Paracetamol 500mg")
    print("🚀 RedistributionOptimizer Test Output:")
    print(f"Status: {output['status']} | {output['scipy_status']}")
    for r in output['recommendations']:
        print(f"[{r['priority']}] Transfer {r['quantity']} units from {r['source_phc_name']} -> {r['dest_phc_name']} ({r['distance_km']}km / ~{r['est_time_mins']} mins)")
