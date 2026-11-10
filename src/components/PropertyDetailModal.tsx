import React, { useState } from 'react';
import { Property } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  Compass, 
  Check, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  Layers, 
  ChevronRight,
  Eye,
  Building2,
  Clock
} from 'lucide-react';
import { EMICalculator } from './EMICalculator';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenScheduleVisit: (property: Property) => void;
  onOpenContactAgent: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onOpenScheduleVisit,
  onOpenContactAgent
}) => {
  const { theme, themeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'floorplan' | 'location' | 'emi'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [floorPlanMode, setFloorPlanMode] = useState<'2d' | '3d'>('2d');

  const areaInCents = (property.specs.areaSqFt / 435.6).toFixed(2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-2 sm:p-4">
      <div className={`relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl transition-all my-8 ${
        themeConfig.isDark 
          ? 'bg-[#150a0f] text-rose-50 border border-rose-900/40' 
          : 'bg-white text-slate-900'
      }`}>

        {/* Top Header Bar */}
        <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${
          themeConfig.isDark ? 'border-rose-900/30 bg-[#1c0c14]' : 'border-slate-100 bg-white'
        }`}>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to listings</span>
          </button>

          <div className="flex items-center gap-2">
            {showShareNotification && (
              <span className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full animate-fade-in font-medium">
                Link copied to clipboard!
              </span>
            )}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved 
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md' 
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Save Property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Body Grid */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Title, Location & Price Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${themeConfig.accentBadgeClass}`}>
                  {property.category} • For {property.transactionType}
                </span>
                {property.verified && (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Verified RERA Listing
                  </span>
                )}
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                themeConfig.isDark ? 'luxury-font text-rose-200' : 'text-slate-900 dark:text-slate-100'
              }`}>
                {property.specs.bedrooms ? `${property.specs.bedrooms} BHK ${property.category === 'apartment' ? 'Apartment' : 'Villa'}` : property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <MapPin className="w-4 h-4" style={{ color: themeConfig.primaryColor }} />
                <span>{property.location.address}</span>
              </div>
            </div>

            {/* Price & Action CTAs */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div>
                <div className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  themeConfig.isDark ? 'luxury-font text-rose-300' : 'text-slate-950 dark:text-slate-50'
                }`}>
                  {property.priceDisplay}
                </div>
                {property.pricePerSqFt && (
                  <div className="text-xs text-slate-400 font-medium md:text-right">
                    {property.pricePerSqFt}
                  </div>
                )}
              </div>

              {/* Action Buttons matching reference image */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => onOpenContactAgent(property)}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${themeConfig.primaryBtnClass}`}
                >
                  Contact Agent
                </button>
                <button
                  onClick={() => onOpenScheduleVisit(property)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>

          {/* Spec Badges Row (as in reference mockup: 4 Baths, 2,850 sq.ft, 2 Parking) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {property.specs.bedrooms && (
              <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <Bed className="w-5 h-5 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                <div className="text-sm font-bold">{property.specs.bedrooms} Beds</div>
                <div className="text-[11px] text-slate-400">Bedrooms</div>
              </div>
            )}
            {property.specs.bathrooms && (
              <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <Bath className="w-5 h-5 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                <div className="text-sm font-bold">{property.specs.bathrooms} Baths</div>
                <div className="text-[11px] text-slate-400">Bathrooms</div>
              </div>
            )}
            <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <Maximize2 className="w-5 h-5 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
              <div className="text-sm font-bold">{property.specs.areaSqFt.toLocaleString()} sq.ft</div>
              <div className="text-[11px] text-slate-400">Super Built-up</div>
            </div>
            {property.specs.parking && (
              <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <Car className="w-5 h-5 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                <div className="text-sm font-bold">{property.specs.parking} Covered</div>
                <div className="text-[11px] text-slate-400">Car Parking</div>
              </div>
            )}
            {property.specs.facing && (
              <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <Compass className="w-5 h-5 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                <div className="text-sm font-bold">{property.specs.facing}</div>
                <div className="text-[11px] text-slate-400">Facing Direction</div>
              </div>
            )}
            {property.specs.furnishing && (
              <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <Building2 className="w-5 h-5 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                <div className="text-sm font-bold">{property.specs.furnishing}</div>
                <div className="text-[11px] text-slate-400">Furnishing</div>
              </div>
            )}
          </div>

          {/* Interactive Image Gallery with Main View & Thumbnail Row */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={property.images[selectedImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <span>Photo {selectedImageIndex + 1} of {property.images.length}</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-16 sm:w-24 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-purple-600 scale-95 ring-2 ring-purple-300' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Navigation (as shown in reference mockup: Overview, Amenities, Floor Plan, Location, EMI Calculator) */}
          <div className="border-b border-slate-200 dark:border-slate-800 flex gap-4 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'amenities', label: 'Amenities' },
              { id: 'floorplan', label: 'Floor Plan' },
              { id: 'location', label: 'Location' },
              { id: 'emi', label: 'EMI Calculator' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="py-2">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-bold text-lg">Property Description</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {property.description}
                  </p>

                  <h3 className="font-bold text-lg pt-2">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-medium">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assigned Agent Box */}
                <div className={`p-5 rounded-2xl border ${
                  themeConfig.isDark ? 'bg-[#220f18] border-rose-900/40' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">Listed By Verified Agent</div>
                  <div className="flex items-center gap-3">
                    <img src={property.agent.avatar} alt={property.agent.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                    <div>
                      <div className="font-bold text-sm">{property.agent.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{property.agent.role}</div>
                      <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{property.agent.agency}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs py-3 my-3 border-y border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{property.agent.rating} ★</span> Rating
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{property.agent.reviewsCount}</span> Reviews
                    </div>
                    <div>
                      <span className="font-bold text-emerald-600">Verified</span> ID
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onOpenContactAgent(property)}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send Instant Enquiry</span>
                    </button>
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors block text-center"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call {property.agent.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Society & Building Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Floor Plan Tab */}
            {activeTab === 'floorplan' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Architectural Blueprint & Floor Layout</h3>
                  <span className="text-xs text-slate-500">2D Layout Plan • Vastu Compliant</span>
                </div>
                <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                  <Layers className="w-16 h-16 text-purple-600/70 mb-3" />
                  <div className="text-base font-bold">Standard 4 BHK Master Floor Blueprint</div>
                  <div className="text-xs text-slate-500 max-w-md mt-1">
                    Features Ground Level double car garage, grand foyer, living and open modular dining, first floor 3 ensuite suites, and open terrace lounge.
                  </div>
                  <button className="mt-4 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 hover:bg-slate-800">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download CAD / PDF Blueprint</span>
                  </button>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Location & Landmark Distances</h3>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>{property.location.address}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-slate-100">Airport</div>
                      <div>12 Mins (Coimbatore Intl)</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-slate-100">Tech Park</div>
                      <div>3 Mins (CHIL SEZ IT Park)</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="font-bold text-slate-900 dark:text-slate-100">Healthcare</div>
                      <div>5 Mins (KMCH & Royal Care)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EMI Calculator Tab */}
            {activeTab === 'emi' && (
              <div>
                <EMICalculator defaultPrice={property.price} />
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

