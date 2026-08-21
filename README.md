# 🏥 SENTINELHEALTH — AI-Powered Healthcare Resource & Supply-Chain Resilience

> **BRICS AI Challenge (Track 3: Smart Health & Supply Chain Resilience)**  
> *A high-trust, predictive decision-support system for Primary Health Centre (PHC) networks.*

---

## 🎨 Unified Design System & Product Identity

The **SentinelHealth** platform and documentation adhere to a strict, high-trust Gov-Tech design system built for maximum legibility and rapid decision-making by public health administrators.

| System Attribute | Specification & Implementation |
| :--- | :--- |
| **Primary Base** | Deep Teal / Slate Blue (`#0E7C7B` / `#0B5FA5`) — Authority, stability, medical domain trust |
| **Background / Surfaces** | Off-white canvas (`#F7F9FB`) with white cards (`#FFFFFF`) and crisp slate borders (`#E2E8F0`) |
| **Text Hierarchy** | Inter / IBM Plex Sans — Slate near-black (`#1A2332`) for high contrast and readability |
| **Status / Severity Matrix** | **Critical**: `#D64545` (Red) \| **High/Warning**: `#E8A33D` (Amber) \| **Normal**: `#3EA66B` (Green) |
| **Design Philosophy** | High-density data SaaS dashboard (Grafana / CDC standard) — functional, calm, zero decorative fluff |

---

## 🎯 Executive Summary

Healthcare facilities can face medicine shortages because demand fluctuates, inventory is fragmented, and supply-chain decisions are often reactive.

**SentinelHealth** transforms healthcare resource data into predictive and actionable intelligence by combining demand forecasting, stock-out prediction, early-warning alerts, optimization, and federated learning.

The platform enables healthcare administrators to:

- Monitor Primary Health Centres (PHCs) and national health resilience with calculated resilience scores
- Track medicine inventory, bed capacity, and personnel availability
- Monitor patient footfall and demand patterns with forecasting
- Forecast future demand with transparent reasoning and confidence intervals
- Predict potential stock-outs with clear timelines and severity rankings
- Detect abnormal demand spikes and consumption anomalies
- Recommend medicine redistribution with before/after impact analysis
- Simulate outbreak scenarios and projected system response
- Demonstrate privacy-aware collaborative ML through Federated Learning
- Follow clear MONITOR → PREDICT → RESPOND → COLLABORATE workflow

## 🌍 Live Deployments

