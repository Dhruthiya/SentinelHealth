import React, { useState } from 'react';
import { ArchiveRecord } from '../types';
import { Database, Download, ShieldCheck, Search, Filter, CheckCircle2 } from 'lucide-react';

export const ArchiveView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [exportedMessage, setExportedMessage] = useState(false);

  const records: ArchiveRecord[] = [
    {
      id: 'REC-2024-0822-01',
      date: '2024-08-22 22:15 UTC',
      duration: '08h 12m',
      syncEfficiency: '99.94%',
      avgBpm: 71,
      peakHrv: 82,
      radiationDose: '0.96 µSv',
      notes: 'Orbital reconnaissance phase. Circadian alignment locked.',
      status: 'VERIFIED',
    },
    {
      id: 'REC-2024-0821-04',
      date: '2024-08-21 14:00 UTC',
      duration: '06h 45m',
      syncEfficiency: '98.80%',
      avgBpm: 76,
      peakHrv: 74,
      radiationDose: '0.81 µSv',
      notes: 'High acceleration protocol conducted. Neural tone sustained.',
      status: 'SYNCHRONIZED',
    },
    {
      id: 'REC-2024-0820-09',
      date: '2024-08-20 08:30 UTC',
      duration: '12h 00m',
      syncEfficiency: '100.00%',
      avgBpm: 69,
      peakHrv: 89,
      radiationDose: '1.40 µSv',
      notes: 'Full cellular recharge & hyper-hydration cycle complete.',
      status: 'VERIFIED',
    },
    {
      id: 'REC-2024-0819-02',
      date: '2024-08-19 19:10 UTC',
      duration: '04h 30m',
      syncEfficiency: '99.12%',
      avgBpm: 74,
      peakHrv: 70,
      radiationDose: '0.55 µSv',
      notes: 'Standard bio-telemetric baseline calibration.',
      status: 'ENCRYPTED',
    },
  ];

  const handleExport = () => {
    setExportedMessage(true);
    setTimeout(() => setExportedMessage(false), 3000);
  };

  const filteredRecords = records.filter(
    (r) =>
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 py-8 md:py-12 z-10 relative">
      {/* Archive Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-['Sora'] font-bold text-[32px] sm:text-[40px] md:text-[48px] uppercase text-[#D1E8E2] tracking-[0.15em] leading-[1.1] text-glow mb-2">
            TELEMETRY ARCHIVE
          </h1>
          <p className="text-[#bec8c8] font-mono-tech text-[12px] uppercase tracking-[0.2em]">
            Encrypted Biometric Time-Series & Mission Health Archives
          </p>
        </div>

        {/* Export CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="tech-border px-5 py-2.5 rounded-sm bg-[#116466]/30 hover:bg-[#116466]/60 text-[#D1E8E2] font-['Sora'] text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer btn-glow"
          >
            <Download className="w-4 h-4 text-[#8cd3d4]" />
            <span>EXPORT ENCRYPTED DOSSIER (.JSON / .CSV)</span>
          </button>
        </div>
      </div>

      {exportedMessage && (
        <div className="mb-6 p-3 bg-[#116466]/40 border border-[#8cd3d4] text-[#8cd3d4] rounded font-mono-tech text-xs flex items-center gap-2 animate-fade-in shadow-[0_0_20px_rgba(140,211,212,0.3)]">
          <CheckCircle2 className="w-4 h-4" />
          <span>Biometric audit archive securely compiled & dispatched with SHA-512 bio-signature.</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="p-4 mb-6 rounded-lg bg-[#151d1a]/80 tech-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#899393] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1512] border border-[#116466]/40 rounded pl-9 pr-3 py-1.5 text-xs text-[#D1E8E2] focus:outline-none focus:border-[#8cd3d4] font-mono-tech"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-tech text-[#bec8c8]">
          <span>TOTAL LOGGED: {records.length} SESSIONS</span>
          <span>•</span>
          <span className="text-[#8cd3d4]">ALL ENCRYPTION PROTOCOLS VERIFIED</span>
        </div>
      </div>

      {/* Table of Records */}
      <div className="tech-border rounded-lg overflow-hidden glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-tech">
            <thead className="bg-[#0d1512]/90 border-b border-[#116466]/30 text-[#8cd3d4] uppercase tracking-widest">
              <tr>
                <th className="p-4">RECORD ID</th>
                <th className="p-4">TIMESTAMP</th>
                <th className="p-4">DURATION</th>
                <th className="p-4">SYNC EFFICIENCY</th>
                <th className="p-4">AVG BPM</th>
                <th className="p-4">RAD DOSE</th>
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#116466]/20">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-[#116466]/10 transition-colors">
                  <td className="p-4 font-semibold text-[#D1E8E2]">{r.id}</td>
                  <td className="p-4 text-[#bec8c8]">{r.date}</td>
                  <td className="p-4 text-[#bec8c8]">{r.duration}</td>
                  <td className="p-4 text-[#8cd3d4] font-semibold">{r.syncEfficiency}</td>
                  <td className="p-4 text-[#D1E8E2]">{r.avgBpm} BPM</td>
                  <td className="p-4 text-[#D9B08C]">{r.radiationDose}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#116466]/30 border border-[#8cd3d4]/50 text-[#8cd3d4] text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
