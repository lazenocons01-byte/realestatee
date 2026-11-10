import React, { useState } from 'react';
import { Property } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowLeft, 
  Share2, 
  SlidersHorizontal,
  Bed,
  Bath,
  Maximize2,
  Building,
  Layers,
  Sparkles,
  Wifi,
  BatteryMedium,
  Signal
} from 'lucide-react';

interface MobileAppSimulatorProps {
  properties: Property[];
}

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({ properties }) => {
  const { theme, themeConfig } = useTheme();
  const [mobileScreen, setMobileScreen] = useState<'feed' | 'detail'>('feed');
  const [activeBottomNav, setActiveBottomNav] = useState<'home' | 'search' | 'saved' | 'profile'>('home');
  const [selectedMobileProperty, setSelectedMobileProperty] = useState<Property>(properties[0]);
  const [mobileSearch, setMobileSearch] = useState('');
  const [mobileCategory, setMobileCategory] = useState('all');

  const filtered = properties.filter((p) => {
    if (mobileCategory !== 'all' && p.category !== mobileCategory) return false;
    if (mobileSearch && !p.title.toLowerCase().includes(mobileSearch.toLowerCase()) && !p.location.locality.toLowerCase().includes(mobileSearch.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="py-6 space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
          Native Mobile App Experience
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-slate-100">
          Mobile Application UI Preview
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Interactive simulator demonstrating native gesture-friendly real estate discovery, quick filters, and 1-tap agent calling.
        </p>
      </div>

      {/* Side-by-side Mobile Phones (Matching the reference screenshot right-bottom section) */}
      <div className="flex flex-wrap items-center justify-center gap-8 py-4">
        
        {/* PHONE 1: Home Feed & Discovery */}
        <div className="w-[340px] h-[680px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-white/20 relative flex flex-col">
          {/* Hardware Notch / Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-end px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-1 ring-slate-800" />
          </div>

          {/* Screen Container */}
          <div className="w-full h-full bg-slate-50 dark:bg-[#0f172a] rounded-[38px] overflow-hidden flex flex-col relative text-slate-900 dark:text-slate-100">
            
            {/* Status Bar */}
            <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-4 h-4" />
              </div>
            </div>

            {/* Mobile Header */}
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base tracking-tight">RealEstate</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                SM
              </div>
            </div>

            {/* Scrollable Feed Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-14 space-y-4">
              
              {/* Search Bar */}
              <div className="relative mt-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border-0 focus:outline-none"
                />
              </div>

              {/* 4 Category Pill Buttons (Buy, Rent, Plots, Projects) */}
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { id: 'all', label: 'Buy' },
                  { id: 'rent', label: 'Rent' },
                  { id: 'plot', label: 'Plots' },
                  { id: 'villa', label: 'Villas' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setMobileCategory(cat.id)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
                      mobileCategory === cat.id
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Recommended Section Heading */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold">Recommended for You</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">View All</span>
              </div>

              {/* Property Card Feed */}
              <div className="space-y-3">
                {filtered.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedMobileProperty(item);
                      setMobileScreen('detail');
                    }}
                    className="p-2 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer hover:border-purple-400"
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-purple-600 text-white text-[9px] font-bold">
                        {item.priceDisplay}
                      </span>
                    </div>
                    <div className="pt-2 px-1">
                      <div className="font-bold text-xs truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-purple-500" />
                        <span>{item.location.locality}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-6 flex items-center justify-between text-slate-400 z-30">
              <button onClick={() => setActiveBottomNav('home')} className={`flex flex-col items-center gap-0.5 ${activeBottomNav === 'home' ? 'text-purple-600' : ''}`}>
                <Home className="w-4 h-4" />
                <span className="text-[9px] font-medium">Home</span>
              </button>
              <button onClick={() => setActiveBottomNav('search')} className={`flex flex-col items-center gap-0.5 ${activeBottomNav === 'search' ? 'text-purple-600' : ''}`}>
                <Search className="w-4 h-4" />
                <span className="text-[9px] font-medium">Search</span>
              </button>
              <button onClick={() => setActiveBottomNav('saved')} className={`flex flex-col items-center gap-0.5 ${activeBottomNav === 'saved' ? 'text-purple-600' : ''}`}>
                <Heart className="w-4 h-4" />
                <span className="text-[9px] font-medium">Saved</span>
              </button>
              <button onClick={() => setActiveBottomNav('profile')} className={`flex flex-col items-center gap-0.5 ${activeBottomNav === 'profile' ? 'text-purple-600' : ''}`}>
                <User className="w-4 h-4" />
                <span className="text-[9px] font-medium">Profile</span>
              </button>
            </div>

          </div>
        </div>

        {/* PHONE 2: Single Property Detail View (Matching screenshot) */}
        <div className="w-[340px] h-[680px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-white/20 relative flex flex-col">
          {/* Hardware Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-end px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-1 ring-slate-800" />
          </div>

          {/* Screen Container */}
          <div className="w-full h-full bg-slate-50 dark:bg-[#0f172a] rounded-[38px] overflow-hidden flex flex-col relative text-slate-900 dark:text-slate-100">
            
            {/* Status Bar */}
            <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-4 h-4" />
              </div>
            </div>

            {/* Back Bar */}
            <div className="px-4 py-2 flex items-center justify-between">
              <button
                onClick={() => setMobileScreen('feed')}
                className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold">Property Detail</span>
              <button className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Detail Scroll Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={selectedMobileProperty.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                  1 / {selectedMobileProperty.images.length}
                </span>
              </div>

              <div>
                <div className="text-xl font-black text-purple-600 dark:text-purple-400">
                  {selectedMobileProperty.priceDisplay}
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {selectedMobileProperty.title}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-purple-500" />
                  <span>{selectedMobileProperty.location.locality}, {selectedMobileProperty.location.city}</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-slate-200 dark:border-slate-800">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <div className="font-bold">{selectedMobileProperty.specs.areaSqFt}</div>
                  <div className="text-[10px] text-slate-400">sq.ft</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <div className="font-bold">{selectedMobileProperty.specs.bedrooms ?? '—'}</div>
                  <div className="text-[10px] text-slate-400">Beds</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <div className="font-bold">{selectedMobileProperty.specs.bathrooms ?? '—'}</div>
                  <div className="text-[10px] text-slate-400">Baths</div>
                </div>
              </div>

              {/* Agent snippet */}
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center gap-2.5">
                <img
                  src={selectedMobileProperty.agent.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs truncate">{selectedMobileProperty.agent.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{selectedMobileProperty.agent.agency}</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedMobileProperty.description}
              </div>
            </div>

            {/* Bottom Floating CTA Bar (Call & Enquire buttons as shown in reference) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <a
                href={`tel:${selectedMobileProperty.agent.phone}`}
                className="flex-1 py-2.5 rounded-xl border border-purple-600 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-purple-50 dark:hover:bg-purple-950/40"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <button
                onClick={() => alert(`Enquiry initiated for ${selectedMobileProperty.title}`)}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-purple-700"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

