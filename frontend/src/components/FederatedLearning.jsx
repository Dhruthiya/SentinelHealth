import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Network, 
  ShieldCheck, 
  Cpu, 
  Play, 
  CheckCircle2, 
  Lock, 
  RefreshCw,
  Globe2,
  Database
} from 'lucide-react';

export default function FederatedLearning({ flNodes, performanceHistory }) {
  const [isRunningRound, setIsRunningRound] = useState(false);
  const [roundProgress, setRoundProgress] = useState(0);
  const [currentRound, setCurrentRound] = useState(14);

  const handleStartFlRound = () => {
    setIsRunningRound(true);
    setRoundProgress(15);
    
    setTimeout(() => setRoundProgress(45), 600);
    setTimeout(() => setRoundProgress(80), 1200);
    setTimeout(() => {
      setRoundProgress(100);
      setCurrentRound(prev => prev + 1);
      setIsRunningRound(false);
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Network size={20} style={{ color: 'var(--color-info)' }} />
            <span>BRICS Federated Learning Orchestrator (Flower &amp; FedAvg)</span>
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Privacy-preserving collaborative forecasting across international nodes without raw data exchange
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleStartFlRound}
          disabled={isRunningRound}
        >
          <Play size={14} className={isRunningRound ? 'spin-anim' : ''} />
          {isRunningRound ? `Executing Round #${currentRound + 1}...` : `Trigger FL Round #${currentRound + 1}`}
        </button>
      </div>

      {/* Live Training Progress Bar */}
      {isRunningRound && (
        <div className="sh-card" style={{ backgroundColor: 'var(--color-info-bg)', border: '1px solid var(--color-info-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: 'var(--color-info)', marginBottom: '6px' }}>
            <span>Federated Training Pipeline Active (Round #{currentRound + 1})</span>
            <span>{roundProgress}%</span>
          </div>

          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill"
              style={{ width: `${roundProgress}%`, backgroundColor: 'var(--color-info)' }}
            />
          </div>

          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px', display: 'flex', gap: '16px' }}>
            <span>1. Local Model SGD Training</span>
            <span>2. Model Parameter Aggregation (FedAvg)</span>
            <span>3. Global Model Distribution</span>
          </div>
        </div>
      )}

      {/* BRICS Architecture Schematic & Nodes Card */}
      <div className="sh-card">
        <div className="sh-card-header">
          <div className="sh-card-title">
            <Globe2 size={16} style={{ color: 'var(--color-primary)' }} />
            <span>BRICS Federated Nodes Architecture</span>
          </div>
          <span className="badge badge-info">100% Privacy Compliant</span>
        </div>

        {/* Node Cards Row */}
        <div className="grid-3" style={{ marginTop: '10px' }}>
          {flNodes.map(node => (
            <div key={node.id} style={{
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-bg-canvas)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '22px' }}>{node.flag}</span>
                <span className="badge badge-healthy">{node.status}</span>
              </div>

              <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--color-text-main)' }}>
                {node.country} — {node.nodeName}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                Monitored Facilities: <strong>{node.phcCount} PHCs</strong>
                <br />
                Training Records: <strong>{node.recordsTrained}</strong>
              </div>

              <div style={{
                marginTop: '6px',
                padding: '6px 8px',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                fontSize: '11px',
                color: 'var(--color-primary-dark)',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Lock size={12} /> {node.privacyStatus}
              </div>
            </div>
          ))}
        </div>

        {/* Central Aggregator Flow Explanation */}
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          borderRadius: '6px',
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={18} style={{ color: '#38BDF8' }} />
            <span>Central Flower Server (FedAvg): Weights Aggregated = <code>w_global = ∑ (n_k / N) * w_k</code></span>
          </div>
          <span style={{ color: '#4ADE80', fontWeight: '600', fontSize: '11px' }}>
            Zero Raw PHC Records Transmitted
          </span>
        </div>
      </div>

      {/* Performance Comparison Chart: Local vs Federated MAE */}
      <div className="sh-card" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
        <div className="sh-card-header">
          <div>
            <div className="sh-card-title">
              <span>Local-Only Model vs Federated Global Model (MAE Evaluation)</span>
            </div>
            <div className="sh-card-subtitle">
              Demonstrates forecasting error reduction over progressive Flower aggregation rounds
            </div>
          </div>
        </div>

        <div style={{ flex: 1, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceHistory} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="round" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} label={{ value: 'Mean Absolute Error (MAE)', angle: -90, position: 'insideLeft', style: { fill: '#64748B', fontSize: '11px' } }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '6px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              <Line 
                type="monotone" 
                dataKey="localOnlyMAE" 
                stroke="#D64545" 
                strokeWidth={2} 
                strokeDasharray="4 4" 
                dot={{ r: 4 }} 
                name="Local-Only Model MAE (Isolated)" 
              />
              <Line 
                type="monotone" 
                dataKey="federatedMAE" 
                stroke="#0E7C7B" 
                strokeWidth={3} 
                dot={{ r: 5 }} 
                name="Federated Global Model MAE (FedAvg Collaborative)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
