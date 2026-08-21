#!/usr/bin/env python3
"""SentinelHealth — India FL Node Client Implementation."""

from fl_simulation.client import BRICSNodeClient

def create_india_client() -> BRICSNodeClient:
    india_demand_data = [35, 38, 42, 45, 50, 55, 60, 68, 75, 82, 90, 98, 105]
    return BRICSNodeClient(
        node_id="NODE-IND",
        country="India",
        node_name="AIIMS Delhi / UP State Health Node",
        sample_count=1240500,
        initial_demand_data=india_demand_data
    )

if __name__ == "__main__":
    client = create_india_client()
    print(f"🇮🇳 {client.country} Node Client initialized ({client.sample_count:,} local records).")
