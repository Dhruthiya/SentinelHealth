import pytest
import numpy as np
from fl_simulation.strategy import SentinelFedAvgStrategy
from fl_simulation.client import BRICSNodeClient
from fl_simulation.server import FederatedServer

def test_fedavg_strategy_aggregation():
    strategy = SentinelFedAvgStrategy()
    
    # 2 clients: client 1 (100 examples, weights [1, 2]), client 2 (300 examples, weights [3, 6])
    client_results = [
        (np.array([1.0, 2.0]), 100),
        (np.array([3.0, 6.0]), 300)
    ]
    
    # Expected weighted average: (100*1 + 300*3)/400 = 2.5, (100*2 + 300*6)/400 = 5.0
    aggregated = strategy.aggregate_weights(client_results)
    assert round(aggregated[0], 2) == 2.5
    assert round(aggregated[1], 2) == 5.0

def test_brics_node_client_fit():
    client = BRICSNodeClient(
        node_id="NODE-TEST",
        country="TestCountry",
        node_name="Test Health Node",
        sample_count=50000,
        initial_demand_data=[30, 35, 40, 45, 50]
    )
    
    initial_weights = np.array([0.3, 0.1, 0.2])
    new_weights, count, metrics = client.fit_local(initial_weights)
    
    assert count == 50000
    assert len(new_weights) == 3
    assert "mae" in metrics

def test_federated_server_round():
    server = FederatedServer()
    initial_round = server.current_round
    res = server.run_fl_round()
    
    assert server.current_round == initial_round + 1
    assert res["round_number"] == initial_round + 1
    assert "aggregated_global_mae" in res
    assert res["aggregated_global_mae"] > 0
