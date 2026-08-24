#!/usr/bin/env python3
"""
SentinelHealth — Federated Learning FedAvg Aggregation Strategy
Implements Federated Averaging (FedAvg) algorithm across BRICS nodes.
"""

import numpy as np
from typing import List, Tuple, Dict, Any

class SentinelFedAvgStrategy:
    """
    Implements weighted Federated Averaging:
    w_global = sum( (n_k / N) * w_k )
    """

    def aggregate_weights(self, results: List[Tuple[np.ndarray, int]]) -> np.ndarray:
        """
        results: List of tuples (client_weights_array, num_examples_n_k)
        """
        if not results:
            return np.array([], dtype=float)

        total_examples = sum(num_examples for _, num_examples in results)
        if total_examples == 0:
            return results[0][0]

        # Calculate weighted average for each parameter weight vector
        avg_weights = np.zeros_like(results[0][0], dtype=float)
        for weights, num_examples in results:
            weight_factor = num_examples / total_examples
            avg_weights += weights * weight_factor

        return avg_weights

    def evaluate_global_mae(self, local_maes: List[float], example_counts: List[int]) -> float:
        """Computes aggregated global MAE score across participating nodes."""
        total = sum(example_counts)
        if total == 0:
            return float(np.mean(local_maes))
        
        weighted_sum = sum(mae * n for mae, n in zip(local_maes, example_counts))
        return round(float(weighted_sum / total), 2)
