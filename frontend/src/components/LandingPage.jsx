import React, { useState } from 'react';
import SolarinCore3D from './SolarinCore3D';
import { 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Activity, 
  X, 
  TrendingUp, 
  Truck, 
  Network, 
  ShieldAlert
} from 'lucide-react';

export default function LandingPage({ onEnterDashboard, onOpenOutbreakModal, outbreakActive }) {
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
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
      
      {/* Landing Top Navigation Bar */}
      <header
        className="glass-nav"
        style={{
          height: '76px',
          borderBottom: '1px solid rgba(209, 232, 226, 0.15)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 0 25px rgba(17, 100, 102, 0.25)'
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              backgroundColor: '#116466',
              border: '1px solid #8cd3d4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8cd3d4',
              boxShadow: '0 0 16px rgba(17, 100, 102, 0.6)'
            }}
          >
            <Activity size={20} />
          </div>
          <div>
            <div 
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 800,
                fontSize: '19px',
                color: '#D1E8E2',
                letterSpacing: '0.04em'
              }}
              className="text-glow"
            >
              SENTINELHEALTH
            </div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', letterSpacing: '0.12em' }}>
              RESILIENCE DECISION PLATFORM // BRICS
            </div>
          </div>
        </div>

        {/* Center Navigation Anchors */}
        <nav className="hidden lg:flex" style={{ alignItems: 'center', gap: '28px', fontSize: '12px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          <a href="#hero" style={{ color: '#8cd3d4', textDecoration: 'none', fontWeight: 600 }}>[ CORE OVERVIEW ]</a>
          <a href="#features" style={{ color: '#bec8c8', textDecoration: 'none' }} className="hover:text-[#8cd3d4] transition-colors">[ CAPABILITIES ]</a>
          <a href="#architecture" style={{ color: '#bec8c8', textDecoration: 'none' }} className="hover:text-[#8cd3d4] transition-colors">[ SCIPY &amp; FLOWER ]</a>
          <a href="#brics-nodes" style={{ color: '#bec8c8', textDecoration: 'none' }} className="hover:text-[#8cd3d4] transition-colors">[ BRICS NODES ]</a>
        </nav>

        {/* Right Action Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Real-time Indicator Tag */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 12px', 
              borderRadius: '4px', 
              backgroundColor: '#151d1a', 
              border: '1px solid rgba(17, 100, 102, 0.4)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)'
            }}
            className="hidden sm:flex"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8cd3d4', boxShadow: '0 0 8px #8cd3d4' }} className="pulse-anim"></span>
            <span style={{ color: '#8cd3d4' }}>FEED: 120HZ ONLINE</span>
          </div>

          {/* Outbreak Trigger Button */}
          <button
            onClick={onOpenOutbreakModal}
            className="btn btn-outline btn-sm hidden md:flex"
            style={{ color: outbreakActive ? '#FFCB9A' : '#bec8c8', borderColor: outbreakActive ? 'rgba(245, 158, 11, 0.5)' : 'rgba(209, 232, 226, 0.2)' }}
          >
            <Zap size={14} color={outbreakActive ? '#FFCB9A' : '#8cd3d4'} />
            <span>{outbreakActive ? 'OUTBREAK ACTIVE' : 'SIMULATOR'}</span>
          </button>

          {/* Primary Enter Dashboard CTA Button */}
          <button
            id="nav-enter-dashboard-btn"
            onClick={onEnterDashboard}
            className="btn btn-primary"
            style={{
              padding: '10px 22px',
              fontSize: '13px',
              letterSpacing: '0.12em',
              fontWeight: 700
            }}
          >
            <span>ENTER DASHBOARD</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Main Landing Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px' }}>
        
        {/* ========================================================================= */}
        {/* Hero Section */}
        {/* ========================================================================= */}
        <section
          id="hero"
          className="ambient-bg"
          style={{
            position: 'relative',
            minHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '48px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(209, 232, 226, 0.15)',
            boxShadow: '0 0 50px rgba(17, 100, 102, 0.25)',
            maxWidth: '1560px',
            margin: '24px auto',
            width: '100%'
          }}
        >
          {/* Atmospheric Teal Light Glows */}
          <div 
            style={{
              position: 'absolute',
              top: '15%',
              left: '-10%',
              width: '55%',
              height: '55%',
              backgroundColor: 'rgba(17, 100, 102, 0.25)',
              filter: 'blur(160px)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '0',
              right: '-10%',
              width: '50%',
              height: '50%',
              backgroundColor: 'rgba(25, 104, 106, 0.2)',
              filter: 'blur(140px)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />

          {/* Technical Grid Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.035,
              backgroundImage: 'linear-gradient(#D1E8E2 1px, transparent 1px), linear-gradient(90deg, #D1E8E2 1px, transparent 1px)',
              backgroundSize: '64px 64px'
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '960px', margin: '0 auto', gap: '30px' }}>
            
            {/* System Sub-tag */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
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

            {/* Hero Headline */}
            <h1
              id="landing-hero-headline"
              className="text-glow"
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5.5vw, 54px)',
                textTransform: 'uppercase',
                color: '#D1E8E2',
                letterSpacing: '0.14em',
                lineHeight: 1.12
              }}
            >
              PREDICTIVE HEALTHCARE SUPPLY RESILIENCE
            </h1>

            {/* Hero Subtitle */}
            <p 
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.7,
                color: '#bec8c8',
                maxWidth: '780px',
                margin: '0 auto',
                fontWeight: 400
              }}
            >
              An intelligent decision-support platform designed for primary healthcare facilities. Combining autonomous AI demand forecasting, early-warning stock-out protection, and privacy-preserving federated learning across international health networks.
            </p>

            {/* Solarin Core 3D Interactive Centerpiece */}
            <div style={{ position: 'relative', padding: '10px 0' }}>
              {/* Outer Glowing Rings Frame */}
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
                    width: '280px',
                    backgroundColor: 'rgba(13, 21, 18, 0.95)',
                    border: '1px solid #116466',
                    padding: '8px 14px',
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

            {/* Primary Action Button CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px', paddingTop: '16px' }}>
              <button
                id="hero-explore-sentinel-btn"
                onClick={onEnterDashboard}
                className="btn btn-primary btn-glow"
                style={{
                  padding: '14px 34px',
                  fontSize: '14px',
                  letterSpacing: '0.14em',
                  fontWeight: 700
                }}
              >
                <span>ENTER DASHBOARD</span>
                <ArrowRight size={18} />
              </button>

              <button
                id="hero-sync-btn"
                onClick={handleTriggerSync}
                disabled={isSynchronizing}
                className="btn btn-outline"
                style={{
                  padding: '14px 26px',
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  color: '#8cd3d4',
                  borderColor: 'rgba(140, 211, 212, 0.4)'
                }}
              >
                <Zap size={15} color="#FFCB9A" />
                <span>{isSynchronizing ? 'CALIBRATING...' : 'SYNC SOLARIN CORE'}</span>
              </button>

              <button
                id="hero-specs-btn"
                onClick={() => setShowSpecsModal(true)}
                className="btn btn-outline"
                style={{
                  padding: '14px 22px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.12em'
                }}
              >
                [ SPECS READOUT ]
              </button>
            </div>

            {/* Quick Tech Specs Ticker */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                width: '100%',
                paddingTop: '32px',
                borderTop: '1px solid rgba(209, 232, 226, 0.12)',
                textAlign: 'left'
              }}
            >
              <div style={{ padding: '14px', backgroundColor: 'rgba(21, 29, 26, 0.7)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>TELEMETRY STREAM</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: '15px', fontWeight: 700, color: '#D1E8E2', marginTop: '2px' }}>120Hz Real-Time Uplink</div>
              </div>
              <div style={{ padding: '14px', backgroundColor: 'rgba(21, 29, 26, 0.7)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>PREDICTIVE ACCURACY</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: '15px', fontWeight: 700, color: '#8cd3d4', marginTop: '2px' }}>MAE 3.42 (-39.8% Error)</div>
              </div>
              <div style={{ padding: '14px', backgroundColor: 'rgba(21, 29, 26, 0.7)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>MONITORED FACILITIES</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: '15px', fontWeight: 700, color: '#D1E8E2', marginTop: '2px' }}>142 Primary Health Centres</div>
              </div>
              <div style={{ padding: '14px', backgroundColor: 'rgba(21, 29, 26, 0.7)', border: '1px solid rgba(209, 232, 226, 0.12)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>PRIVACY PROTOCOL</div>
                <div style={{ fontFamily: 'var(--font-title)', fontSize: '15px', fontWeight: 700, color: '#D9B08C', marginTop: '2px' }}>BRICS FedAvg (Zero Raw Data)</div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* Core Capabilities & Features Section */}
        {/* ========================================================================= */}
        <section id="features" style={{ maxWidth: '1560px', margin: '48px auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              AUTONOMOUS LOGISTICS ARCHITECTURE
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: '#D1E8E2', fontFamily: 'var(--font-title)', marginTop: '6px' }} className="text-glow">
              ENTERPRISE-GRADE RESILIENCE CAPABILITIES
            </h2>
            <p style={{ fontSize: '14px', color: '#bec8c8', maxWidth: '640px', margin: '8px auto 0 auto' }}>
              Four integrated modules delivering end-to-end supply chain visibility and automated decision intelligence.
            </p>
          </div>

          <div className="grid-4">
            {/* Feature 1 */}
            <div className="sh-card tech-glow-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #116466' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(17, 100, 102, 0.3)', border: '1px solid #8cd3d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8cd3d4', marginBottom: '16px' }}>
                  <TrendingUp size={20} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#D1E8E2', fontFamily: 'var(--font-title)', marginBottom: '8px' }}>
                  AI Demand Forecasting
                </h3>
                <p style={{ fontSize: '13px', color: '#bec8c8', lineHeight: 1.6 }}>
                  Multi-horizon time-series forecasting incorporating seasonal consumption spikes, weather patterns, and confidence intervals to predict medicine exhaustion.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(17, 100, 102, 0.3)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4' }}>
                MAE: 3.42 // 95% Confidence Bounds
              </div>
            </div>

            {/* Feature 2 */}
            <div className="sh-card tech-glow-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #EF4444' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.25)', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF7B7B', marginBottom: '16px' }}>
                  <ShieldAlert size={20} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#D1E8E2', fontFamily: 'var(--font-title)', marginBottom: '8px' }}>
                  Early-Warning Radar
                </h3>
                <p style={{ fontSize: '13px', color: '#bec8c8', lineHeight: 1.6 }}>
                  Sub-second stock autonomy calculation triggering preemptive notifications 2.4 - 3.8 days prior to catastrophic zero-stock events during outbreak surges.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(17, 100, 102, 0.3)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#FF9E9E' }}>
                Multi-Factor Risk Severity Classifier
              </div>
            </div>

            {/* Feature 3 */}
            <div className="sh-card tech-glow-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #F59E0B' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(245, 158, 11, 0.25)', border: '1px solid #F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFCB9A', marginBottom: '16px' }}>
                  <Truck size={20} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#D1E8E2', fontFamily: 'var(--font-title)', marginBottom: '8px' }}>
                  SciPy Redistribution
                </h3>
                <p style={{ fontSize: '13px', color: '#bec8c8', lineHeight: 1.6 }}>
                  Linear programming solver balancing facility surplus, road network transit distance, and urgency penalties with human-in-the-loop validation.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(17, 100, 102, 0.3)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#FFCB9A' }}>
                scipy.optimize.linprog Simplex Engine
              </div>
            </div>

            {/* Feature 4 */}
            <div className="sh-card tech-glow-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid #8cd3d4' }}>
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: 'rgba(17, 100, 102, 0.3)', border: '1px solid #8cd3d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8cd3d4', marginBottom: '16px' }}>
                  <Network size={20} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#D1E8E2', fontFamily: 'var(--font-title)', marginBottom: '8px' }}>
                  BRICS Federated Learning
                </h3>
                <p style={{ fontSize: '13px', color: '#bec8c8', lineHeight: 1.6 }}>
                  Flower FedAvg framework aggregating weight parameters across India, Brazil, and South Africa nodes without moving raw patient or facility records.
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(17, 100, 102, 0.3)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4' }}>
                100% Data Locality &amp; Privacy Preserved
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Architecture & BRICS Nodes Showcase */}
        {/* ========================================================================= */}
        <section id="architecture" style={{ maxWidth: '1560px', margin: '24px auto 48px auto', width: '100%' }}>
          <div className="sh-card" style={{ padding: '32px', backgroundColor: 'rgba(13, 21, 18, 0.9)', border: '1px solid #116466' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', borderBottom: '1px solid rgba(17, 100, 102, 0.4)', paddingBottom: '24px', marginBottom: '28px' }}>
              <div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  INTERNATIONAL DEPLOYMENT SPECIFICATIONS
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#D1E8E2', fontFamily: 'var(--font-title)', marginTop: '4px' }}>
                  BRICS TRACK 3 AI ARCHITECTURE
                </h2>
              </div>

              <button
                onClick={onEnterDashboard}
                className="btn btn-primary"
                style={{ padding: '10px 24px', fontSize: '13px' }}
              >
                <span>LAUNCH COMMAND CENTER</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div id="brics-nodes" className="grid-3" style={{ gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: '#151d1a', border: '1px solid rgba(17, 100, 102, 0.3)', borderRadius: '6px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🇮🇳</div>
                <div style={{ fontWeight: 700, color: '#D1E8E2', fontSize: '16px', fontFamily: 'var(--font-title)' }}>India State Node</div>
                <div style={{ fontSize: '12px', color: '#8cd3d4', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>AIIMS Delhi / UP State Health</div>
                <div style={{ fontSize: '12px', color: '#bec8c8', marginTop: '10px', fontFamily: 'var(--font-mono)' }}>
                  142 Facilities // 1,240,500 Records Trained
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#151d1a', border: '1px solid rgba(17, 100, 102, 0.3)', borderRadius: '6px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🇧🇷</div>
                <div style={{ fontWeight: 700, color: '#D1E8E2', fontSize: '16px', fontFamily: 'var(--font-title)' }}>Brazil National Node</div>
                <div style={{ fontSize: '12px', color: '#8cd3d4', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>Fiocruz Rio / SUS Network</div>
                <div style={{ fontSize: '12px', color: '#bec8c8', marginTop: '10px', fontFamily: 'var(--font-mono)' }}>
                  98 Facilities // 890,200 Records Trained
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#151d1a', border: '1px solid rgba(17, 100, 102, 0.3)', borderRadius: '6px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🇿🇦</div>
                <div style={{ fontWeight: 700, color: '#D1E8E2', fontSize: '16px', fontFamily: 'var(--font-title)' }}>South Africa Node</div>
                <div style={{ fontSize: '12px', color: '#8cd3d4', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>SAMRC Cape Town / National Node</div>
                <div style={{ fontSize: '12px', color: '#bec8c8', marginTop: '10px', fontFamily: 'var(--font-mono)' }}>
                  76 Facilities // 610,000 Records Trained
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Specifications Readout Modal */}
      {showSpecsModal && (
        <div
          id="solarin-specs-modal"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
                  onEnterDashboard();
                }}
                className="btn btn-primary btn-sm"
              >
                ENTER DASHBOARD
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

    </div>
  );
}
