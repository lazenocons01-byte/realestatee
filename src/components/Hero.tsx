import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Search, 
  MapPin, 
  Building, 
  Home as HomeIcon, 
  Layers, 
  SlidersHorizontal, 
  ShieldCheck, 
  Users2, 
  TrendingUp, 
  Sparkles,
  ChevronDown,
  Compass,
  ArrowRight
} from 'lucide-react';

interface HeroProps {
  onSearch: (searchTerm: string, mode: string, type: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  onOpenAdvancedFilters: () => void;
  onSelectPropertyId: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  onOpenAdvancedFilters,
  onSelectPropertyId
}) => {
  const { theme, themeConfig } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionType, setTransactionType] = useState('buy');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, transactionType, selectedType);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 transition-colors">
      {/* Dynamic Animated Ambient Background Orbs */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 opacity-20 animate-pulse-glow transition-all duration-700"
        style={{ backgroundColor: themeConfig.primaryColor }}
      />
      <div 
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 opacity-20 animate-float-delayed transition-all duration-700"
        style={{ backgroundColor: themeConfig.secondaryColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline and Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Tag with subtle animation */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-sm transition-all bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 animate-fade-scale">
              <span 
                className="w-2 h-2 rounded-full animate-ping inline-block"
                style={{ backgroundColor: themeConfig.primaryColor }}
              />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Find • Buy • Rent • Invest</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span 
                className="font-bold flex items-center gap-1"
                style={{ color: themeConfig.primaryColor }}
              >
                <Sparkles className="w-3 h-3" /> {themeConfig.name}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-stone-900">
              Find Your Dream <br className="hidden sm:block" />
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500"
                style={{
                  backgroundImage: `linear-gradient(to right, ${themeConfig.primaryColor}, ${themeConfig.secondaryColor})`
                }}
              >
                Property
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              Explore verified homes, apartments, plots and commercial spaces with 100% legal clarity, verified title checks, & 360° virtual tours.
            </p>

            {/* Floating Search Console with interactive animation */}
            <div className="p-2 sm:p-2.5 rounded-2xl shadow-xl border border-[#E8E2D8] bg-white/95 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                
                {/* Mode Selector (Buy / Rent / Commercial / Plots) */}
                <div className="relative w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-[#F5F0E8] text-sm font-semibold text-stone-800 hover:bg-[#EADFC9]/60 transition-colors"
                  >
                    <span className="capitalize">{transactionType}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 z-30 animate-fade-scale">
                      {['buy', 'rent', 'commercial', 'plots'].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => {
                            setTransactionType(mode);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-semibold capitalize hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                            transactionType === mode ? 'font-bold' : ''
                          }`}
                          style={{ color: transactionType === mode ? themeConfig.primaryColor : undefined }}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Text Input */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, project or property ID..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  />
                </div>

                {/* Search Action Button with subtle pulse */}
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 hover:shadow-lg ${themeConfig.primaryBtnClass}`}
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* Quick Filter Badges (Smooth scrollable on mobile) */}
            <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mx-1 px-1">
              <button
                type="button"
                onClick={() => setSelectedCity(selectedCity === 'Coimbatore' ? 'All' : 'Coimbatore')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 transform hover:scale-105 ${
                  selectedCity === 'Coimbatore'
                    ? themeConfig.accentBadgeClass + ' font-semibold shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: themeConfig.primaryColor }} />
                <span>Coimbatore</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType(selectedType === 'apartment' ? 'all' : 'apartment')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 transform hover:scale-105 ${
                  selectedType === 'apartment'
                    ? themeConfig.accentBadgeClass + ' font-semibold shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Apartment</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType(selectedType === 'villa' ? 'all' : 'villa')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 transform hover:scale-105 ${
                  selectedType === 'villa'
                    ? themeConfig.accentBadgeClass + ' font-semibold shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Villa</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType(selectedType === 'plot' ? 'all' : 'plot')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 transform hover:scale-105 ${
                  selectedType === 'plot'
                    ? themeConfig.accentBadgeClass + ' font-semibold shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Plot</span>
              </button>

              <button
                type="button"
                onClick={onOpenAdvancedFilters}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition-colors ml-auto sm:ml-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>More Filters</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with subtle float animation */}
          <div className="lg:col-span-5 relative">
            
            {/* Animated Floating Pill on Top Left */}
            <div className="absolute -top-3 -left-3 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 animate-float">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% RERA Verified</span>
            </div>

            {/* Animated Floating Pill on Bottom Right */}
            <div className="absolute -bottom-3 -right-3 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 animate-float-delayed">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Site Visits Available Today</span>
            </div>

            {/* Main Villa Card */}
            <div 
              onClick={() => onSelectPropertyId('prop-1')}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="4 BHK Luxury Modern Villa with Pool"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span 
                  className="px-3 py-1 text-white font-semibold text-xs rounded-full shadow-md backdrop-blur-md"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                >
                  ★ Featured Collection
                </span>
                <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md text-white font-medium text-xs rounded-full flex items-center gap-1 shadow-md">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>

              {/* Property Details Footer on Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-2xl font-bold tracking-tight">₹1.25 Crore</div>
                <div className="text-sm font-semibold text-slate-200">4 BHK Contemporary Villa with Pool</div>
                <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-400" /> Saravanampatti, Coimbatore
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-300 mt-2.5 pt-2 border-t border-white/20">
                  <span>2,850 sq.ft</span>
                  <span>•</span>
                  <span>4 Beds</span>
                  <span>•</span>
                  <span>4 Baths</span>
                  <span className="ml-auto font-semibold group-hover:underline flex items-center gap-1 text-amber-300">
                    Explore Listing <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row with hover elevate animation */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex items-center gap-3.5 justify-center md:justify-start group transition-transform duration-300 hover:translate-x-1">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${themeConfig.primaryColor}18`, color: themeConfig.primaryColor }}
              >
                <HomeIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">25,000+</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Verified Properties</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start group transition-transform duration-300 hover:translate-x-1">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${themeConfig.secondaryColor}18`, color: themeConfig.secondaryColor }}
              >
                <Users2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">2,500+</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Trusted Agents</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start group transition-transform duration-300 hover:translate-x-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">100%</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Verified Listings</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center md:justify-start group transition-transform duration-300 hover:translate-x-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">15+</div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Cities Covered</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
