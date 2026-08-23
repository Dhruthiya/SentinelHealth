import React from 'react';
import { OperativeProfile } from '../types';
import { X, Shield, Fingerprint, Award, Activity, Cpu, CheckCircle } from 'lucide-react';

interface OperativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OperativeProfile;
}

export const OperativeModal: React.FC<OperativeModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="operative-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
    >
      <div className="bg-[#0d1512] border border-[#116466] max-w-2xl w-full p-6 md:p-8 rounded-lg shadow-[0_0_50px_rgba(17,100,102,0.5)] relative">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#116466]/40 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#116466]/30 border border-[#8cd3d4]/40 text-[#8cd3d4]">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono-tech text-[#8cd3d4] uppercase tracking-widest">
                CLASSIFIED DOSSIER // SENTINEL COMMAND
              </span>
              <h2 className="font-['Sora'] font-bold text-[22px] md:text-[26px] text-[#D1E8E2] text-glow mt-0.5">
                OPERATIVE {profile.id}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#bec8c8] hover:text-[#D1E8E2] border border-transparent hover:border-[#116466] rounded cursor-pointer font-mono-tech"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Avatar Column */}
          <div className="sm:col-span-1 flex flex-col items-center">
            <div className="w-36 h-36 rounded-sm bg-[#151d1a] tech-border overflow-hidden relative shadow-[0_0_20px_rgba(17,100,102,0.4)]">
              <img
                src={profile.avatarUrl}
                alt="Operative ID-8924 Dossier"
                className="w-full h-full object-cover mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-[#116466]/30 mix-blend-overlay"></div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#8cd3d4]"></div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-['Sora'] font-semibold text-[#D1E8E2] text-sm">{profile.name}</div>
              <div className="text-xs font-mono-tech text-[#8cd3d4]">{profile.callsign}</div>
            </div>
          </div>

          {/* Dossier Info Column */}
          <div className="sm:col-span-2 space-y-3 font-mono-tech text-xs">
            <div className="p-3 bg-[#151d1a] border border-[#116466]/30 rounded">
              <div className="text-[#bec8c8] text-[11px]">ASSIGNMENT ROLE</div>
              <div className="text-[#D1E8E2] font-semibold mt-0.5">{profile.role}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#151d1a] border border-[#116466]/30 rounded">
                <div className="text-[#bec8c8] text-[11px]">CLEARANCE LEVEL</div>
                <div className="text-[#8cd3d4] font-bold mt-0.5">{profile.clearance}</div>
              </div>
              <div className="p-3 bg-[#151d1a] border border-[#116466]/30 rounded">
                <div className="text-[#bec8c8] text-[11px]">OPERATIONAL STATUS</div>
                <div className="text-[#FFCB9A] font-bold mt-0.5 text-glow-gold">{profile.status}</div>
              </div>
            </div>

            <div className="p-3 bg-[#151d1a] border border-[#116466]/30 rounded">
              <div className="text-[#bec8c8] text-[11px]">GENETIC PROFILE / ADAPTATION</div>
              <div className="text-[#D1E8E2] mt-0.5">{profile.geneticProfile}</div>
            </div>

            <div className="p-3 bg-[#151d1a] border border-[#116466]/30 rounded">
              <div className="text-[#bec8c8] text-[11px]">ASSIGNED STATION</div>
              <div className="text-[#D9B08C] mt-0.5">{profile.assignedStation}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#116466]/40 flex justify-between items-center text-xs font-mono-tech">
          <span className="text-[#8cd3d4] flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#8cd3d4]" /> BIO-SYNCHRONIZATION VERIFIED
          </span>
          <button
            onClick={onClose}
            className="tech-border px-5 py-2 text-[#D1E8E2] hover:text-[#8cd3d4] uppercase tracking-wider rounded-sm btn-glow cursor-pointer font-semibold"
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};
