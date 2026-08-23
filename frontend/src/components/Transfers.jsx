import React from 'react';
import { 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  FileCheck2
} from 'lucide-react';

export default function Transfers({ transfers, onApproveTransfer }) {
  const pendingTransfers = transfers.filter(t => t.status === 'PENDING');
  const completedTransfers = transfers.filter(t => t.status === 'APPROVED');

  const handleApprove = (id) => {
    onApproveTransfer(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            LINEAR PROGRAMMING DISPATCH // SCIPY SOLVER
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
            <Truck size={26} color="#8cd3d4" />
            <span>RESOURCE REDISTRIBUTION OPTIMIZATION</span>
          </h1>
          <div style={{ fontSize: '13px', color: '#bec8c8', marginTop: '4px' }}>
            Linear optimization model balancing surplus availability, distance, urgency, and human-in-the-loop approval
          </div>
        </div>
      </div>

      {/* SciPy Linear Programming Model Explanation Card */}
      <div className="sh-card tech-glow-hover" style={{ backgroundColor: 'rgba(21, 29, 26, 0.9)', borderLeft: '4px solid #116466' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'rgba(17, 100, 102, 0.3)', color: '#8cd3d4', border: '1px solid rgba(140, 211, 212, 0.4)' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
              Optimization Algorithm &amp; Human-in-the-Loop Governance
            </div>
            <div style={{ fontSize: '12px', color: '#bec8c8', marginTop: '6px', lineHeight: '1.6' }}>
              The engine utilizes <code>scipy.optimize.linprog</code> to solve:
              <br />
              <strong style={{ color: '#8cd3d4', fontFamily: 'var(--font-mono)' }}>
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
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#D1E8E2', fontFamily: 'var(--font-title)', letterSpacing: '0.04em' }}>
          PENDING OPTIMIZATION RECOMMENDATIONS ({pendingTransfers.length})
        </div>

        {pendingTransfers.length > 0 ? (
          pendingTransfers.map(trf => (
            <div key={trf.id} className="sh-card tech-glow-hover" style={{ border: '1px solid rgba(17, 100, 102, 0.35)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                
                <div style={{ flex: '1 1 500px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span className={`badge badge-${trf.priority.toLowerCase()}`}>
                      {trf.priority} PRIORITY
                    </span>
                    <span className="badge badge-info" style={{ textTransform: 'none' }}>
                      Urgency Score: {trf.urgencyScore}/100
                    </span>
                    <span style={{ fontSize: '11px', color: '#8cd3d4', fontFamily: 'var(--font-mono)' }}>
                      {trf.scipyOptimizationScore}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                    Transfer {trf.quantity} units of <span style={{ color: '#8cd3d4' }}>{trf.medicineName}</span>
                  </h3>

                  {/* Source -> Destination Visual Block */}
                  <div 
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      backgroundColor: '#0d1512',
                      padding: '14px 18px',
                      borderRadius: '4px',
                      border: '1px solid rgba(17, 100, 102, 0.4)',
                      margin: '14px 0'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#899393', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>SOURCE (SURPLUS AVAILABLE)</div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#D1E8E2', marginTop: '2px', fontFamily: 'var(--font-title)' }}>{trf.sourcePhcName}</div>
                      <div style={{ fontSize: '11px', color: '#6EE7B7', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>Surplus: {trf.sourceSurplus} units</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px' }}>
                      <ArrowRight size={22} color="#8cd3d4" />
                      <div style={{ fontSize: '10px', color: '#8cd3d4', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{trf.distanceKm} km</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#899393', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>DESTINATION (PREDICTED SHORTAGE)</div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#FF7B7B', marginTop: '2px', fontFamily: 'var(--font-title)' }}>{trf.destPhcName}</div>
                      <div style={{ fontSize: '11px', color: '#FF9E9E', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>Shortage in: {trf.destShortageDays} days</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', color: '#bec8c8', display: 'flex', flexWrap: 'wrap', gap: '16px', fontFamily: 'var(--font-mono)' }}>
                    <span>Estimated transit: <strong style={{ color: '#D1E8E2' }}>~{trf.estTimeMins} mins</strong></span>
                    <span>Outcome: <strong style={{ color: '#6EE7B7' }}>{trf.impactMessage}</strong></span>
                  </div>
                </div>

                {/* Approve Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '190px' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleApprove(trf.id)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={16} /> Approve Transfer
                  </button>
                  <button 
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center', color: '#bec8c8' }}
                  >
                    <X size={13} /> Reject Recommendation
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="sh-card" style={{ textAlign: 'center', padding: '36px', color: '#6EE7B7', fontFamily: 'var(--font-mono)' }}>
            <CheckCircle2 size={36} style={{ margin: '0 auto 12px auto', display: 'block' }} />
            All current transfer recommendations have been reviewed and approved!
          </div>
        )}
      </div>

      {/* Completed Transfers Log Table */}
      {completedTransfers.length > 0 && (
        <div className="sh-card" style={{ marginTop: '10px', padding: 0, overflow: 'hidden' }}>
          <div className="sh-card-header" style={{ padding: '16px 20px', margin: 0 }}>
            <div className="sh-card-title">
              <FileCheck2 size={16} color="#6EE7B7" />
              <span>Approved Transfer Execution Log</span>
            </div>
          </div>

          <div className="sh-table-container" style={{ border: 'none' }}>
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
                    <td style={{ fontFamily: 'var(--font-mono)', color: '#8cd3d4' }}>{trf.id}</td>
                    <td style={{ fontWeight: '600', color: '#D1E8E2' }}>{trf.medicineName}</td>
                    <td>{trf.sourcePhcName}</td>
                    <td style={{ color: '#8cd3d4' }}>{trf.destPhcName}</td>
                    <td style={{ fontWeight: '700', color: '#D1E8E2' }}>{trf.quantity} units</td>
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
