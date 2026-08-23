import React, { useState } from 'react';
import BackgroundShader from './components/BackgroundShader';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SolarinIntelligenceEngine from './components/SolarinIntelligenceEngine';
import Overview from './components/Overview';
import PhcMap from './components/PhcMap';
import Inventory from './components/Inventory';
import Forecasts from './components/Forecasts';
import Alerts from './components/Alerts';
import Transfers from './components/Transfers';
import FederatedLearning from './components/FederatedLearning';
import OutbreakSimulatorModal from './components/OutbreakSimulatorModal';
import OperativeModal from './components/OperativeModal';
import Footer from './components/Footer';

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
  // Screen Mode: 'landing' (Home Landing Screen) vs 'dashboard' (Application Dashboard)
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [outbreakActive, setOutbreakActive] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [isOutbreakModalOpen, setIsOutbreakModalOpen] = useState(false);
  const [isOperativeModalOpen, setIsOperativeModalOpen] = useState(false);

  // Application State
  const [phcs, setPhcs] = useState(INITIAL_PHCS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);

  // Navigation Helper
  const handleNavClick = (tabId) => {
    if (tabId === 'home') {
      setIsLandingPage(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'outbreak') {
      setIsOutbreakModalOpen(true);
    } else {
      setIsLandingPage(false);
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Switch to Dashboard
  const handleEnterDashboard = (targetTab = 'overview') => {
    setIsLandingPage(false);
    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const criticalAlertCount = alerts.filter(a => a.severity === 'CRITICAL' && !a.acknowledged).length;
  const pendingTransferCount = transfers.filter(t => t.status === 'PENDING').length;

  return (
    <div className="app-container">
      {/* Dynamic GLSL WebGL Background Shader */}
      <BackgroundShader />

      {isLandingPage ? (
        /* ========================================================================= */
        /* Standalone Landing / Home Screen with Strong Hero */
        /* ========================================================================= */
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <LandingPage 
            onEnterDashboard={() => handleEnterDashboard('overview')}
            onOpenOutbreakModal={() => setIsOutbreakModalOpen(true)}
            outbreakActive={outbreakActive}
          />
          <Footer />
        </div>
      ) : (
        /* ========================================================================= */
        /* Main Dashboard Application with Persistent Sidebar & Top Header */
        /* ========================================================================= */
        <>
          {/* Left Persistent Navigation Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={handleNavClick} 
            outbreakActive={outbreakActive}
            alertCount={criticalAlertCount}
            transferCount={pendingTransferCount}
            onGoHome={() => setIsLandingPage(true)}
          />

          {/* Main Dashboard Layout Wrapper */}
          <div className="main-wrapper">
            {/* Top Header Navigation Bar */}
            <Header 
              activeTab={activeTab} 
              setActiveTab={handleNavClick}
              outbreakActive={outbreakActive} 
              onToggleOutbreak={() => setIsOutbreakModalOpen(true)}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              onOpenOperativeModal={() => setIsOperativeModalOpen(true)}
              onGoHome={() => setIsLandingPage(true)}
              alertCount={criticalAlertCount}
              transferCount={pendingTransferCount}
            />

            {/* Dynamic Screen Content */}
            <main className="content-area">
              {activeTab === 'hero' && (
                <SolarinIntelligenceEngine 
                  phcs={phcs}
                  inventory={inventory}
                  alerts={alerts}
                  transfers={transfers}
                  timeSeriesData={MOCK_FORECAST_TIMESERIES}
                  onNavigate={(tab) => handleNavClick(tab)}
                  onOpenOutbreakModal={() => setIsOutbreakModalOpen(true)}
                  outbreakActive={outbreakActive}
                />
              )}

              {activeTab === 'overview' && (
                <Overview 
                  phcs={phcs}
                  alerts={alerts}
                  transfers={transfers}
                  onApproveTransfer={handleApproveTransfer}
                  onNavigate={(tab) => handleNavClick(tab)}
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
                  onNavigateToForecast={() => handleNavClick('forecasts')}
                />
              )}

              {activeTab === 'forecasts' && (
                <Forecasts 
                  timeSeriesData={MOCK_FORECAST_TIMESERIES}
                  phcs={phcs}
                />
              )}

              {activeTab === 'alerts' && (
                <Alerts 
                  alerts={alerts} 
                  onAcknowledgeAlert={handleAcknowledgeAlert}
                  onNavigateToTransfers={() => handleNavClick('transfers')}
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

            {/* Global Footer */}
            <Footer />
          </div>
        </>
      )}

      {/* Outbreak Simulator Control Modal */}
      <OutbreakSimulatorModal 
        isOpen={isOutbreakModalOpen}
        onClose={() => setIsOutbreakModalOpen(false)}
        outbreakActive={outbreakActive}
        onToggleOutbreak={handleToggleOutbreak}
      />

      {/* Administrator / Operative Dossier Modal */}
      <OperativeModal 
        isOpen={isOperativeModalOpen}
        onClose={() => setIsOperativeModalOpen(false)}
      />
    </div>
  );
}
