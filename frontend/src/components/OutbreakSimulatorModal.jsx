import React from 'react';
import { 
  Zap, 
  RotateCcw, 
  X
} from 'lucide-react';

export default function OutbreakSimulatorModal({ 
  isOpen, 
  onClose, 
  outbreakActive, 
  onToggleOutbreak 
}) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '16px'
      }}
    >
      <div 
        className="sh-card" 
        style={{
          width: '540px',
          maxWidth: '92vw',
          padding: '28px',
          boxShadow: '0 0 50px rgba(17, 100, 102, 0.5)',
          border: '1px solid #116466',
          backgroundColor: '#0d1512'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(17, 100, 102, 0.4)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: outbreakActive ? 'rgba(245, 158, 11, 0.25)' : 'rgba(17, 100, 102, 0.3)',
                color: outbreakActive ? '#FFCB9A' : '#8cd3d4',
                border: `1px solid ${outbreakActive ? 'rgba(245, 158, 11, 0.5)' : 'rgba(140, 211, 212, 0.4)'}`
              }}
            >
              <Zap size={22} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                SCENARIO CONTROLLER
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#D1E8E2', fontFamily: 'var(--font-title)', marginTop: '2px' }}>
                OUTBREAK &amp; DEMAND SPIKE SIMULATOR
              </h3>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bec8c8', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ fontSize: '13px', color: '#D1E8E2', lineHeight: '1.6', marginBottom: '24px' }}>
          {outbreakActive ? (
            <div style={{ padding: '14px', borderRadius: '4px', backgroundColor: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', fontFamily: 'var(--font-mono)' }}>
              <strong style={{ color: '#FFCB9A', fontSize: '13px' }}>⚠️ ACTIVE OUTBREAK SCENARIO: Dengue Surge (District B)</strong>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#bec8c8' }}>
                <strong style={{ color: '#D1E8E2' }}>SYSTEM IMPACT:</strong>
                <br />
                • Patient footfall increased by <strong>+3.2x</strong> at PHC 017 and PHC 055
                <br />
                • Medicine demand (ORS, Paracetamol) surged beyond safety thresholds
                <br />
                • Bed occupancy rose to critical levels (88-92%)
                <br />
                <strong>PREDICTED RISKS:</strong>
                <br />
                • 3 PHCs at critical stock-out risk within 2-3 days
                <br />
                • 2 medicines projected to breach safety buffers
                <br />
                <strong>AI RESPONSE:</strong>
                <br />
                • Early-warning engine generated 3 critical alerts
                <br />
                • SciPy optimizer calculated 3 redistribution recommendations
                <br />
                • Projected resilience improvement: +15% after transfers
              </div>
            </div>
          ) : (
            <div style={{ padding: '14px', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', fontFamily: 'var(--font-mono)' }}>
              <strong style={{ color: '#6EE7B7', fontSize: '13px' }}>✓ NORMAL BASELINE OPERATIONS ACTIVE</strong>
              <div style={{ marginTop: '6px', fontSize: '12px', color: '#bec8c8' }}>
                All monitored PHCs are operating under baseline historical consumption rates. Inject the Dengue surge scenario to evaluate automated anomaly alerts and linear programming redistribution.
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            className={`btn ${outbreakActive ? 'btn-outline' : 'btn-primary'}`}
            onClick={() => {
              onToggleOutbreak();
              onClose();
            }}
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            {outbreakActive ? (
              <>
                <RotateCcw size={16} /> Reset System to Normal Baseline
              </>
            ) : (
              <>
                <Zap size={16} color="#FFCB9A" /> Inject Dengue Spike Scenario (District B)
              </>
            )}
          </button>

          <button className="btn btn-outline btn-sm" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
