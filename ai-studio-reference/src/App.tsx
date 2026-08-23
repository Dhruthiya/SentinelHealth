import React, { useState } from 'react';
import { NavTab, OperativeProfile } from './types';
import { BackgroundShader } from './components/BackgroundShader';
import { TopNavBar } from './components/TopNavBar';
import { HeroView } from './components/HeroView';
import { DashboardView } from './components/DashboardView';
import { MetricsView } from './components/MetricsView';
import { ArchiveView } from './components/ArchiveView';
import { ProtocolsView } from './components/ProtocolsView';
import { ShopModal } from './components/ShopModal';
import { OperativeModal } from './components/OperativeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isOperativeModalOpen, setIsOperativeModalOpen] = useState<boolean>(false);
  const [isLiveFeedActive, setIsLiveFeedActive] = useState<boolean>(true);

  // Operative state for inspection
  const [currentOperative] = useState<OperativeProfile>({
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

  return (
    <div className="min-h-screen flex flex-col bg-[#2C3531] text-[#D1E8E2] selection:bg-[#116466] selection:text-[#97dee0] relative overflow-x-hidden">
      {/* Dynamic GLSL WebGL Background Shader */}
      <BackgroundShader />

      {/* Top Navigation Bar */}
      <TopNavBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenShop={() => setIsShopOpen(true)}
        isLiveFeedActive={isLiveFeedActive}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col pt-[72px] md:pt-[80px]">
        {activeTab === 'solarin' && (
          <HeroView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            onOpenOperativeModal={() => setIsOperativeModalOpen(true)}
            onNavigateProtocols={() => {
              setActiveTab('protocols');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'metrics' && <MetricsView />}

        {activeTab === 'archive' && <ArchiveView />}

        {activeTab === 'protocols' && <ProtocolsView />}
      </main>

      {/* Shared Global Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <ShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />

      <OperativeModal
        isOpen={isOperativeModalOpen}
        onClose={() => setIsOperativeModalOpen(false)}
        profile={currentOperative}
      />
    </div>
  );
}
