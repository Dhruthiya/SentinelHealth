# About SentinelHealth

**SentinelHealth** is a federated AI platform for health resource and supply chain resilience, designed for the BRICS AI Challenge (Track 3: Smart Health & Supply Chain Resilience).

## 🎯 Mission

Transform healthcare resource data into predictive and actionable intelligence by combining demand forecasting, stock-out prediction, early-warning alerts, optimization, and federated learning to prevent medicine shortages and improve healthcare outcomes.

## 🌍 Live Deployments

- **Frontend Dashboard**: [https://frontend-smoky-pi-12.vercel.app](https://frontend-smoky-pi-12.vercel.app) - Interactive dashboard with all features
- **Backend API**: [https://backend-weld-three-59.vercel.app](https://backend-weld-three-59.vercel.app) - REST API with WebSocket support

## 🏗️ Architecture Overview

SentinelHealth follows a clear **MONITOR → PREDICT → RESPOND → COLLABORATE** workflow:

```
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

## 🚀 Key Features

### 1. National Health Resilience Monitoring
- Real-time tracking of Primary Health Centres (PHCs) across districts
- Comprehensive health system metrics including bed capacity, staff availability, and patient footfall
- Calculated resilience score with status indicators (STABLE/AT RISK/CRITICAL)

### 2. AI-Powered Demand Forecasting
- Time-series forecasting using machine learning models
- 7, 14, and 30-day prediction horizons with confidence intervals
- Automatic consumption pattern analysis and anomaly detection

### 3. Early Warning System
- Stock-out prediction with clear timelines
- Severity-based alert classification (CRITICAL, WARNING, HEALTHY)
- Days-to-stockout calculator for proactive resource management

### 4. Resource Redistribution Optimization
- SciPy linear programming optimization for transfer recommendations
- Human-in-the-loop approval workflow
- Before/after impact analysis for transparency

### 5. Outbreak Simulation
- Simulated outbreak scenarios (Dengue, Cholera, Logistics disruption)
- Demand spike injection and system response modeling
- Real-time alert generation and transfer recalculation

### 6. Privacy-Preserving Federated Learning
- Collaborative ML across BRICS nations (India, Brazil, South Africa)
- 100% data privacy - only model weights shared, not patient data
- Flower framework for FedAvg aggregation
- Performance comparison: Local-only vs Federated Global models

## 🎨 User Interface

The dashboard features a modern, responsive design with:

- **National Health Resilience Banner** - System-wide health status at a glance
- **Operational KPI Hierarchy** - Medicine availability, bed capacity, staff, patient footfall
- **Critical Risks Section** - Immediate action items prominently displayed
- **AI Decision Timeline** - Visual processing steps from detection to approval
- **Interactive Maps** - Geographic visualization of PHC locations and status
- **Real-time Telemetry** - WebSocket-based live updates

## 🔒 Privacy & Security

- **Federated Learning**: Patient data never leaves local systems
- **Data Sovereignty**: Each country maintains control over their health records
- **Secure Aggregation**: Only mathematical model parameters are shared
- **Human Oversight**: All redistribution decisions require human approval

## 🛠️ Technology Stack

### Frontend
- React with Vite
- Lucide React icons
- Responsive CSS design
- WebSocket client for real-time updates

### Backend
- FastAPI for REST API
- SQLAlchemy ORM with PostgreSQL
- SciPy for optimization
- Flower for federated learning
- WebSocket support for live telemetry

### Machine Learning
- Custom demand forecasting engine
- Early warning alert system
- Linear programming optimization
- Federated learning aggregation

## 📊 Data & Metrics

The system currently monitors:
- **142 PHCs** across multiple districts
- **Essential medicines** with consumption tracking
- **Bed capacity** and occupancy rates
- **Staff availability** and attendance
- **Patient footfall** with forecasting
- **Supply chain** transfer recommendations

## 🌐 BRICS Collaboration

SentinelHealth demonstrates international collaboration through federated learning:

- **India Node**: AIIMS Delhi / UP State Health Node (142 PHCs)
- **Brazil Node**: Fiocruz Rio / SUS Network Node (98 PHCs)  
- **South Africa Node**: SAMRC Cape Town / National Node (76 PHCs)

Each node trains locally on their own data while contributing to a global model, improving prediction accuracy without compromising patient privacy.

## 📈 Impact & Outcomes

- **Reduced Stock-outs**: Proactive alerts prevent medicine shortages
- **Optimized Distribution**: AI recommendations improve resource allocation
- **Enhanced Resilience**: System-wide visibility enables better decision-making
- **Privacy Preservation**: Federated learning enables collaboration without data sharing
- **Rapid Response**: Outbreak simulation prepares for emergency scenarios

## 🔮 Future Enhancements

- Integration with real-time national health databases
- Mobile applications for field workers
- Advanced predictive analytics for disease trends
- Expansion to additional BRICS partner countries
- Integration with supply chain management systems

## 📞 Contact & Support

For questions about SentinelHealth or deployment issues, please refer to the project documentation or create an issue in the repository.

---

**Built for the BRICS AI Challenge 2026**  
*Track 3: Smart Health & Supply Chain Resilience*