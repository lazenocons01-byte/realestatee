import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  TrendingUp, 
  MapPin, 
  Building, 
  Car, 
  GraduationCap, 
  Stethoscope, 
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export const LocalityInsights: React.FC<{ onSelectLocality?: (loc: string) => void }> = ({ onSelectLocality }) => {
  const { theme, themeConfig } = useTheme();
  const [selectedLocalityIndex, setSelectedLocalityIndex] = useState(0);

  const localities = [
    {
      name: 'Saravanampatti',
      tag: 'IT & Tech Corridor',
      avgPrice: '₹4,450 / sq.ft',
      growth: '+14.2% YoY',
      rentalYield: '5.2% p.a.',
      livabilityScore: '9.4 / 10',
      description: 'The Silicon Valley of Western Tamil Nadu. Home to CHIL SEZ, major global tech employers, engineering colleges, and gated luxury villa townships.',
      amenities: [
        { icon: Building, label: '3 IT SEZ Parks (Cognizant, Bosch, HCL)' },
        { icon: GraduationCap, label: 'Kumaraguru & SNS Institutions' },
        { icon: Stethoscope, label: 'VGM & Sri Ramakrishna Hospitals' },
        { icon: Car, label: '15 Mins to Coimbatore Airport' }
      ]
    },
    {
      name: 'Peelamedu & Avinashi Rd',
      tag: 'Central Commercial & Education Hub',
      avgPrice: '₹6,800 / sq.ft',
      growth: '+11.8% YoY',
      rentalYield: '4.8% p.a.',
      livabilityScore: '9.6 / 10',
      description: 'The arterial growth spine connecting Coimbatore International Airport, PSG Tech institutes, Fun Republic Mall, and multi-speciality medical centers.',
      amenities: [
        { icon: GraduationCap, label: 'PSG Tech, GRD & Coimbatore Medical College' },
        { icon: Stethoscope, label: 'KMCH & Royal Care Super Speciality' },
        { icon: Building, label: 'Fun Republic Mall & Retail Showrooms' },
        { icon: Car, label: '6 Mins to Coimbatore Intl Airport' }
      ]
    },
    {
      name: 'Race Course',
      tag: 'Ultra-Luxury Colonial District',
      avgPrice: '₹12,500 / sq.ft',
      growth: '+9.4% YoY',
      rentalYield: '3.6% p.a.',
      livabilityScore: '9.8 / 10',
      description: 'Coimbatore’s most prestigious postal address. Lush tree-lined walking tracks, heritage clubs, high-net-worth sky mansions, and premier restaurants.',
      amenities: [
        { icon: Building, label: 'Coimbatore Club & Cosmopolitan Club' },
        { icon: Car, label: 'Walking Track & Botanical Open Spaces' },
        { icon: Stethoscope, label: 'G. Kuppuswamy Naidu Memorial Hospital' },
        { icon: ShieldCheck, label: 'High Security VIP Residential Zone' }
      ]
    },
    {
      name: 'Karamadai & Foothills',
      tag: 'Green Living & Gated Plots',
      avgPrice: '₹2,100 / sq.ft',
      growth: '+18.5% YoY',
      rentalYield: '4.2% p.a.',
      livabilityScore: '8.9 / 10',
      description: 'Nestled against Western Ghats foothills along the Ooty corridor. Highest land capital appreciation rate, clean mountain air, and DTCP approved farm villas.',
      amenities: [
        { icon: Car, label: 'Direct 4-lane Highway to Ooty & Coimbatore' },
        { icon: Building, label: 'Gated Organic Villa Communities' },
        { icon: ShieldCheck, label: '100% Clear Title DTCP Layouts' },
        { icon: Stethoscope, label: 'Clean Mountain Microclimate & Sweet Borewell' }
      ]
    }
  ];

  const current = localities[selectedLocalityIndex];

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all my-10 ${
      themeConfig.isDark 
        ? 'bg-[#150a0f] border-rose-900/40 text-rose-50' 
        : 'bg-white border-slate-200 text-slate-900 shadow-soft'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span 
            className="text-xs uppercase tracking-wider font-extrabold"
            style={{ color: themeConfig.primaryColor }}
          >
            Locality Market Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            Neighborhood Price Trends & Livability
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real estate capital appreciation, rental yield benchmarks, and infrastructure connectivity.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {localities.map((loc, idx) => (
            <button
              key={loc.name}
              onClick={() => setSelectedLocalityIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedLocalityIndex === idx
                  ? `${themeConfig.activeTabClass} scale-105 shadow-md`
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {loc.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Locality Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* Left: Metrics & Overview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              {current.tag}
            </span>
            <span className="text-xs text-slate-400">Coimbatore Metro Region</span>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight">
            {current.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {current.description}
          </p>

          {/* 4 Metric Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Avg Property Price</span>
              <div className="text-sm font-black mt-0.5 text-slate-900 dark:text-slate-100">{current.avgPrice}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">1-Yr Price Growth</span>
              <div className="text-sm font-black mt-0.5 text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{current.growth}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Gross Rental Yield</span>
              <div className="text-sm font-black mt-0.5 text-blue-600">{current.rentalYield}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Livability Index</span>
              <div className="text-sm font-black mt-0.5 text-amber-500">{current.livabilityScore}</div>
            </div>
          </div>
        </div>

        {/* Right: Key Infrastructure Landmarks */}
        <div className={`lg:col-span-5 p-5 rounded-2xl border flex flex-col justify-between ${
          themeConfig.isDark ? 'bg-[#220f18] border-rose-900/40' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
              Infrastructure & Neighborhood Access
            </h4>
            <div className="space-y-3">
              {current.amenities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 text-xs font-semibold">
                    <div 
                      className="p-2 rounded-xl text-white shadow-xs shrink-0"
                      style={{ backgroundColor: themeConfig.primaryColor }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onSelectLocality?.(current.name.split(' ')[0])}
            className={`w-full py-2.5 rounded-xl font-bold text-xs mt-4 ${themeConfig.primaryBtnClass}`}
          >
            Explore All Properties in {current.name.split(' ')[0]} →
          </button>
        </div>

      </div>

    </div>
  );
};

