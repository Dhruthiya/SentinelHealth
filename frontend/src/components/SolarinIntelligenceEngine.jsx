import React, { useState } from 'react';
import SolarinCore3D from './SolarinCore3D';
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
  BrainCircuit, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Truck, 
  Network, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  Layers,
  Radio,
  Filter
} from 'lucide-react';

export default function SolarinIntelligenceEngine({ 
  phcs, 
  alerts, 
  transfers, 
  timeSeriesData, 
  onNavigate, 
  onOpenOutbreakModal,
  outbreakActive 
}) {
  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [selectedHorizon, setSelectedHorizon] = useState(14);
  const [selectedFacility, setSelectedFacility] = useState('ALL');

  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL');
  const pendingTransfers = transfers.filter(t => t.status === 'PENDING');
  const criticalPhcCount = phcs.filter(p => p.status === 'CRITICAL').length;

  const handleTriggerSync = () => {
    if (isSynchronizing) return;
    setIsSynchronizing(true);
    setSyncProgress(0);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSynchronizing(false);
          return 100;
        }
        return prev + 12;
      });
    }, 150);
  };

  const filteredPhcs = selectedFacility === 'ALL' 
    ? phcs 
    : phcs.filter(p => p.id === selectedFacility);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Engine Header & Live Status Banner */}
      <div className="sh-card" style={{ padding: '20px 24px', borderLeft: '4px solid #8cd3d4' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              <BrainCircuit size={16} color="#8cd3d4" className="pulse-anim" />
              <span>ACTIVE PREDICTIVE INTELLIGENCE CORE // NEURAL ENGINE v4.2</span>
            </div>
            <h1 
              style={{ 
                fontSize: 'clamp(24px, 3.5vw, 34px)', 
                fontWeight: 800, 
                color: '#D1E8E2', 
                fontFamily: 'var(--font-title)',
                marginTop: '4px',
                letterSpacing: '0.04em'
              }} 
              className="text-glow"
            >
              SOLARIN AI PREDICTION &amp; INFERENCE ENGINE
            </h1>
            <div style={{ fontSize: '13px', color: '#bec8c8', marginTop: '2px' }}>
              Autonomous time-series forecasting, real-time demand anomaly synthesis, and multi-facility risk scoring ({criticalPhcCount} Critical Facilities)
            </div>
          </div>

          {/* Real-time Status Badges & Trigger */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '6px 12px', borderRadius: '4px', backgroundColor: '#0d1512', border: '1px solid rgba(17, 100, 102, 0.4)', fontSize: '11px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8cd3d4', boxShadow: '0 0 8px #8cd3d4' }} className="pulse-anim"></span>
              <span style={{ color: '#8cd3d4' }}>INFERENCE: 120HZ ACTIVE</span>
            </div>

            <div style={{ padding: '6px 12px', borderRadius: '4px', backgroundColor: '#0d1512', border: '1px solid rgba(17, 100, 102, 0.4)', fontSize: '11px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Network size={13} color="#8cd3d4" />
              <span style={{ color: '#D1E8E2' }}>FEDAVG ROUND #14</span>
            </div>

            <button 
              onClick={handleTriggerSync}
              disabled={isSynchronizing}
              className="btn btn-primary btn-sm"
              style={{ padding: '7px 16px', fontSize: '11px', letterSpacing: '0.1em' }}
            >
              <RefreshCw size={12} className={isSynchronizing ? 'spin-anim' : ''} />
              <span>{isSynchronizing ? 'CALIBRATING NEURAL CORE...' : 'RE-CALIBRATE ENGINE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: 3D Core Visualizer HUD (Left) + Active Predictions & Insights (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Left: 3D Solarin Core Telemetry Visualizer */}
        <div 
          className="sh-card tech-glow" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(13, 21, 18, 0.95)',
            border: '1px solid rgba(17, 100, 102, 0.5)'
          }}
        >
          {/* Header */}
          <div className="sh-card-header" style={{ marginBottom: '8px' }}>
            <div className="sh-card-title" style={{ fontSize: '13px' }}>
              <Radio size={16} color="#8cd3d4" />
              <span>SOLARIN 3D NEURAL CORE TELEMETRY</span>
            </div>
            <span className="badge badge-info" style={{ fontSize: '9px' }}>
              {isSynchronizing ? 'SYNCING 120HZ' : 'TELEMETRY LOCKED'}
            </span>
          </div>

          {/* 3D Visualizer Canvas Frame */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0', minHeight: '340px' }}>
            {/* Background cyber grid */}
            <div 
              style={{
                position: 'absolute',
                inset: '20px',
                borderRadius: '50%',
                border: '1px dashed rgba(140, 211, 212, 0.2)',
                animation: 'spin 40s linear infinite',
                pointerEvents: 'none'
              }}
            />

            {/* Three.js 3D Solarin Core */}
            <SolarinCore3D isSynchronizing={isSynchronizing} />

            {/* Sync Progress overlay */}
            {isSynchronizing && (
              <div 
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '240px',
                  backgroundColor: 'rgba(13, 21, 18, 0.95)',
                  border: '1px solid #116466',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(17, 100, 102, 0.6)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', marginBottom: '4px' }}>
                  <span>OPTIMIZING WEIGHT MATRIX...</span>
                  <span>{syncProgress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${syncProgress}%`, backgroundColor: '#8cd3d4' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Live Core Telemetry Instrumentation Ticker */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#090E17',
              border: '1px solid rgba(17, 100, 102, 0.3)',
              borderRadius: '4px',
              marginTop: '12px'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#899393' }}>LATENCY</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#8cd3d4', fontFamily: 'var(--font-title)' }}>0.08 ms</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#899393' }}>STABILITY</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#6EE7B7', fontFamily: 'var(--font-title)' }}>99.98%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#899393' }}>SGD LOSS</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#D9B08C', fontFamily: 'var(--font-title)' }}>0.0412</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#899393' }}>CONSENSUS</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>3/3 Nodes</div>
            </div>
          </div>
        </div>

        {/* Right: Active AI Predictions, Risk Radar & Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Prediction Status Quadrant */}
          <div className="grid-2" style={{ gap: '14px' }}>
            
            {/* Tile 1: Shortage Horizon */}
            <div className="sh-card tech-glow-hover" style={{ padding: '16px', borderLeft: '4px solid #EF4444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#bec8c8', textTransform: 'uppercase' }}>
                  PREDICTED STOCK-OUT HORIZON
                </span>
                <AlertTriangle size={16} color="#FF7B7B" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#FF7B7B', marginTop: '4px', fontFamily: 'var(--font-title)' }}>
                2.4 Days
              </div>
              <div style={{ fontSize: '11px', color: '#bec8c8', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                Primary threat: <strong>ORS Packets (PHC 017)</strong>
              </div>
            </div>

            {/* Tile 2: Demand Velocity Surge */}
            <div className="sh-card tech-glow-hover" style={{ padding: '16px', borderLeft: '4px solid #F59E0B' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#bec8c8', textTransform: 'uppercase' }}>
                  CONSUMPTION VELOCITY INDEX
                </span>
                <TrendingUp size={16} color="#FFCB9A" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: outbreakActive ? '#FFCB9A' : '#6EE7B7', marginTop: '4px', fontFamily: 'var(--font-title)' }}>
                {outbreakActive ? '+320% SPIKE' : '1.0x NOMINAL'}
              </div>
              <div style={{ fontSize: '11px', color: '#bec8c8', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {outbreakActive ? 'Dengue surge detected in District B' : 'Historical baseline consumption'}
              </div>
            </div>

            {/* Tile 3: Model Accuracy Envelope */}
            <div className="sh-card tech-glow-hover" style={{ padding: '16px', borderLeft: '4px solid #8cd3d4' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#bec8c8', textTransform: 'uppercase' }}>
                  PREDICTIVE CONFIDENCE BAND
                </span>
                <ShieldCheck size={16} color="#8cd3d4" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#8cd3d4', marginTop: '4px', fontFamily: 'var(--font-title)' }}>
                96.4%
              </div>
              <div style={{ fontSize: '11px', color: '#bec8c8', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                MAE 3.42 (Prophet + FedAvg Global)
              </div>
            </div>

            {/* Tile 4: Redistribution Feasibility */}
            <div className="sh-card tech-glow-hover" style={{ padding: '16px', borderLeft: '4px solid #10B981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#bec8c8', textTransform: 'uppercase' }}>
                  SCIPY OPTIMIZATION STATUS
                </span>
                <Truck size={16} color="#6EE7B7" />
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#6EE7B7', marginTop: '4px', fontFamily: 'var(--font-title)' }}>
                {pendingTransfers.length} Actionable
              </div>
              <div style={{ fontSize: '11px', color: '#bec8c8', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                Optimal transit runtime: 0.002s
              </div>
            </div>

          </div>

          {/* AI Automated Insight Directives */}
          <div className="sh-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="sh-card-header" style={{ marginBottom: '4px', paddingBottom: '10px' }}>
              <div className="sh-card-title" style={{ fontSize: '13px' }}>
                <Zap size={16} color="#FFCB9A" />
                <span>SOLARIN AUTONOMOUS SYNTHESIS DIRECTIVES</span>
              </div>
              <span className="badge badge-info">{criticalAlerts.length} Critical Alerts</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Insight 1 */}
              <div 
                style={{
                  padding: '12px 14px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  fontSize: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <strong style={{ color: '#FF7B7B', fontFamily: 'var(--font-title)' }}>Preemptive Reorder Trigger: ORS Packets (PHC 017)</strong>
                  <span style={{ fontSize: '10px', color: '#899393', fontFamily: 'var(--font-mono)' }}>T-58h</span>
                </div>
                <p style={{ color: '#bec8c8', fontSize: '11.5px', lineHeight: 1.5 }}>
                  Consumption velocity elevated to 75 units/day. Solarin calculates stock exhaustion by Aug 23. SciPy solver recommends 350 units transfer from PHC 062 (31.2 km transit).
                </p>
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => onNavigate('transfers')}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '4px 10px', fontSize: '10px' }}
                  >
                    View Transfer Recommendation <ArrowRight size={11} />
                  </button>
                </div>
              </div>

              {/* Insight 2 */}
              <div 
                style={{
                  padding: '12px 14px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(17, 100, 102, 0.25)',
                  border: '1px solid rgba(140, 211, 212, 0.3)',
                  fontSize: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <strong style={{ color: '#8cd3d4', fontFamily: 'var(--font-title)' }}>Federated Model Drift Compensation</strong>
                  <span style={{ fontSize: '10px', color: '#899393', fontFamily: 'var(--font-mono)' }}>FedAvg #14</span>
                </div>
                <p style={{ color: '#bec8c8', fontSize: '11.5px', lineHeight: 1.5 }}>
                  Collaborative parameter weights from Brazil &amp; South Africa nodes reduced local variance across anti-infective formulations by 39.8%.
                </p>
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button 
                    onClick={() => onNavigate('fl')}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 10px', fontSize: '10px', color: '#8cd3d4' }}
                  >
                    Inspect FL Node Topology <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Middle Section: Live AI Demand Curve & Multi-Horizon Inference */}
      <div className="sh-card" style={{ height: '480px', display: 'flex', flexDirection: 'column' }}>
        <div className="sh-card-header">
          <div>
            <div className="sh-card-title">
              <TrendingUp size={16} color="#8cd3d4" />
              <span>LIVE AI DEMAND INFERENCE CURVE &amp; 95% CONFIDENCE ENVELOPE</span>
            </div>
            <div className="sh-card-subtitle">
              Solarin Neural Core multi-horizon predictive envelope against observed facility telemetry
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: '#0d1512', padding: '3px', borderRadius: '4px', border: '1px solid rgba(17, 100, 102, 0.4)' }}>
              {[7, 14, 30].map(h => (
                <button
                  key={h}
                  onClick={() => setSelectedHorizon(h)}
                  style={{
                    padding: '4px 10px',
                    border: 'none',
                    borderRadius: '3px',
                    backgroundColor: selectedHorizon === h ? '#116466' : 'transparent',
                    color: selectedHorizon === h ? '#D1E8E2' : '#bec8c8',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {h}D HORIZON
                </button>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('forecasts')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '11px' }}
            >
              Full Forecasts Screen <ArrowRight size={12} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="solarinAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#116466" stopOpacity={0.65}/>
                  <stop offset="95%" stopColor="#116466" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(17, 100, 102, 0.25)" />
              <XAxis dataKey="date" stroke="#899393" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="#899393" fontSize={11} fontFamily="JetBrains Mono" label={{ value: 'Demand (Units/Day)', angle: -90, position: 'insideLeft', style: { fill: '#899393', fontSize: '11px', fontFamily: 'JetBrains Mono' } }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d1512', borderColor: '#116466', borderRadius: '6px', fontSize: '12px', color: '#D1E8E2', fontFamily: 'JetBrains Mono', boxShadow: '0 0 20px rgba(17, 100, 102, 0.5)' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '10px' }} />

              {/* Shaded 95% Confidence Interval */}
              <Area 
                type="monotone" 
                dataKey="ciUpper" 
                stroke="none" 
                fill="url(#solarinAreaGrad)" 
                name="Solarin 95% Confidence Upper"
              />
              <Area 
                type="monotone" 
                dataKey="ciLower" 
                stroke="none" 
                fill="url(#solarinAreaGrad)" 
                name="Solarin 95% Confidence Lower"
              />

              {/* Safety Stock Floor */}
              <ReferenceLine y={25} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Safety Floor (25 units)', fill: '#FF7B7B', fontSize: 11, fontFamily: 'JetBrains Mono', position: 'top' }} />

              {/* Observed Consumption */}
              <Line 
                type="monotone" 
                dataKey="actualDemand" 
                stroke="#38BDF8" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#38BDF8' }} 
                name="Observed Consumption"
              />

              {/* AI Predicted Demand */}
              <Line 
                type="monotone" 
                dataKey="predictedDemand" 
                stroke="#8cd3d4" 
                strokeWidth={3} 
                strokeDasharray="5 5" 
                dot={{ r: 4, fill: '#8cd3d4' }} 
                name="Solarin Predicted Surge"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Monitored Facility AI Risk Matrix */}
      <div className="sh-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="sh-card-header" style={{ padding: '18px 24px', margin: 0 }}>
          <div>
            <div className="sh-card-title">
              <Layers size={16} color="#8cd3d4" />
              <span>FACILITY VULNERABILITY &amp; AUTONOMY MATRIX</span>
            </div>
            <div className="sh-card-subtitle">
              Continuous multi-facility vulnerability ranking calculated by Solarin AI
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={13} color="#8cd3d4" />
              <select
                className="sh-select"
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                style={{ padding: '5px 10px', fontSize: '11px' }}
              >
                <option value="ALL">All Facilities ({phcs.length})</option>
                {phcs.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={onOpenOutbreakModal}
              className="btn btn-outline btn-sm"
              style={{ color: outbreakActive ? '#FFCB9A' : '#8cd3d4', borderColor: outbreakActive ? 'rgba(245, 158, 11, 0.5)' : 'rgba(140, 211, 212, 0.4)' }}
            >
              <Zap size={13} color={outbreakActive ? '#FFCB9A' : '#8cd3d4'} />
              <span>{outbreakActive ? 'RESET OUTBREAK' : 'SIMULATE SPIKE'}</span>
            </button>
          </div>
        </div>

        <div className="sh-table-container" style={{ border: 'none' }}>
          <table className="sh-table">
            <thead>
              <tr>
                <th>FACILITY ID</th>
                <th>DISTRICT NODE</th>
                <th>CRITICAL VULNERABILITY</th>
                <th>STOCK AUTONOMY</th>
                <th>SOLARIN RISK INDEX</th>
                <th>AI RECOMMENDATION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPhcs.map((phc) => {
                const isCritical = phc.status === 'CRITICAL';
                const isWarning = phc.status === 'WARNING';

                return (
                  <tr key={phc.id}>
                    <td style={{ fontWeight: 700, color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                      {phc.name}
                    </td>
                    <td style={{ color: '#bec8c8' }}>
                      {phc.district}
                    </td>
                    <td>
                      {phc.criticalMedicines.length > 0 ? (
                        <span style={{ color: isCritical ? '#FF7B7B' : '#FFCB9A', fontWeight: 600 }}>
                          {phc.criticalMedicines.join(', ')}
                        </span>
                      ) : (
                        <span style={{ color: '#6EE7B7' }}>No Active Deficit</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: isCritical ? '#FF7B7B' : isWarning ? '#FFCB9A' : '#6EE7B7' }}>
                          {isCritical ? '2.4 Days' : isWarning ? '5.2 Days' : '> 30 Days'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${phc.status.toLowerCase()}`}>
                        {phc.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '11.5px', color: isCritical ? '#FF9E9E' : '#bec8c8' }}>
                        {isCritical 
                          ? 'Dispatch SciPy redistribution transfer from surplus facility.'
                          : isWarning 
                          ? 'Monitor daily velocity for anomalous demand surge.'
                          : 'Nominal buffer maintained; surplus source ready.'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
