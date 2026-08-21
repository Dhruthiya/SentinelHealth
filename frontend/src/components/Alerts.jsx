import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  Clock, 
  TrendingDown, 
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} style={{ color: 'var(--color-critical)' }} />
            <span>Early-Warning Alert Center &amp; Risk Ranking</span>
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Real-time stock-out lead times, anomaly triggers, and safety threshold breaches
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sh-card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <Filter size={14} /> Severity:
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'CRITICAL', 'WARNING'].map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className="btn btn-sm"
                style={{
                  backgroundColor: severityFilter === sev ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                  color: severityFilter === sev ? '#FFFFFF' : 'var(--color-text-main)',
                  border: 'none'
                }}
              >
                {sev}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-muted)', marginLeft: '16px' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'CRITICAL';

          return (
            <div 
              key={alert.id}
              className="sh-card"
              style={{
                borderLeft: `4px solid ${isCritical ? 'var(--color-critical)' : 'var(--color-warning)'}`,
                backgroundColor: alert.acknowledged ? 'var(--color-bg-subtle)' : '#FFFFFF',
                opacity: alert.acknowledged ? 0.75 : 1
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className={`badge badge-${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>

                    <span className="badge badge-info" style={{ textTransform: 'none' }}>
                      {alert.type.replace('_', ' ')}
                    </span>

                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> Logged {alert.createdAt}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                    {alert.phcName} — <span style={{ color: isCritical ? 'var(--color-critical)' : 'var(--color-text-main)' }}>{alert.medicineName}</span>
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-main)', marginTop: '4px' }}>
                    {alert.message}
                  </p>

                  <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    <div>Predicted Stock-Out: <strong style={{ color: 'var(--color-text-main)' }}>{alert.predictedDate}</strong></div>
                    <div>Days to Depletion: <strong style={{ color: isCritical ? 'var(--color-critical)' : 'var(--color-warning)' }}>{alert.daysToStockout} Days</strong></div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {!alert.acknowledged ? (
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => onAcknowledgeAlert(alert.id)}
                    >
                      <Check size={13} /> Acknowledge
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--color-healthy)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
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