- **Frontend Dashboard**: [https://frontend-smoky-pi-12.vercel.app](https://frontend-smoky-pi-12.vercel.app) - Interactive dashboard with all features
- **Backend API**: [https://backend-weld-three-59.vercel.app](https://backend-weld-three-59.vercel.app) - REST API with WebSocket support

*For detailed project information, see [ABOUT.md](ABOUT.md)*

```text
PHC / HEALTHCARE DATA
        │
        ▼
1. MONITOR ──────▶ PHC status, inventory, beds, staff, patient footfall
        │
        ▼
2. PREDICT ──────▶ AI demand forecasting, stock-out risk detection
        │
        ▼
3. RESPOND ──────▶ AI redistribution recommendations, human approval
        │
        ▼
4. COLLABORATE ──▶ Federated learning across BRICS nations
```

---

## 🚀 Key Features

| Feature                 | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| 📊 PHC Monitoring       | Monitor healthcare centres, inventory and resource availability with national resilience scoring |
| 🔮 Demand Forecasting   | Predict future medicine requirements with confidence intervals  |
| 🚨 Stock-Out Prediction | Identify medicines at risk of running out with severity rankings |
| 🔔 Early-Warning Alerts | Generate risk-based alerts before shortages become critical     |
| 🚚 Redistribution       | Recommend optimized transfers between PHCs with impact analysis  |
| 🦠 Outbreak Simulation  | Simulate sudden demand spikes and observe system response       |
| 🌐 Federated Learning   | Simulate collaborative ML across BRICS nodes with privacy preservation |
| 🗺️ PHC Map             | Visualize healthcare facilities and their resource status       |
| 👤 Human-in-the-Loop    | Allow administrators to review and approve recommendations      |
| 🎯 Operational KPIs    | Bed capacity, staff availability, patient footfall tracking     |
| 📈 AI Decision Timeline | Visual processing steps from detection to human approval       |

---

## 🏗️ System Architecture

```text
                         ┌───────────────────┐
                         │       USER        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React Frontend   │
                         │ Dashboard + Maps  │
                         └─────────┬─────────┘
                                   │
                             REST / WebSocket
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   FastAPI API     │
                         └─────────┬─────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                ▼                  ▼                  ▼
         ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
         │ PostgreSQL  │   │  ML Engine  │   │ Optimization│
         │  Database   │   │ Forecasting │   │    Engine   │
         └─────────────┘   └─────────────┘   └─────────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Federated Learning│
                         │      Flower       │
                         └─────────┬─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
                  🇮🇳 India      🇧🇷 Brazil     🇿🇦 S.Africa
                    │              │              │
                    └──────────────┼──────────────┘
                                   ▼
                                 FedAvg
```

---

## 🧠 AI / ML Pipeline

### Demand Forecasting

Historical medicine demand is used to generate configurable forecasts:

```text
Historical Demand
       ↓
Data Preprocessing
       ↓
Feature Generation
       ↓
Forecasting Model
       ↓
7 / 14 / 30 Day Forecast
       ↓
MAE / RMSE Evaluation
```

### Stock-Out Prediction

Stock-out risk is calculated using:

* Current inventory
* Predicted demand
* Safety-stock threshold
* Replenishment assumptions

Output:

```json
{
  "medicine": "Medicine A",
  "current_stock": 420,
  "predicted_stockout_days": 4,
  "risk": "HIGH"
}
```

---

## 🚚 Intelligent Redistribution

When one PHC has surplus inventory while another is approaching a shortage, SentinelHealth generates a redistribution recommendation.

The optimization considers:

* Source surplus
* Destination shortage
* Safety stock
* Demand urgency
* Transportation distance / cost

Optimization is implemented using:

```text
scipy.optimize.linprog
```

Example:

```text
PHC-042
Surplus: 700 units
       │
       │  Recommended Transfer
       │  300 units
       ▼
PHC-017
Predicted shortage: 2 days
```

The system provides a recommendation for **human approval** rather than claiming to execute physical logistics automatically.

---

## 🌐 Federated Learning

SentinelHealth demonstrates a simulated Federated Learning environment involving:

```text
🇮🇳 India
🇧🇷 Brazil
🇿🇦 South Africa
```

Each node:

1. Keeps its local synthetic dataset.
2. Trains locally.
3. Sends model updates rather than raw training data.
4. Participates in server-side aggregation.
5. Receives the updated global model.

```text
India ───────┐
Brazil ──────┼──▶ Federated Server ──▶ FedAvg
S.Africa ────┘             │
                           ▼
                     Global Model
```

Federated Learning is implemented using **Flower**.

> ⚠️ This is a simulated prototype. Federated Learning alone does not guarantee complete privacy. A production system would require secure aggregation, encryption, authentication, differential privacy where appropriate, and audit controls.

---

## 🦠 Outbreak Simulation

SentinelHealth includes a controlled outbreak simulation for demonstrating how the platform responds to sudden demand increases.

```text
Normal Demand
      ↓
Simulated Demand Spike
      ↓
Inventory Depletion
      ↓
Forecast Update
      ↓
Stock-Out Risk
      ↓
Critical Alert
      ↓
Redistribution Recommendation
```

The scenario can be reset after demonstration.

---

## 📊 Decision-Support Dashboard

The dashboard provides:

* **National Health Resilience Score** - System-wide health status (STABLE/AT RISK/CRITICAL)
* **Operational KPI Hierarchy** - Medicine availability, bed capacity, staff, patient footfall
* **Critical Risks Section** - Immediate action items prominently displayed
* **AI Decision Timeline** - Visual processing steps from detection to approval
* **Total PHCs** - Monitored facilities with status filtering
* **Medicine availability** - Real-time inventory tracking
* **Critical alerts** - Severity-based early warnings
* **Predicted stock-outs** - Days-to-stockout calculations
* **Demand forecasts** - Time-series predictions with confidence bands
* **PHC map** - Geographic visualization with status indicators
* **Inventory status** - Category and status filtering
* **Redistribution recommendations** - SciPy optimized transfer plans
* **Federated Learning status** - BRICS node performance and privacy metrics

---

## 🛠️ Technology Stack

| Layer              | Technologies                        |
| ------------------ | ----------------------------------- |
| Frontend           | React, Vite, Tailwind CSS           |
| Visualization      | Recharts, Leaflet                   |
| Backend            | Python, FastAPI                     |
| Database           | PostgreSQL                          |
| ML                 | Python, NumPy, pandas, scikit-learn |
| Optimization       | SciPy                               |
| Federated Learning | Flower, FedAvg                      |
| Communication      | REST API, WebSockets                |
| Deployment         | Docker, Docker Compose              |
| Version Control    | Git, GitHub                         |

---

## 📁 Project Structure

```text
SentinelHealth/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── database/
│   └── main.py
│
├── ml/
│   ├── forecasting/
│   ├── stockout/
│   └── evaluation/
│
├── fl/
│   ├── server.py
│   ├── india_client.py
│   ├── brazil_client.py
│   └── south_africa_client.py
│
├── data/
│   └── generator.py
│
├── docs/
│   ├── architecture.md
│   ├── ML.md
│   └── federated-learning.md
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

* Python 3.11+
* Node.js 18+
* npm
* Docker & Docker Compose
* Git


## ⚡ API Endpoints

| Method | Endpoint                           | Description               |
| ------ | ---------------------------------- | ------------------------- |
| GET    | `/api/health`                      | Backend health check      |
| GET    | `/api/phcs`                        | List PHCs                 |
| GET    | `/api/inventory`                   | Get inventory status      |
| GET    | `/api/alerts`                      | Get active alerts         |
| GET    | `/api/forecast/{id}`               | Get demand forecast       |
| GET    | `/api/redistribution`              | Get recommendations       |
| POST   | `/api/redistribution/{id}/approve` | Approve recommendation    |
| POST   | `/api/simulation/outbreak`         | Start outbreak simulation |
| POST   | `/api/simulation/reset`            | Reset simulation          |
| GET    | `/api/federated/status`            | Get FL status             |
| POST   | `/api/federated/start`             | Start FL round            |

---

## 🧪 Testing

The project includes testing across:

* Backend APIs
* Database operations
* Forecasting
* Stock-out prediction
* Optimization constraints
* Outbreak simulation
* Federated Learning
* Frontend/API integration

Run tests with:

```bash
pytest
```

---

## 🛡️ Implementation vs Future Scope

| Feature                                   | Status        |
| ----------------------------------------- | ------------- |
| PHC Monitoring                            | ✅ Implemented |
| Inventory Tracking                        | ✅ Implemented |
| Demand Forecasting                        | ✅ Implemented |
| Stock-Out Prediction                      | ✅ Implemented |
| Early-Warning Alerts                      | ✅ Implemented |
| Redistribution Optimization               | ✅ Implemented |
| Outbreak Simulation                       | ✅ Implemented |
| Federated Learning Simulation             | ✅ Implemented |
| Real Government Health-System Integration | 🔮 Future     |
| Real-Time Hospital/PHC Data               | 🔮 Future     |
| Secure Aggregation                        | 🔮 Future     |
| Differential Privacy                      | 🔮 Future     |
| Production Healthcare Compliance          | 🔮 Future     |
| Automated Logistics Integration           | 🔮 Future     |

> **Note:** Update implementation statuses as features are actually completed.

---

## 🔐 Data & Privacy

The prototype uses **synthetic healthcare data**.

No real patient-identifiable information is required.

The Federated Learning component demonstrates collaborative training using simulated national nodes. Production deployment would require additional security, privacy, authentication, compliance, and audit mechanisms.

---



## 📜 License

This project is released under the **MIT License**.

```

