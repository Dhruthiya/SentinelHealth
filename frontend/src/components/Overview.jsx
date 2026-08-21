import React, { useState } from 'react';
import { 
  Building2, 
  AlertTriangle, 
  Truck, 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Info
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* KPI Cards Grid */}
      <div className="grid-4">
        {/* KPI 1: Monitored PHCs */}
        <div className="sh-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle">Monitored Facilities</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-main)', marginTop: '4px' }}>
                {filteredPhcs.length} <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: '400' }}>/ 142 PHCs</span>
              </div>
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              <Building2 size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '12px' }}>
            <span className="badge badge-critical">{criticalPhcCount} Critical</span>
            <span style={{ color: 'var(--color-text-muted)' }}>100% telemetry online</span>
          </div>
        </div>

        {/* KPI 2: Stock-outs Predicted */}
        <div className="sh-card" style={{ borderLeft: '4px solid var(--color-critical)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle">Stock-Outs Predicted (&lt; 7 Days)</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-critical)', marginTop: '4px' }}>
                {criticalAlerts.length} <span style={{ fontSize: '13px', fontWeight: '500' }}>Medicines</span>
              </div>
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--color-critical-bg)', color: 'var(--color-critical)' }}>
              <TrendingDown size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '12px', color: 'var(--color-critical)' }}>
            <AlertTriangle size={13} />
            <span>Shortage lead time: 2.4 - 3.8 days</span>
          </div>
        </div>

        {/* KPI 3: Pending Transfers */}
        <div className="sh-card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle">SciPy Optimized Transfers</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-main)', marginTop: '4px' }}>
                {pendingTransfers.length} <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: '400' }}>Awaiting Approval</span>
              </div>
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
              <Truck size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <CheckCircle2 size={13} style={{ color: 'var(--color-healthy)' }} />
            <span>Human-in-the-loop validation active</span>
          </div>
        </div>

        {/* KPI 4: Federated Learning Status */}
        <div className="sh-card" style={{ borderLeft: '4px solid var(--color-info)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="sh-card-subtitle">BRICS Federated Model</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-info)', marginTop: '4px' }}>
                Round #14
              </div>
            </div>
            <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
              <Network size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <span>MAE: <strong>4.12</strong> (vs Local 6.85)</span>
            <span className="badge badge-healthy" style={{ fontSize: '9px' }}>-39.8% Error</span>
          </div>
        </div>
      </div>

      {/* Main Split Content: Spatial Map (Left) + Action & Alerts Panel (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: '20px' }}>
        
        {/* Spatial Map Module */}
        <div className="sh-card" style={{ display: 'flex', flexDirection: 'column', height: '640px' }}>
          <div className="sh-card-header">
            <div>
              <div className="sh-card-title">
                <span>Facility Location & Resource Risk Map</span>
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

          <div style={{ flex: 1, position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <PhcMap 
              phcs={filteredPhcs} 
              selectedPhc={selectedPhc} 
              setSelectedPhc={setSelectedPhc} 
              isEmbedded={true}
            />
          </div>
        </div>

        {/* Right Side: Actionable Transfers + Urgent Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Urgent Transfer Recommendation Card */}
          <div className="sh-card" style={{ border: '1px solid var(--color-warning-border)', backgroundColor: '#FFFDF5' }}>
            <div className="sh-card-header" style={{ marginBottom: '12px', paddingBottom: '8px' }}>
              <div className="sh-card-title" style={{ color: 'var(--color-text-main)', fontSize: '14px' }}>
                <Truck size={16} style={{ color: 'var(--color-warning)' }} />
                <span>Urgent Redistribution Approval</span>
              </div>
              <span className="badge badge-critical">SciPy Optimal</span>
            </div>

            {pendingTransfers.length > 0 ? (
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  {pendingTransfers[0].medicineName} ({pendingTransfers[0].quantity} units)
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  fontSize: '12px',
                  marginBottom: '10px'
                }}>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}>SOURCE (SURPLUS)</div>
                    <div style={{ fontWeight: '600' }}>{pendingTransfers[0].sourcePhcName}</div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--color-primary)', margin: '0 4px' }} />
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}>DESTINATION (SHORTAGE)</div>
                    <div style={{ fontWeight: '600', color: 'var(--color-critical)' }}>{pendingTransfers[0].destPhcName}</div>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
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
              <div style={{ fontSize: '13px', color: 'var(--color-healthy)', textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 8px auto', display: 'block' }} />
                No pending transfer approvals required.
              </div>
            )}
          </div>

          {/* Early Warning Alerts Quick Feed */}
          <div className="sh-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="sh-card-header">
              <div className="sh-card-title">
                <ShieldAlert size={16} style={{ color: 'var(--color-critical)' }} />
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
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: alert.severity === 'CRITICAL' ? 'var(--color-critical-bg)' : 'var(--color-bg-card)',
                    fontSize: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{alert.phcName}</span>
                    <span className={`badge badge-${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <div style={{ fontWeight: '500', color: alert.severity === 'CRITICAL' ? 'var(--color-critical)' : 'var(--color-text-main)' }}>
                    {alert.medicineName} — {alert.message}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'flex', gap: '12px' }}>
                    <span>Predicted stock-out: <strong>{alert.predictedDate}</strong></span>
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
