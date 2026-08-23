import React, { useState } from 'react';
import { HardwareItem } from '../types';
import { ShoppingBag, X, Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const catalog: HardwareItem[] = [
    {
      id: 'prod-1',
      name: 'SOLARIN AETHERIC TERMINAL',
      model: 'SOL-MK-IV',
      category: 'Primary Quantum Biometric Node',
      price: '$1,250',
      status: 'AVAILABLE',
      tag: 'FLAGSHIP',
      description:
        'Aero-grade titanium housing with DLC coating. Subdermal photon resonance scanners delivering 120Hz real-time telemetry streaming.',
      specs: [
        '144 Optical Bio-Sensors',
        'AES-GCM-512 Quantum-Resistant Encryption',
        '14-Day Resonant Battery Life',
        '10 ATM Hydrostatic Pressure Resistant',
      ],
    },
    {
      id: 'prod-2',
      name: 'SOLARIN DERMAL BIO-PATCH',
      model: 'DBP-30X (12-PACK)',
      category: 'Disposable Cellular Interface',
      price: '$240',
      status: 'AVAILABLE',
      tag: 'CONSUMABLE',
      description:
        'Biocompatible hydrogel sensor patches for zero-impedance interstitial fluid and electrolyte telemetry during high-g deployments.',
      specs: [
        'Osmotic Electrolyte Flux Tracking',
        'Hypoallergenic Medical Silicone Base',
        '30-Day Continuous Wear Per Patch',
        'Instant Solarin Sync Pairing',
      ],
    },
    {
      id: 'prod-3',
      name: 'AETHERIC INDUCTION DOCK',
      model: 'AID-PRO-STATION',
      category: 'Fast Induction & Encryption Sync',
      price: '$480',
      status: 'AVAILABLE',
      tag: 'ACCESSORY',
      description:
        'Solid milled aluminum base station providing rapid 15W resonant charging while backing up encrypted mission bio-telemetry.',
      specs: [
        'Fast 45-Min Full Thermal Induction',
        'Hardware Security Module (HSM) Vault',
        'Gigabit Optical Data Uplink',
        'Ambient Sentinel Status Glow',
      ],
    },
  ];

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart({});
      setOrderPlaced(false);
      onClose();
    }, 2800);
  };

  const totalItems = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);

  return (
    <div
      id="shop-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
    >
      <div className="bg-[#0d1512] border border-[#116466] max-w-4xl w-full p-6 md:p-8 rounded-lg shadow-[0_0_50px_rgba(17,100,102,0.4)] relative my-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#116466]/40 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono-tech text-[#8cd3d4] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-[#8cd3d4] rounded-full animate-ping"></span>
              AEROHEALTH HARDWARE ARMORY
            </div>
            <h2 className="font-['Sora'] font-bold text-[24px] md:text-[28px] text-[#D1E8E2] text-glow mt-1">
              SOLARIN BIOMETRIC PROCUREMENT
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#bec8c8] hover:text-[#D1E8E2] border border-transparent hover:border-[#116466] rounded cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {orderPlaced ? (
          <div className="py-16 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#116466]/40 border border-[#8cd3d4] mx-auto flex items-center justify-center text-[#8cd3d4] shadow-[0_0_30px_#8cd3d4]">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-['Sora'] font-bold text-[24px] text-[#D1E8E2] text-glow">
              REQUISITION DISPATCHED
            </h3>
            <p className="text-sm text-[#bec8c8] max-w-md mx-auto">
              Your Solarin hardware allocation order has been logged into the SentinelHealth deployment pipeline.
            </p>
          </div>
        ) : (
          <>
            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {catalog.map((item) => {
                const count = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-lg bg-[#151d1a] border border-[#116466]/40 flex flex-col justify-between hover:border-[#8cd3d4] transition-all group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-[#116466]/30 text-[#8cd3d4] border border-[#116466]/60">
                          {item.tag}
                        </span>
                        <span className="font-['Sora'] font-bold text-[18px] text-[#D1E8E2]">
                          {item.price}
                        </span>
                      </div>

                      <h4 className="font-['Sora'] font-semibold text-[15px] text-[#D1E8E2] mt-1 group-hover:text-[#8cd3d4] transition-colors">
                        {item.name}
                      </h4>
                      <div className="text-[11px] font-mono-tech text-[#bec8c8] mb-3">
                        {item.model}
                      </div>

                      <p className="text-xs text-[#bec8c8] mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <ul className="space-y-1 mb-4 text-[11px] font-mono-tech text-[#bec8c8]">
                        {item.specs.map((s, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-[#8cd3d4]">▪</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => addToCart(item.id)}
                      className={`w-full py-2 rounded text-xs font-['Sora'] font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        count > 0
                          ? 'bg-[#116466] text-[#D1E8E2] border border-[#8cd3d4]'
                          : 'border border-[#D1E8E2]/30 text-[#D1E8E2] hover:border-[#8cd3d4] hover:text-[#8cd3d4] btn-glow'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {count > 0 ? `ADDED (${count})` : 'ADD TO REQUISITION'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Checkout Action */}
            <div className="p-4 bg-[#151d1a]/90 rounded-lg border border-[#116466]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono-tech text-[#bec8c8]">
                <span>ITEMS ALLOCATED: {totalItems}</span>
                <span className="mx-2">•</span>
                <span className="text-[#8cd3d4]">ENCRYPTED COURIER DISPATCH READY</span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-mono-tech text-[#bec8c8] hover:text-[#D1E8E2] cursor-pointer"
                >
                  CONTINUE BROWSING
                </button>

                <button
                  onClick={handleCheckout}
                  disabled={totalItems === 0}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded bg-[#116466] hover:bg-[#19686a] border border-[#8cd3d4] text-[#D1E8E2] font-['Sora'] text-xs uppercase tracking-widest font-semibold transition-all btn-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  <span>CONFIRM REQUISITION</span>
                  <ArrowRight className="w-4 h-4 text-[#8cd3d4]" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
