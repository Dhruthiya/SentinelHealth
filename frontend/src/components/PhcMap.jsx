import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  BedDouble, 
  UserCheck, 
  AlertTriangle, 
  X, 
  Layers, 
  Search, 
  Filter,
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
    <div style={{
      width: '100%',
      height: isEmbedded ? '100%' : 'calc(100vh - 120px)',
      position: 'relative',
      backgroundColor: '#0F172A',
      borderRadius: isEmbedded ? '0' : 'var(--radius-md)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Map Control Bar Overlay */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        right: '16px',
        zIndex: 20,
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: 'auto'
      }}>
        {/* Search & Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
          <Search size={14} style={{ color: '#94A3B8' }} />
          <input 
            type="text" 
            placeholder="Search PHC facility..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F8FAFC',
              outline: 'none',
              fontSize: '12px',
              width: '180px'
            }}
          />
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '4px', borderRadius: '6px', border: '1px solid #334155' }}>
          {['ALL', 'CRITICAL', 'WARNING', 'HEALTHY'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: filterStatus === st ? '#1E293B' : 'transparent',
                color: filterStatus === st ? '#F8FAFC' : '#94A3B8',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Vector Spatial Canvas / Interactive Map Visual */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundImage: 'radial-gradient(#1E293B 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        backgroundColor: '#090E17',
        display: 'flex',
        alignItems: 'center',
        justify: 'center'
      }}>
        {/* Grid Map Vector Graphic */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* District boundary paths */}
          <path d="M 50 100 Q 300 80 550 140 T 900 200" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 120 350 Q 400 300 700 380 T 1100 320" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" />
          
          <text x="60" y="70" fill="#475569" fontSize="12" fontWeight="600" letterSpacing="0.05em">DISTRICT A (NORTH)</text>
          <text x="450" y="120" fill="#475569" fontSize="12" fontWeight="600" letterSpacing="0.05em">DISTRICT B (EAST)</text>
          <text x="150" y="320" fill="#475569" fontSize="12" fontWeight="600" letterSpacing="0.05em">DISTRICT C (SOUTH)</text>
        </svg>

        {/* Interactive Pins for PHCs */}
        {filteredPhcs.map((phc, idx) => {
          // Calculate SVG position mapping
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
            CRITICAL: 'var(--color-critical)',
            WARNING: 'var(--color-warning)',
            HEALTHY: 'var(--color-healthy)'
          };
          const pinColor = colorMap[phc.status];

          return (
            <div
              key={phc.id}
              onClick={() => setSelectedPhc(phc)}
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
              {/* Pulse effect for Critical PHCs */}
              {phc.status === 'CRITICAL' && (
                <div style={{
                  position: 'absolute',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(214, 69, 69, 0.3)',
                  animation: 'pulse 2s infinite'
                }} />
              )}

              {/* Pin Icon Container */}
              <div style={{
                width: isSelected ? '32px' : '26px',
                height: isSelected ? '32px' : '26px',
                borderRadius: '50%',
                backgroundColor: pinColor,
                border: '3px solid #FFFFFF',
                boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                transition: 'all 0.2s ease'
              }}>
                <Building2 size={isSelected ? 16 : 13} />
              </div>

              {/* Label Tag */}
              <div style={{
                marginTop: '4px',
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                color: '#F8FAFC',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
                border: `1px solid ${pinColor}`,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                {phc.name.split(' ')[0]} {phc.id.split('-')[1]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Facility Detail Drawer */}
      {selectedPhc && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '380px',
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid var(--color-border)',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.2)',
          zIndex: 40,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className={`badge badge-${selectedPhc.status.toLowerCase()}`}>
                {selectedPhc.status} STATUS
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '6px', color: 'var(--color-text-main)' }}>
                {selectedPhc.name}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                {selectedPhc.district} • {selectedPhc.state}
              </div>
            </div>

            <button 
              onClick={() => setSelectedPhc(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Facility Telemetry Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '10px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BedDouble size={12} /> Bed Occupancy
              </div>
              <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '2px' }}>
                {selectedPhc.bedsOccupied} / {selectedPhc.bedsTotal}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {Math.round((selectedPhc.bedsOccupied / selectedPhc.bedsTotal) * 100)}% capacity
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '6px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <UserCheck size={12} /> Active Staff
              </div>
              <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '2px' }}>
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
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-main)', marginBottom: '8px' }}>
              Facility Resource Alerts
            </div>
            {selectedPhc.criticalMedicines && selectedPhc.criticalMedicines.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedPhc.criticalMedicines.map(med => (
                  <div key={med} style={{
                    padding: '8px 10px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--color-critical-bg)',
                    border: '1px solid var(--color-critical-border)',
                    fontSize: '12px',
                    color: 'var(--color-critical)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>{med}</span>
                    <span>Stock-out &lt; 3 Days</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--color-healthy)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} /> All safety thresholds maintained.
              </div>
            )}
          </div>

          {/* AI Recommendation for this PHC */}
          {selectedPhc.status === 'CRITICAL' && (
            <div style={{ 
              padding: '12px', 
              borderRadius: '6px', 
              backgroundColor: 'var(--color-warning-bg)', 
              border: '1px solid var(--color-warning-border)',
              fontSize: '11px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: '600', color: 'var(--color-warning)' }}>
                <Activity size={12} /> AI RECOMMENDATION
              </div>
              <div style={{ color: 'var(--color-text-main)' }}>
                Cross-district transfer recommended from nearest surplus PHC. Estimated transit time: 35-45 mins.
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Package size={14} /> View Facility Inventory
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
