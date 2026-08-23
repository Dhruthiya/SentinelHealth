import React from 'react';
import { X, Fingerprint, CheckCircle } from 'lucide-react';

export default function OperativeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const profile = {
    id: 'ADMIN-8924',
    name: 'Dr. A. Sharma',
    callsign: 'Sentinel-Lead-1',
    role: 'Chief Health Administrator',
    clearance: 'Level 4 (Executive Dispatch)',
    status: 'OPTIMAL / ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    lastSync: '0.4s ago',
    organization: 'Ministry of Health & Family Welfare / BRICS Health Consortium',
    assignedDistrict: 'All Districts (National / BRICS)',
    neuralLatency: '0.08 ms'
  };

  return (
    <div
      id="operative-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(16px)'
      }}
    >
      <div 
        style={{
          backgroundColor: '#0d1512',
          border: '1px solid #116466',
          maxWidth: '620px',
          width: '100%',
          padding: '28px',
          borderRadius: '8px',
          boxShadow: '0 0 50px rgba(17,100,102,0.5)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(17,100,102,0.4)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'rgba(17,100,102,0.3)', border: '1px solid rgba(140,211,212,0.4)', color: '#8cd3d4' }}>
              <Fingerprint size={24} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                ADMINISTRATOR DOSSIER // SENTINEL COMMAND
              </span>
              <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '22px', color: '#D1E8E2', marginTop: '2px' }} className="text-glow">
                {profile.name} ({profile.id})
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Avatar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              className="tech-border"
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '4px',
                backgroundColor: '#151d1a',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 0 20px rgba(17,100,102,0.4)'
              }}
            >
              <img
                src={profile.avatarUrl}
                alt="Administrator Dossier"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(17,100,102,0.3)', mixBlendMode: 'overlay' }}></div>
              <div style={{ position: 'absolute', insetX: 0, bottom: 0, height: '3px', backgroundColor: '#8cd3d4' }}></div>
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-title)', fontWeight: 600, color: '#D1E8E2', fontSize: '13px' }}>{profile.name}</div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4' }}>{profile.callsign}</div>
            </div>
          </div>

          {/* Dossier Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            <div style={{ padding: '10px 12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px' }}>
              <div style={{ color: '#bec8c8', fontSize: '10px' }}>ASSIGNMENT ROLE</div>
              <div style={{ color: '#D1E8E2', fontWeight: 600, marginTop: '2px' }}>{profile.role}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px 12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px' }}>
                <div style={{ color: '#bec8c8', fontSize: '10px' }}>CLEARANCE</div>
                <div style={{ color: '#8cd3d4', fontWeight: 700, marginTop: '2px' }}>{profile.clearance}</div>
              </div>
              <div style={{ padding: '10px 12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px' }}>
                <div style={{ color: '#bec8c8', fontSize: '10px' }}>STATUS</div>
                <div style={{ color: '#FFCB9A', fontWeight: 700, marginTop: '2px' }} className="text-glow-gold">{profile.status}</div>
              </div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px' }}>
              <div style={{ color: '#bec8c8', fontSize: '10px' }}>ORGANIZATION</div>
              <div style={{ color: '#D1E8E2', marginTop: '2px' }}>{profile.organization}</div>
            </div>

            <div style={{ padding: '10px 12px', backgroundColor: '#151d1a', border: '1px solid rgba(17,100,102,0.3)', borderRadius: '4px' }}>
              <div style={{ color: '#bec8c8', fontSize: '10px' }}>JURISDICTION</div>
              <div style={{ color: '#D9B08C', marginTop: '2px' }}>{profile.assignedDistrict}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(17,100,102,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: '#8cd3d4', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} color="#8cd3d4" /> AUTHORIZATION SIGNATURE VERIFIED
          </span>
          <button
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
}
