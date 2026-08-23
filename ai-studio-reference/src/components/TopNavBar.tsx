import React, { useState } from 'react';
import { NavTab } from '../types';
import { Menu, X, Radio, ShoppingBag } from 'lucide-react';

interface TopNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenShop: () => void;
  isLiveFeedActive: boolean;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeTab,
  onTabChange,
  onOpenShop,
  isLiveFeedActive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'solarin', label: 'Solarin' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'archive', label: 'Archive' },
    { id: 'protocols', label: 'Protocols' },
  ];

  return (
    <header
      id="main-top-navbar"
      className="fixed top-0 w-full z-50 glass-nav font-mono-tech text-[12px] uppercase tracking-[0.2em] border-b border-[#D1E8E2]/20 shadow-[0_0_20px_rgba(17,100,102,0.25)]"
    >
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1440px] mx-auto">
        {/* Brand Logo */}
        <button
          id="nav-brand-logo"
          onClick={() => onTabChange('solarin')}
          className="text-left font-['Sora'] font-semibold text-[22px] md:text-[24px] tracking-tight text-[#D1E8E2] text-glow hover:text-[#8cd3d4] transition-colors flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-2.5 h-2.5 bg-[#8cd3d4] group-hover:shadow-[0_0_12px_#8cd3d4] transition-all rounded-xs"></span>
          AEROHEALTH
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation-links" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`relative py-1 tracking-widest transition-all duration-300 cursor-pointer font-medium ${
                  isActive
                    ? 'text-[#8cd3d4] font-bold text-glow shadow-[0_0_20px_rgba(140,211,212,0.3)]'
                    : 'text-[#bec8c8] hover:text-[#8cd3d4]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8cd3d4] shadow-[0_0_8px_#8cd3d4]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Real-time Indicator Tag */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#151d1a] border border-[#116466]/40 text-[11px] text-[#bec8c8]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLiveFeedActive
                  ? 'bg-[#8cd3d4] animate-pulse shadow-[0_0_8px_#8cd3d4]'
                  : 'bg-[#899393]'
              }`}
            />
            <span className="text-[#8cd3d4]">
              {isLiveFeedActive ? 'FEED: 120HZ' : 'PAUSED'}
            </span>
          </div>

          {/* Shop Now Button */}
          <button
            id="nav-shop-now-btn"
            onClick={onOpenShop}
            className="tech-border px-5 md:px-6 py-2 text-[#D1E8E2] font-['Sora'] font-semibold text-[13px] tracking-widest uppercase hover:text-[#8cd3d4] transition-all duration-300 btn-glow bg-transparent flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#8cd3d4]" />
            <span>SHOP NOW</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#D1E8E2] p-1.5 hover:text-[#8cd3d4] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-container"
          className="md:hidden bg-[#0d1512]/95 border-b border-[#116466] px-6 py-6 flex flex-col gap-4 backdrop-blur-2xl"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2.5 px-3 rounded text-[13px] tracking-widest transition-all ${
                activeTab === item.id
                  ? 'text-[#8cd3d4] bg-[#116466]/20 font-bold border-l-2 border-[#8cd3d4]'
                  : 'text-[#bec8c8] hover:text-[#8cd3d4]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#116466]/30 flex items-center justify-between text-[11px] text-[#bec8c8]">
            <span>SENTINEL TELEMETRY</span>
            <span className="text-[#8cd3d4] flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> ONLINE
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
