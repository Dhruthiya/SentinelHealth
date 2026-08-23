export type NavTab = 'dashboard' | 'solarin' | 'metrics' | 'archive' | 'protocols';

export interface VitalsData {
  bpm: number;
  bpmAvg: number;
  o2Sat: number;
  temp: number;
  bpSys: number;
  bpDia: number;
  hrv: number;
  cellularEnergy: number;
  stressIndex: number;
  respiratoryRate: number;
}

export interface OperativeProfile {
  id: string;
  name: string;
  callsign: string;
  role: string;
  clearance: string;
  status: 'Optimal' | 'Caution' | 'Synchronizing' | 'Standby';
  avatarUrl: string;
  lastSync: string;
  geneticProfile: string;
  neuralLatency: string;
  assignedStation: string;
}

export interface ProtocolAlert {
  id: string;
  title: string;
  description: string;
  category: 'hydration' | 'circadian' | 'neural' | 'respiratory' | 'biometric';
  severity: 'info' | 'optimal' | 'warning' | 'critical';
  timestamp: string;
  acknowledged?: boolean;
}

export interface EnvironmentTelemetry {
  aqi: number;
  aqiStatus: string;
  ambientTemp: number;
  humidity: number;
  barometricPressure: number;
  radiationLevel: number;
  radiationUnit: string;
  ambientO2: number;
}

export interface TelemetryPoint {
  time: string;
  timestamp: number;
  bpm: number;
  o2: number;
  hrv: number;
  energy: number;
}

export interface BioProtocol {
  id: string;
  name: string;
  code: string;
  category: string;
  status: 'ACTIVE' | 'CALIBRATING' | 'STANDBY' | 'OPTIMAL';
  progress: number;
  durationLeft: string;
  description: string;
  instructions: string[];
  vitalTarget: string;
}

export interface ArchiveRecord {
  id: string;
  date: string;
  duration: string;
  syncEfficiency: string;
  avgBpm: number;
  peakHrv: number;
  radiationDose: string;
  notes: string;
  status: 'VERIFIED' | 'SYNCHRONIZED' | 'ENCRYPTED';
}

export interface HardwareItem {
  id: string;
  name: string;
  model: string;
  category: string;
  price: string;
  status: 'AVAILABLE' | 'PRE-ORDER' | 'DEPLOYED';
  tag: string;
  specs: string[];
  description: string;
}
