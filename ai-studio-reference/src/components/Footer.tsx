import React, { useState } from 'react';
import { X, Mail, Shield, Globe, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'more' | 'contact' | null>(null);

  return (
    <>
      <footer
        id="main-app-footer"
        className="bg-[#0d1512] font-mono-tech text-[12px] uppercase tracking-widest w-full py-8 border-t border-[#D1E8E2]/15 z-10 relative mt-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 max-w-[1440px] mx-auto gap-4">
          <div className="text-[#D1E8E2] opacity-85 hover:opacity-100 transition-opacity">
            © 2024 AEROHEALTH SYSTEMS. ALL RIGHTS RESERVED.
          </div>

          <div className="flex gap-8">
            <button
              onClick={() => setActiveModal('more')}
              className="text-[#bec8c8] hover:text-[#D1E8E2] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            >
              MORE
            </button>
            <button
              onClick={() => setActiveModal('contact')}
              className="text-[#bec8c8] hover:text-[#D1E8E2] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            >
              CONTACT
            </button>
          </div>
        </div>
      </footer>

      {/* More Info Modal */}
      {activeModal === 'more' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="bg-[#0d1512] border border-[#116466] max-w-lg w-full p-6 rounded-lg text-left shadow-[0_0_40px_rgba(17,100,102,0.4)]">
            <div className="flex justify-between items-start border-b border-[#116466]/40 pb-3 mb-4">
              <h3 className="font-['Sora'] font-bold text-lg text-[#D1E8E2]">ABOUT AEROHEALTH SYSTEMS</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#bec8c8] hover:text-[#D1E8E2]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#bec8c8] leading-relaxed mb-4">
              AEROHEALTH SentinelHealth is an ultra-low latency biometric synchronization network engineered for extreme environments, orbital operatives, and high-performance individuals. Built on the Solarin Aetheric protocol.
            </p>
            <div className="space-y-2 text-xs font-mono-tech text-[#bec8c8] p-3 bg-[#151d1a] border border-[#116466]/30 rounded">
              <div>// ARCHITECTURE: Subdermal Photon Resonance Matrix</div>
              <div>// SECURITY: Hardware Security Module (HSM) Level 4</div>
              <div>// COMPLIANCE: MIL-STD-810H & ISO-13485 Bio-Telemetry</div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#116466]/30 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="tech-border px-4 py-1.5 text-xs text-[#8cd3d4] uppercase font-['Sora']"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="bg-[#0d1512] border border-[#116466] max-w-lg w-full p-6 rounded-lg text-left shadow-[0_0_40px_rgba(17,100,102,0.4)]">
            <div className="flex justify-between items-start border-b border-[#116466]/40 pb-3 mb-4">
              <h3 className="font-['Sora'] font-bold text-lg text-[#D1E8E2]">SENTINEL COMMUNICATIONS</h3>
              <button onClick={() => setActiveModal(null)} className="text-[#bec8c8] hover:text-[#D1E8E2]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-[#bec8c8]">
              <div className="p-3 bg-[#151d1a] border border-[#116466]/30 rounded flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8cd3d4]" />
                <div>
                  <div className="text-[10px] font-mono-tech text-[#bec8c8]">ENCRYPTED DISPATCH</div>
                  <div className="text-[#D1E8E2] font-semibold">telemetry@aerohealth.systems</div>
                </div>
              </div>
              <div className="p-3 bg-[#151d1a] border border-[#116466]/30 rounded flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#8cd3d4]" />
                <div>
                  <div className="text-[10px] font-mono-tech text-[#bec8c8]">COMMAND RELAY</div>
                  <div className="text-[#D1E8E2] font-semibold">Sector 9 Orbital Node // Ground Station Zurich</div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#116466]/30 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="tech-border px-4 py-1.5 text-xs text-[#8cd3d4] uppercase font-['Sora']"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
