# 🏥 SentinelHealth — Implementation Checklist & Engineering Roadmap

This document outlines all technical tasks required beyond the frontend UI to complete the **SentinelHealth** decision-support platform for the **BRICS AI Challenge (Track 3: Smart Health & Supply Chain Resilience)**.

---

## 📊 Module 1: Data Layer & Synthetic CSV Generation
- [ ] Create synthetic data generator (`data_generator/generator.py`) to simulate PHC consumption with seasonality and outbreak spikes
- [ ] Generate standard CSV datasets in `data/`:
  - [ ] `data/phcs.csv` — Facility metadata, locations, bed occupancy, staff counts
  - [ ] `data/inventory.csv` — Medicine stock levels, safety thresholds, consumption rates, batch details
  - [ ] `data/demand_timeseries.csv` — 30-day historical and forecast consumption curves with confidence bands
  - [ ] `data/alerts.csv` — Active early warnings ranked by severity
  - [ ] `data/transfers.csv` — SciPy redistribution recommendations
  - [ ] `data/fl_nodes.csv` — BRICS node statuses and FL round metrics
- [ ] Create seed script (`data_generator/seed.py`) to populate local database storage from CSV files

---

## 🗄️ Module 2: Database Schema & Data Models
- [ ] Configure SQLAlchemy ORM models and database connection in `backend/database/`
- [ ] Implement `PHC` table (facility metadata, lat/lng coordinates, beds, staff, status)
- [ ] Implement `Medicine` table (essential drug catalog, category, safety stock thresholds)
- [ ] Implement `StockRecord` table (phc_id, medicine_id, current_stock, daily_consumption, batch_no, expiry_date)
- [ ] Implement `ForecastResult` table (phc_id, medicine_id, date, predicted_demand, ci_upper, ci_lower, safety_stock)
- [ ] Implement `Alert` table (phc_id, medicine_id, severity, type, days_to_stockout, message, acknowledged status)
- [ ] Implement `RedistributionRecommendation` table (medicine_id, source_phc, dest_phc, quantity, priority, urgency_score, distance, status)
- [ ] Implement `FLRound` table (round_number, node_id, local_metric, global_metric, timestamp)

---

## ⚡ Module 3: Backend REST API & WebSocket Telemetry (FastAPI)
- [ ] Set up FastAPI application structure (`backend/main.py`) with CORS middleware
- [ ] Implement PHC endpoints:
  - [ ] `GET /api/health` — System and database health status
  - [ ] `GET /api/phcs` — List all PHCs with district and status filtering
  - [ ] `GET /api/phcs/{id}` — Get single PHC details and current inventory
- [ ] Implement Inventory endpoints:
  - [ ] `GET /api/inventory` — List inventory with category and status filters
- [ ] Implement Demand Forecast endpoints:
  - [ ] `GET /api/forecast/{phc_id}/{medicine_id}` — Get historical & 7/14/30-day forecast curves
- [ ] Implement Early Warning Alert endpoints:
  - [ ] `GET /api/alerts` — List ranked active alerts
  - [ ] `POST /api/alerts/{id}/acknowledge` — Acknowledge an alert
- [ ] Implement Resource Redistribution endpoints:
  - [ ] `GET /api/redistribution/recommendations` — Retrieve transfer plans
  - [ ] `POST /api/redistribution/{id}/approve` — Authorize transfer recommendation
- [ ] Implement Federated Learning endpoints:
  - [ ] `GET /api/fl/status` — Get FL training state and local vs global MAE metrics
  - [ ] `POST /api/fl/round` — Trigger new FL aggregation round
- [ ] Implement Outbreak Simulation endpoints:
  - [ ] `POST /api/simulation/outbreak` — Inject simulated outbreak demand surge
  - [ ] `POST /api/simulation/reset` — Reset simulation environment
- [ ] Implement WebSocket endpoint (`WS /ws/live`) for real-time dashboard updates

---

## 🔮 Module 4: Machine Learning & Demand Forecasting Engine
- [ ] Implement baseline forecasting module (`backend/ml/forecasting.py`) using Prophet / ARIMA / Holt-Winters
- [ ] Implement parameterized ML model capable of local training and FL parameter export
- [ ] Build 7, 14, and 30-day forecasting pipeline with 95% upper and lower confidence bands
- [ ] Build model evaluation module calculating MAE, RMSE, and forecast stability scores

---

## 🚨 Module 5: Stock-Out Prediction & Early-Warning Engine
- [ ] Implement days-to-stockout calculator:
  $$\text{Days} = \frac{\text{Current Stock} + \text{Replenishment} - \text{Safety Buffer}}{\text{Predicted Daily Demand}}$$
