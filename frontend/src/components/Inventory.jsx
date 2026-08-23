import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Download
} from 'lucide-react';

export default function Inventory({ inventory, onNavigateToForecast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const categories = ['ALL', 'Analgesics & Antipyretics', 'Rehydration', 'Antibiotics', 'Antimalarial', 'Fluid Therapy', 'Vaccines'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.phcName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.batchNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Action Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8cd3d4', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            FACILITY SUPPLY TELEMETRY // REAL-TIME STOCKS
          </div>
          <h1 
            style={{ 
              fontSize: 'clamp(22px, 3vw, 32px)', 
              fontWeight: 800, 
              color: '#D1E8E2', 
              fontFamily: 'var(--font-title)',
              marginTop: '4px',
              letterSpacing: '0.04em'
            }} 
            className="text-glow"
          >
            PHC RESOURCE &amp; MEDICINE INVENTORY
          </h1>
          <div style={{ fontSize: '13px', color: '#bec8c8', marginTop: '4px' }}>
            Real-time stock levels, daily consumption velocities, and safety buffers across facilities
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline btn-sm">
            <Download size={14} color="#8cd3d4" /> Export CSV Report
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sh-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '280px', flex: '1 1 300px' }}>
            <Search size={16} color="#8cd3d4" />
            <input 
              type="text"
              className="sh-input"
              placeholder="Search medicine, PHC name, or batch #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>
              <Filter size={13} color="#8cd3d4" /> Category:
            </div>
            <select 
              className="sh-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#bec8c8', fontFamily: 'var(--font-mono)', marginLeft: '8px' }}>
              Status:
            </div>
            <select 
              className="sh-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="CRITICAL">Critical (&lt; 3 Days)</option>
              <option value="WARNING">Warning (3-7 Days)</option>
              <option value="HEALTHY">Healthy (&gt; 7 Days)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Inventory Table */}
      <div className="sh-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="sh-table-container">
          <table className="sh-table">
            <thead>
              <tr>
                <th>Facility (PHC)</th>
                <th>Medicine &amp; Category</th>
                <th>Batch &amp; Expiry</th>
                <th>Current Stock</th>
                <th>Daily Velocity</th>
                <th>Stock Autonomy</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const isCritical = item.status === 'CRITICAL';
                const isWarning = item.status === 'WARNING';
                
                return (
                  <tr key={item.id}>
                    {/* Facility */}
                    <td>
                      <div style={{ fontWeight: '700', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>{item.phcName}</div>
                      <div style={{ fontSize: '11px', color: '#8cd3d4' }}>ID: {item.phcId}</div>
                    </td>

                    {/* Medicine */}
                    <td>
                      <div style={{ fontWeight: '600', color: '#D1E8E2' }}>{item.medicineName}</div>
                      <div style={{ fontSize: '11px', color: '#bec8c8' }}>{item.category}</div>
                    </td>

                    {/* Batch & Expiry */}
                    <td>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#D9B08C' }}>{item.batchNo}</div>
                      <div style={{ fontSize: '11px', color: '#899393' }}>Exp: {item.expiryDate}</div>
                    </td>

                    {/* Current Stock */}
                    <td>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: isCritical ? '#FF7B7B' : '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                        {item.currentStock.toLocaleString()} units
                      </div>
                      <div style={{ fontSize: '11px', color: '#bec8c8' }}>
                        Buffer: {item.safetyThreshold} units
                      </div>
                    </td>

                    {/* Daily Consumption */}
                    <td>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#D1E8E2' }}>
                        {item.dailyConsumption} units/day
                      </div>
                    </td>

                    {/* Stock Autonomy (Days Remaining Gauge) */}
                    <td style={{ minWidth: '160px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                        <span style={{ color: isCritical ? '#FF7B7B' : isWarning ? '#FFCB9A' : '#6EE7B7' }}>{item.daysRemaining} Days</span>
                        <span style={{ color: '#899393' }}>Remaining</span>
                      </div>

                      <div className="progress-bar-bg">
                        <div 
                          className="progress-bar-fill" 
                          style={{
                            width: `${Math.min(100, (item.daysRemaining / 30) * 100)}%`,
                            backgroundColor: isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981'
                          }}
                        />
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className={`badge badge-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          if (onNavigateToForecast) onNavigateToForecast(item);
                        }}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        <TrendingUp size={12} color="#8cd3d4" /> Forecast
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
