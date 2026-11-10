import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { INITIAL_PROPERTIES, INITIAL_AGENTS, INITIAL_LEADS } from './data/mockData';
import { Property, Agent, EnquiryLead } from './types';
import { Navbar } from './components/Navbar';
import { BrandLogo } from './components/BrandLogo';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { MapView } from './components/MapView';
import { AgentDirectory } from './components/AgentDirectory';
import { AdminDashboard } from './components/AdminDashboard';
import { MobileAppSimulator } from './components/MobileAppSimulator';
import { EMICalculator } from './components/EMICalculator';
import { ProjectsView } from './components/ProjectsView';
import { CommercialView } from './components/CommercialView';
import { LocalityInsights } from './components/LocalityInsights';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PromoBanners, KeyFeaturesBar } from './components/PromoBanners';
import { PropertyComparisonModal } from './components/PropertyComparisonModal';
import { AuthModal } from './components/AuthModal';
import { 
  ScheduleVisitModal, 
  ListPropertyModal, 
  VirtualTourModal 
} from './components/Modals';
import { SavedPropertiesDrawer, AdvancedFilterModal } from './components/Drawers';
import { 
  ArrowRight, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  ArrowUpDown,
  LayoutGrid,
  List
} from 'lucide-react';

function RealEstateApp() {
  const { theme, themeConfig } = useTheme();

  // Primary Data State
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [leads, setLeads] = useState<EnquiryLead[]>(INITIAL_LEADS);
  const [savedIds, setSavedIds] = useState<string[]>(['prop-1']);
  const [comparingProperties, setComparingProperties] = useState<Property[]>([]);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string }>({ name: 'Sudhan', role: 'Buyer' });

  // Search, Filtering & Sorting State
  const [selectedCity, setSelectedCity] = useState<string>('Coimbatore');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [transactionMode, setTransactionMode] = useState<string>('buy');
  const [maxBudget, setMaxBudget] = useState<number>(30000000);
  const [selectedBHK, setSelectedBHK] = useState<string>('all');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');

  // Modals & Drawers State
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [scheduleProperty, setScheduleProperty] = useState<Property | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [virtualTourUrl, setVirtualTourUrl] = useState<string | null>(null);

  // Saved toggling
  const handleToggleSave = (propId: string) => {
    setSavedIds((prev) =>
      prev.includes(propId) ? prev.filter((id) => id !== propId) : [...prev, propId]
    );
  };

  // Compare toggling
  const handleToggleCompare = (property: Property) => {
    setComparingProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 properties side-by-side.');
        return prev;
      }
      return [...prev, property];
    });
  };

  // Adding new property
  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    alert(`Success! Listing "${newProp.title}" was submitted and is now published.`);
  };

  // Scheduling a visit
  const handleScheduleVisitSubmit = (visitData: any) => {
    const newLead: EnquiryLead = {
      id: `lead-${Date.now()}`,
      propertyTitle: visitData.propertyTitle,
      propertyId: visitData.propertyId,
      userName: visitData.name,
      userPhone: visitData.phone,
      userEmail: visitData.email,
      message: `Scheduled site visit on ${visitData.date} at ${visitData.timeSlot}`,
      visitDate: `${visitData.date}T${visitData.timeSlot}`,
      status: 'visit_scheduled',
      date: new Date().toISOString().split('T')[0],
      assignedAgent: 'Karthik Subramanian',
      budget: 'Verified Buyer'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  // Filtering properties
  const filteredProperties = properties.filter((prop) => {
    if (selectedCity !== 'All' && !prop.location.city.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    if (selectedType !== 'all' && prop.category !== selectedType) {
      return false;
    }
    if (currentTab === 'rent') {
      if (prop.transactionType !== 'rent') return false;
    } else if (currentTab === 'plots') {
      if (prop.category !== 'plot') return false;
    } else if (transactionMode && transactionMode !== 'all' && currentTab === 'home') {
      if (transactionMode === 'commercial' && prop.category !== 'commercial') return false;
      if (transactionMode === 'plots' && prop.category !== 'plot') return false;
      if ((transactionMode === 'buy' || transactionMode === 'rent') && prop.transactionType !== transactionMode) {
        // allow
      }
    }
    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      const match =
        prop.title.toLowerCase().includes(q) ||
        prop.location.locality.toLowerCase().includes(q) ||
        prop.location.address.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (prop.price > maxBudget) return false;
    if (selectedBHK !== 'all' && prop.specs.bedrooms !== Number(selectedBHK)) return false;
    if (onlyVerified && !prop.verified) return false;

    return true;
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'area-desc') return b.specs.areaSqFt - a.specs.areaSqFt;
    return 0; // featured default
  });

  const savedPropertyList = properties.filter((p) => savedIds.includes(p.id));

  return (
    <div className={`min-h-screen ${themeConfig.bgClass} ${themeConfig.textClass} flex flex-col transition-colors duration-300 pb-16 lg:pb-0`}>
      
      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        savedCount={savedIds.length}
        compareCount={comparingProperties.length}
        onOpenSavedModal={() => setIsSavedDrawerOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenListProperty={() => setIsListModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
      />

      {/* MAIN VIEW ROUTING */}
      <main className="flex-1">
        
        {/* HOMEPAGE VIEW */}
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onSearch={(keyword, mode, type) => {
                setSearchKeyword(keyword);
                setTransactionMode(mode);
                if (type) setSelectedType(type);
              }}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              onOpenAdvancedFilters={() => setIsFilterModalOpen(true)}
              onSelectPropertyId={(id) => {
                const found = properties.find((p) => p.id === id);
                if (found) setSelectedProperty(found);
              }}
            />

            {/* Featured Properties Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Featured Properties
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Handpicked listings for you across prime residential neighborhoods
                  </p>
                </div>

                {/* Sort & Filter Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent border-0 focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="area-desc">Area: Largest First</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSearchKeyword('');
                    }}
                    className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    style={{ color: themeConfig.primaryColor }}
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Property Card Grid with smooth animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {sortedProperties.slice(0, 6).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isSaved={savedIds.includes(property.id)}
                    isComparing={comparingProperties.some((p) => p.id === property.id)}
                    onToggleSave={handleToggleSave}
                    onToggleCompare={handleToggleCompare}
                    onSelect={(p) => setSelectedProperty(p)}
                    onOpenVirtualTour={(url) => setVirtualTourUrl(url)}
                  />
                ))}
              </div>

              {/* Promo Banners */}
              <PromoBanners
                onOpenListProperty={() => setIsListModalOpen(true)}
                onExploreMore={() => setCurrentTab('map')}
              />

              {/* Locality Market Intelligence */}
              <LocalityInsights 
                onSelectLocality={(loc) => {
                  setSearchKeyword(loc);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }} 
              />

              {/* Verified Customer Testimonials */}
              <TestimonialsSection />

              {/* Key Features Bar */}
              <KeyFeaturesBar />
            </section>
          </div>
        )}

        {/* RENTALS TAB VIEW */}
        {currentTab === 'rent' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold" style={{ color: themeConfig.primaryColor }}>
                Rental Marketplace
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1">Verified Rental Properties in Coimbatore</h1>
              <p className="text-sm text-slate-500 mt-1">Direct from owners & certified agents with zero brokerage on select homes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.filter((p) => p.transactionType === 'rent').map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSaved={savedIds.includes(property.id)}
                  isComparing={comparingProperties.some((p) => p.id === property.id)}
                  onToggleSave={handleToggleSave}
                  onToggleCompare={handleToggleCompare}
                  onSelect={(p) => setSelectedProperty(p)}
                  onOpenVirtualTour={(url) => setVirtualTourUrl(url)}
                />
              ))}
            </div>
          </div>
        )}

        {/* PLOTS & LAND TAB VIEW */}
        {currentTab === 'plots' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600">Land & Agro Estates</span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1">DTCP & RERA Approved Residential Plots</h1>
              <p className="text-sm text-slate-500 mt-1">High-yield gated communities, farm land, and mountain-view villas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.filter((p) => p.category === 'plot' || p.category === 'villa').map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSaved={savedIds.includes(property.id)}
                  isComparing={comparingProperties.some((p) => p.id === property.id)}
                  onToggleSave={handleToggleSave}
                  onToggleCompare={handleToggleCompare}
                  onSelect={(p) => setSelectedProperty(p)}
                  onOpenVirtualTour={(url) => setVirtualTourUrl(url)}
                />
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS VIEW */}
        {currentTab === 'projects' && (
          <ProjectsView />
        )}

        {/* COMMERCIAL SPACES VIEW */}
        {currentTab === 'commercial' && (
          <CommercialView
            properties={properties}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        )}

        {/* MAP VIEW */}
        {currentTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MapView
              properties={properties}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
            />
          </div>
        )}

        {/* AGENTS TAB VIEW */}
        {currentTab === 'agents' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AgentDirectory
              agents={agents}
              properties={properties}
              onOpenAgentContact={(agent) => {
                alert(`Direct channel opened with ${agent.name} (${agent.phone}). Messaging gateway connected.`);
              }}
              onFilterByAgent={(agentId) => {
                setCurrentTab('home');
              }}
            />
          </div>
        )}

        {/* EMI TOOL TAB VIEW */}
        {currentTab === 'calculator' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <EMICalculator defaultPrice={12500000} />
          </div>
        )}

        {/* ADMIN DASHBOARD TAB VIEW */}
        {currentTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminDashboard
              properties={properties}
              leads={leads}
              agents={agents}
            />
          </div>
        )}

        {/* MOBILE APP SIMULATOR TAB VIEW */}
        {currentTab === 'mobile' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MobileAppSimulator properties={properties} />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3">
              <BrandLogo size="md" />
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                Next-generation verified property marketplace connecting buyers, owners, and top certified brokers across India.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>TN RERA Registration # TN/RERA/2026/0412</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-slate-900 dark:text-slate-100">
                Explore Properties
              </h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><button onClick={() => setCurrentTab('home')} className="hover:underline">Villas in Saravanampatti</button></li>
                <li><button onClick={() => setCurrentTab('home')} className="hover:underline">Apartments in Peelamedu</button></li>
                <li><button onClick={() => setCurrentTab('plots')} className="hover:underline">Villa Plots in Karamadai</button></li>
                <li><button onClick={() => setCurrentTab('home')} className="hover:underline">Penthouses in Race Course</button></li>
                <li><button onClick={() => setCurrentTab('rent')} className="hover:underline">IT Corridor Rental Flats</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-slate-900 dark:text-slate-100">
                Platform & Tools
              </h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li><button onClick={() => setCurrentTab('map')} className="hover:underline">Interactive Map Search</button></li>
                <li><button onClick={() => setCurrentTab('calculator')} className="hover:underline">Home Loan EMI Calculator</button></li>
                <li><button onClick={() => setCurrentTab('agents')} className="hover:underline">Certified Agent Directory</button></li>
                <li><button onClick={() => setCurrentTab('admin')} className="hover:underline">Admin Operations Dashboard</button></li>
                <li><button onClick={() => setCurrentTab('mobile')} className="hover:underline">Mobile App UI Showcase</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-slate-900 dark:text-slate-100">
                Customer Support
              </h4>
              <div className="space-y-2.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" style={{ color: themeConfig.primaryColor }} />
                  <span>+91 98421 88421 (Toll Free)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" style={{ color: themeConfig.primaryColor }} />
                  <span>support@realestate.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" style={{ color: themeConfig.primaryColor }} />
                  <span>Avinashi Road, Peelamedu, Coimbatore</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              © 2026 RealEstate Platform. Themed in <strong>{themeConfig.name}</strong>.
            </div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>RERA Compliance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isSaved={savedIds.includes(selectedProperty.id)}
          onToggleSave={handleToggleSave}
          onOpenScheduleVisit={(p) => setScheduleProperty(p)}
          onOpenContactAgent={(p) => {
            alert(`Direct enquiry sent to ${p.agent.name} for ${p.title}.`);
          }}
        />
      )}

      {scheduleProperty && (
        <ScheduleVisitModal
          property={scheduleProperty}
          onClose={() => setScheduleProperty(null)}
          onSubmit={handleScheduleVisitSubmit}
        />
      )}

      {isListModalOpen && (
        <ListPropertyModal
          onClose={() => setIsListModalOpen(false)}
          onAddProperty={handleAddProperty}
        />
      )}

      {virtualTourUrl && (
        <VirtualTourModal
          url={virtualTourUrl}
          onClose={() => setVirtualTourUrl(null)}
        />
      )}

      <SavedPropertiesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProperties={savedPropertyList}
        onRemoveSaved={handleToggleSave}
        onSelectProperty={(p) => setSelectedProperty(p)}
      />

      <PropertyComparisonModal
        properties={comparingProperties}
        onClose={() => setIsCompareModalOpen(false)}
        onRemove={(id) => setComparingProperties((prev) => prev.filter((p) => p.id !== id))}
        onSelectProperty={(p) => setSelectedProperty(p)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(name, role) => {
          setCurrentUser({ name, role });
          setIsLoggedIn(true);
        }}
      />

      <AdvancedFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        selectedBHK={selectedBHK}
        setSelectedBHK={setSelectedBHK}
        onlyVerified={onlyVerified}
        setOnlyVerified={setOnlyVerified}
        onReset={() => {
          setMaxBudget(30000000);
          setSelectedBHK('all');
          setOnlyVerified(false);
          setSelectedCity('Coimbatore');
          setSelectedType('all');
          setSearchKeyword('');
        }}
      />

    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <RealEstateApp />
    </ThemeProvider>
  );
}

export default App;
