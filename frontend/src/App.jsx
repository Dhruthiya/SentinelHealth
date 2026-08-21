import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import PhcMap from './components/PhcMap';
import Inventory from './components/Inventory';
import Forecasts from './components/Forecasts';
import Alerts from './components/Alerts';
import Transfers from './components/Transfers';
import FederatedLearning from './components/FederatedLearning';
import OutbreakSimulatorModal from './components/OutbreakSimulatorModal';

import { 
  INITIAL_PHCS, 
  INITIAL_INVENTORY, 
  INITIAL_ALERTS, 
  INITIAL_TRANSFERS, 
  FL_NODES, 
  FL_PERFORMANCE_HISTORY, 
  MOCK_FORECAST_TIMESERIES 
} from './mock/data';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [outbreakActive, setOutbreakActive] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [isOutbreakModalOpen, setIsOutbreakModalOpen] = useState(false);

  // Application State
  const [phcs, setPhcs] = useState(INITIAL_PHCS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);

  // Navigation Helper when clicking "Outbreak Simulator" from sidebar
  const handleNavClick = (tabId) => {
    if (tabId === 'outbreak') {
      setIsOutbreakModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  // Toggle Outbreak Simulation
  const handleToggleOutbreak = () => {
    const nextState = !outbreakActive;
    setOutbreakActive(nextState);

    if (nextState) {
      // Outbreak Active: Increase critical alerts and change PHC 017 & 055 status to Critical
      setPhcs(prev => prev.map(p => {
        if (p.id === 'PHC-017' || p.id === 'PHC-055') {
          return { ...p, status: 'CRITICAL' };
        }
        return p;
      }));

      // Update Inventory consumption rate for PHC 017
      setInventory(prev => prev.map(inv => {
        if (inv.phcId === 'PHC-017') {
          return { ...inv, dailyConsumption: inv.dailyConsumption * 2.5, daysRemaining: 1.2, status: 'CRITICAL' };
        }
        return inv;
      }));
    } else {
      // Restore Baseline
      setPhcs(INITIAL_PHCS);
      setInventory(INITIAL_INVENTORY);
    }
  };

  // Approve Transfer Action
  const handleApproveTransfer = (transferId) => {
    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        return { ...t, status: 'APPROVED' };
      }
      return t;
    }));
  };

  // Acknowledge Alert Action
  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, acknowledged: true };
      }
      return a;
    }));
  };

  return (
    <div className="app-container">
      {/* Left Persistent Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleNavClick} 
        outbreakActive={outbreakActive}
        alertCount={alerts.filter(a => a.severity === 'CRITICAL' && !a.acknowledged).length}
        transferCount={transfers.filter(t => t.status === 'PENDING').length}
      />

      {/* Main Layout Wrapper */}
      <div className="main-wrapper">
        {/* Top Header Bar */}
        <Header 
          activeTab={activeTab} 
          outbreakActive={outbreakActive} 
          onToggleOutbreak={() => setIsOutbreakModalOpen(true)}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />

        {/* Dynamic Screen Content */}
        <main className="content-area">
          {activeTab === 'overview' && (
            <Overview 
              phcs={phcs}
              alerts={alerts}
              transfers={transfers}
              onApproveTransfer={handleApproveTransfer}
              onNavigate={(tab) => setActiveTab(tab)}
              selectedDistrict={selectedDistrict}
            />
          )}

          {activeTab === 'map' && (
            <PhcMap 
              phcs={selectedDistrict === 'ALL' ? phcs : phcs.filter(p => p.district === selectedDistrict)} 
            />
          )}

          {activeTab === 'inventory' && (
            <Inventory 
              inventory={inventory} 
              onNavigateToForecast={() => setActiveTab('forecasts')}
            />
          )}

          {activeTab === 'forecasts' && (
            <Forecasts 
              timeSeriesData={MOCK_FORECAST_TIMESERIES}
              phcs={phcs}
              inventory={inventory}
            />
          )}

          {activeTab === 'alerts' && (
            <Alerts 
              alerts={alerts} 
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onNavigateToTransfers={() => setActiveTab('transfers')}
            />
          )}

          {activeTab === 'transfers' && (
            <Transfers 
              transfers={transfers}
              onApproveTransfer={handleApproveTransfer}
            />
          )}

          {activeTab === 'fl' && (
            <FederatedLearning 
              flNodes={FL_NODES}
              performanceHistory={FL_PERFORMANCE_HISTORY}
            />
          )}
        </main>
      </div>

      {/* Outbreak Simulator Control Modal */}
      <OutbreakSimulatorModal 
        isOpen={isOutbreakModalOpen}
        onClose={() => setIsOutbreakModalOpen(false)}
        outbreakActive={outbreakActive}
        onToggleOutbreak={handleToggleOutbreak}
      />
    </div>
  );
}
