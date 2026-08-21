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
  TrendingUp, 
  Building2, 
  Package, 
  Calendar, 
  Info, 
  ShieldCheck, 
  BrainCircuit,
  AlertTriangle
} from 'lucide-react';

export default function Forecasts({ timeSeriesData, phcs, inventory }) {
  const [selectedPhcId, setSelectedPhcId] = useState('PHC-017');
  const [selectedMedicine, setSelectedMedicine] = useState('ORS Packets');
  const [horizonDays, setHorizonDays] = useState(14);

  const selectedPhcObj = phcs.find(p => p.id === selectedPhcId) || phcs[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Controls */}
      <div className="sh-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainCircuit size={20} style={{ color: 'var(--color-primary)' }} />
              <span>AI Medicine Demand Forecast &amp; Confidence Bands</span>
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Predictive time-series model incorporating historical consumption, seasonal trends, and federated BRICS parameters
            </div>
          </div>

          {/* Selectors */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>PHC FACILITY</label>
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
              <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>MEDICINE ITEM</label>
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
              <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>HORIZON</label>
              <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-bg-subtle)', padding: '2px', borderRadius: '6px' }}>
                {[7, 14, 30].map(h => (
                  <button
                    key={h}
                    onClick={() => setHorizonDays(h)}
                    style={{
                      padding: '4px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: horizonDays === h ? '#FFFFFF' : 'transparent',
                      color: horizonDays === h ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontSize: '11px',
                      fontWeight: '600',
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
        <div className="sh-card" style={{ padding: '14px 16px' }}>
          <div className="sh-card-subtitle">PREDICTED STOCK-OUT DATE</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-critical)', marginTop: '2px' }}>
            Aug 23, 2026
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-critical)', marginTop: '4px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={12} /> Critical shortage in 2.4 days
          </div>
        </div>

        <div className="sh-card" style={{ padding: '14px 16px' }}>
          <div className="sh-card-subtitle">FORECASTED DEMAND</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-main)', marginTop: '2px' }}>
            +127 <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '400' }}>units/week</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-warning)', marginTop: '4px', fontWeight: '500' }}>
            +27% increase vs baseline
          </div>
        </div>

        <div className="sh-card" style={{ padding: '14px 16px' }}>
          <div className="sh-card-subtitle">WHY DEMAND CHANGING</div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-main)', marginTop: '2px' }}>
            Patient footfall spike
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Dengue outbreak cluster (District B)
          </div>
        </div>

        <div className="sh-card" style={{ padding: '14px 16px' }}>
          <div className="sh-card-subtitle">MODEL SOURCE</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-info)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} /> FedAvg Global Model
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Collaborative BRICS weights
          </div>
        </div>
      </div>

      {/* Technical Model Metrics (Secondary) */}
      <div className="grid-3">
        <div className="sh-card" style={{ padding: '12px 16px', backgroundColor: 'var(--color-bg-subtle)' }}>
          <div className="sh-card-subtitle">MODEL MAE</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-main)', marginTop: '2px' }}>
            3.42 units
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>-34% vs baseline</div>
        </div>

        <div className="sh-card" style={{ padding: '12px 16px', backgroundColor: 'var(--color-bg-subtle)' }}>
          <div className="sh-card-subtitle">MODEL RMSE</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-main)', marginTop: '2px' }}>
            4.81 units
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Low variance</div>
        </div>

        <div className="sh-card" style={{ padding: '12px 16px', backgroundColor: 'var(--color-bg-subtle)' }}>
          <div className="sh-card-subtitle">CONFIDENCE INTERVAL</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-main)', marginTop: '2px' }}>
            95%
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Statistical bounds</div>
        </div>
      </div>

      {/* Main Recharts Chart View */}
      <div className="sh-card" style={{ height: '480px', display: 'flex', flexDirection: 'column' }}>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} label={{ value: 'Daily Demand (Units)', angle: -90, position: 'insideLeft', style: { fill: '#64748B', fontSize: '11px' } }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '6px', fontSize: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              {/* Shaded 95% Confidence Interval Band */}
              <Area 
                type="monotone" 
                dataKey="ciUpper" 
                stroke="none" 
                fill="#0E7C7B" 
                fillOpacity={0.15} 
                name="95% Upper Confidence Band"
              />
              <Area 
                type="monotone" 
                dataKey="ciLower" 
                stroke="none" 
                fill="#0E7C7B" 
                fillOpacity={0.05} 
                name="95% Lower Confidence Band"
              />

              {/* Safety Stock Floor Line */}
              <ReferenceLine y={25} stroke="#D64545" strokeDasharray="3 3" label={{ value: 'Safety Stock Floor (25 units)', fill: '#D64545', fontSize: 11, position: 'top' }} />

              {/* Actual Consumption Line */}
              <Line 
                type="monotone" 
                dataKey="actualDemand" 
                stroke="#0B5FA5" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#0B5FA5' }} 
                name="Actual Historical Consumption"
              />

              {/* Predicted Forecast Line */}
              <Line 
                type="monotone" 
                dataKey="predictedDemand" 
                stroke="#0E7C7B" 
                strokeWidth={3} 
                strokeDasharray="5 5" 
                dot={{ r: 4, fill: '#0E7C7B' }} 
                name="AI Predicted Demand"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
