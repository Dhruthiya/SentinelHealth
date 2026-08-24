import React, { useState } from 'react';
import { 
  Building2, 
  BedDouble, 
  UserCheck, 
  X, 
  Search, 
  Package, 
  TrendingUp,
  CheckCircle2,
  Activity
} from 'lucide-react';

export default function PhcMap({ phcs, selectedPhc, setSelectedPhc, isEmbedded = false }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPhcs = phcs.filter(phc => {
    const matchesStatus = filterStatus === 'ALL' || phc.status === filterStatus;
    const matchesSearch = phc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          phc.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div 
      style={{
        width: '100%',
        height: isEmbedded ? '100%' : 'calc(100vh - 140px)',
        position: 'relative',
        backgroundColor: '#090E17',
        borderRadius: isEmbedded ? '0' : '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: isEmbedded ? 'none' : '1px solid rgba(17, 100, 102, 0.35)',
        boxShadow: isEmbedded ? 'none' : '0 0 30px rgba(17, 100, 102, 0.25)'
      }}
    >
      {/* Map Control Bar Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'auto'
        }}
      >
        {/* Search Input */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(13, 21, 18, 0.92)',
            padding: '6px 14px',
            borderRadius: '4px',
            border: '1px solid rgba(17, 100, 102, 0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 16px rgba(17, 100, 102, 0.3)'
          }}
        >
          <Search size={14} color="#8cd3d4" />
          <input 
            type="text" 
            placeholder="Search facility name or district..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#D1E8E2',
              outline: 'none',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              width: '200px'
            }}
          />
        </div>

        {/* Status Filter Buttons */}
        <div 
          style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: 'rgba(13, 21, 18, 0.92)',
            padding: '4px',
            borderRadius: '4px',
            border: '1px solid rgba(17, 100, 102, 0.5)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {['ALL', 'CRITICAL', 'WARNING', 'HEALTHY'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '4px 10px',
                borderRadius: '3px',
                border: 'none',
                backgroundColor: filterStatus === st ? '#116466' : 'transparent',
                color: filterStatus === st ? '#D1E8E2' : '#bec8c8',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                fontWeight: '700',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Vector Spatial Canvas / Interactive Map Visual */}
      <div 
        style={{
          flex: 1,
          position: 'relative',
          backgroundImage: 'radial-gradient(rgba(140, 211, 212, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          backgroundColor: '#090E17',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Grid Map Vector Graphic */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* District boundary paths */}
          <path d="M 50 100 Q 300 80 550 140 T 900 200" fill="none" stroke="rgba(17, 100, 102, 0.4)" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M 120 350 Q 400 300 700 380 T 1100 320" fill="none" stroke="rgba(17, 100, 102, 0.4)" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M 300 50 L 320 500" fill="none" stroke="rgba(209, 232, 226, 0.08)" strokeWidth="1" />
          <path d="M 700 80 L 680 550" fill="none" stroke="rgba(209, 232, 226, 0.08)" strokeWidth="1" />
          
          <text x="60" y="70" fill="rgba(140, 211, 212, 0.6)" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600" letterSpacing="0.1em">DISTRICT A (NORTH)</text>
          <text x="480" y="110" fill="rgba(140, 211, 212, 0.6)" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600" letterSpacing="0.1em">DISTRICT B (EAST)</text>
          <text x="140" y="310" fill="rgba(140, 211, 212, 0.6)" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600" letterSpacing="0.1em">DISTRICT C (SOUTH)</text>
        </svg>

        {/* Interactive Pins for PHCs */}
        {filteredPhcs.map((phc, idx) => {
          const positions = [
            { top: '38%', left: '42%' }, // PHC 017
            { top: '28%', left: '68%' }, // PHC 042
            { top: '22%', left: '25%' }, // PHC 009
            { top: '65%', left: '30%' }, // PHC 031
            { top: '48%', left: '18%' }, // PHC 055
            { top: '55%', left: '75%' }  // PHC 062
          ];
          const pos = positions[idx % positions.length];
          const isSelected = selectedPhc?.id === phc.id;

          const colorMap = {
            CRITICAL: '#EF4444',
            WARNING: '#F59E0B',
            HEALTHY: '#10B981'
          };
          const pinColor = colorMap[phc.status];

          return (
            <div
              key={phc.id}
              onClick={() => {
                if (setSelectedPhc) setSelectedPhc(phc);
              }}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: isSelected ? 30 : 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Pulse ring for Critical PHCs */}
              {phc.status === 'CRITICAL' && (
                <div 
                  style={{
                    position: 'absolute',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.35)',
                    boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
                  }} 
                  className="pulse-anim"
                />
              )}

              {/* Pin Icon Container */}
              <div 
                style={{
                  width: isSelected ? '34px' : '28px',
                  height: isSelected ? '34px' : '28px',
                  borderRadius: '50%',
                  backgroundColor: pinColor,
                  border: '2px solid #D1E8E2',
                  boxShadow: `0 0 14px ${pinColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'all 0.2s ease'
                }}
              >
                <Building2 size={isSelected ? 18 : 14} />
              </div>

              {/* Label Tag */}
              <div 
                style={{
                  marginTop: '6px',
                  backgroundColor: 'rgba(13, 21, 18, 0.95)',
                  color: '#D1E8E2',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: '600',
                  border: `1px solid ${pinColor}`,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 10px rgba(0,0,0,0.6)'
                }}
              >
                {phc.name.split(' ')[0]} {phc.id.split('-')[1]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Facility Detail Drawer */}
      {selectedPhc && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '380px',
            maxWidth: '100%',
            backgroundColor: 'rgba(13, 21, 18, 0.96)',
            borderLeft: '1px solid rgba(17, 100, 102, 0.5)',
            boxShadow: '-6px 0 30px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
            zIndex: 40,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className={`badge badge-${selectedPhc.status.toLowerCase()}`}>
                {selectedPhc.status} STATUS
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginTop: '8px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {selectedPhc.name}
              </h3>
              <div style={{ fontSize: '12px', color: '#bec8c8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                {selectedPhc.district} • {selectedPhc.state}
              </div>
            </div>

            <button 
              onClick={() => {
                if (setSelectedPhc) setSelectedPhc(null);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bec8c8', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Facility Telemetry Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.8)', border: '1px solid rgba(17, 100, 102, 0.3)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#bec8c8', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                <BedDouble size={13} color="#8cd3d4" /> Bed Occupancy
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {selectedPhc.bedsOccupied} / {selectedPhc.bedsTotal}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {Math.round((selectedPhc.bedsOccupied / selectedPhc.bedsTotal) * 100)}% capacity
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.8)', border: '1px solid rgba(17, 100, 102, 0.3)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#bec8c8', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                <UserCheck size={13} color="#8cd3d4" /> Active Staff
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {selectedPhc.staffPresent} / {selectedPhc.staffScheduled}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {Math.round((selectedPhc.staffPresent / selectedPhc.staffScheduled) * 100)}% attendance
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={12} /> Patient Footfall
              </div>
              <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '2px' }}>
                {selectedPhc.patientFootfall || 0}
              </div>
              <div style={{ fontSize: '10px', color: selectedPhc.patientFootfallTrend?.includes('+') ? 'var(--color-warning)' : 'var(--color-healthy)', marginTop: '2px' }}>
                {selectedPhc.patientFootfallTrend || '+5%'} vs baseline
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Package size={12} /> Population Served
              </div>
              <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '2px' }}>
                {selectedPhc.population?.toLocaleString() || 'N/A'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Catchment area
              </div>
            </div>
          </div>

          {/* Critical Items at this PHC */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#D1E8E2', marginBottom: '8px', fontFamily: 'var(--font-title)' }}>
              FACILITY RESOURCE STATUS
            </div>
            {selectedPhc.criticalMedicines && selectedPhc.criticalMedicines.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedPhc.criticalMedicines.map(med => (
                  <div 
                    key={med} 
                    style={{
                      padding: '10px 12px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      fontSize: '12px',
                      color: '#FF9E9E',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <span>{med}</span>
                    <span style={{ fontSize: '10px', color: '#FF7B7B' }}>Stock-out &lt; 3D</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#6EE7B7', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
                <CheckCircle2 size={14} /> All safety thresholds maintained.
              </div>
            )}
          </div>

          {selectedPhc.status === 'CRITICAL' && (
            <div style={{ 
              padding: '12px', 
              borderRadius: '4px', 
              backgroundColor: 'rgba(245, 158, 11, 0.15)', 
              border: '1px solid rgba(245, 158, 11, 0.4)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: '600', color: '#FFCB9A' }}>
                <Activity size={12} /> AI RECOMMENDATION
              </div>
              <div style={{ color: '#D1E8E2' }}>
                Cross-district transfer recommended from nearest surplus PHC. Estimated transit time: 35-45 mins.
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(17, 100, 102, 0.3)' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                if (setSelectedPhc) setSelectedPhc(null);
              }}
            >
              <Package size={14} /> Close Facility Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
