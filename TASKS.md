# 🏥 SentinelHealth — Implementation Checklist & Engineering Roadmap

This document outlines all technical tasks required beyond the frontend UI to complete the **SentinelHealth** decision-support platform for the **BRICS AI Challenge (Track 3: Smart Health & Supply Chain Resilience)**.

---

## 📊 Module 1: Data Layer & Synthetic CSV Generation
- [x] Create synthetic data generator (`data_generator/generator.py`) to simulate PHC consumption with seasonality and outbreak spikes
- [x] Generate standard CSV datasets in `data/`:
  - [x] `data/phcs.csv` — Facility metadata, locations, bed occupancy, staff counts
  - [x] `data/inventory.csv` — Medicine stock levels, safety thresholds, consumption rates, batch details
  - [x] `data/demand_timeseries.csv` — 30-day historical and forecast consumption curves with confidence bands
  - [x] `data/alerts.csv` — Active early warnings ranked by severity
  - [x] `data/transfers.csv` — SciPy redistribution recommendations
  - [x] `data/fl_nodes.csv` — BRICS node statuses and FL round metrics
- [x] Create seed script (`data_generator/seed.py`) to populate local database storage from CSV files

---

## 🗄️ Module 2: Database Schema & Data Models
- [x] Configure SQLAlchemy ORM models and database connection in `backend/database/`
- [x] Implement `PHC` table (facility metadata, lat/lng coordinates, beds, staff, status)
- [x] Implement `Medicine` table (essential drug catalog, category, safety stock thresholds)
- [x] Implement `StockRecord` table (phc_id, medicine_id, current_stock, daily_consumption, batch_no, expiry_date)
- [x] Implement `ForecastResult` table (phc_id, medicine_id, date, predicted_demand, ci_upper, ci_lower, safety_stock)
- [x] Implement `Alert` table (phc_id, medicine_id, severity, type, days_to_stockout, message, acknowledged status)
- [x] Implement `RedistributionRecommendation` table (medicine_id, source_phc, dest_phc, quantity, priority, urgency_score, distance, status)
- [x] Implement `FLRound` table (round_number, node_id, local_metric, global_metric, timestamp)

---

## ⚡ Module 3: Backend REST API & WebSocket Telemetry (FastAPI)
- [x] Set up FastAPI application structure (`backend/main.py`) with CORS middleware
- [x] Implement PHC endpoints:
  - [x] `GET /api/health` — System and database health status
  - [x] `GET /api/phcs` — List all PHCs with district and status filtering
  - [x] `GET /api/phcs/{id}` — Get single PHC details and current inventory
- [x] Implement Inventory endpoints:
  - [x] `GET /api/inventory` — List inventory with category and status filters
- [x] Implement Demand Forecast endpoints:
  - [x] `GET /api/forecast/{phc_id}/{medicine_id}` — Get historical & 7/14/30-day forecast curves
- [x] Implement Early Warning Alert endpoints:
  - [x] `GET /api/alerts` — List ranked active alerts
  - [x] `POST /api/alerts/{id}/acknowledge` — Acknowledge an alert
- [x] Implement Resource Redistribution endpoints:
  - [x] `GET /api/redistribution/recommendations` — Retrieve transfer plans
  - [x] `POST /api/redistribution/{id}/approve` — Authorize transfer recommendation
- [x] Implement Federated Learning endpoints:
  - [x] `GET /api/fl/status` — Get FL training state and local vs global MAE metrics
  - [x] `POST /api/fl/round` — Trigger new FL aggregation round
- [x] Implement Outbreak Simulation endpoints:
  - [x] `POST /api/simulation/outbreak` — Inject simulated outbreak demand surge
  - [x] `POST /api/simulation/reset` — Reset simulation environment
- [x] Implement WebSocket endpoint (`WS /ws/live`) for real-time dashboard updates

---

## 🔮 Module 4: Machine Learning & Demand Forecasting Engine
- [x] Implement baseline forecasting module (`backend/ml/forecasting.py`) using Prophet / ARIMA / Holt-Winters
- [x] Implement parameterized ML model capable of local training and FL parameter export
- [x] Build 7, 14, and 30-day forecasting pipeline with 95% upper and lower confidence bands
- [x] Build model evaluation module calculating MAE, RMSE, and forecast stability scores

---

## 🚨 Module 5: Stock-Out Prediction & Early-Warning Engine
- [x] Implement days-to-stockout calculator:
  $$\text{Days} = \frac{\text{Current Stock} + \text{Replenishment} - \text{Safety Buffer}}{\text{Predicted Daily Demand}}$$
- [x] Implement alert trigger classification logic:
  - [x] `SAFETY_THRESHOLD_BREACH` (Stock < safety threshold)
  - [x] `FORECAST_STOCKOUT` (Stock-out predicted in $\le 7$ days)
  - [x] `DEMAND_ANOMALY` (Consumption deviates $>2.5\sigma$ from baseline)
- [x] Implement alert severity ranking system (`CRITICAL`, `WARNING`, `HEALTHY`)

---

## 🚚 Module 6: Resource Redistribution Optimization Engine (`SciPy`)
- [x] Implement linear programming optimization engine (`backend/ml/redistribution.py`) using `scipy.optimize.linprog`:
  $$\min \sum \left( C_{\text{transport}} \cdot d_{ij} + P_{\text{urgency}} \cdot \text{UnmetShortage}_j \right)$$
- [x] Enforce safety constraints: *Source stock after transfer $\ge$ Safety Stock Floor*
- [x] Implement fallback heuristic solver for infeasible optimization states
- [x] Build human-in-the-loop approval workflow and audit log tracker

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
| **Module 1: Data Layer** | CSV Datasets & Generator | ✅ **Completed** |
| **Module 2: Database** | SQLAlchemy ORM Models & Seeder | ✅ **Completed** |
| **Module 3: Backend API** | FastAPI REST & WebSockets | ✅ **Completed** |
| **Module 4: Forecasting ML** | Time-series Predictor & Confidence Bands | ✅ **Completed** |
| **Module 5: Early Warning** | Stock-out Calculator & Severity Engine | ✅ **Completed** |
| **Module 6: Optimization** | SciPy `linprog` Redistribution Solver | ✅ **Completed** |
| **Module 7: Federated Learning** | Flower FedAvg Server & BRICS Nodes | 🔲 Pending |
| **Module 8: Outbreak Simulator** | Demand Spike Injection Controller | 🔲 Pending |
| **Module 9: Testing Suite** | Pytest Unit & Integration Tests | 🔲 Pending |
| **Module 10: Infrastructure** | Docker Compose & CI/CD Pipeline | 🔲 Pending |
