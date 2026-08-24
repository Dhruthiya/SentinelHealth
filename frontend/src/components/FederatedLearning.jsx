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
  Cpu, 
  Play, 
  Lock, 
  Globe2,
  Database,
  ShieldCheck
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            CROSS-BORDER PRIVACY ENGINE // FLOWER FRAMEWORK
          </div>
          <h1 
            style={{ 
              fontSize: 'clamp(22px, 3vw, 32px)', 
              fontWeight: 800, 
              color: '#D1E8E2', 
              fontFamily: 'var(--font-title)',
              marginTop: '4px',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }} 
            className="text-glow"
          >
            <Network size={26} color="#8cd3d4" />
            <span>BRICS FEDERATED LEARNING ORCHESTRATOR</span>
          </h1>
          <div style={{ fontSize: '13px', color: '#bec8c8', marginTop: '4px' }}>
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
        <div className="sh-card animate-fade-in" style={{ backgroundColor: 'rgba(17, 100, 102, 0.3)', border: '1px solid #8cd3d4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: '#8cd3d4', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
            <span>Federated Training Pipeline Active (Round #{currentRound + 1})</span>
            <span>{roundProgress}%</span>
          </div>

          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill"
              style={{ width: `${roundProgress}%`, backgroundColor: '#8cd3d4' }}
            />
          </div>

          <div style={{ fontSize: '11px', color: '#bec8c8', marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '16px', fontFamily: 'var(--font-mono)' }}>
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
            <Globe2 size={18} color="#8cd3d4" />
            <span>BRICS Federated Nodes Architecture</span>
          </div>
          <span className="badge badge-info">100% Privacy Compliant</span>
        </div>

        {/* Privacy-Preserving Flow Explanation */}
        <div style={{ 
          marginTop: '12px', 
          padding: '16px', 
          borderRadius: '8px', 
          backgroundColor: 'var(--color-info-bg)', 
          border: '1px solid var(--color-info-border)',
          fontSize: '12px'
        }}>
          <div style={{ fontWeight: '700', color: 'var(--color-info)', marginBottom: '8px' }}>
            HOW IT WORKS: Collaborative Learning Without Sharing Patient Data
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={14} style={{ color: 'var(--color-primary)' }} />
              <span><strong>Each country keeps patient data local</strong> — No raw health records leave the country</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={14} style={{ color: 'var(--color-primary)' }} />
              <span><strong>Local model training</strong> — Each node trains on its own data</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Network size={14} style={{ color: 'var(--color-primary)' }} />
              <span><strong>Only model updates shared</strong> — Mathematical weights aggregated centrally</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={14} style={{ color: 'var(--color-primary)' }} />
              <span><strong>Global model distributed</strong> — Improved model sent back to all countries</span>
            </div>
          </div>
        </div>

        {/* Node Cards Row */}
        <div className="grid-3" style={{ marginTop: '16px' }}>
          {flNodes.map(node => (
            <div 
              key={node.id} 
              className="tech-glow-hover"
              style={{
                padding: '18px',
                borderRadius: '6px',
                backgroundColor: '#0d1512',
                border: '1px solid rgba(17, 100, 102, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '26px' }}>{node.flag}</span>
                <span className="badge badge-healthy">{node.status}</span>
              </div>

              <div style={{ fontWeight: '700', fontSize: '15px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {node.country} — {node.nodeName}
              </div>

              <div style={{ fontSize: '12px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>
                Monitored Facilities: <strong style={{ color: '#D1E8E2' }}>{node.phcCount} PHCs</strong>
                <br />
                Training Records: <strong style={{ color: '#8cd3d4' }}>{node.recordsTrained}</strong>
              </div>

              <div 
                style={{
                  marginTop: '6px',
                  padding: '8px 10px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(21, 29, 26, 0.9)',
                  border: '1px solid rgba(17, 100, 102, 0.3)',
                  fontSize: '11px',
                  color: '#8cd3d4',
                  fontWeight: '600',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Lock size={12} color="#8cd3d4" /> {node.privacyStatus}
              </div>
            </div>
          ))}
        </div>

        {/* Central Aggregator Flow Explanation */}
        <div 
          style={{
            marginTop: '20px',
            padding: '14px 18px',
            borderRadius: '4px',
            backgroundColor: '#090E17',
            border: '1px solid rgba(17, 100, 102, 0.4)',
            color: '#D1E8E2',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={18} color="#8cd3d4" />
            <span>Central Flower Server (FedAvg): Weights Aggregated = <code>w_global = ∑ (n_k / N) * w_k</code></span>
          </div>
          <span style={{ color: '#6EE7B7', fontWeight: '700', fontSize: '11px' }}>
            Zero Raw PHC Records Transmitted
          </span>
        </div>
      </div>

      {/* Performance Comparison Chart: Local vs Federated MAE */}
      <div className="sh-card" style={{ height: '440px', display: 'flex', flexDirection: 'column' }}>
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
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(17, 100, 102, 0.25)" />
              <XAxis dataKey="round" stroke="#899393" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="#899393" fontSize={11} fontFamily="JetBrains Mono" label={{ value: 'Mean Absolute Error (MAE)', angle: -90, position: 'insideLeft', style: { fill: '#899393', fontSize: '11px', fontFamily: 'JetBrains Mono' } }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d1512', borderColor: '#116466', borderRadius: '6px', fontSize: '12px', color: '#D1E8E2', fontFamily: 'JetBrains Mono', boxShadow: '0 0 20px rgba(17, 100, 102, 0.5)' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '10px' }} />

              <Line 
                type="monotone" 
                dataKey="localOnlyMAE" 
                stroke="#EF4444" 
                strokeWidth={2} 
                strokeDasharray="4 4" 
                dot={{ r: 4, fill: '#EF4444' }} 
                name="Local-Only Model MAE (Isolated)" 
              />
              <Line 
                type="monotone" 
                dataKey="federatedMAE" 
                stroke="#8cd3d4" 
                strokeWidth={3} 
                dot={{ r: 5, fill: '#8cd3d4' }} 
                name="Federated Global Model MAE (FedAvg Collaborative)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
