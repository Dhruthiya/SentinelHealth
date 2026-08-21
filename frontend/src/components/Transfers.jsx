import React, { useState } from 'react';
import { 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  UserCheck, 
  X,
  FileCheck2,
  Info
} from 'lucide-react';

export default function Transfers({ transfers, onApproveTransfer }) {
  const [approvedLogs, setApprovedLogs] = useState([]);

  const pendingTransfers = transfers.filter(t => t.status === 'PENDING');
  const completedTransfers = transfers.filter(t => t.status === 'APPROVED');

  const handleApprove = (id) => {
    onApproveTransfer(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={20} style={{ color: 'var(--color-primary)' }} />
            <span>Resource Redistribution Optimization (SciPy Engine)</span>
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Linear optimization model balancing surplus availability, distance, urgency, and human-in-the-loop approval
          </div>
        </div>
      </div>

      {/* SciPy Linear Programming Model Explanation Card */}
      <div className="sh-card" style={{ backgroundColor: '#F8FAFC', borderLeft: '4px solid var(--color-primary)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-main)' }}>
              Optimization Algorithm &amp; Human-in-the-Loop Governance
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: '1.6' }}>
              The engine utilizes <code>scipy.optimize.linprog</code> to solve:
              <br />
              <strong style={{ color: 'var(--color-primary-dark)', fontFamily: 'var(--font-mono)' }}>
                Minimize: ∑ (Cost_transport × Distance_ij + Penalty_urgency × UnmetShortage_j)
              </strong>
              <br />
              Subject to constraints: <em>Source stock after transfer ≥ Safety Stock Floor</em>. 
              The system <strong>recommends actions for human approval</strong> — it does not execute physical dispatch without explicit administrator sign-off.
            </div>
          </div>
        </div>
      </div>

      {/* Pending Transfers Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-main)' }}>
          Pending Optimization Recommendations ({pendingTransfers.length})
        </div>

        {pendingTransfers.length > 0 ? (
          pendingTransfers.map(trf => (
            <div key={trf.id} className="sh-card" style={{ border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span className={`badge badge-${trf.priority.toLowerCase()}`}>
                      {trf.priority} PRIORITY
                    </span>
                    <span className="badge badge-info" style={{ textTransform: 'none' }}>
                      Urgency Score: {trf.urgencyScore}/100
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {trf.scipyOptimizationScore}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                    Transfer {trf.quantity} units of <span style={{ color: 'var(--color-primary)' }}>{trf.medicineName}</span>
                  </h3>

                  {/* Source -> Destination Visual Block */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    backgroundColor: 'var(--color-bg-canvas)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    margin: '12px 0'
                  }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>SOURCE (SURPLUS AVAILABLE)</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-main)' }}>{trf.sourcePhcName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-healthy)', fontWeight: '500' }}>Surplus: {trf.sourceSurplus} units</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px' }}>
                      <ArrowRight size={20} style={{ color: 'var(--color-primary)' }} />
                      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{trf.distanceKm} km</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>DESTINATION (PREDICTED SHORTAGE)</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-critical)' }}>{trf.destPhcName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-critical)', fontWeight: '500' }}>Shortage in: {trf.destShortageDays} days</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', gap: '16px' }}>
                    <span>Estimated transit: <strong>~{trf.estTimeMins} mins</strong></span>
                    <span>Outcome: <strong style={{ color: 'var(--color-healthy)' }}>{trf.impactMessage}</strong></span>
                  </div>
                </div>

                {/* Approve Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleApprove(trf.id)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={16} /> Approve Transfer
                  </button>
                  <button 
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center', color: 'var(--color-text-muted)' }}
                  >
                    <X size={13} /> Reject Recommendation
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="sh-card" style={{ textAlign: 'center', padding: '30px', color: 'var(--color-healthy)' }}>
            <CheckCircle2 size={32} style={{ margin: '0 auto 10px auto', display: 'block' }} />
            All current transfer recommendations have been reviewed and approved!
          </div>
        )}
      </div>

      {/* Completed Transfers Log Table */}
      {completedTransfers.length > 0 && (
        <div className="sh-card" style={{ marginTop: '10px' }}>
          <div className="sh-card-header">
            <div className="sh-card-title">
              <FileCheck2 size={16} style={{ color: 'var(--color-healthy)' }} />
              <span>Approved Transfer Execution Log</span>
            </div>
          </div>

          <div className="sh-table-container">
            <table className="sh-table">
              <thead>
                <tr>
                  <th>Transfer ID</th>
                  <th>Medicine</th>
                  <th>Source PHC</th>
                  <th>Destination PHC</th>
                  <th>Quantity</th>
                  <th>Approved By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedTransfers.map(trf => (
                  <tr key={trf.id}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{trf.id}</td>
                    <td style={{ fontWeight: '600' }}>{trf.medicineName}</td>
                    <td>{trf.sourcePhcName}</td>
                    <td style={{ color: 'var(--color-primary)' }}>{trf.destPhcName}</td>
                    <td style={{ fontWeight: '700' }}>{trf.quantity} units</td>
                    <td>Dr. A. Sharma (Chief Admin)</td>
                    <td>
                      <span className="badge badge-healthy">DISPATCHED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
