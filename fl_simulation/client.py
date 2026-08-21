#!/usr/bin/env python3
"""
SentinelHealth — BRICS FL Node Client Base Class
Simulates local node training on national health data while preserving 100% data privacy.
"""

import numpy as np
from typing import List, Dict, Tuple, Any
from backend.ml.forecasting import DemandForecaster

class BRICSNodeClient:
    """
    Simulated Federated Learning Node Client (India, Brazil, South Africa).
    Keeps raw health records strictly within local node memory.
    """

    def __init__(self, node_id: str, country: str, node_name: str, sample_count: int, initial_demand_data: List[float]):
        self.node_id = node_id
        self.country = country
        self.node_name = node_name
        self.sample_count = sample_count
        self.local_demand_data = initial_demand_data
        self.forecaster = DemandForecaster()

    def get_parameters(self) -> np.ndarray:
        """Returns local model parameters for aggregation."""
        return self.forecaster.get_weights()

    def set_parameters(self, weights: np.ndarray) -> None:
        """Updates local model with aggregated global weights."""
        self.forecaster.set_weights(weights)

    def fit_local(self, global_weights: np.ndarray) -> Tuple[np.ndarray, int, Dict[str, float]]:
        """
        Executes local SGD training round using local node dataset.
        Zero raw health records leave this method.
        """
        # Set global weights
        self.set_parameters(global_weights)

        # Simulate local model fitting and metric calculation
        res = self.forecaster.fit_predict(self.local_demand_data, horizon_days=14)
        metrics = res["metrics"]

        # Simulate parameter optimization nudge
        new_weights = self.get_parameters() + np.random.normal(0, 0.005, size=len(global_weights))

        return new_weights, self.sample_count, metrics

    def evaluate_local(self) -> float:
        """Returns local MAE metric."""
        res = self.forecaster.fit_predict(self.local_demand_data, horizon_days=14)
        return res["metrics"]["mae"]
