import React, { useState } from 'react';
import { 
  Building2, 
  AlertTriangle, 
  Truck, 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import PhcMap from './PhcMap';

export default function Overview({ 
  phcs, 
  alerts, 
  transfers, 
  onApproveTransfer, 
  onNavigate,
  selectedDistrict 
}) {
  const [selectedPhc, setSelectedPhc] = useState(null);

  // Filter PHCs by district if selected
  const filteredPhcs = selectedDistrict === 'ALL' 
    ? phcs 
    : phcs.filter(p => p.district === selectedDistrict);

  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL');
  const pendingTransfers = transfers.filter(t => t.status === 'PENDING');
  const criticalPhcCount = filteredPhcs.filter(p => p.status === 'CRITICAL').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Overview System Title & Subheader */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            INTELLIGENT HEALTHCARE LOGISTICS // COMMAND CONSOLE
          </div>
          <h1 
            style={{ 
              fontSize: 'clamp(24px, 3.5vw, 36px)', 
              fontWeight: 800, 
              color: '#D1E8E2', 
              fontFamily: 'var(--font-title)',
              marginTop: '4px',
              letterSpacing: '0.04em'
            }} 
            className="text-glow"
          >
            EXECUTIVE COMMAND CENTER
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => onNavigate('hero')}
            style={{ borderColor: 'rgba(140, 211, 212, 0.4)', color: '#8cd3d4' }}
          >
            [ SOLARIN 3D CORE ]
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4">
        {/* KPI 1: Monitored PHCs */}
        <div className="sh-card tech-glow-hover" style={{ borderLeft: '4px solid #116466' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                Monitored Facilities
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#D1E8E2', marginTop: '6px', fontFamily: 'var(--font-title)' }} className="text-glow">
                {filteredPhcs.length} <span style={{ fontSize: '12px', color: '#bec8c8', fontWeight: '400', fontFamily: 'var(--font-mono)' }}>/ 142 PHCs</span>
              </div>
            </div>
            <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(17, 100, 102, 0.3)', color: '#8cd3d4', border: '1px solid rgba(140, 211, 212, 0.4)' }}>
              <Building2 size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            <span className="badge badge-critical">{criticalPhcCount} Critical</span>
            <span style={{ color: '#8cd3d4' }}>100% Telemetry Online</span>
          </div>
        </div>

        {/* KPI 2: Stock-outs Predicted */}
        <div className="sh-card tech-glow-hover" style={{ borderLeft: '4px solid #EF4444' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                Stock-Outs Predicted (&lt; 7D)
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#FF7B7B', marginTop: '6px', fontFamily: 'var(--font-title)' }} className="text-glow">
                {criticalAlerts.length} <span style={{ fontSize: '13px', fontWeight: '500', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>Medicines</span>
              </div>
            </div>
            <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.25)', color: '#FF7B7B', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
              <TrendingDown size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '11px', color: '#FF9E9E', fontFamily: 'var(--font-mono)' }}>
            <AlertTriangle size={13} />
            <span>Shortage lead time: 2.4 - 3.8 days</span>
          </div>
        </div>

        {/* KPI 3: Pending Transfers */}
        <div className="sh-card tech-glow-hover" style={{ borderLeft: '4px solid #F59E0B' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                SciPy Optimized Transfers
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#FFCB9A', marginTop: '6px', fontFamily: 'var(--font-title)' }} className="text-glow-gold">
                {pendingTransfers.length} <span style={{ fontSize: '12px', color: '#bec8c8', fontWeight: '400', fontFamily: 'var(--font-mono)' }}>Awaiting Approval</span>
              </div>
            </div>
            <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(245, 158, 11, 0.25)', color: '#FFCB9A', border: '1px solid rgba(245, 158, 11, 0.5)' }}>
              <Truck size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '11px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>
            <CheckCircle2 size={13} style={{ color: '#6EE7B7' }} />
            <span>Human-in-the-loop validation active</span>
          </div>
        </div>

        {/* KPI 4: Federated Learning Status */}
        <div className="sh-card tech-glow-hover" style={{ borderLeft: '4px solid #8cd3d4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                BRICS Federated Model
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#8cd3d4', marginTop: '6px', fontFamily: 'var(--font-title)' }} className="text-glow">
                Round #14
              </div>
            </div>
            <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(17, 100, 102, 0.3)', color: '#8cd3d4', border: '1px solid rgba(140, 211, 212, 0.4)' }}>
              <Network size={22} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '11px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>
            <span>MAE: <strong style={{ color: '#D1E8E2' }}>4.12</strong> (vs Local 6.85)</span>
            <span className="badge badge-healthy" style={{ fontSize: '9px', padding: '1px 5px' }}>-39.8% Error</span>
          </div>
        </div>
      </div>

      {/* Main Split Content: Spatial Map (Left) + Action & Alerts Panel (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Spatial Map Module */}
        <div className="sh-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '620px', gridColumn: 'span 2' }}>
          <div className="sh-card-header">
            <div>
              <div className="sh-card-title">
                <span>Facility Location &amp; Resource Risk Map</span>
                <span className="badge badge-info" style={{ textTransform: 'none' }}>Live Telemetry</span>
              </div>
              <div className="sh-card-subtitle">
                Geographic visualization of Primary Health Centres across districts
              </div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('map')}>
              Full Map View <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ flex: 1, position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(17, 100, 102, 0.3)' }}>
            <PhcMap 
              phcs={filteredPhcs} 
              selectedPhc={selectedPhc} 
              setSelectedPhc={setSelectedPhc} 
              isEmbedded={true}
            />
          </div>
        </div>

        {/* Right Side: Actionable Transfers + Urgent Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 1' }}>
          
          {/* Top Urgent Transfer Recommendation Card */}
          <div className="sh-card" style={{ border: '1px solid rgba(245, 158, 11, 0.4)', backgroundColor: 'rgba(21, 29, 26, 0.95)' }}>
            <div className="sh-card-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
              <div className="sh-card-title" style={{ fontSize: '13px' }}>
                <Truck size={16} color="#FFCB9A" />
                <span>Urgent Redistribution Approval</span>
              </div>
              <span className="badge badge-critical">SciPy Optimal</span>
            </div>

            {pendingTransfers.length > 0 ? (
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#D1E8E2', marginBottom: '8px', fontFamily: 'var(--font-title)' }}>
                  {pendingTransfers[0].medicineName} ({pendingTransfers[0].quantity} units)
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    backgroundColor: '#0d1512',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(17, 100, 102, 0.4)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '12px'
                  }}
                >
                  <div>
                    <div style={{ color: '#899393', fontSize: '9px', textTransform: 'uppercase' }}>SOURCE (SURPLUS)</div>
                    <div style={{ fontWeight: '700', color: '#D1E8E2', marginTop: '2px' }}>{pendingTransfers[0].sourcePhcName}</div>
                  </div>
                  <ArrowRight size={18} color="#8cd3d4" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#899393', fontSize: '9px', textTransform: 'uppercase' }}>DESTINATION (SHORTAGE)</div>
                    <div style={{ fontWeight: '700', color: '#FF7B7B', marginTop: '2px' }}>{pendingTransfers[0].destPhcName}</div>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#bec8c8', fontFamily: 'var(--font-mono)', marginBottom: '14px' }}>
                  {pendingTransfers[0].impactMessage} (Transit: {pendingTransfers[0].distanceKm}km / ~{pendingTransfers[0].estTimeMins} mins)
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onApproveTransfer(pendingTransfers[0].id)}
                >
                  <CheckCircle2 size={15} /> Approve &amp; Authorize Transfer
                </button>
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: '#6EE7B7', textAlign: 'center', padding: '20px 0', fontFamily: 'var(--font-mono)' }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 8px auto', display: 'block' }} />
                No pending transfer approvals required.
              </div>
            )}
          </div>

          {/* Early Warning Alerts Quick Feed */}
          <div className="sh-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="sh-card-header">
              <div className="sh-card-title">
                <ShieldAlert size={16} color="#FF7B7B" />
                <span>Early Warning Feed</span>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('alerts')}>
                View All ({alerts.length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '340px' }}>
              {alerts.slice(0, 4).map((alert) => (
                <div 
                  key={alert.id}
                  style={{
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(17, 100, 102, 0.3)',
                    backgroundColor: alert.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(13, 21, 18, 0.6)',
                    fontSize: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '700', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>{alert.phcName}</span>
                    <span className={`badge badge-${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <div style={{ fontWeight: '500', color: alert.severity === 'CRITICAL' ? '#FF9E9E' : '#D1E8E2' }}>
                    {alert.medicineName} — {alert.message}
                  </div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#bec8c8', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Predicted stock-out: <strong style={{ color: '#D1E8E2' }}>{alert.predictedDate}</strong></span>
                    <span>{alert.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
