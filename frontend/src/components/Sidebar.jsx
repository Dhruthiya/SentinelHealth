import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Truck, 
  Network, 
  Zap,
  Activity,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, outbreakActive, alertCount, transferCount }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'PHC Map', icon: MapPin },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'forecasts', label: 'Demand Forecasts', icon: TrendingUp },
    { 
      id: 'alerts', 
      label: 'Early Warnings', 
      icon: AlertTriangle, 
      badge: alertCount > 0 ? alertCount : null,
      badgeType: 'critical'
    },
    { 
      id: 'transfers', 
      label: 'Redistribution', 
      icon: Truck, 
      badge: transferCount > 0 ? transferCount : null,
      badgeType: 'warning'
    },
    { id: 'fl', label: 'Federated Learning', icon: Network },
    { 
      id: 'outbreak', 
      label: 'Outbreak Simulator', 
      icon: Zap, 
      highlight: outbreakActive 
    }
  ];

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      backgroundColor: 'var(--color-bg-sidebar)',
      color: '#94A3B8',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      borderRight: '1px solid #1E293B'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px 20px 16px 20px',
        borderBottom: '1px solid #1E293B',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold'
          }}>
            <Activity size={20} />
          </div>
          <div>
            <div style={{ color: '#F8FAFC', fontWeight: '700', fontSize: '16px', letterSpacing: '-0.01em' }}>
              SentinelHealth
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '500' }}>
              Health Supply Resilience
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '8px',
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: '#1E293B',
          fontSize: '10px',
          fontWeight: '600',
          color: '#38BDF8',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <ShieldCheck size={12} /> BRICS AI Challenge — Track 3
        </div>
      </div>

      {/* Main Navigation List */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', padding: '0 8px 6px 8px' }}>
          Decision Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isOutbreakItem = item.id === 'outbreak';

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: isActive 
                  ? 'var(--color-primary)' 
                  : (isOutbreakItem && outbreakActive ? 'rgba(232, 163, 61, 0.15)' : 'transparent'),
                color: isActive ? '#FFFFFF' : (isOutbreakItem && outbreakActive ? '#F59E0B' : '#94A3B8'),
                fontWeight: isActive ? '600' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} style={{ color: isActive ? '#FFFFFF' : (isOutbreakItem && outbreakActive ? '#F59E0B' : '#64748B') }} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`badge badge-${item.badgeType}`} style={{ fontSize: '10px', padding: '1px 6px' }}>
                  {item.badge}
                </span>
              )}
              {isOutbreakItem && outbreakActive && (
                <span className="badge badge-warning" style={{ fontSize: '9px', padding: '1px 5px' }}>
                  ACTIVE
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer: System Status */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid #1E293B',
        backgroundColor: '#090E17',
        fontSize: '11px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>PostgreSQL DB:</span>
          <span style={{ color: '#4ADE80', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80' }}></span> Connected
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>FL Flower Server:</span>
          <span style={{ color: '#38BDF8', fontWeight: '600' }}>v1.8 FedAvg</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748B' }}>ML Engine Latency:</span>
          <span style={{ color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>14ms</span>
        </div>
      </div>
    </aside>
  );
}
