#!/usr/bin/env python3
"""SentinelHealth — South Africa FL Node Client Implementation."""

from fl_simulation.client import BRICSNodeClient

def create_south_africa_client() -> BRICSNodeClient:
    sa_demand_data = [30, 32, 35, 37, 40, 43, 46, 50, 55, 60, 64, 70, 76]
    return BRICSNodeClient(
        node_id="NODE-ZAF",
        country="South Africa",
        node_name="SAMRC Cape Town / National Node",
        sample_count=610000,
        initial_demand_data=sa_demand_data
    )

if __name__ == "__main__":
    client = create_south_africa_client()
    print(f"🇿🇦 {client.country} Node Client initialized ({client.sample_count:,} local records).")
