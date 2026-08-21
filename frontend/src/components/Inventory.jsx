import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  RefreshCw,
  Plus
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)' }}>
            Primary Health Centre Inventory Telemetry
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Real-time stock levels, daily consumption velocities, and safety buffers across facilities
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline">
            <Download size={14} /> Export CSV Report
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sh-card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '280px' }}>
            <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
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
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              <Filter size={13} /> Category:
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-muted)', marginLeft: '8px' }}>
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
                <th>Current Stock</th>
                <th>Daily Consumption</th>
                <th>Days Remaining</th>
                <th>Stock-Out Risk</th>
                <th>Predicted Demand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const isCritical = item.status === 'CRITICAL';
                const isWarning = item.status === 'WARNING';
                const predictedDemand = Math.round(item.dailyConsumption * 7); // Weekly prediction
                
                return (
                  <tr key={item.id}>
                    {/* Facility */}
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{item.phcName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ID: {item.phcId}</div>
                    </td>

                    {/* Medicine */}
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{item.medicineName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{item.category}</div>
                    </td>

                    {/* Current Stock */}
                    <td>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: isCritical ? 'var(--color-critical)' : 'var(--color-text-main)' }}>
                        {item.currentStock.toLocaleString()} units
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                        Buffer: {item.safetyThreshold} units
                      </div>
                    </td>

                    {/* Daily Consumption */}
                    <td>
                      <div style={{ fontSize: '13px', fontWeight: '500' }}>
                        {item.dailyConsumption} units/day
                      </div>
                    </td>

                    {/* Days Remaining - MOST PROMINENT */}
                    <td style={{ minWidth: '140px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '800', color: isCritical ? 'var(--color-critical)' : isWarning ? 'var(--color-warning)' : 'var(--color-healthy)' }}>
                          {item.daysRemaining}
                        </span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}>days</span>
                      </div>

                      <div className="progress-bar-bg">
                        <div 
                          className="progress-bar-fill" 
                          style={{
                            width: `${Math.min(100, (item.daysRemaining / 30) * 100)}%`,
                            backgroundColor: isCritical ? 'var(--color-critical)' : isWarning ? 'var(--color-warning)' : 'var(--color-healthy)'
                          }}
                        />
                      </div>
                    </td>

                    {/* Stock-Out Risk */}
                    <td>
                      <span className={`badge badge-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        {isCritical ? '< 3 days' : isWarning ? '3-7 days' : '> 7 days'}
                      </div>
                    </td>

                    {/* Predicted Demand */}
                    <td>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-main)' }}>
                        {predictedDemand} units/week
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                        Based on current rate
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => onNavigateToForecast(item)}
                      >
                        <TrendingUp size={12} /> Forecast
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
