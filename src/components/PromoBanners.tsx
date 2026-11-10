import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Search, 
  MapPin, 
  Calculator, 
  Eye, 
  ShieldCheck, 
  Users, 
  LayoutDashboard, 
  Bell, 
  Smartphone,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface PromoBannersProps {
  onOpenListProperty: () => void;
  onExploreMore: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({
  onOpenListProperty,
  onExploreMore
}) => {
  const { theme, themeConfig } = useTheme();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-12">
      
      {/* Banner 1: List Your Property with Us (Matches reference image) */}
      <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl relative overflow-hidden border flex flex-col sm:flex-row items-center justify-between gap-6 transition-all ${
        themeConfig.isDark 
          ? 'bg-gradient-to-r from-[#180a11] to-[#250e1b] border-rose-900/40 text-rose-50' 
          : 'bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border-slate-200 text-slate-900'
      }`}>
        <div className="space-y-3 max-w-sm z-10">
          <span 
            className="text-xs uppercase tracking-wider font-extrabold"
            style={{ color: themeConfig.primaryColor }}
          >
            For Property Owners & Builders
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            List Your Property <br />with Us
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Reach thousands of genuine buyers and renters in your city with zero upfront listing fees.
          </p>
          <button
            onClick={onOpenListProperty}
            className={`mt-2 px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-md transition-transform active:scale-95 ${themeConfig.primaryBtnClass}`}
          >
            <span>List Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* House Visual */}
        <div className="w-48 sm:w-56 shrink-0 relative z-10">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
            alt="List Property"
            className="w-full h-36 object-cover rounded-2xl shadow-xl border-2 border-white/80 dark:border-slate-800"
          />
          <div className="absolute -bottom-2 -left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">
            FOR SALE / LEASE
          </div>
        </div>
      </div>

      {/* Banner 2: Why Choose Us? (Matches reference image) */}
      <div className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${
        themeConfig.isDark 
          ? 'bg-[#150a0f] border-rose-900/40 text-rose-50' 
          : 'bg-white border-slate-200 text-slate-900 shadow-soft'
      }`}>
        <div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-4">
            Why Choose Us?
          </h3>
          <div className="space-y-3.5">
            {[
              { title: 'Verified Properties', desc: '100% legal title-verified documents & RERA checks' },
              { title: 'Trusted Agents', desc: 'Direct access to certified neighborhood property experts' },
              { title: 'Easy & Secure Process', desc: 'Instant visit scheduling and transparent pricing' },
              { title: 'Best Market Insights', desc: 'Accurate locality price trends and investment yields' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 fill-current text-white dark:text-slate-900 stroke-purple-600 dark:stroke-purple-400" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.title}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export const KeyFeaturesBar: React.FC = () => {
  const { theme, themeConfig } = useTheme();

  const features = [
    { title: 'Advanced Search & Filters', icon: Search },
    { title: 'Map Integration (Live Location)', icon: MapPin },
    { title: 'EMI Calculator', icon: Calculator },
    { title: 'Virtual Tour (360° / Video)', icon: Eye },
    { title: 'Verified Listings', icon: ShieldCheck },
    { title: 'Agent Management', icon: Users },
    { title: 'Admin Dashboard', icon: LayoutDashboard },
    { title: 'Alerts & Notifications', icon: Bell },
    { title: 'Responsive (Web + Mobile)', icon: Smartphone },
  ];

  return (
    <div className={`mt-12 p-4 sm:p-6 rounded-3xl border transition-all ${
      themeConfig.isDark 
        ? 'bg-[#150a0f] border-rose-900/40 text-rose-100' 
        : 'bg-blue-50/40 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
    }`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        <div className="shrink-0">
          <div className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Key Features
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
            (All-in-One Platform)
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 w-full">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-xs hover:border-purple-400 transition-colors"
              >
                <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 mb-1" />
                <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                  {feat.title}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

