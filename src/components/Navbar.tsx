import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from './BrandLogo';
import { 
  Home, 
  Heart, 
  PlusCircle, 
  MapPin, 
  Calculator, 
  Users, 
  Bell, 
  Search, 
  Menu, 
  X,
  CheckCircle2,
  Building2,
  Briefcase,
  Layers,
  Scale,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  savedCount: number;
  compareCount: number;
  onOpenSavedModal: () => void;
  onOpenCompareModal: () => void;
  onOpenListProperty: () => void;
  onOpenAuthModal: () => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  savedCount,
  compareCount,
  onOpenSavedModal,
  onOpenCompareModal,
  onOpenListProperty,
  onOpenAuthModal,
  isLoggedIn,
  onToggleLogin
}) => {
  const { theme, themeConfig } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Price Drop Alert', desc: '3 BHK in Peelamedu dropped by ₹2 Lakhs', time: '10m ago' },
    { id: 2, title: 'New Luxury Villa Listed', desc: '4 BHK in Saravanampatti with private pool', time: '1h ago' },
    { id: 3, title: 'Visit Confirmed', desc: 'Site visit for Emerald Villa approved for Sat 11 AM', time: '3h ago' }
  ];

  return (
    <>
      {/* Top Main Header */}
      <header className={`sticky top-0 z-40 ${themeConfig.headerBg} transition-colors duration-300 border-b`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo Component */}
            <div onClick={() => setCurrentTab('home')}>
              <BrandLogo size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Buy' },
                { id: 'rent', label: 'Rent' },
                { id: 'plots', label: 'Plots' },
                { id: 'projects', label: 'Projects' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'map', label: 'Map Search', icon: MapPin },
                { id: 'agents', label: 'Agents', icon: Users },
                { id: 'calculator', label: 'EMI Tool', icon: Calculator }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-50 text-[#0D9488] border border-teal-200/80 font-bold shadow-xs scale-105'
                        : 'text-stone-700 hover:opacity-75 hover:bg-[#F5F0E8]'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              
              {/* Compare Button if items are being compared */}
              {compareCount > 0 && (
                <button
                  onClick={onOpenCompareModal}
                  className="px-2.5 py-1.5 rounded-xl border border-teal-200 bg-teal-50 text-[#0D9488] text-[11px] font-bold flex items-center gap-1 animate-pulse-glow"
                  title="Compare Selected Properties"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compare</span>
                  <span>({compareCount})</span>
                </button>
              )}

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 sm:p-2.5 rounded-full relative transition-colors hover:bg-[#F5F0E8] text-stone-700"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#0D9488] rounded-full ring-2 ring-white animate-pulse"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl shadow-2xl border border-[#E8E2D8] bg-white py-3 z-50 animate-fade-scale text-stone-800">
                    <div className="px-4 pb-2 border-b border-[#E8E2D8] flex items-center justify-between">
                      <span className="font-bold text-xs">Live Alerts (3)</span>
                      <span className="text-[11px] font-semibold cursor-pointer hover:underline text-[#0D9488]">
                        Mark all read
                      </span>
                    </div>
                    <div className="divide-y divide-[#E8E2D8] max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-[#FBF9F5] cursor-pointer text-xs transition-colors">
                          <div className="font-bold text-stone-900">{n.title}</div>
                          <div className="text-stone-500 mt-0.5 text-[11px]">{n.desc}</div>
                          <div className="text-[10px] text-stone-400 mt-1">{n.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Saved Heart Button with Badge */}
              <button
                onClick={onOpenSavedModal}
                className="p-2 sm:p-2.5 rounded-full relative transition-all duration-200 hover:scale-105 hover:bg-[#F5F0E8] text-stone-700"
                title="Saved Properties"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {savedCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce-subtle bg-[#0D9488]"
                  >
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Login / User Status */}
              <button
                onClick={onOpenAuthModal}
                className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#E8E2D8] text-stone-700 hover:bg-[#F5F0E8] transition-all hover:scale-105"
              >
                {isLoggedIn ? 'Sign Out' : 'Login'}
              </button>

              {/* List Property CTA */}
              <button
                onClick={onOpenListProperty}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 ${themeConfig.primaryBtnClass}`}
              >
                <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">List Property</span>
                <span className="xs:hidden">List</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer Menu (Responsive & Touch-Friendly) */}
        {mobileMenuOpen && (
          <div className={`lg:hidden px-4 pt-2 pb-6 border-b ${themeConfig.cardClass} animate-fade-scale shadow-xl`}>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                { id: 'home', label: 'Buy Homes', icon: Home },
                { id: 'rent', label: 'Rentals', icon: Building2 },
                { id: 'plots', label: 'Plots & Land', icon: Layers },
                { id: 'projects', label: 'New Projects', icon: Building2 },
                { id: 'commercial', label: 'Commercial', icon: Briefcase },
                { id: 'map', label: 'Map Search', icon: MapPin },
                { id: 'agents', label: 'Agent Directory', icon: Users },
                { id: 'calculator', label: 'EMI Calculator', icon: Calculator }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold text-left transition-all ${
                      isActive
                        ? `${themeConfig.accentBadgeClass} shadow-sm`
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 bg-slate-50 dark:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-75" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                {isLoggedIn ? 'Signed in as Verified Member' : 'Sign In / Register'}
              </button>
              <button
                onClick={() => {
                  onOpenListProperty();
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${themeConfig.primaryBtnClass}`}
              >
                + Post Listing
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modern Sticky Bottom Mobile Navigation Bar for High Responsiveness on Phone Screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-3 flex items-center justify-around shadow-2xl safe-area-pb">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentTab === 'home' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
          style={{ color: currentTab === 'home' ? themeConfig.primaryColor : undefined }}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentTab('map')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentTab === 'map' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
          style={{ color: currentTab === 'map' ? themeConfig.primaryColor : undefined }}
        >
          <MapPin className="w-5 h-5" />
          <span>Map</span>
        </button>

        <button
          onClick={onOpenListProperty}
          className="flex flex-col items-center -mt-5"
        >
          <div 
            className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
            style={{ backgroundColor: themeConfig.primaryColor }}
          >
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 mt-0.5">List</span>
        </button>

        <button
          onClick={() => setCurrentTab('calculator')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentTab === 'calculator' ? 'font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
          style={{ color: currentTab === 'calculator' ? themeConfig.primaryColor : undefined }}
        >
          <Calculator className="w-5 h-5" />
          <span>EMI</span>
        </button>

        <button
          onClick={onOpenSavedModal}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 relative"
        >
          <Heart className="w-5 h-5" />
          <span>Saved</span>
          {savedCount > 0 && (
            <span 
              className="absolute -top-1 right-2 w-3.5 h-3.5 text-white text-[8px] font-bold rounded-full flex items-center justify-center"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
