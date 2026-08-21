# SentinelHealth
### Federated AI Platform for National Health Resource & Supply Chain Resilience

**BRICS Build-with-AI Challenge — Track 3: Smart Health & Supply Chain Resilience**

> **Predict health-resource shortages before they happen, recommend where resources should move, and enable participating nations to improve forecasting models collaboratively without exchanging raw health or inventory records.**

---

## Table of Contents

1. [Overview](#1-overview)
2. [Problem Statement](#2-problem-statement)
3. [Proposed Solution](#3-proposed-solution)
4. [Key Innovation](#4-key-innovation)
5. [System Architecture](#5-system-architecture)
6. [Core Features](#6-core-features)
7. [End-to-End Workflow](#7-end-to-end-workflow)
8. [Machine Learning & Forecasting](#8-machine-learning--forecasting)
9. [Federated Learning Design](#9-federated-learning-design)
10. [Redistribution Optimization](#10-redistribution-optimization)
11. [Early-Warning Engine](#11-early-warning-engine)
12. [Data & Privacy](#12-data--privacy)
13. [What's Real vs Simulated](#13-whats-real-vs-simulated)
14. [Technology Stack](#14-technology-stack)
15. [Data Model](#15-data-model)
16. [API Reference](#16-api-reference)
17. [Project Structure](#17-project-structure)
18. [Installation & Setup](#18-installation--setup)
19. [Evaluation](#19-evaluation)
20. [Demo Scenario](#20-demo-scenario)
21. [Limitations](#21-limitations)
22. [Future Roadmap](#22-future-roadmap)
23. [Team](#23-team)
24. [License](#24-license)

---

# 1. Overview

**SentinelHealth** is an AI-powered decision-support platform designed to improve the resilience of Primary Health Centre (PHC) networks.

The platform combines:

- real-time resource visibility
- medicine demand forecasting
- stock-out prediction
- early-warning alerts
- cross-district redistribution recommendations
- federated learning for collaborative forecasting

The system is designed around a simple principle:

> **Predict the shortage → identify the cause → recommend the intervention → measure the outcome.**

For the BRICS context, SentinelHealth additionally demonstrates how participating countries can collaborate on predictive models while keeping their underlying health-resource data within their own national infrastructure.

## Live Deployments

The platform is deployed and accessible at:

- **Frontend Dashboard**: [https://frontend-smoky-pi-12.vercel.app](https://frontend-smoky-pi-12.vercel.app) - Interactive dashboard with all features
- **Backend API**: [https://backend-weld-three-59.vercel.app](https://backend-weld-three-59.vercel.app) - REST API with WebSocket support

Both deployments are fully functional and demonstrate the complete system capabilities including the enhanced UI/UX features, operational KPIs, and federated learning simulation.

---

# 2. Problem Statement

Public healthcare systems operate across large and geographically distributed networks of facilities. Resource availability can vary significantly between neighbouring PHCs and districts.

Three major problems create supply-chain vulnerability:

### 2.1 Limited visibility

Authorities may not have a unified, continuously updated view of medicine stock, bed occupancy, or staff availability across PHCs.

### 2.2 Reactive planning

Traditional planning often relies heavily on historical records and periodic reporting. This makes it difficult to anticipate sudden changes in demand caused by seasonal patterns or outbreaks.

### 2.3 Poor resource coordination

One PHC may have surplus stock while another nearby PHC is approaching a shortage. Without a coordinated decision-support system, available resources may not be redistributed efficiently.

### 2.4 The cross-national challenge

At a BRICS scale, countries may face similar healthcare logistics patterns while having different data-governance requirements.

A centralised system that requires countries to exchange raw healthcare data would create significant privacy, governance, and sovereignty concerns.

SentinelHealth addresses this through a **federated learning architecture**.

---

# 3. Proposed Solution

SentinelHealth consists of four connected capabilities:

```text
PHC Data
   ↓
Real-Time Visibility
   ↓
Demand Forecasting
   ↓
Early-Warning Detection
   ↓
Redistribution Optimization
   ↓
Human Decision
```

Alongside this national-level workflow, participating countries can train a shared predictive model through federated learning:

```text
Country A ── local training ──┐
Country B ── local training ──┼──> Federated Aggregation
Country C ── local training ──┘             ↓
                                      Global Model
                                             ↓
                                  Improved Local Predictions
```

Raw PHC records remain within the participating node in the prototype architecture.

---

# 4. Key Innovation

The main innovation is not simply a healthcare dashboard or a forecasting model.

SentinelHealth connects **prediction with action**.

### Conventional approach

```text
Stock-out occurs
      ↓
Authority discovers problem
      ↓
Emergency response
```

### SentinelHealth approach

```text
Historical + current data
          ↓
Demand forecast
          ↓
Predicted stock-out
          ↓
Early warning
          ↓
Surplus/deficit analysis
          ↓
Transfer recommendation
          ↓
Human approval
```

### BRICS-level innovation

The federated layer adds another level:

```text
National data
     ↓
Local model training
     ↓
Model update
     ↓
Federated aggregation
     ↓
Shared model
```

This allows countries to explore collaborative learning without creating a central repository of raw PHC data.

---

# 5. System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    SENTINELHEALTH                           │
│                                                             │
│              National Decision Dashboard                    │
│                                                             │
│ PHC Map │ Inventory │ Forecasts │ Alerts │ Transfers │ FL  │
└────────────────────────────┬────────────────────────────────┘
                             │
                    REST API + WebSocket
                             │
┌────────────────────────────▼────────────────────────────────┐
│                       FastAPI Backend                        │
│                                                             │
│ /phc  /stock  /forecast  /alerts  /redistribution  /fl     │
└──────────────┬──────────────────────┬────────────────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────┐    ┌─────────────────────────────────┐
│     Data Layer       │    │       Intelligence Layer        │
│                      │    │                                 │
│ PostgreSQL           │    │ Demand Forecasting              │
│ PHC records          │    │ Stock-out Prediction            │
│ Stock history        │    │ Anomaly Detection               │
│ Bed occupancy        │    │ Redistribution Optimization     │
│ Staff attendance     │    │                                 │
└──────────────────────┘    └────────────────┬────────────────┘
                                             │
                                             ▼
                              ┌──────────────────────────────┐
                              │ Federated Learning Prototype │
                              │                              │
                              │ Node A ─┐                    │
                              │ Node B ─┼─> FedAvg           │
                              │ Node C ─┘                    │
                              │                              │
                              │ Local data remains local     │
                              └──────────────────────────────┘
```

### Architectural principle

The prototype is designed so that national nodes train locally and exchange model updates rather than raw PHC records.

This demonstrates the **federated-learning concept**. It should not be interpreted as a production-ready cross-border healthcare deployment.

---

# 6. Core Features

## 6.1 Real-Time PHC Visibility

The dashboard provides a consolidated view of:

- **National Health Resilience Score** - System-wide health status (STABLE/AT RISK/CRITICAL) based on calculated metrics
- medicine stock
- bed occupancy
- staff availability
- patient footfall with forecasting
- PHC location
- resource urgency

The dashboard now features an operational hierarchy prioritizing:
1. Medicine availability (most critical operationally)
2. Bed capacity utilization
3. Staff on duty/attendance
4. Patient footfall with trend forecasting

The hackathon prototype uses synthetic event generation to simulate continuously changing PHC conditions.

---

## 6.2 Demand Forecasting

The system predicts medicine demand over configurable horizons such as:

- 7 days
- 14 days
- 30 days

Forecasting considers historical consumption and simulated seasonal/outbreak effects.

The system can maintain conventional forecasting models such as Prophet/ARIMA as baselines while using a parameterized model for federated training.

---

## 6.3 Stock-Out Prediction

The system combines:

```text
Current inventory
+
Predicted future demand
+
Safety-stock threshold
+
Expected replenishment
```

to estimate whether and when a PHC may run out of a medicine.

Example:

```text
Medicine: ORS
Current Stock: 180 units
Predicted Demand: 95 units/day
Safety Stock: 50 units

Predicted stock-out:
Within 3 days
```

---

## 6.4 Early-Warning System

Alerts are generated from:

### Threshold alerts

Current stock falls below the configured safety threshold.

### Forecast alerts

The model predicts a stock-out within a defined number of days.

### Anomaly alerts

Observed consumption significantly deviates from expected patterns.

Alerts are ranked by severity and displayed on the dashboard with a prominent **Critical Risks Section** for immediate action items.

### Enhanced Dashboard Features

The dashboard now includes:

- **AI Decision Timeline** - Visual processing steps from detection to human approval
- **Privacy-Preserving Flow Explanation** - Clear demonstration of how federated learning works without sharing patient data
- **Before/After Impact Analysis** - Shows the projected impact of redistribution recommendations
- **Real-time Telemetry** - WebSocket-based live updates for system status

---

## 6.5 Redistribution Recommendations

The system identifies:

- PHCs with projected shortages
- nearby PHCs with surplus inventory
- transfer quantities
- urgency
- approximate distance

It then produces a ranked recommendation.

Example:

```text
URGENT TRANSFER

Source:
District B / PHC-14

Destination:
District A / PHC-07

Medicine:
Medicine X

Quantity:
200 units

Reason:
Destination projected to stock out within 3 days.

Priority:
High
```

The prototype deliberately uses **human-in-the-loop decision making**.

The system recommends an action but does not automatically execute a real-world transfer.

---

# 7. End-to-End Workflow

```text
             PHC DATA
                │
                ▼
       ┌─────────────────┐
       │ Data Ingestion  │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │ Current Status  │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │ Demand Forecast │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │ Stock-out Risk  │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │ Early Warning   │
       └────────┬────────┘
                ▼
       ┌─────────────────────┐
       │ Redistribution      │
       │ Optimization        │
       └─────────┬───────────┘
                 ▼
        Human Approval
                 │
                 ▼
          Recommended Action
```

---

# 8. Machine Learning & Forecasting

## 8.1 Forecasting Baseline

The prototype may use established time-series approaches such as:

- Prophet
- ARIMA

These provide interpretable baseline forecasts suitable for comparison.

## 8.2 Federated Forecasting Model

For federated learning, the forecasting component should use a **parameterized model whose parameters can be meaningfully aggregated using FedAvg**.

The federated model receives locally available features such as:

- historical medicine demand
- current inventory
- seasonal indicators
- PHC-level demand patterns
- outbreak indicators

Each national node trains the model locally.

Only the model update is sent to the aggregator.

## 8.3 Evaluation

The system should compare:

```text
Local-only model
        vs
Federated global model
        vs
Baseline model
```

using metrics such as:

- MAE
- RMSE
- stock-out prediction accuracy
- stock-out prediction lead time

The system does **not assume beforehand** that federated learning will always improve accuracy. The experiment measures whether collaborative training produces an improvement for the generated datasets.

---

# 9. Federated Learning Design

The prototype uses Flower to simulate multiple participating national nodes.

### Training process

**Step 1 — Local data**

Each node receives its own partition of synthetic PHC data.

```text
India Node
    └── India PHC data

Brazil Node
    └── Brazil PHC data

South Africa Node
    └── South Africa PHC data
```

### Step 2 — Local training

Each node trains the federated forecasting model locally.

### Step 3 — Model update

The node sends model parameters/updates to the aggregation server.

### Step 4 — Aggregation

The server performs Federated Averaging (FedAvg).

### Step 5 — Global model

The aggregated model is returned to participating nodes.

### Step 6 — Evaluation

Performance is compared between:

```text
Local-only training
          vs
Federated training
```

---

## Important Privacy Note

Federated learning reduces the need to exchange raw data, but it does **not automatically guarantee complete privacy**.

Model updates can potentially leak information under certain threat models.

A production implementation would therefore require additional mechanisms such as:

- secure aggregation
- encrypted communication
- node authentication
- differential privacy where appropriate
- malicious-update detection
- audit logging
- country-specific compliance controls

These are outside the scope of the hackathon prototype.

---

# 10. Redistribution Optimization

The redistribution engine treats resource allocation as an optimization problem.

The objective is to prioritize shortage reduction while considering factors such as:

- available surplus
- destination demand
- safety-stock requirements
- urgency
- distance/transport cost

Conceptually:

```text
Minimize:

Shortage Penalty
+
Transport Cost
+
Urgency Penalty
```

subject to constraints such as:

```text
Source inventory cannot fall below safety stock.

Transfer quantity must be non-negative.

Destination demand should be satisfied where feasible.

Only eligible source PHCs can provide stock.
```

The prototype uses linear optimization through SciPy's `linprog`, with a rule-based fallback where optimization cannot produce a feasible solution.

---

# 11. Early-Warning Engine

The alert engine combines current and predicted conditions.

### Example logic

```text
IF current_stock < safety_stock
    → CRITICAL ALERT

IF predicted_stockout <= N days
    → FORECAST ALERT

IF demand deviation > anomaly threshold
    → ANOMALY ALERT
```

Alerts contain:

- PHC
- medicine
- severity
- alert type
- predicted stock-out date where applicable
- creation timestamp
- resolution status

---

# 12. Data & Privacy

## Synthetic Data

The prototype does not require real patient records.

Synthetic PHC data is generated to simulate:

- normal consumption
- seasonal demand
- outbreak-driven demand spikes
- varying PHC capacity
- inventory changes
- staff and bed availability

A simplified demand-generation concept is:

```text
Demand =
Baseline
+ Seasonality
+ Random Variation
+ Outbreak Effect
+ PHC-specific Factors
```

Inventory evolves according to:

```text
Future Stock =
Current Stock
+ Replenishment
- Consumption
```

This allows realistic scenarios to be demonstrated without exposing sensitive healthcare information.

---

# 13. What's Real vs Simulated

Transparency is a core part of the prototype.

| Component | Status |
|---|---|
| Dashboard | Functional prototype |
| PHC map | Functional with synthetic PHC locations |
| Stock tracking | Functional using synthetic data |
| WebSocket updates | Functional prototype |
| Demand forecasting | Functional on synthetic data |
| Early-warning engine | Functional |
| Redistribution logic | Functional recommendation engine |
| Human approval workflow | Prototype |
| Federated learning | Functional simulation using Flower |
| National nodes | Simulated |
| PHC data | Synthetic |
| Cross-border deployment | Not implemented |
| Real healthcare integration | Not implemented |
| Secure aggregation | Future work |
| Differential privacy | Future work |
| Regulatory compliance | Future work |
| Real logistics execution | Not implemented |

### What the prototype demonstrates

The prototype demonstrates the **technical workflow and feasibility** of the proposed architecture.

It does not claim to be a production-ready national healthcare infrastructure.

---

# 14. Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Backend | FastAPI / Python | APIs and application logic |
| Database | PostgreSQL | PHC and resource data |
| Frontend | React + Vite + TailwindCSS | Dashboard with enhanced UI/UX |
| Charts | Recharts | Forecast and performance visualization |
| Maps | Leaflet.js | PHC geographic visualization |
| Icons | Lucide React | Modern icon system |
| Forecasting | Prophet / ARIMA | Baseline forecasting |
| Federated Model | Parameterized ML model | Federated forecasting |
| Federated Learning | Flower | FL orchestration |
| Optimization | SciPy `linprog` | Redistribution optimization |
| Real-time updates | WebSocket | Dashboard event updates |
| Deployment | Vercel | Cloud deployment for frontend and backend |
| Containers | Docker / Docker Compose | Reproducible deployment |
| CI | GitHub Actions | Automated testing |
| Authentication | JWT / RBAC | Future production capability |

---

# 15. Data Model

```text
PHC
├── id
├── name
├── district
├── state
├── latitude
├── longitude
└── capacity_beds

Medicine
├── id
├── name
├── category
└── safety_stock_threshold

StockRecord
├── id
├── phc_id
├── medicine_id
├── quantity
└── timestamp

BedOccupancy
├── id
├── phc_id
├── occupied
├── total
└── timestamp

StaffAttendance
├── id
├── phc_id
├── role
├── present
├── scheduled
└── timestamp

ForecastResult
├── id
├── phc_id
├── medicine_id
├── predicted_demand
├── predicted_stockout_date
└── generated_at

Alert
├── id
├── phc_id
├── medicine_id
├── severity
├── type
├── created_at
└── resolved

RedistributionRecommendation
├── id
├── medicine_id
├── source_phc_id
├── destination_phc_id
├── quantity
├── urgency_score
└── created_at

FLRound
├── id
├── round_number
├── node_id
├── local_metric
├── global_metric
└── timestamp
```

---

# 16. API Reference

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/phc` | List PHCs and current status |
| GET | `/api/phc/{id}/stock` | Get current stock for a PHC |
| GET | `/api/forecast/{phc_id}/{medicine_id}` | Retrieve demand forecast |
| GET | `/api/alerts` | Retrieve active alerts |
| GET | `/api/redistribution/recommendations` | Retrieve transfer recommendations |
| POST | `/api/redistribution/{id}/approve` | Approve a recommendation |
| GET | `/api/fl/status` | Retrieve FL training status |
| WS | `/ws/live` | Receive simulated real-time updates |

Interactive API documentation is available through FastAPI's Swagger interface at:

```text
/docs
```

when the backend is running.

---

# 17. Project Structure

```text
sentinelhealth/
│
├── README.md
├── docs/
│   ├── architecture.md
│   ├── data-model.md
│   └── demo-script.md
│
├── backend/
│   ├── api/
│   │   ├── routes/
│   │   └── websocket/
│   │
│   ├── ml/
│   │   ├── forecasting.py
│   │   ├── redistribution.py
│   │   └── anomaly.py
│   │
│   ├── fl_simulation/
│   │   ├── client.py
│   │   ├── server.py
│   │   └── strategy.py
│   │
│   ├── data_generator/
│   │   ├── synthetic_phc_data.py
│   │   └── seed.py
│   │
│   ├── tests/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
│
├── docker-compose.yml
├── .env.example
└── .github/
    └── workflows/
        └── ci.yml
```

---

# 18. Installation & Setup

## Prerequisites

- Docker
- Docker Compose
- Node.js 18+ for frontend development
- Python 3.11+ for backend development

## Quick Start

```bash
git clone https://github.com/<your-org>/sentinelhealth.git

cd sentinelhealth

cp .env.example .env

docker-compose up --build
```

The Docker environment starts:

```text
api
db
frontend
fl-server
fl-node-india
fl-node-brazil
fl-node-southafrica
```

## Seed Synthetic Data

```bash
docker-compose exec api python data_generator/seed.py
```

## Open Dashboard

```text
http://localhost:5173
```

## API Documentation

```text
http://localhost:8000/docs
```

---

# 19. Evaluation

The project should be evaluated using measurable outcomes rather than only visual demonstrations.

## Forecasting

Measure:

- MAE
- RMSE
- forecast stability
- stock-out prediction accuracy

## Federated Learning

Compare:

```text
Local-only model
vs
Federated model
```

across multiple training rounds.

## Early Warning

Measure:

- percentage of stock-outs detected before occurrence
- average warning lead time
- false-positive rate

## Redistribution

Measure:

- shortage reduction
- number of critical shortages resolved
- total transfer distance
- unused surplus after recommendations

The purpose is to determine whether the system improves decision-making, rather than assuming that every AI component automatically provides an improvement.

---

# 20. Demo Scenario

The recommended three-minute demonstration follows a single outbreak scenario.

### Step 1 — Normal State

Open the dashboard.

Show:

- PHC map
- current inventory
- bed occupancy
- staff status

Most facilities are in a healthy state.

### Step 2 — Trigger Outbreak

Use the demo control to introduce a simulated demand spike in one district.

```text
Outbreak
   ↓
Demand increases
   ↓
Inventory begins declining
```

### Step 3 — Forecast

The forecasting panel detects increasing demand.

Example:

```text
Medicine X

Current stock: 450
Predicted demand: increasing
Predicted stock-out: 3 days
```

### Step 4 — Alert

The early-warning engine generates:

```text
HIGH PRIORITY

PHC-07 is predicted to stock out
within 3 days.
```

### Step 5 — Redistribution

The system identifies a nearby PHC with surplus inventory.

```text
Transfer Recommendation

Source: PHC-14
Destination: PHC-07
Medicine: X
Quantity: 200 units
Priority: HIGH
```

The administrator can approve the recommendation.

### Step 6 — Federated Learning

Switch to the federation dashboard.

Show:

```text
India ─────┐
Brazil ────┼──> FedAvg ──> Global Model
S.Africa ──┘
```

Then compare the measured local and federated model performance.

### Final message

> **“SentinelHealth turns fragmented healthcare resource data into predictive decisions while providing a pathway for countries to collaborate on forecasting without centralizing their raw data.”**

---

# 21. Limitations

The current prototype has several important limitations.

### Synthetic data

The system is evaluated on generated data rather than production PHC data.

### Simulated national nodes

The BRICS federation is demonstrated using simulated nodes rather than independent national infrastructures.

### Prototype security

Production-grade security mechanisms such as secure aggregation, advanced authentication, and differential privacy are not implemented.

### Forecasting limitations

Forecast quality depends strongly on the characteristics and representativeness of the available training data.

### Recommendation-only logistics

The system recommends transfers but does not directly control physical logistics or inventory movement.

### Regulatory integration

Healthcare regulations, data-sharing agreements, and country-specific compliance requirements would need to be addressed before real-world deployment.

---

# 22. Future Roadmap

## Phase 1 — Hackathon Prototype

- Synthetic PHC data
- Forecasting
- Early-warning engine
- Redistribution recommendations
- Federated learning simulation
- Interactive dashboard

## Phase 2 — Pilot Deployment

- Real PHC data integration
- Authentication and role-based access
- Monitoring and audit logs
- Improved forecasting models
- Secure communication

## Phase 3 — National Deployment

- Integration with existing health information systems
- Offline-first PHC data-entry application
- Real logistics-provider integration
- Automated inventory synchronization

## Phase 4 — BRICS Federation

- Independent national FL infrastructure
- Secure aggregation
- Differential privacy where appropriate
- Model-update security
- Cross-national governance framework
- Country-specific compliance mechanisms

---

# 23. Team

## SentinelHealth Team

| Member | Role |
|---|---|
| `<Name>` | Full-Stack Development |
| `<Name>` | Machine Learning & Forecasting |
| `<Name>` | Federated Learning & Backend |
| `<Name>` | UI/UX & Product |

Replace the placeholders with the actual team members and responsibilities before submission.

---

# 24. License

This project is released under the **MIT License**.

See `LICENSE` for details.

---

## Project Status

**Hackathon Prototype**

SentinelHealth demonstrates the feasibility of combining AI forecasting, early-warning detection, resource optimization, and federated learning for healthcare supply-chain resilience.

The system is designed as a **decision-support prototype**, not a replacement for healthcare authorities or logistics personnel.