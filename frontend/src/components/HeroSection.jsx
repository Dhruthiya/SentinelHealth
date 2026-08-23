import React, { useState } from 'react';
import SolarinCore3D from './SolarinCore3D';
import { ArrowRight, Zap, CheckCircle2, Activity, X } from 'lucide-react';

export default function HeroSection({ onNavigate, onOpenOutbreakModal }) {
  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [syncCompleted, setSyncCompleted] = useState(false);

  const handleTriggerSync = () => {
    if (isSynchronizing) return;
    setIsSynchronizing(true);
    setSyncProgress(0);
    setSyncCompleted(false);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSynchronizing(false);
          setSyncCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 160);
  };

  return (
    <section
      id="solarin-hero-section"
      className="ambient-bg"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '32px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(209, 232, 226, 0.15)',
        boxShadow: '0 0 40px rgba(17, 100, 102, 0.25)'
      }}
    >
      {/* Atmospheric Teal Light Glows */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '50%',
          height: '50%',
          backgroundColor: 'rgba(17, 100, 102, 0.25)',
          filter: 'blur(140px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '0',
          right: '-10%',
          width: '45%',
          height: '45%',
          backgroundColor: 'rgba(25, 104, 106, 0.2)',
          filter: 'blur(130px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      {/* Grid Lines for Technical Aesthetic */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.04,
          backgroundImage: 'linear-gradient(#D1E8E2 1px, transparent 1px), linear-gradient(90deg, #D1E8E2 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '900px', margin: '0 auto', gap: '28px' }}>
        
        {/* System Sub-tag */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '4px',
            backgroundColor: 'rgba(17, 100, 102, 0.25)',
            border: '1px solid #116466',
            color: '#8cd3d4',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.22em'
          }}
        >
          <span style={{ width: '6px', height: '6px', backgroundColor: '#8cd3d4', borderRadius: '50%', boxShadow: '0 0 8px #8cd3d4' }} className="pulse-anim"></span>
          SENTINELHEALTH // BRICS AI RESILIENCE CORE // PHASE 4.2 ONLINE
        </div>

        {/* Hero Title */}
        <h1
          id="solarin-headline"
          className="text-glow"
          style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 48px)',
            textTransform: 'uppercase',
            color: '#D1E8E2',
            letterSpacing: '0.16em',
            lineHeight: 1.15
          }}
        >
          PREDICTIVE SUPPLY RESILIENCE
        </h1>

        {/* Hero Subtitle */}
        <p 
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#bec8c8',
            maxWidth: '680px',
            margin: '0 auto',
            fontWeight: 400
          }}
        >
          Real-time AI telemetry, automated stock-out prevention, and privacy-preserving federated intelligence orchestrating resilient primary healthcare networks.
        </p>

        {/* 3D Interactive Centerpiece */}
        <div style={{ position: 'relative', padding: '10px 0' }}>
          {/* Decorative Outer Rings & Glow Halo */}
          <div 
            className="hero-glow"
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '1px solid rgba(140, 211, 212, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: 'rgba(21, 29, 26, 0.65)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {/* Spinning decorative geometric rings */}
            <div 
              style={{
                position: 'absolute',
                inset: '12px',
                borderRadius: '50%',
                border: '1px solid rgba(209, 232, 226, 0.15)',
                animation: 'spin 26s linear infinite',
                pointerEvents: 'none'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: '28px',
                borderRadius: '50%',
                borderTop: '1px solid rgba(140, 211, 212, 0.5)',
                borderRight: '1px solid rgba(140, 211, 212, 0.5)',
                animation: 'spin 18s linear infinite reverse',
                pointerEvents: 'none'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: '48px',
                borderRadius: '50%',
                borderBottom: '1px solid rgba(217, 176, 140, 0.45)',
                borderLeft: '1px solid rgba(217, 176, 140, 0.45)',
                animation: 'spin 32s linear infinite',
                pointerEvents: 'none'
              }}
            />

            {/* Three.js 3D WebGL Core */}
            <SolarinCore3D isSynchronizing={isSynchronizing} />
          </div>

          {/* Sync Progress Indicator */}
          {isSynchronizing && (
            <div 
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '260px',
                backgroundColor: 'rgba(13, 21, 18, 0.95)',
                border: '1px solid #116466',
                padding: '8px 12px',
                borderRadius: '4px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(17, 100, 102, 0.5)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', marginBottom: '4px' }}>
                <span>CALIBRATING TELEMETRY...</span>
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

          {syncCompleted && (
            <div 
              className="animate-fade-in"
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(17, 100, 102, 0.5)',
                border: '1px solid #8cd3d4',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: '#8cd3d4',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(140, 211, 212, 0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              <CheckCircle2 size={14} color="#8cd3d4" />
              <span>CORE SYNC ESTABLISHED // 100% TELEMETRY LOCK</span>
            </div>
          )}
        </div>

        {/* Hero Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px', paddingTop: '16px' }}>
          <button
            id="hero-discover-btn"
            onClick={() => onNavigate('overview')}
            className="btn btn-glow"
            style={{
              padding: '12px 28px',
              border: '1px solid #D1E8E2',
              color: '#D1E8E2',
              backgroundColor: 'transparent',
              fontSize: '13px',
              letterSpacing: '0.14em'
            }}
          >
            <span>COMMAND CENTER</span>
            <ArrowRight size={15} />
          </button>

          <button
            id="hero-sync-btn"
            onClick={handleTriggerSync}
            disabled={isSynchronizing}
            className="btn btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: '13px',
              letterSpacing: '0.14em'
            }}
          >
            <Zap size={15} color="#FFCB9A" />
            <span>{isSynchronizing ? 'CALIBRATING...' : 'SYNC CORE'}</span>
          </button>

          <button
            id="hero-specs-btn"
            onClick={() => setShowSpecsModal(true)}
            className="btn btn-outline"
            style={{
              padding: '12px 20px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.12em'
            }}
          >
            [ SPECS READOUT ]
          </button>

          {onOpenOutbreakModal && (
            <button
              id="hero-outbreak-btn"
              onClick={onOpenOutbreakModal}
              className="btn btn-outline"
              style={{
                padding: '12px 20px',
                fontSize: '12px',
                color: '#FFCB9A',
                borderColor: 'rgba(255, 203, 154, 0.4)'
              }}
            >
              <Activity size={14} />
              <span>SIMULATOR</span>
            </button>
          )}
        </div>

        {/* Quick Tech Specs Ticker */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            width: '100%',
            paddingTop: '24px',
            borderTop: '1px solid rgba(209, 232, 226, 0.12)',
            textAlign: 'left'
          }}
        >
          <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.6)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>TELEMETRY STREAM</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '14px', fontWeight: 700, color: '#D1E8E2', marginTop: '2px' }}>120Hz Real-Time Uplink</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.6)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>PREDICTIVE ACCURACY</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '14px', fontWeight: 700, color: '#8cd3d4', marginTop: '2px' }}>MAE 3.42 (-39.8% Error)</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.6)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>MONITORED FACILITIES</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '14px', fontWeight: 700, color: '#D1E8E2', marginTop: '2px' }}>142 Primary Health Centres</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.6)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>PRIVACY PROTOCOL</div>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '14px', fontWeight: 700, color: '#D9B08C', marginTop: '2px' }}>BRICS FedAvg (Zero Raw Data)</div>
          </div>
        </div>

      </div>

      {/* Specifications Readout Modal */}
      {showSpecsModal && (
        <div
          id="solarin-specs-modal"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div 
            style={{
              backgroundColor: '#0d1512',
              border: '1px solid #116466',
              maxWidth: '640px',
              width: '100%',
              padding: '28px',
              borderRadius: '8px',
              boxShadow: '0 0 50px rgba(17, 100, 102, 0.5)',
              textAlign: 'left',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(17, 100, 102, 0.4)', paddingBottom: '14px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  SYSTEM ARCHITECTURE SPECIFICATIONS
                </span>
                <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '20px', color: '#D1E8E2', marginTop: '4px' }}>
                  SENTINELHEALTH PREDICTIVE ENGINE READOUT
                </h3>
              </div>
              <button
                onClick={() => setShowSpecsModal(false)}
                style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#bec8c8' }}>
              <div style={{ padding: '12px', backgroundColor: '#151d1a', border: '1px solid rgba(209, 232, 226, 0.1)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 600, color: '#D1E8E2', marginBottom: '3px' }}>01. BRICS Federated Learning Engine (Flower + FedAvg)</div>
                <p style={{ fontSize: '12px', lineHeight: 1.5 }}>
                  Decentralized model training running collaborative SGD updates across India, Brazil, and South Africa nodes without moving raw patient or facility consumption records.
                </p>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#151d1a', border: '1px solid rgba(209, 232, 226, 0.1)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 600, color: '#D1E8E2', marginBottom: '3px' }}>02. SciPy Linear Optimization Redistribution (linprog)</div>
                <p style={{ fontSize: '12px', lineHeight: 1.5 }}>
                  Automated Simplex algorithm balancing facility surplus, geographic transit distances, and shortage urgency penalties with strict human-in-the-loop validation.
                </p>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#151d1a', border: '1px solid rgba(209, 232, 226, 0.1)', borderRadius: '4px' }}>
                <div style={{ fontWeight: 600, color: '#D1E8E2', marginBottom: '3px' }}>03. Early-Warning Multi-Factor Risk Classifier</div>
                <p style={{ fontSize: '12px', lineHeight: 1.5 }}>
                  Sub-second stock autonomy calculation triggering preemptive reorder notifications 2.4 - 3.8 days prior to catastrophic zero-stock events during outbreak surges.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(17, 100, 102, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => {
                  setShowSpecsModal(false);
                  onNavigate('overview');
                }}
                className="btn btn-primary btn-sm"
              >
                ACCESS COMMAND CENTER
              </button>
              <button
                onClick={() => setShowSpecsModal(false)}
                className="btn btn-outline btn-sm"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
