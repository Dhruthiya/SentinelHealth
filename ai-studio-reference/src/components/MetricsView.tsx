import React, { useState } from 'react';
import { Activity, BarChart3, Zap, Shield, Cpu, RefreshCw, Layers, TrendingUp } from 'lucide-react';

export const MetricsView: React.FC = () => {
  const [activeMetricTab, setActiveMetricTab] = useState<'cellular' | 'cardio' | 'neural'>('cellular');
  const [telemetryRate, setTelemetryRate] = useState<'60hz' | '120hz' | '240hz'>('120hz');

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 py-8 md:py-12 z-10 relative">
      {/* View Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-['Sora'] font-bold text-[32px] sm:text-[40px] md:text-[48px] uppercase text-[#D1E8E2] tracking-[0.15em] leading-[1.1] text-glow mb-2">
            ADVANCED METRICS
          </h1>
          <p className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-[0.2em]">
            Deep-Tissue Biometric Telemetry & Cellular Dynamics // Node Matrix
          </p>
        </div>

        {/* Telemetry Filter Pills */}
        <div className="flex items-center gap-2 bg-[#151d1a] p-1.5 rounded tech-border">
          {(['cellular', 'cardio', 'neural'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMetricTab(tab)}
              className={`px-3 py-1.5 rounded-xs font-mono-tech text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeMetricTab === tab
                  ? 'bg-[#116466] text-[#D1E8E2] font-bold shadow-[0_0_12px_#116466]'
                  : 'text-[#bec8c8] hover:text-[#D1E8E2]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Cellular ATP Turnover */}
        <div className="tech-border rounded-lg p-6 glass-panel tech-glow relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[11px] font-mono-tech text-[#8cd3d4] uppercase tracking-widest">
                CYTOPLASMIC FLUX
              </span>
              <h3 className="font-['Sora'] font-bold text-[18px] text-[#D1E8E2] mt-0.5">
                Cellular ATP Turnover
              </h3>
            </div>
            <Zap className="w-5 h-5 text-[#FFCB9A]" />
          </div>

          <div className="font-['Sora'] text-[32px] font-bold text-[#D1E8E2] text-glow mb-2">
            94.8 <span className="text-sm font-normal text-[#8cd3d4]">µmol/s</span>
          </div>

          <p className="text-xs text-[#bec8c8] mb-4">
            Mitochondrial phosphorylation rate operating within optimal 98th percentile envelope.
          </p>

          <div className="space-y-2 text-[11px] font-mono-tech">
            <div className="flex justify-between text-[#bec8c8]">
              <span>Mitochondrial Density:</span>
              <span className="text-[#D1E8E2]">1,420 / cell</span>
            </div>
            <div className="flex justify-between text-[#bec8c8]">
              <span>Lactate Clearance:</span>
              <span className="text-[#8cd3d4]">0.8 mmol/L (Super-clean)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Autonomic Balance */}
        <div className="tech-border rounded-lg p-6 glass-panel tech-glow relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[11px] font-mono-tech text-[#8cd3d4] uppercase tracking-widest">
                NEURAL TONE
              </span>
              <h3 className="font-['Sora'] font-bold text-[18px] text-[#D1E8E2] mt-0.5">
                Autonomic Balance (HRV)
              </h3>
            </div>
            <Activity className="w-5 h-5 text-[#8cd3d4]" />
          </div>

          <div className="font-['Sora'] text-[32px] font-bold text-[#D1E8E2] text-glow mb-2">
            68.4 <span className="text-sm font-normal text-[#8cd3d4]">rMSSD</span>
          </div>

          <p className="text-xs text-[#bec8c8] mb-4">
            Parasympathetic dominance indicating superior physical resilience and stress buffering.
          </p>

          <div className="space-y-2 text-[11px] font-mono-tech">
            <div className="flex justify-between text-[#bec8c8]">
              <span>LF/HF Ratio:</span>
              <span className="text-[#D1E8E2]">0.82 (Harmonic)</span>
            </div>
            <div className="flex justify-between text-[#bec8c8]">
              <span>Sympathetic Tone:</span>
              <span className="text-[#D9B08C]">Low (Calm Focus)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Cortical Band Power */}
        <div className="tech-border rounded-lg p-6 glass-panel tech-glow relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[11px] font-mono-tech text-[#8cd3d4] uppercase tracking-widest">
                CORTICAL SYNC
              </span>
              <h3 className="font-['Sora'] font-bold text-[18px] text-[#D1E8E2] mt-0.5">
                Neural Focus Index
              </h3>
            </div>
            <Cpu className="w-5 h-5 text-[#8cd3d4]" />
          </div>

          <div className="font-['Sora'] text-[32px] font-bold text-[#D1E8E2] text-glow mb-2">
            92.1 <span className="text-sm font-normal text-[#8cd3d4]">/ 100</span>
          </div>

          <p className="text-xs text-[#bec8c8] mb-4">
            High alpha-theta phase synchronization during mission operations.
          </p>

          <div className="space-y-2 text-[11px] font-mono-tech">
            <div className="flex justify-between text-[#bec8c8]">
              <span>Sensor Latency:</span>
              <span className="text-[#8cd3d4]">0.08 ms</span>
            </div>
            <div className="flex justify-between text-[#bec8c8]">
              <span>Cortical Coherence:</span>
              <span className="text-[#D1E8E2]">0.96 (High)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Telemetry Feed Breakdown */}
      <div className="tech-border rounded-lg p-6 md:p-8 glass-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#116466]/30 pb-4 mb-6">
          <div>
            <h2 className="font-mono-tech text-[13px] text-[#D1E8E2] uppercase tracking-[0.2em] font-semibold">
              SPECTRAL BIOMETRIC DATA STREAM
            </h2>
            <p className="text-xs text-[#bec8c8] mt-1">
              Multi-channel opto-acoustic sensory feed captured via Solarin Aetheric Core
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono-tech text-[#bec8c8]">SAMPLING RATE:</span>
            <div className="flex gap-1 bg-[#151d1a] p-1 rounded border border-[#116466]/40">
              {(['60hz', '120hz', '240hz'] as const).map((rate) => (
                <button
                  key={rate}
                  onClick={() => setTelemetryRate(rate)}
                  className={`px-2.5 py-0.5 text-[10px] font-mono-tech uppercase rounded ${
                    telemetryRate === rate ? 'bg-[#116466] text-[#8cd3d4] font-bold' : 'text-[#bec8c8]'
                  }`}
                >
                  {rate}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Spectrum Histogram Visualizer */}
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-24 gap-1.5 h-40 items-end p-4 bg-[#0d1512]/80 rounded border border-[#116466]/30 mb-6">
          {Array.from({ length: 24 }).map((_, i) => {
            const heightPct = Math.min(95, Math.max(15, (Math.sin(i * 0.4) * 35 + 50) + (i % 3 * 10)));
            return (
              <div key={i} className="flex flex-col items-center gap-1 h-full justify-end group">
                <div
                  className="w-full bg-gradient-to-t from-[#116466] via-[#8cd3d4] to-[#FFCB9A] rounded-t-xs transition-all duration-300 group-hover:brightness-125"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-[8px] font-mono-tech text-[#bec8c8]/50 hidden sm:block">
                  {i * 5}
                </span>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-[#bec8c8]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#8cd3d4]">
              <span className="w-2 h-2 rounded-full bg-[#8cd3d4]"></span> PRIMARY PHOTON CHANNEL
            </span>
            <span className="flex items-center gap-1 text-[#D9B08C]">
              <span className="w-2 h-2 rounded-full bg-[#D9B08C]"></span> GALVANIC CONDUCTANCE
            </span>
          </div>
          <div>SIGNAL INTEGRITY: 99.98% // ZERO DROPPED PACKETS</div>
        </div>
      </div>
    </div>
  );
};