- [ ] Implement alert trigger classification logic:
  - [ ] `SAFETY_THRESHOLD_BREACH` (Stock < safety threshold)
  - [ ] `FORECAST_STOCKOUT` (Stock-out predicted in $\le 7$ days)
  - [ ] `DEMAND_ANOMALY` (Consumption deviates $>2.5\sigma$ from baseline)
- [ ] Implement alert severity ranking system (`CRITICAL`, `WARNING`, `HEALTHY`)

---

## 🚚 Module 6: Resource Redistribution Optimization Engine (`SciPy`)
- [ ] Implement linear programming optimization engine (`backend/ml/redistribution.py`) using `scipy.optimize.linprog`:
  $$\min \sum \left( C_{\text{transport}} \cdot d_{ij} + P_{\text{urgency}} \cdot \text{UnmetShortage}_j \right)$$
- [ ] Enforce safety constraints: *Source stock after transfer $\ge$ Safety Stock Floor*
- [ ] Implement fallback heuristic solver for infeasible optimization states
- [ ] Build human-in-the-loop approval workflow and audit log tracker

---

## 🌐 Module 7: Federated Learning Simulation (`Flower`)
- [ ] Set up Flower central aggregation server (`fl_simulation/server.py`) using `FedAvg` strategy
- [ ] Build 3 simulated national node clients:
  - [ ] `fl_simulation/india_client.py` (AIIMS Delhi / UP State Node)
  - [ ] `fl_simulation/brazil_client.py` (Fiocruz Rio Node)
  - [ ] `fl_simulation/south_africa_client.py` (SAMRC Cape Town Node)
- [ ] Implement local training pipeline on node synthetic datasets (100% data privacy)
- [ ] Implement model parameter serialization, weight aggregation, and global model broadcast
- [ ] Build round-by-round MAE recording comparison (Local-only vs Federated Global model)

---

## 🦠 Module 8: Outbreak Scenario & Simulation Pipeline
- [ ] Build outbreak scenario controller supporting Dengue, Cholera, and Logistics disruption presets
- [ ] Implement demand multiplier injection mechanism into targeted PHC districts
- [ ] Wire automatic alert generation and SciPy transfer recalculation upon outbreak trigger
- [ ] Implement full simulation environment reset handler

---

## 🧪 Module 9: Testing & Evaluation Suite
- [ ] Write API route unit tests (`backend/tests/test_api.py`)
- [ ] Write forecasting model evaluation tests (`test_forecasting.py`)
- [ ] Write stock-out and early-warning logic tests (`test_alerts.py`)
- [ ] Write SciPy optimization constraint tests (`test_optimization.py`)
- [ ] Write Flower federated aggregation tests (`test_fl.py`)
- [ ] Write end-to-end outbreak simulation lifecycle tests (`test_simulation.py`)

---

## 🐳 Module 10: Infrastructure, Docker & CI/CD
- [ ] Create `.env.example` configuration template
- [ ] Create `docker-compose.yml` orchestrating:
  - [ ] `api` container (FastAPI)
  - [ ] `db` container (PostgreSQL)
  - [ ] `frontend` container (Vite React app)
  - [ ] `fl-server` container (Flower FedAvg)
  - [ ] `fl-node-india`, `fl-node-brazil`, `fl-node-southafrica` containers
- [ ] Create GitHub Actions CI workflow (`.github/workflows/ci.yml`) for automated pytest and linting

---

## 📌 Implementation Checklist Summary

| Module | Purpose | Status |
| :--- | :--- | :---: |
| **Module 0: Frontend UI** | Dashboard, Maps, Charts, FL UI, Outbreak Modal | ✅ **Completed** |
| **Module 1: Data Layer** | CSV Datasets & Generator | 🔲 Pending |
| **Module 2: Database** | SQLAlchemy ORM Models & Seeder | 🔲 Pending |
| **Module 3: Backend API** | FastAPI REST & WebSockets | 🔲 Pending |
| **Module 4: Forecasting ML** | Time-series Predictor & Confidence Bands | 🔲 Pending |
| **Module 5: Early Warning** | Stock-out Calculator & Severity Engine | 🔲 Pending |
| **Module 6: Optimization** | SciPy `linprog` Redistribution Solver | 🔲 Pending |
| **Module 7: Federated Learning** | Flower FedAvg Server & BRICS Nodes | 🔲 Pending |
| **Module 8: Outbreak Simulator** | Demand Spike Injection Controller | 🔲 Pending |
| **Module 9: Testing Suite** | Pytest Unit & Integration Tests | 🔲 Pending |
| **Module 10: Infrastructure** | Docker Compose & CI/CD Pipeline | 🔲 Pending |
