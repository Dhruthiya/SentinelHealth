import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { 
  ShieldCheck, 
  BrainCircuit,
  AlertTriangle
} from 'lucide-react';

export default function Forecasts({ timeSeriesData, phcs }) {
  const [selectedPhcId, setSelectedPhcId] = useState('PHC-017');
  const [selectedMedicine, setSelectedMedicine] = useState('ORS Packets');
  const [horizonDays, setHorizonDays] = useState(14);

  const selectedPhcObj = phcs.find(p => p.id === selectedPhcId) || phcs[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Controls */}
      <div className="sh-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              DEEP TIME-SERIES TELEMETRY // CONFIDENCE BAND MATRIX
            </div>
            <h2 
              style={{ 
                fontSize: '22px', 
                fontWeight: 800, 
                color: '#D1E8E2', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                fontFamily: 'var(--font-title)',
                marginTop: '4px'
              }}
              className="text-glow"
            >
              <BrainCircuit size={22} color="#8cd3d4" />
              <span>AI DEMAND FORECASTING &amp; CONFIDENCE INTERVALS</span>
            </h2>
            <div style={{ fontSize: '12px', color: '#bec8c8', marginTop: '2px' }}>
              Predictive time-series model incorporating historical consumption, seasonal trends, and federated BRICS parameters
            </div>
          </div>

          {/* Selectors */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '10px', fontWeight: '700', color: '#bec8c8', display: 'block', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>PHC FACILITY</label>
              <select 
                className="sh-select"
                value={selectedPhcId}
                onChange={(e) => setSelectedPhcId(e.target.value)}
              >
                {phcs.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '10px', fontWeight: '700', color: '#bec8c8', display: 'block', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>MEDICINE ITEM</label>
              <select 
                className="sh-select"
                value={selectedMedicine}
                onChange={(e) => setSelectedMedicine(e.target.value)}
              >
                <option value="ORS Packets">ORS Packets</option>
                <option value="Paracetamol 500mg">Paracetamol 500mg</option>
                <option value="Amoxicillin 250mg">Amoxicillin 250mg</option>
                <option value="Artemether Injection">Artemether Injection</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '10px', fontWeight: '700', color: '#bec8c8', display: 'block', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>HORIZON</label>
              <div style={{ display: 'flex', gap: '4px', backgroundColor: '#0d1512', padding: '3px', borderRadius: '4px', border: '1px solid rgba(17, 100, 102, 0.4)' }}>
                {[7, 14, 30].map(h => (
                  <button
                    key={h}
                    onClick={() => setHorizonDays(h)}
                    style={{
                      padding: '4px 10px',
                      border: 'none',
                      borderRadius: '3px',
                      backgroundColor: horizonDays === h ? '#116466' : 'transparent',
                      color: horizonDays === h ? '#D1E8E2' : '#bec8c8',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {h}D
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Operational Forecast Summary */}
      <div className="grid-4">
        <div className="sh-card tech-glow-hover" style={{ padding: '16px 18px', borderLeft: '4px solid #EF4444' }}>
          <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>PREDICTED STOCK-OUT DATE</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#FF7B7B', marginTop: '4px', fontFamily: 'var(--font-title)' }} className="text-glow">
            Aug 23, 2026
          </div>
          <div style={{ fontSize: '11px', color: '#FF9E9E', marginTop: '6px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
            <AlertTriangle size={12} /> Critical shortage in 2.4 days
          </div>
        </div>

        <div className="sh-card tech-glow-hover" style={{ padding: '16px 18px', borderLeft: '4px solid #D9B08C' }}>
          <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>FORECASTED DEMAND</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#D1E8E2', marginTop: '4px', fontFamily: 'var(--font-title)' }}>
            +127 <span style={{ fontSize: '11px', color: '#bec8c8', fontWeight: '400', fontFamily: 'var(--font-mono)' }}>units/week</span>
          </div>
          <div style={{ fontSize: '11px', color: '#FFCB9A', marginTop: '6px', fontWeight: '500', fontFamily: 'var(--font-mono)' }}>
            +27% increase vs baseline
          </div>
        </div>

        <div className="sh-card tech-glow-hover" style={{ padding: '16px 18px', borderLeft: '4px solid #F59E0B' }}>
          <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>WHY DEMAND CHANGING</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#D1E8E2', marginTop: '4px', fontFamily: 'var(--font-title)' }}>
            Patient footfall spike
          </div>
          <div style={{ fontSize: '11px', color: '#bec8c8', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            Dengue outbreak cluster (District B)
          </div>
        </div>

        <div className="sh-card tech-glow-hover" style={{ padding: '16px 18px', borderLeft: '4px solid #8cd3d4' }}>
          <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>MODEL SOURCE</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#D1E8E2', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-title)' }}>
            <ShieldCheck size={18} color="#8cd3d4" /> FedAvg Global Model
          </div>
          <div style={{ fontSize: '11px', color: '#bec8c8', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            Collaborative BRICS weights
          </div>
        </div>
      </div>

      {/* Technical Model Metrics (Secondary) */}
      <div className="grid-3">
        <div className="sh-card" style={{ padding: '12px 16px', backgroundColor: '#0d1512' }}>
          <div className="sh-card-subtitle" style={{ fontFamily: 'var(--font-mono)' }}>MODEL MAE</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#D1E8E2', marginTop: '2px', fontFamily: 'var(--font-title)' }}>
            3.42 units
          </div>
          <div style={{ fontSize: '10px', color: '#6EE7B7', fontFamily: 'var(--font-mono)' }}>-34% vs baseline</div>
        </div>

        <div className="sh-card" style={{ padding: '12px 16px', backgroundColor: '#0d1512' }}>
          <div className="sh-card-subtitle" style={{ fontFamily: 'var(--font-mono)' }}>MODEL RMSE</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#D1E8E2', marginTop: '2px', fontFamily: 'var(--font-title)' }}>
            4.81 units
          </div>
          <div style={{ fontSize: '10px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>Low variance</div>
        </div>

        <div className="sh-card" style={{ padding: '12px 16px', backgroundColor: '#0d1512' }}>
          <div className="sh-card-subtitle" style={{ fontFamily: 'var(--font-mono)' }}>CONFIDENCE INTERVAL</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#D1E8E2', marginTop: '2px', fontFamily: 'var(--font-title)' }}>
            95%
          </div>
          <div style={{ fontSize: '10px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>Statistical bounds</div>
        </div>
      </div>

      {/* Main Recharts Chart View */}
      <div className="sh-card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
        <div className="sh-card-header">
          <div>
            <div className="sh-card-title">
              <span>{selectedMedicine} — Demand Forecast Curve ({selectedPhcObj.name})</span>
            </div>
            <div className="sh-card-subtitle">
              Solid line: Observed historical demand | Dashed line: AI forecast | Shaded: 95% Confidence Interval
            </div>
          </div>
        </div>

        <div style={{ flex: 1, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="forecastAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#116466" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#116466" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(17, 100, 102, 0.25)" />
              <XAxis dataKey="date" stroke="#899393" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="#899393" fontSize={11} fontFamily="JetBrains Mono" label={{ value: 'Daily Demand (Units)', angle: -90, position: 'insideLeft', style: { fill: '#899393', fontSize: '11px', fontFamily: 'JetBrains Mono' } }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d1512', borderColor: '#116466', borderRadius: '6px', fontSize: '12px', color: '#D1E8E2', fontFamily: 'JetBrains Mono', boxShadow: '0 0 20px rgba(17, 100, 102, 0.5)' }}
                itemStyle={{ color: '#D1E8E2' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '10px' }} />

              {/* Shaded 95% Confidence Interval Band */}
              <Area 
                type="monotone" 
                dataKey="ciUpper" 
                stroke="none" 
                fill="url(#forecastAreaGrad)" 
                name="95% Upper Confidence Band"
              />
              <Area 
                type="monotone" 
                dataKey="ciLower" 
                stroke="none" 
                fill="url(#forecastAreaGrad)" 
                name="95% Lower Confidence Band"
              />

              {/* Safety Stock Floor Line */}
              <ReferenceLine y={25} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Safety Stock Floor (25 units)', fill: '#FF7B7B', fontSize: 11, fontFamily: 'JetBrains Mono', position: 'top' }} />

              {/* Actual Consumption Line */}
              <Line 
                type="monotone" 
                dataKey="actualDemand" 
                stroke="#38BDF8" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#38BDF8' }} 
                name="Actual Historical Consumption"
              />

              {/* Predicted Forecast Line */}
              <Line 
                type="monotone" 
                dataKey="predictedDemand" 
                stroke="#8cd3d4" 
                strokeWidth={3} 
                strokeDasharray="5 5" 
                dot={{ r: 4, fill: '#8cd3d4' }} 
                name="AI Predicted Demand"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
