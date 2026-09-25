import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Building2, 
  BedDouble, 
  UserCheck, 
  X, 
  Search, 
  Package, 
  TrendingUp,
  CheckCircle2,
  Activity,
  Layers,
  Crosshair,
  Truck,
  Users,
  Compass,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_TRANSFERS } from '../mock/data';

// Color map for healthcare resilience status
const STATUS_COLORS = {
  CRITICAL: {
    base: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.18)',
    border: 'rgba(239, 68, 68, 0.6)',
    glow: 'rgba(239, 68, 68, 0.45)',
    label: 'CRITICAL RISK',
    badgeClass: 'badge-critical'
  },
  WARNING: {
    base: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.18)',
    border: 'rgba(245, 158, 11, 0.6)',
    glow: 'rgba(245, 158, 11, 0.45)',
    label: 'AT RISK',
    badgeClass: 'badge-warning'
  },
  HEALTHY: {
    base: '#10B981',
    bg: 'rgba(16, 185, 129, 0.18)',
    border: 'rgba(16, 185, 129, 0.6)',
    glow: 'rgba(16, 185, 129, 0.45)',
    label: 'OPERATIONAL',
    badgeClass: 'badge-healthy'
  }
};

export default function PhcMap({ phcs = [], selectedPhc: propSelectedPhc, setSelectedPhc: propSetSelectedPhc, isEmbedded = false }) {
  // Support both controlled and uncontrolled selection
  const [internalSelectedPhc, setInternalSelectedPhc] = useState(null);
  const activeSelectedPhc = propSelectedPhc !== undefined ? propSelectedPhc : internalSelectedPhc;
  
  const handleSelectPhc = useCallback((phc) => {
    if (propSetSelectedPhc) {
      propSetSelectedPhc(phc);
    } else {
      setInternalSelectedPhc(phc);
    }
  }, [propSetSelectedPhc]);

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTileMode, setMapTileMode] = useState('dark'); // 'dark' | 'street'
  const [showCatchment, setShowCatchment] = useState(true);
  const [showCorridors, setShowCorridors] = useState(true);
  const [showQuickList, setShowQuickList] = useState(!isEmbedded);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const catchmentLayerRef = useRef(null);
  const corridorsLayerRef = useRef(null);
  const markerLookupRef = useRef({});

  // Filter facilities
  const filteredPhcs = useMemo(() => {
    return phcs.filter(phc => {
      const matchesStatus = filterStatus === 'ALL' || phc.status === filterStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        phc.name.toLowerCase().includes(q) || 
        phc.district.toLowerCase().includes(q) ||
        phc.id.toLowerCase().includes(q) ||
        (phc.criticalMedicines && phc.criticalMedicines.some(m => m.toLowerCase().includes(q)));
      return matchesStatus && matchesSearch;
    });
  }, [phcs, filterStatus, searchQuery]);

  // Counts for status pills
  const criticalCount = phcs.filter(p => p.status === 'CRITICAL').length;
  const warningCount = phcs.filter(p => p.status === 'WARNING').length;
  const healthyCount = phcs.filter(p => p.status === 'HEALTHY').length;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Centered over Uttar Pradesh network cluster
    const map = L.map(mapContainerRef.current, {
      center: [26.85, 80.85],
      zoom: 8,
      minZoom: 6,
      maxZoom: 16,
      zoomControl: true,
      attributionControl: true
    });

    mapInstanceRef.current = map;

    // Base Tile Layer (Default CartoDB Dark Matter)
    const tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 18,
      attribution
    }).addTo(map);

    // Create Layer Groups
    catchmentLayerRef.current = L.layerGroup().addTo(map);
    corridorsLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);

    // Initial resize trigger
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer if mapTileMode changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const tileUrl = mapTileMode === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution = mapTileMode === 'dark'
      ? '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 18,
      attribution
    }).addTo(mapInstanceRef.current);
  }, [mapTileMode]);

  // Update Catchment, Corridors, and Hospital Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous layers
    if (markersLayerRef.current) markersLayerRef.current.clearLayers();
    if (catchmentLayerRef.current) catchmentLayerRef.current.clearLayers();
    if (corridorsLayerRef.current) corridorsLayerRef.current.clearLayers();
    markerLookupRef.current = {};

    if (filteredPhcs.length === 0) return;

    // 1. Draw Catchment Coverage Circles
    if (showCatchment && catchmentLayerRef.current) {
      filteredPhcs.forEach(phc => {
        const conf = STATUS_COLORS[phc.status] || STATUS_COLORS.HEALTHY;
        const radiusMeters = phc.population ? Math.min(14000, Math.max(7000, phc.population * 0.45)) : 9000;
        
        const circle = L.circle([phc.lat, phc.lng], {
          radius: radiusMeters,
          color: conf.base,
          weight: 1.5,
          dashArray: '5, 5',
          fillColor: conf.base,
          fillOpacity: 0.08
        });

        circle.bindTooltip(`
          <div style="font-family: JetBrains Mono; font-size: 10px; color: #D1E8E2;">
            <strong>${phc.name}</strong><br/>
            Catchment Area: ~${Math.round(radiusMeters / 1000)} km radius (${phc.population?.toLocaleString() || 'N/A'} pop)
          </div>
        `, { sticky: true, className: 'leaflet-custom-tooltip' });

        catchmentLayerRef.current.addLayer(circle);
      });
    }

    // 2. Draw SciPy Redistribution Transfer Corridors
    if (showCorridors && corridorsLayerRef.current) {
      INITIAL_TRANSFERS.forEach(trf => {
        const sourcePhc = phcs.find(p => p.id === trf.sourcePhcId);
        const destPhc = phcs.find(p => p.id === trf.destPhcId);

        if (sourcePhc && destPhc) {
          const polyline = L.polyline(
            [[sourcePhc.lat, sourcePhc.lng], [destPhc.lat, destPhc.lng]],
            {
              color: '#8cd3d4',
              weight: 2.5,
              dashArray: '6, 8',
              opacity: 0.85
            }
          );

          polyline.bindTooltip(`
            <div style="font-family: JetBrains Mono; font-size: 11px; padding: 4px; color: #D1E8E2;">
              <strong style="color: #FFCB9A;">SciPy Transfer Corridor</strong><br/>
              ${trf.medicineName} (${trf.quantity} units)<br/>
              ${sourcePhc.name.split(' ')[0]} ➔ ${destPhc.name.split(' ')[0]}<br/>
              Distance: ${trf.distanceKm} km (~${trf.estTimeMins} mins)
            </div>
          `, { sticky: true });

          corridorsLayerRef.current.addLayer(polyline);
        }
      });
    }

    // 3. Draw Rich Hospital Pins
    const bounds = L.latLngBounds();

    filteredPhcs.forEach(phc => {
      const conf = STATUS_COLORS[phc.status] || STATUS_COLORS.HEALTHY;
      const isSelected = activeSelectedPhc?.id === phc.id;
      const bedPct = phc.bedsTotal > 0 ? Math.round((phc.bedsOccupied / phc.bedsTotal) * 100) : 0;
      const staffPct = phc.staffScheduled > 0 ? Math.round((phc.staffPresent / phc.staffScheduled) * 100) : 0;
      const isCritical = phc.status === 'CRITICAL';

      bounds.extend([phc.lat, phc.lng]);

      // Custom Hospital HTML Icon
      const customIconHtml = `
        <div class="hospital-marker-pin" style="position: relative; display: flex; flex-direction: column; align-items: center;">
          ${isCritical ? `
            <div style="
              position: absolute; 
              top: 50%; 
              left: 50%; 
              transform: translate(-50%, -50%); 
              width: 52px; 
              height: 52px; 
              border-radius: 50%; 
              background: rgba(239, 68, 68, 0.35); 
              box-shadow: 0 0 20px rgba(239, 68, 68, 0.7);
              animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
              pointer-events: none;
            "></div>
          ` : ''}

          <div style="
            width: ${isSelected ? '38px' : '32px'};
            height: ${isSelected ? '38px' : '32px'};
            border-radius: 8px;
            background: ${conf.base};
            border: 2px solid ${isSelected ? '#FFFFFF' : '#D1E8E2'};
            box-shadow: 0 0 ${isSelected ? '22px' : '12px'} ${conf.base};
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            cursor: pointer;
            transition: all 0.25s ease;
            position: relative;
            z-index: ${isSelected ? 50 : 20};
          ">
            <svg width="${isSelected ? '20' : '16'}" height="${isSelected ? '20' : '16'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 6v12M6 12h12"/>
              <rect width="20" height="20" x="2" y="2" rx="4"/>
            </svg>
          </div>

          <div style="
            margin-top: 4px;
            background: rgba(13, 21, 18, 0.96);
            border: 1px solid ${conf.border};
            color: #D1E8E2;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: JetBrains Mono, monospace;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>${phc.name.replace('Primary Health Centre', 'PHC')}</span>
            <span style="color: ${conf.base}; font-size: 9px;">${bedPct}%</span>
          </div>
        </div>
      `;

      const customDivIcon = L.divIcon({
        html: customIconHtml,
        className: 'custom-leaflet-hospital-icon',
        iconSize: [40, 52],
        iconAnchor: [20, 26],
        popupAnchor: [0, -28]
      });

      // Marker Creation
      const marker = L.marker([phc.lat, phc.lng], { icon: customDivIcon });

      // Rich Hospital Popup Content
      const popupContent = `
        <div style="display: flex; flex-direction: column; gap: 10px; font-family: 'Hanken Grotesk', sans-serif;">
          <!-- Header -->
          <div style="border-bottom: 1px solid rgba(17, 100, 102, 0.4); padding-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="
                background: ${conf.bg}; 
                border: 1px solid ${conf.border}; 
                color: ${conf.base}; 
                font-size: 9px; 
                font-family: JetBrains Mono; 
                font-weight: 700; 
                padding: 2px 6px; 
                border-radius: 3px; 
                letter-spacing: 0.08em;
              ">
                ● ${conf.label}
              </span>
              <span style="font-family: JetBrains Mono; font-size: 9px; color: #899393;">
                ${phc.lastUpdated || 'Live'}
              </span>
            </div>
            <h4 style="font-size: 15px; font-weight: 800; color: #D1E8E2; margin: 0; font-family: 'Sora', sans-serif;">
              ${phc.name}
            </h4>
            <div style="font-size: 11px; color: #bec8c8; font-family: JetBrains Mono; margin-top: 2px;">
              ${phc.district} • ${phc.state}
            </div>
          </div>

          <!-- Capacity & Attendance Metrics -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div style="background: rgba(21, 29, 26, 0.7); border: 1px solid rgba(17, 100, 102, 0.3); padding: 8px; border-radius: 4px;">
              <div style="font-size: 9px; font-family: JetBrains Mono; color: #8cd3d4; text-transform: uppercase;">
                🛏️ Bed Capacity
              </div>
              <div style="font-size: 14px; font-weight: 700; color: #D1E8E2; margin-top: 2px; font-family: 'Sora', sans-serif;">
                ${phc.bedsOccupied} / ${phc.bedsTotal}
              </div>
              <div style="font-size: 9px; color: ${bedPct > 80 ? '#FF7B7B' : '#6EE7B7'};">
                ${bedPct}% Occupied
              </div>
            </div>

            <div style="background: rgba(21, 29, 26, 0.7); border: 1px solid rgba(17, 100, 102, 0.3); padding: 8px; border-radius: 4px;">
              <div style="font-size: 9px; font-family: JetBrains Mono; color: #8cd3d4; text-transform: uppercase;">
                👨‍⚕️ Clinical Staff
              </div>
              <div style="font-size: 14px; font-weight: 700; color: #D1E8E2; margin-top: 2px; font-family: 'Sora', sans-serif;">
                ${phc.staffPresent} / ${phc.staffScheduled}
              </div>
              <div style="font-size: 9px; color: #bec8c8;">
                ${staffPct}% On Duty
              </div>
            </div>

            <div style="background: rgba(21, 29, 26, 0.7); border: 1px solid rgba(17, 100, 102, 0.3); padding: 8px; border-radius: 4px;">
              <div style="font-size: 9px; font-family: JetBrains Mono; color: #8cd3d4; text-transform: uppercase;">
                📈 Daily Footfall
              </div>
              <div style="font-size: 14px; font-weight: 700; color: #D1E8E2; margin-top: 2px; font-family: 'Sora', sans-serif;">
                ${phc.patientFootfall || 0}
              </div>
              <div style="font-size: 9px; color: #FFCB9A;">
                ${phc.patientFootfallTrend || 'Nominal'}
              </div>
            </div>

            <div style="background: rgba(21, 29, 26, 0.7); border: 1px solid rgba(17, 100, 102, 0.3); padding: 8px; border-radius: 4px;">
              <div style="font-size: 9px; font-family: JetBrains Mono; color: #8cd3d4; text-transform: uppercase;">
                👥 Population
              </div>
              <div style="font-size: 14px; font-weight: 700; color: #D1E8E2; margin-top: 2px; font-family: 'Sora', sans-serif;">
                ${phc.population ? phc.population.toLocaleString() : 'N/A'}
              </div>
              <div style="font-size: 9px; color: #bec8c8;">
                Catchment Area
              </div>
            </div>
          </div>

          <!-- Pharmacy / Medicine Alert Details -->
          <div>
            ${phc.criticalMedicines && phc.criticalMedicines.length > 0 ? `
              <div style="
                background: rgba(239, 68, 68, 0.15); 
                border: 1px solid rgba(239, 68, 68, 0.4); 
                padding: 8px 10px; 
                border-radius: 4px;
                font-family: JetBrains Mono;
                font-size: 10px;
                color: #FF9E9E;
              ">
                <div style="font-weight: 700; color: #FF7B7B; margin-bottom: 2px; display: flex; align-items: center; gap: 4px;">
                  ⚠️ CRITICAL SHORTAGE DETECTED
                </div>
                <div>${phc.criticalMedicines.join(' • ')}</div>
                <div style="font-size: 9px; color: #bec8c8; margin-top: 2px;">Projected Stockout: &lt; 72 Hours</div>
              </div>
            ` : `
              <div style="
                background: rgba(16, 185, 129, 0.12); 
                border: 1px solid rgba(16, 185, 129, 0.35); 
                padding: 6px 10px; 
                border-radius: 4px;
                font-family: JetBrains Mono;
                font-size: 10px;
                color: #6EE7B7;
                display: flex;
                align-items: center;
                gap: 5px;
              ">
                <span>✓ All essential medicine buffers maintained</span>
              </div>
            `}
          </div>

          <!-- Action Button in Popup -->
          <button 
            id="btn-inspect-${phc.id}"
            style="
              width: 100%;
              background: #116466;
              border: 1px solid #8cd3d4;
              color: #FFFFFF;
              font-family: JetBrains Mono;
              font-size: 11px;
              font-weight: 700;
              padding: 7px;
              border-radius: 4px;
              cursor: pointer;
              letter-spacing: 0.05em;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              transition: all 0.2s ease;
            "
          >
            INSPECT FACILITY DOSSIER ➔
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 320 });

      // Click listener: select hospital & open popup
      marker.on('click', () => {
        handleSelectPhc(phc);
      });

      // Bind button inside popup once opened
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-inspect-${phc.id}`);
        if (btn) {
          btn.onclick = () => {
            handleSelectPhc(phc);
          };
        }
      });

      markersLayerRef.current.addLayer(marker);
      markerLookupRef.current[phc.id] = marker;
    });

    // Auto-fit bounds if we have valid PHCs
    if (bounds.isValid() && (!activeSelectedPhc || filteredPhcs.length > 1)) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
    }
  }, [filteredPhcs, phcs, activeSelectedPhc, showCatchment, showCorridors, handleSelectPhc]);

  // When activeSelectedPhc changes, fly to it and open its popup
  useEffect(() => {
    if (!activeSelectedPhc || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    map.flyTo([activeSelectedPhc.lat, activeSelectedPhc.lng], 11, {
      duration: 1.2
    });

    const targetMarker = markerLookupRef.current[activeSelectedPhc.id];
    if (targetMarker) {
      setTimeout(() => {
        targetMarker.openPopup();
      }, 500);
    }
  }, [activeSelectedPhc]);

  // Recenter / Fit All Hospitals
  const handleRecenter = () => {
    if (!mapInstanceRef.current || filteredPhcs.length === 0) return;
    const bounds = L.latLngBounds();
    filteredPhcs.forEach(p => bounds.extend([p.lat, p.lng]));
    if (bounds.isValid()) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  };

  return (
    <div 
      style={{
        width: '100%',
        height: isEmbedded ? '100%' : 'calc(100vh - 140px)',
        minHeight: isEmbedded ? '540px' : '650px',
        position: 'relative',
        backgroundColor: '#090E17',
        borderRadius: isEmbedded ? '0' : '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: isEmbedded ? 'none' : '1px solid rgba(17, 100, 102, 0.35)',
        boxShadow: isEmbedded ? 'none' : '0 0 30px rgba(17, 100, 102, 0.25)'
      }}
    >
      {/* Top Map HUD Controls Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          zIndex: 400,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none'
        }}
      >
        {/* Left Side: Search & Status Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
          {/* Search Bar */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(13, 21, 18, 0.94)',
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(17, 100, 102, 0.55)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
            }}
          >
            <Search size={14} color="#8cd3d4" />
            <input 
              type="text" 
              placeholder="Filter facility, medicine, district..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#D1E8E2',
                outline: 'none',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                width: '180px'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer', padding: 0 }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div 
            style={{
              display: 'flex',
              gap: '4px',
              backgroundColor: 'rgba(13, 21, 18, 0.94)',
              padding: '4px',
              borderRadius: '4px',
              border: '1px solid rgba(17, 100, 102, 0.55)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {[
              { id: 'ALL', label: `ALL (${phcs.length})` },
              { id: 'CRITICAL', label: `CRITICAL (${criticalCount})`, color: '#EF4444' },
              { id: 'WARNING', label: `WARNING (${warningCount})`, color: '#F59E0B' },
              { id: 'HEALTHY', label: `HEALTHY (${healthyCount})`, color: '#10B981' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setFilterStatus(st.id)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '3px',
                  border: 'none',
                  backgroundColor: filterStatus === st.id ? '#116466' : 'transparent',
                  color: filterStatus === st.id ? '#FFFFFF' : (st.color || '#bec8c8'),
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Map Controls, Layers & Quick List Toggle */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
          {/* Quick List Toggle */}
          <button 
            onClick={() => setShowQuickList(!showQuickList)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 10px',
              backgroundColor: showQuickList ? '#116466' : 'rgba(13, 21, 18, 0.94)',
              color: '#D1E8E2',
              border: '1px solid rgba(17, 100, 102, 0.55)',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Building2 size={13} color="#8cd3d4" />
            <span>Facilities ({filteredPhcs.length})</span>
          </button>

          {/* Toggle Catchment Radius */}
          <button 
            onClick={() => setShowCatchment(!showCatchment)}
            title="Toggle Catchment Area Circles"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              backgroundColor: showCatchment ? 'rgba(17, 100, 102, 0.4)' : 'rgba(13, 21, 18, 0.94)',
              color: showCatchment ? '#8cd3d4' : '#899393',
              border: '1px solid rgba(17, 100, 102, 0.55)',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Compass size={13} />
            <span>Coverage</span>
          </button>

          {/* Toggle Transfer Corridors */}
          <button 
            onClick={() => setShowCorridors(!showCorridors)}
            title="Toggle SciPy Transfer Corridors"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              backgroundColor: showCorridors ? 'rgba(17, 100, 102, 0.4)' : 'rgba(13, 21, 18, 0.94)',
              color: showCorridors ? '#FFCB9A' : '#899393',
              border: '1px solid rgba(17, 100, 102, 0.55)',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Truck size={13} />
            <span>Transfers</span>
          </button>

          {/* Tile Layer Toggle */}
          <button 
            onClick={() => setMapTileMode(mapTileMode === 'dark' ? 'street' : 'dark')}
            title="Switch Map Tile Theme"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              backgroundColor: 'rgba(13, 21, 18, 0.94)',
              color: '#D1E8E2',
              border: '1px solid rgba(17, 100, 102, 0.55)',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Layers size={13} color="#8cd3d4" />
            <span>{mapTileMode === 'dark' ? 'Tactical' : 'Street'}</span>
          </button>

          {/* Fit All / Recenter */}
          <button 
            onClick={handleRecenter}
            title="Recenter and Fit All Facilities"
            style={{
              padding: '6px 8px',
              backgroundColor: 'rgba(13, 21, 18, 0.94)',
              color: '#8cd3d4',
              border: '1px solid rgba(17, 100, 102, 0.55)',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Crosshair size={14} />
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div 
        ref={mapContainerRef} 
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          zIndex: 1
        }}
      />

      {/* Floating Facilities Quick-Selector Sidebar (Collapsible) */}
      {showQuickList && (
        <div 
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            width: '320px',
            maxHeight: 'calc(100% - 90px)',
            backgroundColor: 'rgba(13, 21, 18, 0.95)',
            border: '1px solid rgba(17, 100, 102, 0.5)',
            borderRadius: '6px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(16px)',
            zIndex: 400,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            borderBottom: '1px solid rgba(17, 100, 102, 0.35)',
            backgroundColor: '#090E17'
          }}>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#8cd3d4', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={13} />
              <span>HOSPITAL FACILITIES DIRECTORY</span>
            </div>
            <button 
              onClick={() => setShowQuickList(false)}
              style={{ background: 'none', border: 'none', color: '#bec8c8', cursor: 'pointer', padding: 0 }}
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '340px' }}>
            {filteredPhcs.length === 0 ? (
              <div style={{ padding: '16px', textAlign: 'center', color: '#899393', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                No facilities matching query
              </div>
            ) : (
              filteredPhcs.map(phc => {
                const conf = STATUS_COLORS[phc.status] || STATUS_COLORS.HEALTHY;
                const isSelected = activeSelectedPhc?.id === phc.id;
                const bedPct = phc.bedsTotal > 0 ? Math.round((phc.bedsOccupied / phc.bedsTotal) * 100) : 0;

                return (
                  <div
                    key={phc.id}
                    onClick={() => handleSelectPhc(phc)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? 'rgba(17, 100, 102, 0.35)' : 'rgba(21, 29, 26, 0.75)',
                      border: `1px solid ${isSelected ? '#8cd3d4' : 'rgba(17, 100, 102, 0.3)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                        {phc.name}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: conf.base,
                        backgroundColor: conf.bg,
                        padding: '1px 5px',
                        borderRadius: '3px',
                        border: `1px solid ${conf.border}`
                      }}>
                        {phc.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#bec8c8', fontFamily: 'var(--font-mono)' }}>
                      <span>{phc.district}</span>
                      <span>Beds: <strong style={{ color: bedPct > 80 ? '#FF7B7B' : '#D1E8E2' }}>{bedPct}%</strong></span>
                    </div>

                    {phc.criticalMedicines && phc.criticalMedicines.length > 0 && (
                      <div style={{ fontSize: '9.5px', color: '#FF7B7B', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                        ⚠️ Shortage: {phc.criticalMedicines.join(', ')}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Slide-out Full Facility Detail Dossier Drawer */}
      {activeSelectedPhc && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '390px',
            maxWidth: '100%',
            backgroundColor: 'rgba(13, 21, 18, 0.98)',
            borderLeft: '1px solid rgba(17, 100, 102, 0.55)',
            boxShadow: '-8px 0 35px rgba(0,0,0,0.75)',
            backdropFilter: 'blur(20px)',
            zIndex: 500,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
          className="animate-fade-in"
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className={`badge ${STATUS_COLORS[activeSelectedPhc.status]?.badgeClass || 'badge-healthy'}`}>
                {activeSelectedPhc.status} STATUS
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: '800', marginTop: '8px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {activeSelectedPhc.name}
              </h3>
              <div style={{ fontSize: '12px', color: '#bec8c8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                {activeSelectedPhc.district} • {activeSelectedPhc.state} ({activeSelectedPhc.lat.toFixed(4)}, {activeSelectedPhc.lng.toFixed(4)})
              </div>
            </div>

            <button 
              onClick={() => handleSelectPhc(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bec8c8', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Telemetry Operational Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.85)', border: '1px solid rgba(17, 100, 102, 0.35)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#8cd3d4', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                <BedDouble size={14} /> Bed Occupancy
              </div>
              <div style={{ fontSize: '17px', fontWeight: '700', marginTop: '4px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {activeSelectedPhc.bedsOccupied} / {activeSelectedPhc.bedsTotal}
              </div>
              <div style={{ fontSize: '10px', color: activeSelectedPhc.bedsOccupied / activeSelectedPhc.bedsTotal > 0.8 ? '#FF7B7B' : '#6EE7B7', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                {Math.round((activeSelectedPhc.bedsOccupied / activeSelectedPhc.bedsTotal) * 100)}% capacity
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.85)', border: '1px solid rgba(17, 100, 102, 0.35)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#8cd3d4', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                <UserCheck size={14} /> Clinical Staff
              </div>
              <div style={{ fontSize: '17px', fontWeight: '700', marginTop: '4px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {activeSelectedPhc.staffPresent} / {activeSelectedPhc.staffScheduled}
              </div>
              <div style={{ fontSize: '10px', color: '#bec8c8', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                {Math.round((activeSelectedPhc.staffPresent / activeSelectedPhc.staffScheduled) * 100)}% on duty
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.85)', border: '1px solid rgba(17, 100, 102, 0.35)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#8cd3d4', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                <TrendingUp size={14} /> Patient Influx
              </div>
              <div style={{ fontSize: '17px', fontWeight: '700', marginTop: '4px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {activeSelectedPhc.patientFootfall || 0}
              </div>
              <div style={{ fontSize: '10px', color: activeSelectedPhc.patientFootfallTrend?.includes('+') ? '#FFCB9A' : '#6EE7B7', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                {activeSelectedPhc.patientFootfallTrend || 'Nominal'} vs baseline
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'rgba(21, 29, 26, 0.85)', border: '1px solid rgba(17, 100, 102, 0.35)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#8cd3d4', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                <Users size={14} /> Serving Catchment
              </div>
              <div style={{ fontSize: '17px', fontWeight: '700', marginTop: '4px', color: '#D1E8E2', fontFamily: 'var(--font-title)' }}>
                {activeSelectedPhc.population?.toLocaleString() || 'N/A'}
              </div>
              <div style={{ fontSize: '10px', color: '#bec8c8', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                Residents protected
              </div>
            </div>
          </div>

          {/* Pharmacy Critical Items */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#D1E8E2', marginBottom: '8px', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={14} color="#8cd3d4" />
              <span>FACILITY MEDICINE INVENTORY STATUS</span>
            </div>

            {activeSelectedPhc.criticalMedicines && activeSelectedPhc.criticalMedicines.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeSelectedPhc.criticalMedicines.map(med => (
                  <div 
                    key={med} 
                    style={{
                      padding: '10px 12px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.45)',
                      fontSize: '12px',
                      color: '#FF9E9E',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <span>{med}</span>
                    <span style={{ fontSize: '10px', color: '#FF7B7B', fontWeight: 700 }}>Stockout &lt; 3D</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#6EE7B7', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', padding: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <CheckCircle2 size={14} /> All safety thresholds and critical stock lines maintained.
              </div>
            )}
          </div>

          {/* AI Decision & Linear Programming Redistribution Directives */}
          {activeSelectedPhc.status === 'CRITICAL' && (
            <div style={{ 
              padding: '14px', 
              borderRadius: '4px', 
              backgroundColor: 'rgba(245, 158, 11, 0.15)', 
              border: '1px solid rgba(245, 158, 11, 0.45)',
              fontSize: '11.5px',
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: '700', color: '#FFCB9A' }}>
                <Activity size={14} /> SCIPY LOGISTICS DIRECTIVE
              </div>
              <div style={{ color: '#D1E8E2', lineHeight: 1.5 }}>
                High-priority emergency redistribution calculated. Nearest surplus facility: <strong>PHC 062 (Hardoi)</strong> holding 520 surplus units. Estimated transit route: 31.2 km (~45 mins).
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(17, 100, 102, 0.3)' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => handleSelectPhc(null)}
            >
              <Package size={14} /> Close Hospital Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
