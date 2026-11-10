import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { theme, themeConfig } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: 'Natarajan & Lakshmi',
      role: 'Homeowners in Saravanampatti',
      property: 'Bought 4 BHK Villa in Emerald Greens',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'The 360° virtual tour matched the actual property down to every detail. Legal verification and title clearance took only 4 days with agent Karthik. We moved into our dream villa smoothly!'
    },
    {
      id: 2,
      name: 'Dr. Vigneshwaran S.',
      role: 'Cardiologist, KMCH',
      property: 'Purchased 3 BHK at Skyline Heights',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'Finding a ready-to-move apartment 5 minutes from KMCH hospital on Avinashi Road seemed impossible until I used RealEstate. Filtered verified listings only, scheduled a visit for Saturday, and finalized.'
    },
    {
      id: 3,
      name: 'Sridhar Balasubramanian',
      role: 'NRI Tech Lead, Singapore',
      property: 'Invested in Gated Villa Plot, Karamadai',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment: 'As an NRI investing remotely, legal safety is my #1 concern. RealEstate provided genuine DTCP and RERA registration documentation upfront. The digital scheduling and WhatsApp updates were flawless.'
    }
  ];

  return (
    <section className="my-14 space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <span 
          className="text-xs uppercase tracking-wider font-extrabold"
          style={{ color: themeConfig.primaryColor }}
        >
          Customer Trust & Stories
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
          Loved by 10,000+ Happy Families & Investors
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Read genuine reviews from homebuyers, tenants, and NRI property investors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between ${
              themeConfig.isDark 
                ? 'bg-[#150a0f] border-rose-900/40 text-rose-50' 
                : 'bg-white border-slate-200 text-slate-900 shadow-soft'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-300 dark:text-slate-700" />
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{t.comment}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-11 h-11 rounded-full object-cover border-2 shadow-xs"
                style={{ borderColor: themeConfig.primaryColor }}
              />
              <div className="min-w-0">
                <div className="font-bold text-xs truncate flex items-center gap-1">
                  <span>{t.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400 truncate">{t.role}</div>
                <div 
                  className="text-[10px] font-semibold truncate mt-0.5"
                  style={{ color: themeConfig.primaryColor }}
                >
                  {t.property}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

