import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Building, 
  Calendar, 
  MapPin, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { theme, themeConfig } = useTheme();

  const projects = [
    {
      id: 'proj-1',
      name: 'The Emerald Crest Villas',
      builder: 'Prime Living Developers',
      location: 'Saravanampatti IT Corridor, Coimbatore',
      priceStarting: '₹1.15 Cr onwards',
      status: 'Under Construction (Possession Dec 2026)',
      units: '64 Ultra-Luxury Villas',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Private Plunge Pools', '10,000 sq.ft Clubhouse', '100% Siruvani Water Supply', 'RERA Approved: TN/2026/089'],
      rera: 'TN/RERA/2026/089'
    },
    {
      id: 'proj-2',
      name: 'Skyline Pinnacle Towers',
      builder: 'Metro Habitat Group',
      location: 'Avinashi Road, Peelamedu, Coimbatore',
      priceStarting: '₹72 Lakhs onwards',
      status: 'Ready to Move In',
      units: '180 Smart 2 & 3 BHK Condos',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      highlights: ['Rooftop Infinity Sky Lounge', 'EV Fast Charging bays', 'Next to KMCH & Airport', 'Direct Metro Station Access'],
      rera: 'TN/RERA/2025/142'
    },
    {
      id: 'proj-3',
      name: 'Western Ghats Eco Farmsteads',
      builder: 'Kongu Green Developers',
      location: 'Mettupalayam Highway, Karamadai, Coimbatore',
      priceStarting: '₹22 Lakhs onwards',
      status: 'New Launch Phase 2',
      units: '45 Gated Organic Villa Plots',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      highlights: ['DTCP Approved Layout', '33-ft Blacktop Tar Roads', 'Fruit Orchards with Drip Irrigation', 'Hilltop Clubhouse'],
      rera: 'TN/RERA/2026/210'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-purple-600 dark:text-purple-400">
            Exclusive Gated Communities
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
            New Projects & Upcoming Townships
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mt-1">
            Explore newly launched townships, high-rise condominiums, and luxury gated communities from top-tier RERA certified developers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4" />
          <span>All Projects 100% RERA Approved</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
              themeConfig.isDark 
                ? 'bg-[#150a0f] border-rose-900/40' 
                : 'bg-white border-slate-200 shadow-soft'
            }`}
          >
            <div>
              {/* Project Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                  {proj.status}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xl font-bold tracking-tight">{proj.name}</div>
                  <div className="text-xs text-slate-200">{proj.builder}</div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-black text-purple-600 dark:text-purple-400">
                    {proj.priceStarting}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">{proj.units}</div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">{proj.location}</span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Project Highlights</span>
                  {proj.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="p-5 pt-0 flex gap-2">
              <button
                onClick={() => alert(`Brochure downloaded for ${proj.name}`)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure</span>
              </button>
              <button
                onClick={() => alert(`Site visit booking opened for ${proj.name}`)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${themeConfig.primaryBtnClass}`}
              >
                <span>Book Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
