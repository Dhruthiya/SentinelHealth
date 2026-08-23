import React, { useState } from 'react';
import { SolarinCore3D } from './SolarinCore3D';
import { Sparkles, ShieldCheck, Activity, Cpu, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { NavTab } from '../types';

interface HeroViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenShop: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({ onNavigate, onOpenShop }) => {
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
    }, 180);
  };

  return (
    <section
      id="solarin-hero-section"
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center ambient-bg overflow-hidden px-4 md:px-16 py-12"
    >
      {/* Atmospheric Teal Light Leaks */}
      <div className="absolute top-1/4 -left-[20%] w-[55%] h-[55%] bg-[#116466]/25 blur-[160px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 -right-[10%] w-[45%] h-[45%] bg-[#19686a]/20 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Grid Lines for Technical Aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#D1E8E2 1px, transparent 1px), linear-gradient(90deg, #D1E8E2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 md:space-y-10">
        {/* System Sub-tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#116466]/20 border border-[#116466] text-[#8cd3d4] font-mono-tech text-[11px] uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 bg-[#8cd3d4] rounded-full animate-ping"></span>
          AETHERIC PROTOCOL // PHASE 4.2 ONLINE
        </div>

        {/* Hero Title */}
        <h1
          id="solarin-headline"
          className="font-['Sora'] font-bold text-[32px] sm:text-[42px] md:text-[52px] uppercase text-[#D1E8E2] tracking-[0.18em] leading-[1.15] text-glow"
        >
          SOLARIN HAS ARRIVED
        </h1>

        {/* Hero Subtitle */}
        <p className="font-['Hanken_Grotesk'] text-[16px] md:text-[19px] leading-[1.7] text-[#bec8c8] max-w-2xl mx-auto font-normal">
          Initiating next-generation biometric synchronization. The Aetheric protocol is online, providing unparalleled telemetry and cellular insights.
        </p>

        {/* 3D Interactive Centerpiece */}
        <div className="relative py-2">
          {/* Decorative Outer Rings & Glow Halo */}
          <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-[#8cd3d4]/30 flex items-center justify-center hero-glow relative bg-[#151d1a]/60 backdrop-blur-md">
            {/* Spinning decorative geometric rings */}
            <div className="absolute inset-3 rounded-full border border-[#D1E8E2]/15 animate-[spin_24s_linear_infinite] pointer-events-none"></div>
            <div className="absolute inset-7 rounded-full border-t border-r border-[#8cd3d4]/50 animate-[spin_18s_linear_infinite_reverse] pointer-events-none"></div>
            <div className="absolute inset-12 rounded-full border-b border-l border-[#D9B08C]/40 animate-[spin_30s_linear_infinite] pointer-events-none"></div>

            {/* Three.js 3D Core with WebGL Icosahedron & Inner warm nucleus */}
            <SolarinCore3D isSynchronizing={isSynchronizing} />
          </div>

          {/* Sync Progress Indicator */}
          {isSynchronizing && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 bg-[#0d1512]/90 border border-[#116466] p-2 rounded backdrop-blur-md">
              <div className="flex justify-between text-[11px] font-mono-tech text-[#8cd3d4] mb-1">
                <span>SYNCHRONIZING TELEMETRY...</span>
                <span>{syncProgress}%</span>
              </div>
              <div className="w-full bg-[#151d1a] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#8cd3d4] h-full transition-all duration-200 shadow-[0_0_8px_#8cd3d4]"
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
            </div>
          )}

          {syncCompleted && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#116466]/40 border border-[#8cd3d4] px-4 py-1.5 rounded text-[11px] font-mono-tech text-[#8cd3d4] backdrop-blur-md animate-fade-in shadow-[0_0_15px_rgba(140,211,212,0.4)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8cd3d4]" />
              <span>AETHERIC SYNC ESTABLISHED // 100% TELEMETRY LOCK</span>
            </div>
          )}
        </div>

        {/* Hero Actions */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            id="hero-discover-btn"
            onClick={() => onNavigate('dashboard')}
            className="px-10 md:px-12 py-3.5 md:py-4 border border-[#D1E8E2] text-[#D1E8E2] font-['Sora'] font-semibold text-[13px] md:text-[14px] uppercase tracking-[0.16em] btn-glow transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 group-hover:text-[#8cd3d4] transition-colors duration-300 flex items-center gap-2">
              DISCOVER DASHBOARD <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <button
            id="hero-sync-btn"
            onClick={handleTriggerSync}
            disabled={isSynchronizing}
            className="px-8 py-3.5 md:py-4 border border-[#116466] bg-[#116466]/20 text-[#8cd3d4] font-['Sora'] font-semibold text-[13px] md:text-[14px] uppercase tracking-[0.16em] hover:bg-[#116466]/40 hover:border-[#8cd3d4] transition-all duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Zap className="w-4 h-4 text-[#FFCB9A]" />
            {isSynchronizing ? 'CALIBRATING...' : 'SYNC CORE'}
          </button>

          <button
            id="hero-specs-btn"
            onClick={() => setShowSpecsModal(true)}
            className="px-6 py-3.5 md:py-4 text-[#bec8c8] hover:text-[#D1E8E2] font-mono-tech text-[12px] uppercase tracking-[0.18em] border border-transparent hover:border-[#D1E8E2]/20 transition-all cursor-pointer"
          >
            [ SPECS READOUT ]
          </button>
        </div>

        {/* Quick Tech Specs Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-8 border-t border-[#D1E8E2]/10 text-left">
          <div className="p-3 bg-[#151d1a]/50 border border-[#D1E8E2]/10 rounded-sm">
            <div className="text-[11px] font-mono-tech text-[#bec8c8]">TELEMETRY BAND</div>
            <div className="font-['Sora'] text-[15px] font-semibold text-[#D1E8E2] mt-0.5">8.42 GHz Sub-Quantum</div>
          </div>
          <div className="p-3 bg-[#151d1a]/50 border border-[#D1E8E2]/10 rounded-sm">
            <div className="text-[11px] font-mono-tech text-[#bec8c8]">CELLULAR LATENCY</div>
            <div className="font-['Sora'] text-[15px] font-semibold text-[#8cd3d4] mt-0.5">&lt; 0.12 ms Real-Time</div>
          </div>
          <div className="p-3 bg-[#151d1a]/50 border border-[#D1E8E2]/10 rounded-sm">
            <div className="text-[11px] font-mono-tech text-[#bec8c8]">BIOMETRIC NODES</div>
            <div className="font-['Sora'] text-[15px] font-semibold text-[#D1E8E2] mt-0.5">144 Continuous</div>
          </div>
          <div className="p-3 bg-[#151d1a]/50 border border-[#D1E8E2]/10 rounded-sm">
            <div className="text-[11px] font-mono-tech text-[#bec8c8]">ENCRYPTION</div>
            <div className="font-['Sora'] text-[15px] font-semibold text-[#D9B08C] mt-0.5">AES-GCM-512 Bio-Key</div>
          </div>
        </div>
      </div>

      {/* Specifications Modal */}
      {showSpecsModal && (
        <div
          id="solarin-specs-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        >
          <div className="bg-[#0d1512] border border-[#116466] max-w-2xl w-full p-6 md:p-8 rounded-lg shadow-[0_0_40px_rgba(17,100,102,0.4)] text-left relative">
            <div className="flex justify-between items-start border-b border-[#116466]/40 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-mono-tech text-[#8cd3d4] uppercase tracking-widest">
                  HARDWARE ARCHITECTURE
                </span>
                <h3 className="font-['Sora'] font-bold text-[22px] text-[#D1E8E2] mt-1">
                  SOLARIN AETHERIC TERMINAL SPECIFICATIONS
                </h3>
              </div>
              <button
                onClick={() => setShowSpecsModal(false)}
                className="text-[#bec8c8] hover:text-[#D1E8E2] p-1 cursor-pointer font-mono-tech"
              >
                [ESC / CLOSE]
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#bec8c8]">
              <div className="p-3 bg-[#151d1a] border border-[#D1E8E2]/10 rounded">
                <div className="font-semibold text-[#D1E8E2] mb-1">01. Quantum Biometric Sensor Array</div>
                <p className="text-xs text-[#bec8c8]">
                  Integrated non-invasive subdermal photon resonance scanners measuring cellular adenosine triphosphate (ATP) turnover, capillary oxygen saturation, and autonomic tone with micro-second resolution.
                </p>
              </div>

              <div className="p-3 bg-[#151d1a] border border-[#D1E8E2]/10 rounded">
                <div className="font-semibold text-[#D1E8E2] mb-1">02. Aetheric Sync Protocol Engine</div>
                <p className="text-xs text-[#bec8c8]">
                  Zero-latency encrypted streaming backhaul transmitting 120Hz physiological telemetry to SentinelHealth nodes, executing predictive strain compensation and real-time circadian phase tracking.
                </p>
              </div>

              <div className="p-3 bg-[#151d1a] border border-[#D1E8E2]/10 rounded">
                <div className="font-semibold text-[#D1E8E2] mb-1">03. Material & Biocompatibility</div>
                <p className="text-xs text-[#bec8c8]">
                  Aero-grade titanium housing with DLC (Diamond-Like Carbon) coating, medical grade fluorosilicone contact pads, resistant to 10 ATM atmospheric pressure and extreme environmental radiation.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#116466]/40 flex justify-between items-center">
              <button
                onClick={() => {
                  setShowSpecsModal(false);
                  onOpenShop();
                }}
                className="tech-border px-6 py-2.5 text-[#D1E8E2] font-['Sora'] text-xs uppercase tracking-widest hover:text-[#8cd3d4] btn-glow cursor-pointer"
              >
                ORDER SOLARIN UNIT
              </button>
              <button
                onClick={() => setShowSpecsModal(false)}
                className="text-xs font-mono-tech text-[#bec8c8] hover:text-[#D1E8E2] cursor-pointer"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
