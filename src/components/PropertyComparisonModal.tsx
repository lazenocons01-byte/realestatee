import React from 'react';
import { Property } from '../types';
import { useTheme } from '../context/ThemeContext';
import { X, Check, Minus, Bed, Bath, Maximize2, ShieldCheck, MapPin } from 'lucide-react';

interface PropertyComparisonModalProps {
  properties: Property[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  properties,
  onClose,
  onRemove,
  onSelectProperty
}) => {
  const { theme, themeConfig } = useTheme();

  if (properties.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className={`w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative transition-all my-8 ${
        themeConfig.isDark 
          ? 'bg-[#150a0f] text-rose-50 border border-rose-900/40' 
          : 'bg-white text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-purple-600 dark:text-purple-400">
              Side-by-Side Comparison
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5">
              Compare Properties ({properties.length} Selected)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="p-3 w-44 font-bold text-slate-400 uppercase text-[10px]">Property</th>
                {properties.map((prop) => (
                  <th key={prop.id} className="p-3 min-w-[220px]">
                    <div className="relative group">
                      <button
                        onClick={() => onRemove(prop.id)}
                        className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full shadow-md hover:bg-rose-600"
                        title="Remove from comparison"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <img
                        src={prop.images[0]}
                        alt=""
                        className="w-full h-28 object-cover rounded-xl mb-2"
                      />
                      <div className="text-base font-extrabold text-purple-600 dark:text-purple-400">
                        {prop.priceDisplay}
                      </div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {prop.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-purple-500" />
                        <span>{prop.location.locality}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-bold text-slate-500">Transaction Type</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-semibold capitalize">{p.transactionType}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Category</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-semibold capitalize">{p.category}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Super Built-up Area</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-bold">{p.specs.areaSqFt.toLocaleString()} sq.ft</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Bedrooms & Baths</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-semibold">
                    {p.specs.bedrooms ? `${p.specs.bedrooms} Beds, ${p.specs.bathrooms} Baths` : 'Plot Layout'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Price / sq.ft</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-medium text-slate-600 dark:text-slate-300">
                    {p.pricePerSqFt || '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Furnishing</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-semibold">{p.specs.furnishing || 'Unfurnished'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Facing Direction</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3 font-semibold">{p.specs.facing || 'East'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">RERA Verified</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.verified ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Yes (100% Legal)
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Minus className="w-4 h-4" /> Pending
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Action</td>
                {properties.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      onClick={() => {
                        onSelectProperty(p);
                        onClose();
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-bold ${themeConfig.primaryBtnClass}`}
                    >
                      View Full Details
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
