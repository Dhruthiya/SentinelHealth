import React, { useState } from 'react';
import { X, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <footer
        id="main-app-footer"
        style={{
          backgroundColor: '#0d1512',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          width: '100%',
          padding: '24px 32px',
          borderTop: '1px solid rgba(209, 232, 226, 0.15)',
          zIndex: 10,
          position: 'relative',
          marginTop: 'auto'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1560px', margin: '0 auto', gap: '16px' }}>
          <div style={{ color: '#D1E8E2', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#8cd3d4', borderRadius: '50%' }}></span>
            <span>© 2026 SENTINELHEALTH SYSTEMS // BRICS AI CHALLENGE — TRACK 3</span>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <button
              onClick={() => setActiveModal('more')}
              style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}
              className="btn-glow"
            >
              [ ARCHITECTURE ]
            </button>
            <button
              onClick={() => setActiveModal('contact')}
              style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}
              className="btn-glow"
            >
              [ TELEMETRY RELAY ]
            </button>
          </div>
        </div>
      </footer>

      {/* Architecture & Protocol Modal */}
      {activeModal === 'more' && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div 
            style={{
              backgroundColor: '#0d1512',
              border: '1px solid #116466',
              maxWidth: '540px',
              width: '100%',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 0 40px rgba(17,100,102,0.4)',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(17,100,102,0.4)', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '17px', color: '#D1E8E2' }}>
                SENTINELHEALTH ARCHITECTURE
              </h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#bec8c8', lineHeight: 1.6, marginBottom: '16px' }}>
              SentinelHealth is a decision-support platform engineered for resilient healthcare supply chains across international primary health networks. Combining real-time inventory telemetry, federated machine learning, and linear programming redistribution.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', padding: '12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px' }}>
              <div>// CORE: Flower Federated Learning (FedAvg)</div>
              <div>// OPTIMIZER: SciPy Linear Programming Engine (linprog)</div>
              <div>// PROTOCOL: AES-GCM-512 Encrypted Cross-Node Relay</div>
              <div>// COMPLIANCE: WHO Digital Health &amp; BRICS AI Framework</div>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(17,100,102,0.3)', textAlign: 'right' }}>
              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-outline btn-sm"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Communications & Relay Modal */}
      {activeModal === 'contact' && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div 
            style={{
              backgroundColor: '#0d1512',
              border: '1px solid #116466',
              maxWidth: '540px',
              width: '100%',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 0 40px rgba(17,100,102,0.4)',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(17,100,102,0.4)', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '17px', color: '#D1E8E2' }}>
                SENTINEL DISPATCH COMMUNICATIONS
              </h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', color: '#bec8c8' }}>
              <div style={{ padding: '12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} style={{ color: '#8cd3d4' }} />
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>SECURE HEALTH RELAY</div>
                  <div style={{ color: '#D1E8E2', fontWeight: 600 }}>telemetry@sentinelhealth.org</div>
                </div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={20} style={{ color: '#8cd3d4' }} />
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>CENTRAL AGGREGATOR NODE</div>
                  <div style={{ color: '#D1E8E2', fontWeight: 600 }}>AIIMS Delhi // Fiocruz Rio // SAMRC Cape Town</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(17,100,102,0.3)', textAlign: 'right' }}>
              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-outline btn-sm"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
