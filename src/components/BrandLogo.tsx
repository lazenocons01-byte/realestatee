import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', variant = 'light' }) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  return (
    <div className="flex items-center gap-3 cursor-pointer group select-none">
      {/* Architectural Emblem */}
      <div className={`relative ${iconDimensions} rounded-2xl p-0.5 bg-gradient-to-tr from-[#0F766E] via-[#0D9488] to-[#14B8A6] shadow-lg shadow-teal-900/15 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0`}>
        {/* Inner subtle glow */}
        <div className="w-full h-full rounded-[14px] bg-[#0A4B46] p-1.5 flex items-center justify-center overflow-hidden relative">
          
          {/* Custom Architectural SVG Mark (Stylized Modern Villa Roofline & Horizon) */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Soft background ambient gradient */}
            <defs>
              <linearGradient id="tealGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2DD4BF" />
                <stop offset="1" stopColor="#0D9488" />
              </linearGradient>
              <linearGradient id="sandGrad" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5E8D0" />
                <stop offset="1" stopColor="#D4C19C" />
              </linearGradient>
              <linearGradient id="roofGrad" x1="16" y1="4" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="1" stopColor="#CCFBF1" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Ground / Sand foundation plane */}
            <path
              d="M 5 25 L 27 25"
              stroke="url(#sandGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Contemporary cantilevered roofline */}
            <path
              d="M 6 15 L 16 6 L 26 15"
              stroke="url(#roofGrad)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Modern vertical glass pillar & door facade */}
            <path
              d="M 12 15 L 12 24 M 20 15 L 20 24"
              stroke="#2DD4BF"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Warm Sand Entryway Portal / Geometric Hearth */}
            <rect
              x="13.5"
              y="18"
              width="5"
              height="6.5"
              rx="1.2"
              fill="url(#sandGrad)"
            />

            {/* Geometric luxury spark */}
            <circle cx="16" cy="11.5" r="1.3" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${textSizes} ${
          variant === 'dark' ? 'text-white' : 'text-stone-900'
        }`}>
          <span>Real</span>
          <span className="text-[#0D9488] font-bold">Estate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] inline-block ml-0.5 animate-pulse" />
        </div>
        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400 mt-1">
          Verified • Luxury • Living
        </span>
      </div>
    </div>
  );
};

