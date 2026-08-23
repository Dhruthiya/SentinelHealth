import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  UserCheck, 
  Filter, 
  AlertOctagon,
  Clock,
  Menu,
  X,
  Activity,
  Radio,
  ArrowLeft
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab,
  outbreakActive, 
  onToggleOutbreak, 
  selectedDistrict, 
  setSelectedDistrict,
  onOpenOperativeModal,
  onGoHome,
  alertCount = 0,
  transferCount = 0
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'hero', label: 'Solarin Core' },
    { id: 'map', label: 'PHC Map' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'forecasts', label: 'Forecasts' },
    { id: 'alerts', label: 'Alerts', badge: alertCount },
    { id: 'transfers', label: 'Redistribution', badge: transferCount },
    { id: 'fl', label: 'Federated Learning' }
  ];

  return (
    <header
      id="main-top-navbar"
      className="glass-nav"
      style={{
        height: 'var(--header-height)',
        borderBottom: '1px solid rgba(209, 232, 226, 0.15)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        boxShadow: '0 0 20px rgba(17, 100, 102, 0.25)'
      }}
    >
      {/* Left: Brand Logo & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          id="nav-brand-logo"
          onClick={onGoHome}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'left'
          }}
          title="Return to Landing Page"
        >
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              backgroundColor: '#116466',
              border: '1px solid #8cd3d4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8cd3d4',
              boxShadow: '0 0 12px rgba(17, 100, 102, 0.6)'
            }}
          >
            <Activity size={18} />
          </div>
          <div>
            <div 
              style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                fontSize: '18px',
                color: '#D1E8E2',
                letterSpacing: '0.04em'
              }}
              className="text-glow"
            >
              SENTINELHEALTH
            </div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', letterSpacing: '0.1em' }}>
              DASHBOARD // BRICS
            </div>
          </div>
        </button>

        {/* Return to Home Anchor Button */}
        <button
          onClick={onGoHome}
          className="btn btn-outline btn-sm hidden xl:flex"
          style={{ padding: '4px 10px', fontSize: '11px', color: '#8cd3d4', borderColor: 'rgba(140, 211, 212, 0.3)' }}
        >
          <ArrowLeft size={12} /> Landing
        </button>

        {/* Live Scenario Status Pill */}
        <div 
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600',
            backgroundColor: outbreakActive ? 'rgba(245, 158, 11, 0.18)' : 'rgba(16, 185, 129, 0.18)',
            color: outbreakActive ? '#FFCB9A' : '#6EE7B7',
            border: `1px solid ${outbreakActive ? 'rgba(245, 158, 11, 0.5)' : 'rgba(16, 185, 129, 0.5)'}`
          }}
          className="lg:inline-flex"
        >
          {outbreakActive ? (
            <>
              <AlertOctagon size={13} color="#FFCB9A" className="pulse-anim" />
              <span>OUTBREAK ACTIVE: Dengue Spike (District B)</span>
            </>
          ) : (
            <>
              <Radio size={13} color="#6EE7B7" className="pulse-anim" />
              <span>NORMAL BASELINE OPERATIONS</span>
            </>
          )}

          <button
            onClick={onToggleOutbreak}
            style={{
              marginLeft: '6px',
              padding: '2px 8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: outbreakActive ? '#F59E0B' : '#116466',
              color: '#FFFFFF',
              fontSize: '10px',
              fontFamily: 'var(--font-title)',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {outbreakActive ? 'Reset' : 'Simulate'}
          </button>
        </div>
      </div>

      {/* Right Controls & User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* Real-time Indicator Tag */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '5px 10px', 
            borderRadius: '4px', 
            backgroundColor: '#151d1a', 
            border: '1px solid rgba(17, 100, 102, 0.4)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)'
          }}
          className="hidden md:flex"
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8cd3d4', boxShadow: '0 0 8px #8cd3d4' }} className="pulse-anim"></span>
          <span style={{ color: '#8cd3d4' }}>FEED: 120HZ ONLINE</span>
        </div>

        {/* District Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={13} style={{ color: '#bec8c8' }} />
          <select 
            className="sh-select" 
            value={selectedDistrict} 
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '11px' }}
          >
            <option value="ALL">All Districts (BRICS / National)</option>
            <option value="District A (North)">District A (North)</option>
            <option value="District B (East)">District B (East)</option>
            <option value="District C (South)">District C (South)</option>
          </select>
        </div>

        {/* Live System Time */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            fontSize: '11px', 
            color: '#8cd3d4',
            fontFamily: 'var(--font-mono)',
            backgroundColor: '#151d1a',
            border: '1px solid rgba(17, 100, 102, 0.3)',
            padding: '5px 10px',
            borderRadius: '4px'
          }}
          className="hidden sm:flex"
        >
          <Clock size={12} />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>

        {/* Sync Button */}
        <button 
          className="btn btn-outline btn-sm" 
          onClick={handleManualSync}
          title="Force Live Data Sync"
        >
          <RefreshCw size={12} className={isSyncing ? 'spin-anim' : ''} />
          <span className="hidden sm:inline">Sync</span>
        </button>

        {/* Administrator Role / Dossier Button */}
        <button 
          onClick={onOpenOperativeModal}
          className="btn btn-glow"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '4px',
            backgroundColor: 'rgba(17, 100, 102, 0.3)',
            border: '1px solid rgba(140, 211, 212, 0.4)',
            color: '#D1E8E2',
            fontSize: '12px',
            fontFamily: 'var(--font-title)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          title="Inspect Administrator Dossier"
        >
          <UserCheck size={14} color="#8cd3d4" />
          <span className="hidden md:inline">Dr. A. Sharma</span>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#D1E8E2',
            padding: '6px',
            cursor: 'pointer'
          }}
          className="md:hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-container"
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(13, 21, 18, 0.98)',
            borderBottom: '1px solid #116466',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backdropFilter: 'blur(20px)',
            zIndex: 100
          }}
          className="md:hidden"
        >
          <button
            onClick={() => {
              if (onGoHome) onGoHome();
              setMobileMenuOpen(false);
            }}
            style={{
              textAlign: 'left',
              padding: '10px 14px',
              borderRadius: '4px',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              color: '#8cd3d4',
              border: '1px solid rgba(140, 211, 212, 0.3)',
              backgroundColor: 'rgba(17, 100, 102, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={14} /> Back to Landing Page
          </button>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (setActiveTab) setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(17, 100, 102, 0.35)' : 'transparent',
                  color: isActive ? '#8cd3d4' : '#bec8c8',
                  fontWeight: isActive ? 700 : 500,
                  borderLeft: isActive ? '3px solid #8cd3d4' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="badge badge-critical" style={{ fontSize: '10px' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ paddingTop: '14px', marginTop: '6px', borderTop: '1px solid rgba(17, 100, 102, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => {
                onToggleOutbreak();
                setMobileMenuOpen(false);
              }}
              className="btn btn-outline btn-sm"
              style={{ color: outbreakActive ? '#FFCB9A' : '#8cd3d4' }}
            >
              <AlertOctagon size={14} />
              <span>{outbreakActive ? 'Reset Simulation' : 'Simulate Outbreak'}</span>
            </button>

            <button
              onClick={() => {
                onOpenOperativeModal();
                setMobileMenuOpen(false);
              }}
              className="btn btn-primary btn-sm"
            >
              <UserCheck size={14} /> Dossier
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
