import React, { useState } from 'react';
import { Property } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  MapPin, 
  Plus, 
  Minus, 
  Navigation, 
  Bed, 
  Bath, 
  Maximize2, 
  Sparkles, 
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';

interface MapViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const MapView: React.FC<MapViewProps> = ({ properties, onSelectProperty }) => {
  const { theme, themeConfig } = useTheme();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || '');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeLocality, setActiveLocality] = useState<string>('all');
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  const filteredProperties = properties.filter((p) => {
    if (activeLocality === 'all') return true;
    return p.location.locality.toLowerCase().includes(activeLocality.toLowerCase());
  });

  const localities = ['all', 'Saravanampatti', 'Peelamedu', 'Karamadai', 'Race Course', 'Gandhipuram', 'Vadavalli'];

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" style={{ color: themeConfig.primaryColor }} />
            <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
              Interactive Map Search: Coimbatore
            </span>
          </div>

          {/* Mobile Map / List Toggle */}
          <div className="flex lg:hidden items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              onClick={() => setMobileTab('map')}
              className={`px-3 py-1 rounded-lg transition-all ${
                mobileTab === 'map' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMobileTab('list')}
              className={`px-3 py-1 rounded-lg transition-all ${
                mobileTab === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'
              }`}
            >
              List ({filteredProperties.length})
            </button>
          </div>
        </div>

        {/* Locality pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1">
          {localities.map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocality(loc)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                activeLocality === loc
                  ? themeConfig.activeTabClass
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {loc === 'all' ? 'All Localities' : loc}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Split Listing View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[550px] sm:h-[650px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
        
        {/* Left Side: Property Listings Scroll Column (shown on desktop or when mobileTab === 'list') */}
        <div className={`lg:col-span-4 h-full overflow-y-auto bg-slate-50 dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800 p-3 space-y-3 ${
          mobileTab === 'list' ? 'block' : 'hidden lg:block'
        }`}>
          {filteredProperties.map((prop) => {
            const isSelected = prop.id === selectedPropertyId;
            return (
              <div
                key={prop.id}
                onClick={() => setSelectedPropertyId(prop.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-50/90 dark:bg-purple-950/40 border-purple-500 shadow-md ring-2 ring-purple-300'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex gap-3">
                  <img
                    src={prop.images[0]}
                    alt=""
                    className="w-24 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-purple-700 dark:text-purple-400">
                        {prop.priceDisplay}
                      </span>
                      {prop.tag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-bold">
                          {prop.tag}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate mt-0.5">
                      {prop.specs.bedrooms ? `${prop.specs.bedrooms} BHK ${prop.category}` : prop.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-purple-500" />
                      <span>{prop.location.locality}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>{prop.specs.areaSqFt} sq.ft</span>
                      {prop.specs.bedrooms && <span>• {prop.specs.bedrooms} Beds</span>}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProperty(prop);
                    }}
                    className="mt-2.5 w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Full Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Interactive Vector City Map (shown on desktop or when mobileTab === 'map') */}
        <div className={`lg:col-span-8 relative h-full bg-[#eef2f6] dark:bg-[#111827] overflow-hidden select-none ${
          mobileTab === 'map' ? 'block' : 'hidden lg:block'
        }`}>
          
          {/* Map Vector Graphic (Roads, River, Green Belts) */}
          <svg className="w-full h-full absolute inset-0 opacity-80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-slate-300/40 dark:text-slate-800" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Simulated Geographic elements: Western Ghats foothills & Noyyal River */}
            <path d="M 0,20 Q 200,60 300,120 T 700,150 T 1100,280" fill="none" stroke="#bae6fd" strokeWidth="18" strokeLinecap="round" opacity="0.6" />
            <path d="M 0,20 Q 200,60 300,120 T 700,150 T 1100,280" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" opacity="0.8" />

            {/* Major Arterial Expressways (Avinashi Road, Sathy Road, Mettupalayam Highway) */}
            <path d="M 100,0 L 700,700" stroke="#cbd5e1" strokeWidth="10" className="dark:stroke-slate-700" />
            <path d="M 100,0 L 700,700" stroke="#fef08a" strokeWidth="2" strokeDasharray="6 6" />

            <path d="M 700,50 L 150,600" stroke="#cbd5e1" strokeWidth="8" className="dark:stroke-slate-700" />
            <path d="M 0,380 L 1000,420" stroke="#cbd5e1" strokeWidth="12" className="dark:stroke-slate-700" />
            <path d="M 0,380 L 1000,420" stroke="#fde047" strokeWidth="2.5" strokeDasharray="8 6" />

            {/* Green Parks / Reserve Zones */}
            <ellipse cx="25%" cy="30%" rx="90" ry="60" fill="#86efac" opacity="0.25" />
            <ellipse cx="80%" cy="75%" rx="120" ry="70" fill="#86efac" opacity="0.25" />
          </svg>

          {/* Map Overlay Markers with Price Badges (Matches reference screenshot) */}
          {filteredProperties.map((prop) => {
            const isSelected = prop.id === selectedPropertyId;
            return (
              <div
                key={prop.id}
                onClick={() => setSelectedPropertyId(prop.id)}
                style={{
                  left: `${prop.location.mapX}%`,
                  top: `${prop.location.mapY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-20 cursor-pointer group transition-transform duration-200 ${
                  isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                }`}
              >
                {/* Price Marker Badge */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white ring-4 ring-purple-300 dark:ring-purple-900 shadow-purple-500/50'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-purple-600 hover:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 fill-current" />
                  <span>{prop.priceDisplay}</span>
                </div>

                {/* Subtitle Locality Tag */}
                <div className="text-[10px] text-center font-bold text-slate-700 dark:text-slate-300 mt-1 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs whitespace-nowrap">
                  {prop.location.locality}
                </div>
              </div>
            );
          })}

          {/* Map Controls (+ / - / Reset) */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors font-bold"
              title="Zoom In"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors font-bold"
              title="Zoom Out"
            >
              <Minus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-purple-600 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors"
              title="Reset View"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Selected Property Bottom Overlay Card */}
          {selectedProperty && (
            <div className="absolute bottom-6 left-6 max-w-sm w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-20 animate-fade-in">
              <div className="flex gap-3">
                <img
                  src={selectedProperty.images[0]}
                  alt=""
                  className="w-20 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-base font-extrabold text-purple-600 dark:text-purple-400">
                    {selectedProperty.priceDisplay}
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                    {selectedProperty.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {selectedProperty.location.locality}, {selectedProperty.location.city}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelectProperty(selectedProperty)}
                className="w-full mt-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
              >
                Inspect Listing Details →
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

