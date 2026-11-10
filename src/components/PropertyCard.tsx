import React from 'react';
import { Property } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  Flame, 
  Sparkles, 
  CheckCircle,
  Eye,
  Scale
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  isComparing?: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare?: (property: Property) => void;
  onSelect: (property: Property) => void;
  onOpenVirtualTour?: (url: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  isComparing = false,
  onToggleSave,
  onToggleCompare,
  onSelect,
  onOpenVirtualTour
}) => {
  const { theme, themeConfig } = useTheme();

  // Tag color styling based on badge type
  const getTagBadge = () => {
    switch (property.tag) {
      case 'Featured':
        return 'text-white shadow-sm';
      case 'New':
        return 'bg-emerald-600 text-white';
      case 'Hot Deal':
        return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center gap-1';
      case 'Luxury Choice':
        return 'bg-gradient-to-r from-amber-600 to-rose-700 text-white flex items-center gap-1';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  return (
    <div 
      className="group rounded-3xl overflow-hidden border border-[#E8E2D8] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-300 cursor-pointer flex flex-col justify-between shadow-soft"
      onClick={() => onSelect(property)}
    >
      <div>
        {/* Property Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />

          {/* Gradient Shadow on Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 opacity-70 group-hover:opacity-50 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {property.tag && (
              <span 
                className={`px-2.5 py-1 text-xs font-bold rounded-xl shadow-md ${getTagBadge()}`}
                style={{
                  backgroundColor: property.tag === 'Featured' ? themeConfig.primaryColor : undefined
                }}
              >
                {property.tag === 'Hot Deal' && <Flame className="w-3.5 h-3.5 inline mr-0.5 animate-bounce-subtle" />}
                {property.tag === 'Luxury Choice' && <Sparkles className="w-3.5 h-3.5 inline mr-0.5 animate-pulse" />}
                {property.tag}
              </span>
            )}
            {property.verified && (
              <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 p-1.5 rounded-xl text-[10px] font-bold flex items-center gap-0.5 shadow-md">
                <CheckCircle className="w-3 h-3 fill-current" />
              </span>
            )}
          </div>

          {/* Top Right Action Buttons (Save & Compare) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(property);
                }}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  isComparing
                    ? 'bg-purple-600 text-white shadow-md scale-105'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-purple-600 shadow-sm'
                }`}
                title={isComparing ? 'Remove from comparison' : 'Compare property'}
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 transform active:scale-90 ${
                isSaved 
                  ? 'bg-rose-500 text-white shadow-md scale-105' 
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-rose-500 shadow-sm'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save property'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Virtual Tour indicator if available */}
          {property.virtualTourUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenVirtualTour?.(property.virtualTourUrl!);
              }}
              className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>360° Tour</span>
            </button>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          
          {/* Price */}
          <div className="flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
              {property.priceDisplay}
            </div>
            {property.pricePerSqFt && (
              <div className="text-xs text-slate-400 font-medium">
                {property.pricePerSqFt}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 
            className="font-bold text-slate-800 dark:text-slate-100 text-base mt-1 line-clamp-1 group-hover:underline transition-colors"
          >
            {property.specs.bedrooms ? `${property.specs.bedrooms} BHK ${property.category === 'apartment' ? 'Apartment' : 'Villa'}` : property.title}
          </h3>

          {/* Locality */}
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: themeConfig.primaryColor }} />
            <span className="truncate">{property.location.locality}, {property.location.city}</span>
          </div>

          {/* Specs Row */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            
            {/* Area */}
            <div className="flex items-center gap-1 font-semibold" title="Built-up Area">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.specs.areaSqFt.toLocaleString()} sq.ft</span>
            </div>

            {/* Bedrooms */}
            <div className="flex items-center gap-1 font-semibold" title="Bedrooms">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.specs.bedrooms ?? '—'}</span>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center gap-1 font-semibold" title="Bathrooms">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.specs.bathrooms ?? '—'}</span>
            </div>

            {/* Parking */}
            <div className="flex items-center gap-1 font-semibold" title="Parking Spaces">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.specs.parking ?? '—'}</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
