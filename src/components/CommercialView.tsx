import React from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { useTheme } from '../context/ThemeContext';
import { Building2, Briefcase, ShieldCheck, CheckCircle } from 'lucide-react';

interface CommercialViewProps {
  properties: Property[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const CommercialView: React.FC<CommercialViewProps> = ({
  properties,
  savedIds,
  onToggleSave,
  onSelectProperty
}) => {
  const { theme, themeConfig } = useTheme();
  const commercialProps = properties.filter((p) => p.category === 'commercial');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400">
            Commercial Real Estate
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
            Grade-A Corporate Offices & Retail Spaces
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mt-1">
            Plug-and-play IT workstations, high-street retail showrooms, and industrial warehouses in Coimbatore's prime business districts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800">
          <Briefcase className="w-4 h-4" />
          <span>Lease & Outright Purchase Available</span>
        </div>
      </div>

      {/* Commercial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commercialProps.map((prop) => (
          <PropertyCard
            key={prop.id}
            property={prop}
            isSaved={savedIds.includes(prop.id)}
            onToggleSave={onToggleSave}
            onSelect={onSelectProperty}
          />
        ))}
      </div>

    </div>
  );
};

