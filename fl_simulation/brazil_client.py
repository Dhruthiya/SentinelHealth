#!/usr/bin/env python3
"""SentinelHealth — Brazil FL Node Client Implementation."""

from fl_simulation.client import BRICSNodeClient

def create_brazil_client() -> BRICSNodeClient:
    brazil_demand_data = [40, 42, 44, 46, 49, 52, 58, 63, 67, 72, 78, 85, 91]
    return BRICSNodeClient(
        node_id="NODE-BRA",
        country="Brazil",
        node_name="Fiocruz Rio / SUS Network Node",
        sample_count=890200,
        initial_demand_data=brazil_demand_data
    )

if __name__ == "__main__":
    client = create_brazil_client()
    print(f"🇧🇷 {client.country} Node Client initialized ({client.sample_count:,} local records).")
