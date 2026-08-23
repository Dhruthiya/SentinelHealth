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
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, outbreakActive, alertCount, transferCount, onGoHome }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Solarin Core', icon: Sparkles },
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
    <aside 
      style={{
        width: 'var(--sidebar-width)',
        height: '100vh',
        backgroundColor: 'rgba(13, 21, 18, 0.95)',
        backdropFilter: 'blur(20px)',
        color: '#bec8c8',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        borderRight: '1px solid rgba(209, 232, 226, 0.15)',
        boxShadow: '0 0 25px rgba(17, 100, 102, 0.2)'
      }}
      className="hidden md:flex"
    >
      {/* Brand Header */}
      <div 
        style={{
          padding: '22px 20px 18px 20px',
          borderBottom: '1px solid rgba(17, 100, 102, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <button
          onClick={onGoHome}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left',
            padding: 0
          }}
          title="Return to Landing Page"
        >
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              backgroundColor: '#116466',
              border: '1px solid #8cd3d4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8cd3d4',
              boxShadow: '0 0 16px rgba(17, 100, 102, 0.6)'
            }}
          >
            <Activity size={20} />
          </div>
          <div>
            <div 
              style={{ 
                color: '#D1E8E2', 
                fontWeight: '700', 
                fontSize: '17px', 
                fontFamily: 'var(--font-title)',
                letterSpacing: '0.02em' 
              }}
              className="text-glow"
            >
              SentinelHealth
            </div>
            <div style={{ fontSize: '11px', color: '#8cd3d4', fontFamily: 'var(--font-mono)' }}>
              Supply Resilience
            </div>
          </div>
        </button>

        <div 
          style={{
            marginTop: '6px',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: '#151d1a',
            border: '1px solid rgba(17, 100, 102, 0.4)',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600',
            color: '#8cd3d4',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ShieldCheck size={12} color="#8cd3d4" /> BRICS AI Challenge — Track 3
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px 8px 10px' }}>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#899393' }}>
            Decision Intelligence
          </span>
          <button
            onClick={onGoHome}
            style={{
              background: 'none',
              border: 'none',
              color: '#8cd3d4',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}
            className="hover:underline"
          >
            <ArrowLeft size={10} /> Home
          </button>
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
                padding: '10px 14px',
                borderRadius: '4px',
                border: '1px solid transparent',
                backgroundColor: isActive 
                  ? 'rgba(17, 100, 102, 0.35)' 
                  : (isOutbreakItem && outbreakActive ? 'rgba(245, 158, 11, 0.15)' : 'transparent'),
                borderColor: isActive 
                  ? 'rgba(140, 211, 212, 0.5)' 
                  : (isOutbreakItem && outbreakActive ? 'rgba(245, 158, 11, 0.4)' : 'transparent'),
                color: isActive 
                  ? '#D1E8E2' 
                  : (isOutbreakItem && outbreakActive ? '#FFCB9A' : '#bec8c8'),
                fontWeight: isActive ? '700' : '500',
                fontSize: '13px',
                fontFamily: 'var(--font-title)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 16px rgba(17, 100, 102, 0.4)' : 'none'
              }}
              className={isActive ? 'text-glow' : 'hover:border-[#116466]/40 hover:text-[#8cd3d4]'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon 
                  size={17} 
                  style={{ 
                    color: isActive 
                      ? '#8cd3d4' 
                      : (isOutbreakItem && outbreakActive ? '#FFCB9A' : '#899393') 
                  }} 
                />
                <span style={{ letterSpacing: '0.04em' }}>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`badge badge-${item.badgeType}`} style={{ fontSize: '9px', padding: '1px 6px' }}>
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

      {/* Sidebar Footer: System Status Telemetry */}
      <div 
        style={{
          padding: '14px 16px',
          borderTop: '1px solid rgba(17, 100, 102, 0.35)',
          backgroundColor: '#090E17',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#899393' }}>POSTGRESQL DB:</span>
          <span style={{ color: '#6EE7B7', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 6px #10B981' }}></span> CONNECTED
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#899393' }}>FL FLOWER SERVER:</span>
          <span style={{ color: '#8cd3d4', fontWeight: '600' }}>v1.8 FedAvg</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#899393' }}>ML LATENCY:</span>
          <span style={{ color: '#D1E8E2' }}>14ms REAL-TIME</span>
        </div>
      </div>
    </aside>
  );
}
