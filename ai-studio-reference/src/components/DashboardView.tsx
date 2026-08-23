import React, { useState, useEffect } from 'react';
import { VitalsData, OperativeProfile, ProtocolAlert, EnvironmentTelemetry, TelemetryPoint } from '../types';
import { Activity, Fingerprint, Bell, Radio, Check, Plus, RefreshCw, AlertCircle, Info, Shield, Droplets, Moon, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  onOpenOperativeModal?: () => void;
  onNavigateProtocols?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenOperativeModal,
  onNavigateProtocols,
}) => {
  // Live Vitals State
  const [vitals, setVitals] = useState<VitalsData>({
    bpm: 72,
    bpmAvg: 72,
    o2Sat: 98,
    temp: 36.8,
    bpSys: 120,
    bpDia: 80,
    hrv: 68,
    cellularEnergy: 94,
    stressIndex: 14,
    respiratoryRate: 14,
  });

  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [selectedVitalView, setSelectedVitalView] = useState<'all' | 'ecg' | 'o2' | 'temp'>('all');
  const [lastSyncSeconds, setLastSyncSeconds] = useState<number>(0.4);

  // Subject Profile State
  const [profile, setProfile] = useState<OperativeProfile>({
    id: 'ID-8924',
    name: 'Elena Rostova',
    callsign: 'Valkyrie-7',
    role: 'Class Alpha Operative',
    clearance: 'Level 4',
    status: 'Optimal',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUupNvwmBPq1OJI3DBcb7Q0aDhG4unsaDPQpA5rD-gEf08A3sAb6lFSEqgpk5B2vjBiZQpy7WRdZ7lcuzITeF2vcJyoMWhztS-xWmVwfUSdrmZIJmPT8k7yx8RfnxhH2y0lyyJpUP05vgAVwCqDxgGceV2Jod12zOlthUpdvGYiEugQ85VxbrKIwMmKdbGpx2RkSe04wDSH56i7gjtJ7YBDcFlpItVpL4lxhLPddinIsKjIYI0RD6ylw',
    lastSync: '0.4s ago',
    geneticProfile: 'Resilient Gen-IV Synthetic Biome',
    neuralLatency: '0.08 ms',
    assignedStation: 'Orbital Recon Sector 9',
  });

  // Protocol Alerts State
  const [alerts, setAlerts] = useState<ProtocolAlert[]>([
    {
      id: 'alert-1',
      title: 'Hydration Sub-optimal',
      description: 'Recommend 500ml intake within next 2 hours.',
      category: 'hydration',
      severity: 'info',
      timestamp: '10m ago',
      acknowledged: false,
    },
    {
      id: 'alert-2',
      title: 'Circadian Sync Complete',
      description: 'Sleep cycle analysis processed successfully.',
      category: 'circadian',
      severity: 'optimal',
      timestamp: '42m ago',
      acknowledged: true,
    },
  ]);

  // Environment Telemetry State
  const [envTelemetry, setEnvTelemetry] = useState<EnvironmentTelemetry>({
    aqi: 42,
    aqiStatus: 'Good',
    ambientTemp: 21,
    humidity: 48,
    barometricPressure: 1013,
    radiationLevel: 0.12,
    radiationUnit: 'µSv/h',
    ambientO2: 20.9,
  });

  // Dynamic Telemetry Curve Points
  const [graphPoints, setGraphPoints] = useState<number[]>([80, 70, 85, 60, 75, 40, 50, 65, 45, 78, 52, 60]);

  // Real-time telemetry simulation loop
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      // Micro fluctuations for realistic bio-telemetry
      setVitals((prev) => {
        const bpmVariation = Math.floor(Math.random() * 3) - 1;
        const newBpm = Math.max(68, Math.min(78, prev.bpm + bpmVariation));
        const tempVariation = (Math.random() * 0.04 - 0.02);
        const newTemp = parseFloat((prev.temp + tempVariation).toFixed(1));
        return {
          ...prev,
          bpm: newBpm,
          temp: Math.max(36.5, Math.min(37.1, newTemp)),
        };
      });

      // Update graph stream
      setGraphPoints((prev) => {
        const nextVal = Math.floor(35 + Math.random() * 55);
        return [...prev.slice(1), nextVal];
      });

      // Sync counter
      setLastSyncSeconds((prev) => {
        if (prev > 1.8) return 0.2;
        return parseFloat((prev + 0.1).toFixed(1));
      });

      // Micro ambient radiation fluctuation
      setEnvTelemetry((prev) => ({
        ...prev,
        radiationLevel: parseFloat((0.11 + Math.random() * 0.02).toFixed(2)),
      }));
    }, 1200);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Handlers for Protocol Alerts
  const handleResolveHydration = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              title: 'Hydration Target Restored (500ml Logged)',
              description: 'Cellular osmotic balance optimal. Next scan in 4h.',
              severity: 'optimal',
              acknowledged: true,
            }
          : a
      )
    );
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddSampleAlert = () => {
    const newAlert: ProtocolAlert = {
      id: `alert-${Date.now()}`,
      title: 'Neural Alpha Wave Coherence Calibrated',
      description: 'Cortical focus index at 94.2%. Optimal cognitive window active.',
      category: 'neural',
      severity: 'optimal',
      timestamp: 'Just now',
      acknowledged: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  // Build SVG path from dynamic graphPoints
  const generatePath = () => {
    if (graphPoints.length === 0) return 'M0,80 L100,80';
    const step = 100 / (graphPoints.length - 1);
    let d = `M 0,${graphPoints[0]}`;
    for (let i = 1; i < graphPoints.length; i++) {
      const xPrev = (i - 1) * step;
      const yPrev = graphPoints[i - 1];
      const xCurr = i * step;
      const yCurr = graphPoints[i];
      const xMid = (xPrev + xCurr) / 2;
      d += ` C ${xMid},${yPrev} ${xMid},${yCurr} ${xCurr},${yCurr}`;
    }
    return d;
  };

  const currentPath = generatePath();
  const fillPath = `${currentPath} L 100,100 L 0,100 Z`;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 py-8 md:py-12 z-10 relative">
      {/* Dashboard Header matching image */}
      <div
        id="dashboard-system-header"
        className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h1
            id="system-status-title"
            className="font-['Sora'] font-bold text-[32px] sm:text-[40px] md:text-[48px] uppercase text-[#D1E8E2] tracking-[0.15em] leading-[1.1] text-glow mb-2"
          >
            SYSTEM STATUS
          </h1>
          <p className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-[0.2em] flex items-center gap-2">
            <span>SentinelHealth Monitoring Network // ACTIVE</span>
          </p>
        </div>

        {/* Live Data Feed Controller */}
        <div className="flex items-center gap-3">
          <button
            id="live-data-feed-toggle"
            onClick={() => setIsLiveActive(!isLiveActive)}
            className="flex items-center gap-2 tech-border px-4 py-2 rounded-sm bg-[#151d1a] hover:border-[#8cd3d4] transition-all cursor-pointer group"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveActive
                  ? 'bg-[#8cd3d4] animate-pulse shadow-[0_0_10px_#8cd3d4]'
                  : 'bg-[#899393]'
              }`}
            />
            <span className="font-mono-tech text-[12px] tracking-widest text-[#8cd3d4] group-hover:text-[#D1E8E2] uppercase">
              {isLiveActive ? 'LIVE DATA FEED' : 'FEED PAUSED (CLICK TO RESUME)'}
            </span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout matching design specification */}
      <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
        {/* ========================================================================= */}
        {/* Main Vitals Card (Col 8) */}
        {/* ========================================================================= */}
        <div
          id="core-vitals-card"
          className="col-span-4 md:col-span-8 tech-border rounded-lg p-6 md:p-8 glass-panel tech-glow relative overflow-hidden group transition-all duration-500 hover:border-[#116466]"
        >
          {/* Subtle Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#116466]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Card Header */}
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-mono-tech text-[12px] text-[#D1E8E2] uppercase tracking-[0.2em] font-medium">
                  CORE VITALS
                </h2>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#116466]/30 text-[#8cd3d4] border border-[#116466]/50">
                  REAL-TIME 120Hz
                </span>
              </div>
              <div className="text-[#bec8c8] text-sm mt-1">
                Real-time physiological telemetry
              </div>
            </div>

            <div className="p-2 rounded-sm bg-[#151d1a] border border-[#116466]/40 text-[#8cd3d4]">
              <Activity className="w-6 h-6 text-[#8cd3d4] animate-pulse" />
            </div>
          </div>

          {/* Core Metrics Quad */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 mb-6">
            {/* BPM */}
            <div className="flex flex-col p-3 rounded bg-[#151d1a]/40 border border-[#D1E8E2]/5 hover:border-[#116466]/50 transition-all">
              <span className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-widest mb-1">
                BPM
              </span>
              <div className="font-['Sora'] font-semibold text-[24px] text-[#D1E8E2] text-glow flex items-baseline gap-1.5">
                {vitals.bpm}{' '}
                <span className="text-[#8cd3d4] text-xs font-normal uppercase tracking-wider">
                  Avg
                </span>
              </div>
              <div className="text-[10px] font-mono-tech text-[#bec8c8]/70 mt-1">
                HRV: {vitals.hrv}ms
              </div>
            </div>

            {/* O2 SAT */}
            <div className="flex flex-col p-3 rounded bg-[#151d1a]/40 border border-[#D1E8E2]/5 hover:border-[#116466]/50 transition-all">
              <span className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-widest mb-1">
                O2 SAT
              </span>
              <div className="font-['Sora'] font-semibold text-[24px] text-[#D1E8E2] text-glow flex items-baseline gap-1.5">
                {vitals.o2Sat}%{' '}
                <span className="text-[#8cd3d4] text-xs font-normal uppercase tracking-wider">
                  Nominal
                </span>
              </div>
              <div className="text-[10px] font-mono-tech text-[#bec8c8]/70 mt-1">
                Resp: {vitals.respiratoryRate}/min
              </div>
            </div>

            {/* TEMP */}
            <div className="flex flex-col p-3 rounded bg-[#151d1a]/40 border border-[#D1E8E2]/5 hover:border-[#116466]/50 transition-all">
              <span className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-widest mb-1">
                TEMP
              </span>
              <div className="font-['Sora'] font-semibold text-[24px] text-[#D1E8E2] text-glow flex items-baseline gap-1.5">
                {vitals.temp}°{' '}
                <span className="text-[#8cd3d4] text-xs font-normal uppercase tracking-wider">
                  C
                </span>
              </div>
              <div className="text-[10px] font-mono-tech text-[#bec8c8]/70 mt-1">
                Core Thermal Lock
              </div>
            </div>

            {/* BP */}
            <div className="flex flex-col p-3 rounded bg-[#151d1a]/40 border border-[#D1E8E2]/5 hover:border-[#116466]/50 transition-all">
              <span className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-widest mb-1">
                BP
              </span>
              <div className="font-['Sora'] font-semibold text-[24px] text-[#D1E8E2] text-glow flex items-baseline gap-1.5">
                {vitals.bpSys}/{vitals.bpDia}{' '}
                <span className="text-[#8cd3d4] text-xs font-normal uppercase tracking-wider">
                  Sys/Dia
                </span>
              </div>
              <div className="text-[10px] font-mono-tech text-[#bec8c8]/70 mt-1">
                Arterial Tone 1.02
              </div>
            </div>
          </div>

          {/* Real-time Dynamic Waveform Graph */}
          <div className="mt-6 border-t border-[#116466]/30 pt-4 relative">
            <div className="flex justify-between items-center mb-2 text-[11px] font-mono-tech text-[#bec8c8]">
              <span className="flex items-center gap-1.5 text-[#8cd3d4]">
                <span className="w-1.5 h-1.5 bg-[#8cd3d4] rounded-full animate-ping"></span>
                WAVEFORM CONTINUUM // ARTERIAL & NEURAL FLUX
              </span>
              <div className="flex gap-2">
                <span className="text-[#D9B08C]">ENERGY {vitals.cellularEnergy}%</span>
                <span>•</span>
                <span className="text-[#8cd3d4]">CALIBRATED</span>
              </div>
            </div>

            <div className="h-32 w-full relative overflow-hidden bg-[#0d1512]/60 rounded border border-[#116466]/20">
              {/* Graph Grid Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(140,211,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(140,211,212,0.15) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="vitalWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#116466" stopOpacity="0.45" />
                    <stop offset="70%" stopColor="#116466" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#0d1512" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={fillPath} fill="url(#vitalWaveGradient)" stroke="none" />
                <path
                  d={currentPath}
                  fill="none"
                  stroke="#8cd3d4"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Subject Profile Card (Col 4) */}
        {/* ========================================================================= */}
        <div
          id="subject-profile-card"
          className="col-span-4 md:col-span-4 tech-border rounded-lg p-6 md:p-8 glass-panel tech-glow flex flex-col justify-between hover:border-[#8cd3d4]/50 transition-all duration-300"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-mono-tech text-[12px] text-[#D1E8E2] uppercase tracking-[0.2em] font-medium">
                SUBJECT PROFILE
              </h2>
              <Fingerprint className="w-5 h-5 text-[#899393]" />
            </div>

            {/* Operative Avatar and Identifier */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-18 h-18 rounded-sm bg-[#232c28] tech-border overflow-hidden relative group">
                <img
                  className="object-cover w-full h-full opacity-85 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500"
                  alt="Operative ID-8924 face with high-tech HUD overlay"
                  src={profile.avatarUrl}
                />
                <div className="absolute inset-0 bg-[#116466]/30 mix-blend-overlay"></div>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#8cd3d4] shadow-[0_0_8px_#8cd3d4]"></div>
              </div>

              <div>
                <div className="font-['Sora'] font-bold text-[22px] md:text-[24px] text-[#D1E8E2] tracking-wider text-glow">
                  {profile.id}
                </div>
                <div className="text-[#8cd3d4] font-mono-tech text-[12px] mt-0.5 tracking-wider">
                  {profile.role}
                </div>
                <div className="text-[11px] font-mono-tech text-[#bec8c8] mt-0.5">
                  {profile.callsign}
                </div>
              </div>
            </div>

            {/* Metadata Rows */}
            <div className="space-y-3.5 border-t border-[#116466]/30 pt-4">
              <div className="flex justify-between border-b border-[#D1E8E2]/10 pb-2.5">
                <span className="text-[#bec8c8] font-mono-tech text-[12px] uppercase">
                  Clearance
                </span>
                <span className="text-[#D1E8E2] font-mono-tech text-[12px] font-semibold tracking-wider">
                  {profile.clearance}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#D1E8E2]/10 pb-2.5">
                <span className="text-[#bec8c8] font-mono-tech text-[12px] uppercase">
                  Status
                </span>
                <span className="text-[#FFCB9A] font-mono-tech text-[12px] font-semibold tracking-widest text-glow-gold">
                  {profile.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#bec8c8] font-mono-tech text-[12px] uppercase">
                  Last Sync
                </span>
                <span className="text-[#D9B08C] font-mono-tech text-[12px] font-medium tracking-wider">
                  {lastSyncSeconds}s ago
                </span>
              </div>
            </div>
          </div>

          {/* Card Footer Action */}
          <div className="pt-6 mt-4 border-t border-[#116466]/30">
            <button
              id="inspect-operative-btn"
              onClick={onOpenOperativeModal}
              className="w-full py-2.5 px-4 tech-border rounded-sm bg-[#116466]/20 hover:bg-[#116466]/40 text-[#8cd3d4] font-mono-tech text-[11px] uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>INSPECT OPERATIVE DOSSIER</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Protocol Alerts Card (Col 6) */}
        {/* ========================================================================= */}
        <div
          id="protocol-alerts-card"
          className="col-span-4 md:col-span-6 tech-border rounded-lg p-6 md:p-8 glass-panel"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <h2 className="font-mono-tech text-[12px] text-[#D1E8E2] uppercase tracking-[0.2em] font-medium">
                PROTOCOL ALERTS
              </h2>
              <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#116466]/40 text-[#8cd3d4]">
                {alerts.length} ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddSampleAlert}
                title="Add Test Telemetry Alert"
                className="text-[#899393] hover:text-[#8cd3d4] p-1 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
              <Bell className="w-5 h-5 text-[#899393]" />
            </div>
          </div>

          <ul className="space-y-3.5">
            {alerts.map((alert) => {
              const isHydration = alert.category === 'hydration';
              const isOptimal = alert.severity === 'optimal';

              return (
                <li
                  key={alert.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#151d1a]/80 border-l-2 rounded-r transition-all ${
                    isOptimal
                      ? 'border-[#2e3733] hover:border-[#8cd3d4]/50'
                      : 'border-[#8cd3d4] shadow-[0_0_10px_rgba(17,100,102,0.2)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isOptimal ? (
                      <Check className="w-4 h-4 text-[#8cd3d4] mt-0.5 shrink-0" />
                    ) : (
                      <Info className="w-4 h-4 text-[#8cd3d4] mt-0.5 shrink-0 animate-pulse" />
                    )}
                    <div>
                      <div
                        className={`text-sm font-semibold tracking-wide ${
                          isOptimal ? 'text-[#bec8c8]' : 'text-[#D1E8E2] text-glow'
                        }`}
                      >
                        {alert.title}
                      </div>
                      <div className="text-[#bec8c8]/80 text-xs mt-0.5">
                        {alert.description}
                      </div>
                    </div>
                  </div>

                  {/* Contextual Action Button */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {isHydration && !alert.acknowledged && (
                      <button
                        onClick={() => handleResolveHydration(alert.id)}
                        className="px-3 py-1 bg-[#116466]/40 hover:bg-[#116466] border border-[#8cd3d4] text-[#8cd3d4] hover:text-[#D1E8E2] text-[11px] font-mono-tech tracking-wider uppercase rounded transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Droplets className="w-3 h-3 text-[#8cd3d4]" />
                        LOG 500ML
                      </button>
                    )}

                    <button
                      onClick={() => handleDismissAlert(alert.id)}
                      className="text-[10px] font-mono-tech text-[#bec8c8]/60 hover:text-[#D1E8E2] px-1.5 py-0.5 cursor-pointer"
                    >
                      DISMISS
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Quick link to active protocols */}
          <div className="mt-4 pt-3 border-t border-[#116466]/20 flex justify-between items-center text-[11px] font-mono-tech text-[#bec8c8]">
            <span>AUTOMATED BIO-FEEDBACK: ACTIVE</span>
            <button
              onClick={onNavigateProtocols}
              className="text-[#8cd3d4] hover:underline cursor-pointer flex items-center gap-1"
            >
              VIEW PROTOCOL SCHEMAS →
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Environment Telemetry Card (Col 6) */}
        {/* ========================================================================= */}
        <div
          id="environment-telemetry-card"
          className="col-span-4 md:col-span-6 tech-border rounded-lg p-6 md:p-8 glass-panel tech-glow-hover"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-mono-tech text-[12px] text-[#D1E8E2] uppercase tracking-[0.2em] font-medium">
              ENVIRONMENT TELEMETRY
            </h2>
            <Radio className="w-5 h-5 text-[#899393]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* AQI Tile */}
            <div className="bg-[#151d1a]/80 p-4 tech-border rounded-sm">
              <div className="text-[#bec8c8] font-mono-tech text-[12px] tracking-wider mb-1 uppercase">
                AQI
              </div>
              <div className="text-[#D1E8E2] font-['Sora'] font-bold text-[24px] text-glow flex items-baseline gap-2">
                {envTelemetry.aqi}{' '}
                <span className="text-xs text-[#8cd3d4] font-['Hanken_Grotesk'] uppercase tracking-widest font-normal">
                  {envTelemetry.aqiStatus}
                </span>
              </div>
              <div className="text-[10px] font-mono-tech text-[#bec8c8]/70 mt-1">
                PM2.5: 6.2 µg/m³
              </div>
            </div>

            {/* Ambient Temp Tile */}
            <div className="bg-[#151d1a]/80 p-4 tech-border rounded-sm">
              <div className="text-[#bec8c8] font-mono-tech text-[12px] tracking-wider mb-1 uppercase">
                Ambient Temp
              </div>
              <div className="text-[#D1E8E2] font-['Sora'] font-bold text-[24px] text-glow flex items-baseline gap-2">
                {envTelemetry.ambientTemp}°
                <span className="text-xs text-[#8cd3d4] font-['Hanken_Grotesk'] uppercase tracking-widest font-normal">
                  C
                </span>
              </div>
              <div className="text-[10px] font-mono-tech text-[#bec8c8]/70 mt-1">
                Humidity: {envTelemetry.humidity}%
              </div>
            </div>

            {/* Radiation Level Background (Span 2) */}
            <div className="bg-[#151d1a]/80 p-4 tech-border rounded-sm col-span-2">
              <div className="flex justify-between items-center mb-1">
                <div className="text-[#bec8c8] font-mono-tech text-[12px] tracking-wider uppercase">
                  Radiation Level (Background)
                </div>
                <div className="text-right text-xs font-mono-tech text-[#8cd3d4] font-medium">
                  {envTelemetry.radiationLevel} {envTelemetry.radiationUnit}
                </div>
              </div>

              {/* Progress Level Bar with Teal Glow */}
              <div className="w-full bg-[#2e3733] h-1.5 mt-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#8cd3d4] h-full shadow-[0_0_10px_#8cd3d4] transition-all duration-500"
                  style={{ width: `${(envTelemetry.radiationLevel / 0.8) * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono-tech text-[#bec8c8]/60 mt-2">
                <span>SAFE BASELINE: &lt; 0.30 µSv/h</span>
                <span className="text-[#8cd3d4]">STATUS: BENIGN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Horizontal Divider */}
      <div className="w-full h-px bg-[#116466]/30 my-12" />
    </div>
  );
};
