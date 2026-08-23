import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  Clock, 
  Check 
} from 'lucide-react';

export default function Alerts({ alerts, onAcknowledgeAlert, onNavigateToTransfers }) {
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSev = severityFilter === 'ALL' || alert.severity === severityFilter;
    const matchesType = typeFilter === 'ALL' || alert.type === typeFilter;
    return matchesSev && matchesType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            PREDICTIVE RISK CLASSIFIER // AUTOMATED RADAR
          </div>
          <h1 
            style={{ 
              fontSize: 'clamp(22px, 3vw, 32px)', 
              fontWeight: 800, 
              color: '#D1E8E2', 
              fontFamily: 'var(--font-title)',
              marginTop: '4px',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }} 
            className="text-glow"
          >
            <ShieldAlert size={26} color="#EF4444" />
            <span>EARLY-WARNING ALERT MANAGEMENT</span>
          </h1>
          <div style={{ fontSize: '13px', color: '#bec8c8', marginTop: '4px' }}>
            Real-time stock-out lead times, anomaly triggers, and safety threshold breaches
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sh-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>
            <Filter size={14} color="#8cd3d4" /> Severity:
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'CRITICAL', 'WARNING'].map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className="btn btn-sm"
                style={{
                  backgroundColor: severityFilter === sev ? '#116466' : 'rgba(13, 21, 18, 0.7)',
                  color: severityFilter === sev ? '#D1E8E2' : '#bec8c8',
                  border: severityFilter === sev ? '1px solid #8cd3d4' : '1px solid rgba(17, 100, 102, 0.4)'
                }}
              >
                {sev}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#bec8c8', fontFamily: 'var(--font-mono)', marginLeft: '16px' }}>
            Trigger Type:
          </div>
          <select 
            className="sh-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Triggers</option>
            <option value="FORECAST_STOCKOUT">Forecast Stock-Out</option>
            <option value="SAFETY_THRESHOLD_BREACH">Safety Threshold Breach</option>
            <option value="DEMAND_ANOMALY">Demand Anomaly</option>
          </select>
        </div>
      </div>

      {/* Alerts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'CRITICAL';

          return (
            <div 
              key={alert.id}
              className="sh-card tech-glow-hover"
              style={{
                borderLeft: `4px solid ${isCritical ? '#EF4444' : '#F59E0B'}`,
                backgroundColor: alert.acknowledged ? 'rgba(21, 29, 26, 0.5)' : 'rgba(21, 29, 26, 0.88)',
                opacity: alert.acknowledged ? 0.75 : 1
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                
                <div style={{ flex: '1 1 400px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span className={`badge badge-${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>

                    <span className="badge badge-info" style={{ textTransform: 'none' }}>
                      {alert.type.replace(/_/g, ' ')}
                    </span>

                    <span style={{ fontSize: '11px', color: '#899393', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                      <Clock size={12} color="#8cd3d4" /> Logged {alert.createdAt}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                    {alert.phcName} — <span style={{ color: isCritical ? '#FF7B7B' : '#FFCB9A' }}>{alert.medicineName}</span>
                  </h3>

                  <p style={{ fontSize: '13px', color: '#bec8c8', marginTop: '6px', lineHeight: 1.5 }}>
                    {alert.message}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#bec8c8' }}>
                    <div>Predicted Stock-Out: <strong style={{ color: '#D1E8E2' }}>{alert.predictedDate}</strong></div>
                    <div>Days to Depletion: <strong style={{ color: isCritical ? '#FF7B7B' : '#FFCB9A' }}>{alert.daysToStockout} Days</strong></div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {!alert.acknowledged ? (
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => onAcknowledgeAlert(alert.id)}
                    >
                      <Check size={13} color="#8cd3d4" /> Acknowledge
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', color: '#6EE7B7', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                      <CheckCircle2 size={14} /> Acknowledged
                    </span>
                  )}

                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={onNavigateToTransfers}
                  >
                    Redistribution Plan <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
