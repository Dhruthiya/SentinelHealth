import React from 'react';
import { 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  X,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function OutbreakSimulatorModal({ 
  isOpen, 
  onClose, 
  outbreakActive, 
  onToggleOutbreak 
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200
    }}>
      <div className="sh-card" style={{
        width: '520px',
        maxWidth: '90vw',
        padding: '24px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: outbreakActive ? 'var(--color-warning-bg)' : 'var(--color-primary-light)',
              color: outbreakActive ? 'var(--color-warning)' : 'var(--color-primary)'
            }}>
              <Zap size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                Outbreak &amp; Demand Spike Simulator
              </h3>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Demonstration control panel for BRICS AI Challenge evaluation
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--color-text-main)', lineHeight: '1.5', marginBottom: '20px' }}>
          {outbreakActive ? (
            <div style={{ padding: '12px', borderRadius: '6px', backgroundColor: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)' }}>
              <strong style={{ color: 'var(--color-warning)' }}>⚠️ ACTIVE OUTBREAK SCENARIO: Dengue Surge (District B)</strong>
              <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--color-text-main)' }}>
                <strong>SYSTEM IMPACT:</strong>
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
            <div style={{ padding: '12px', borderRadius: '6px', backgroundColor: 'var(--color-healthy-bg)', border: '1px solid var(--color-healthy-border)' }}>
              <strong style={{ color: 'var(--color-healthy)' }}>✓ NORMAL BASELINE STATE ACTIVE</strong>
              <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                All PHCs operate under standard baseline demand. You can trigger a simulated outbreak below to evaluate system response.
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            className={`btn ${outbreakActive ? 'btn-outline' : 'btn-primary'}`}
            onClick={() => {
              onToggleOutbreak();
              onClose();
            }}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {outbreakActive ? (
              <>
                <RotateCcw size={15} /> Reset System to Normal Baseline
              </>
            ) : (
              <>
                <Zap size={15} /> Inject Dengue Spike Scenario (District B)
              </>
            )}
          </button>

          <button className="btn btn-outline" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
