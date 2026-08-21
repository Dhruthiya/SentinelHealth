import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  UserCheck, 
  Filter, 
  Zap, 
  CheckCircle2, 
  AlertOctagon,
  Clock
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  outbreakActive, 
  onToggleOutbreak, 
  selectedDistrict, 
  setSelectedDistrict 
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Executive Command Center';
      case 'map': return 'Primary Health Centre Spatial Map';
      case 'inventory': return 'PHC Resource & Medicine Inventory';
      case 'forecasts': return 'AI Demand Forecasting & Lead-Time Analysis';
      case 'alerts': return 'Early-Warning Alert Management';
      case 'transfers': return 'Resource Redistribution Optimization (SciPy)';
      case 'fl': return 'BRICS Federated Learning Orchestrator (Flower)';
      case 'outbreak': return 'Outbreak & Demand Spike Simulator';
      default: return 'Dashboard';
    }
  };

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--color-border)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      {/* Left Title & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '500' }}>
            SentinelHealth / Decision-Support Platform
          </div>
          <div style={{ fontSize: '17px', fontWeight: '700', color: 'var(--color-text-main)', letterSpacing: '-0.01em' }}>
            {getTitle()}
          </div>
        </div>

        {/* Live Scenario Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: outbreakActive ? 'var(--color-warning-bg)' : 'var(--color-healthy-bg)',
          color: outbreakActive ? 'var(--color-warning)' : 'var(--color-healthy)',
          border: `1px solid ${outbreakActive ? 'var(--color-warning-border)' : 'var(--color-healthy-border)'}`
        }}>
          {outbreakActive ? (
            <>
              <AlertOctagon size={14} />
              <span>OUTBREAK ACTIVE: Dengue Spike (District B)</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={14} />
              <span>Normal Operations Baseline</span>
            </>
          )}

          <button
            onClick={onToggleOutbreak}
            style={{
              marginLeft: '4px',
              padding: '2px 8px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: outbreakActive ? 'var(--color-warning)' : 'var(--color-primary)',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {outbreakActive ? 'Reset' : 'Simulate Outbreak'}
          </button>
        </div>
      </div>

      {/* Right Controls & User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* District Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} style={{ color: 'var(--color-text-muted)' }} />
          <select 
            className="sh-select" 
            value={selectedDistrict} 
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{ padding: '5px 10px', fontSize: '12px' }}
          >
            <option value="ALL">All Districts (BRICS / National)</option>
            <option value="District A (North)">District A (North)</option>
            <option value="District B (East)">District B (East)</option>
            <option value="District C (South)">District C (South)</option>
          </select>
        </div>

        {/* Live System Time */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          fontSize: '12px', 
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
          backgroundColor: 'var(--color-bg-subtle)',
          padding: '4px 10px',
          borderRadius: '4px'
        }}>
          <Clock size={13} />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>

        {/* Sync Button */}
        <button 
          className="btn btn-outline btn-sm" 
          onClick={handleManualSync}
          title="Force Live Data Sync"
        >
          <RefreshCw size={13} className={isSyncing ? 'spin-anim' : ''} />
          <span>Sync</span>
        </button>

        {/* Administrator Role Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 10px',
          borderRadius: '6px',
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary-dark)',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          <UserCheck size={14} />
          <span>Dr. A. Sharma (Chief Health Administrator)</span>
        </div>
      </div>
    </header>
  );
}
