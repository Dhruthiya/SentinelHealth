import React, { useState } from 'react';
import { BioProtocol } from '../types';
import { Shield, Play, Pause, RotateCcw, CheckCircle2, Droplets, Moon, Zap, Activity } from 'lucide-react';

export const ProtocolsView: React.FC = () => {
  const [protocols, setProtocols] = useState<BioProtocol[]>([
    {
      id: 'proto-1',
      name: 'Circadian Phase Re-alignment',
      code: 'AP-CIR-01',
      category: 'Neurological & Endocrine',
      status: 'ACTIVE',
      progress: 68,
      durationLeft: '03h 42m',
      description:
        'Synchronizes suprachiasmatic nucleus melatonin surge with light frequency dampening to ensure 95%+ REM/deep sleep efficiency.',
      instructions: [
        'Shift spectral display illumination to 540nm amber wavelength',
        'Maintain core thermal room temp at 19.5°C',
        'Consume 300mg magnesium glycinate pre-phase',
      ],
      vitalTarget: 'HRV > 75ms // Deep Sleep Index 94%',
    },
    {
      id: 'proto-2',
      name: 'Sub-Cellular Hyper-Hydration',
      code: 'AP-HYD-04',
      category: 'Osmotic & Electrolytic',
      status: 'CALIBRATING',
      progress: 40,
      durationLeft: '01h 15m',
      description:
        'Optimizes intracellular hydration balance and cellular membrane osmotic conductivity via targeted sodium-potassium balance.',
      instructions: [
        'Ingest 500ml electrolyte solution with 400mg bioavailable sodium',
        'Monitor interstitial fluid conductance on Solarin sensor',
      ],
      vitalTarget: 'Arterial Elasticity 1.05 // Plasma Osmolarity 285 mOsm/kg',
    },
    {
      id: 'proto-3',
      name: 'Mitochondrial Quantum Respiration',
      code: 'AP-MIT-09',
      category: 'Cellular Energetics',
      status: 'STANDBY',
      progress: 0,
      durationLeft: '45m 00s',
      description:
        'Stimulates Cytochrome C Oxidase with targeted 810nm near-infrared photon exposure, surging cellular ATP turnover by up to 28%.',
      instructions: [
        'Connect Solarin photonic resonance pad',
        'Engage 10-minute pulsed light exposure sequence',
      ],
      vitalTarget: 'ATP Turnover > 90 µmol/s // Lactate < 1.0 mmol/L',
    },
  ]);

  const toggleProtocol = (id: string) => {
    setProtocols((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.status === 'ACTIVE') {
          return { ...p, status: 'STANDBY' };
        } else {
          return { ...p, status: 'ACTIVE', progress: Math.max(10, p.progress) };
        }
      })
    );
  };

  const advanceProtocolProgress = (id: string) => {
    setProtocols((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newProgress = Math.min(100, p.progress + 20);
        return {
          ...p,
          progress: newProgress,
          status: newProgress === 100 ? 'OPTIMAL' : p.status,
        };
      })
    );
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 py-8 md:py-12 z-10 relative">
      {/* Protocols Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-['Sora'] font-bold text-[32px] sm:text-[40px] md:text-[48px] uppercase text-[#D1E8E2] tracking-[0.15em] leading-[1.1] text-glow mb-2">
            AETHERIC PROTOCOLS
          </h1>
          <p className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-[0.2em]">
            Automated Bio-Guidance & Physiological Optimization Frameworks
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#116466]/30 border border-[#116466] text-[#8cd3d4] font-mono-tech text-[11px] uppercase tracking-wider">
          <Shield className="w-4 h-4 text-[#8cd3d4]" />
          <span>AUTONOMOUS PROTOCOL ENGINE: ACTIVE</span>
        </div>
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {protocols.map((protocol) => {
          const isActive = protocol.status === 'ACTIVE';
          const isOptimal = protocol.status === 'OPTIMAL';
          const isCalibrating = protocol.status === 'CALIBRATING';

          return (
            <div
              key={protocol.id}
              className={`tech-border rounded-lg p-6 glass-panel flex flex-col justify-between transition-all duration-300 ${
                isActive
                  ? 'border-[#8cd3d4] shadow-[0_0_20px_rgba(17,100,102,0.4)]'
                  : 'hover:border-[#116466]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#8cd3d4] uppercase tracking-widest">
                      {protocol.code} // {protocol.category}
                    </span>
                    <h3 className="font-['Sora'] font-bold text-[18px] text-[#D1E8E2] mt-1">
                      {protocol.name}
                    </h3>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-[#116466] text-[#8cd3d4] border border-[#8cd3d4]/50'
                        : isOptimal
                        ? 'bg-[#D9B08C]/20 text-[#D9B08C] border border-[#D9B08C]/40'
                        : 'bg-[#151d1a] text-[#bec8c8]'
                    }`}
                  >
                    {protocol.status}
                  </span>
                </div>

                <p className="text-xs text-[#bec8c8] mb-4 leading-relaxed">
                  {protocol.description}
                </p>

                {/* Target Vitals */}
                <div className="p-3 bg-[#151d1a]/80 rounded border border-[#116466]/30 mb-4 text-xs font-mono-tech">
                  <div className="text-[#8cd3d4] font-semibold mb-1">TARGET PHYSIOLOGY:</div>
                  <div className="text-[#D1E8E2]">{protocol.vitalTarget}</div>
                </div>

                {/* Instructions */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono-tech text-[#bec8c8] uppercase mb-2">
                    Action Directives:
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#bec8c8]">
                    {protocol.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#8cd3d4] mt-0.5">›</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress and Controls */}
              <div className="pt-4 border-t border-[#116466]/30">
                <div className="flex justify-between text-xs font-mono-tech text-[#bec8c8] mb-1.5">
                  <span>PROGRESS</span>
                  <span className="text-[#8cd3d4] font-semibold">
                    {protocol.progress}% ({protocol.durationLeft} remaining)
                  </span>
                </div>

                <div className="w-full bg-[#151d1a] h-2 rounded-full overflow-hidden mb-4 border border-[#116466]/30">
                  <div
                    className="bg-[#8cd3d4] h-full shadow-[0_0_10px_#8cd3d4] transition-all duration-300"
                    style={{ width: `${protocol.progress}%` }}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleProtocol(protocol.id)}
                    className={`flex-1 py-2 px-3 rounded text-xs font-['Sora'] uppercase tracking-widest font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-[#116466] text-[#D1E8E2] border border-[#8cd3d4]'
                        : 'border border-[#D1E8E2]/30 text-[#D1E8E2] hover:border-[#8cd3d4] hover:text-[#8cd3d4]'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-3.5 h-3.5" /> PAUSE
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> ENGAGE
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => advanceProtocolProgress(protocol.id)}
                    title="Simulate Protocol Step Completion"
                    className="py-2 px-3 rounded border border-[#116466]/50 bg-[#151d1a] text-[#8cd3d4] hover:bg-[#116466]/30 text-xs font-mono-tech cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> +20%
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
