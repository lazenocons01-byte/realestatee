import React from 'react';
import { Property } from '../types';
import { useTheme } from '../context/ThemeContext';
import { X, Trash2, Heart, ArrowRight, SlidersHorizontal, Check } from 'lucide-react';

interface SavedPropertiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveSaved: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const SavedPropertiesDrawer: React.FC<SavedPropertiesDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveSaved,
  onSelectProperty
}) => {
  const { theme, themeConfig } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className={`w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto transition-all ${
        themeConfig.isDark ? 'bg-[#150a0f] text-rose-50 border-l border-rose-900/40' : 'bg-white text-slate-900'
      }`}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h3 className="font-extrabold text-lg">Saved Properties ({savedProperties.length})</h3>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-3">
            {savedProperties.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <Heart className="w-12 h-12 mx-auto stroke-1" />
                <p className="text-sm font-semibold">No saved properties yet</p>
                <p className="text-xs">Click the heart icon on any listing card to bookmark it for later.</p>
              </div>
            ) : (
              savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-3 hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => {
                    onSelectProperty(prop);
                    onClose();
                  }}
                >
                  <img src={prop.images[0]} alt="" className="w-20 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-sm text-purple-600 dark:text-purple-400">
                      {prop.priceDisplay}
                    </div>
                    <div className="font-bold text-xs truncate text-slate-900 dark:text-slate-100">
                      {prop.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {prop.location.locality}, {prop.location.city}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSaved(prop.id);
                    }}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-lg"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {savedProperties.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl font-bold text-xs ${themeConfig.primaryBtnClass}`}
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxBudget: number;
  setMaxBudget: (val: number) => void;
  selectedBHK: string;
  setSelectedBHK: (val: string) => void;
  onlyVerified: boolean;
  setOnlyVerified: (val: boolean) => void;
  onReset: () => void;
}

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  isOpen,
  onClose,
  maxBudget,
  setMaxBudget,
  selectedBHK,
  setSelectedBHK,
  onlyVerified,
  setOnlyVerified,
  onReset
}) => {
  const { theme, themeConfig } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative ${
        themeConfig.isDark ? 'bg-[#150a0f] text-rose-50 border border-rose-900/40' : 'bg-white text-slate-900'
      }`}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-purple-600" />
            <h3 className="font-extrabold text-lg">Advanced Property Filters</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          {/* Budget Range */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span>Maximum Budget</span>
              <span className="text-purple-600 font-bold">
                {maxBudget >= 10000000 ? `₹${(maxBudget / 10000000).toFixed(2)} Cr` : `₹${(maxBudget / 100000).toFixed(0)} Lakhs`}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={30000000}
              step={500000}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹10 Lakhs</span>
              <span>₹1.5 Cr</span>
              <span>₹3.0 Cr+</span>
            </div>
          </div>

          {/* Bedrooms BHK */}
          <div>
            <label className="block text-xs font-semibold mb-2">Bedrooms (BHK)</label>
            <div className="grid grid-cols-5 gap-2">
              {['all', '1', '2', '3', '4'].map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => setSelectedBHK(bhk)}
                  className={`py-2 text-xs rounded-xl font-bold border transition-colors ${
                    selectedBHK === bhk
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {bhk === 'all' ? 'Any' : `${bhk} BHK`}
                </button>
              ))}
            </div>
          </div>

          {/* Verified listings only toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="font-bold text-xs">Only Verified RERA Listings</div>
              <div className="text-[11px] text-slate-400">Filter properties with 100% verified legal papers</div>
            </div>
            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`w-10 h-6 rounded-full transition-colors relative p-1 ${
                onlyVerified ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  onlyVerified ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <button
            onClick={onReset}
            className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className={`w-2/3 py-2.5 rounded-xl font-bold text-xs ${themeConfig.primaryBtnClass}`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

