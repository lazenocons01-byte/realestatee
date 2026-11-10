import React, { createContext, useContext } from 'react';
import { ThemeDirection } from '../types';

export interface ThemeConfig {
  id: ThemeDirection;
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  sandAccent: string;
  bgClass: string;
  textClass: string;
  cardClass: string;
  borderClass: string;
  primaryBtnClass: string;
  accentBadgeClass: string;
  activeTabClass: string;
  headerBg: string;
  heroGradient: string;
  highlightColor: string;
  glowColorVar: string;
  isDark: boolean;
}

interface ThemeContextType {
  theme: ThemeDirection;
  themeConfig: ThemeConfig;
}

export const TEAL_SAND_THEME: ThemeConfig = {
  id: 'teal-sand',
  name: 'Teal & Sand',
  tagline: 'Elegant, Minimal Coastal & Modern Architecture',
  primaryColor: '#0D9488',
  secondaryColor: '#14B8A6',
  sandAccent: '#EADFC9',
  bgClass: 'bg-[#FBF9F5]',
  textClass: 'text-stone-900',
  cardClass: 'bg-white shadow-soft border border-[#E8E2D8]',
  borderClass: 'border-[#E8E2D8]',
  primaryBtnClass: 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:from-[#0F766E] hover:to-[#0D9488] text-white shadow-md shadow-teal-700/20 transition-all duration-300',
  accentBadgeClass: 'bg-teal-50/90 text-[#0D9488] border border-teal-200/70',
  activeTabClass: 'bg-[#0D9488] text-white shadow-sm',
  headerBg: 'bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E2D8]',
  heroGradient: 'from-teal-950/70 via-stone-900/50 to-stone-900/80',
  highlightColor: '#0D9488',
  glowColorVar: '13, 148, 136',
  isDark: false
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'teal-sand',
  themeConfig: TEAL_SAND_THEME
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set root CSS variable for subtle teal glow animations
  React.useEffect(() => {
    document.documentElement.style.setProperty('--glow-color', TEAL_SAND_THEME.glowColorVar);
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'teal-sand', themeConfig: TEAL_SAND_THEME }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
