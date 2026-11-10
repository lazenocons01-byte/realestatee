import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Mail, Phone, Lock, User, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string, role: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { theme, themeConfig } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<'buyer' | 'owner' | 'agent'>('buyer');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
    } else {
      onLoginSuccess(name || 'Verified Member', role);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative ${
        themeConfig.isDark ? 'bg-[#150a0f] text-rose-50 border border-rose-900/40' : 'bg-white text-slate-900'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-extrabold text-purple-600">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </span>
          <h3 className="text-2xl font-black tracking-tight mt-0.5">
            {isRegister ? 'Join RealEstate Platform' : 'Sign In to Your Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access saved properties, schedule site visits, and manage enquiry leads.
          </p>
        </div>

        {/* User Role Selector */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-5 text-xs font-bold text-center">
          {(['buyer', 'owner', 'agent'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`py-2 rounded-xl capitalize transition-all ${
                role === r
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1">Mobile Number / Email</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="+91 98421 XXXXX"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
              />
            </div>
          </div>

          {otpSent && (
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span>Enter 4-Digit OTP</span>
                <span className="text-purple-600 font-bold">Auto-sent: 4921</span>
              </div>
              <input
                type="text"
                required
                maxLength={4}
                placeholder="4921"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg py-2 rounded-xl border border-purple-400 bg-purple-50/50 dark:bg-purple-950/40 font-bold"
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold text-xs mt-2 shadow-md transition-transform active:scale-95 ${themeConfig.primaryBtnClass}`}
          >
            {otpSent ? 'Verify & Continue' : 'Send One-Time Password (OTP)'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-500">
          {isRegister ? (
            <span>Already have an account? <button onClick={() => { setIsRegister(false); setOtpSent(false); }} className="text-purple-600 font-bold hover:underline">Sign In</button></span>
          ) : (
            <span>New to RealEstate? <button onClick={() => { setIsRegister(true); setOtpSent(false); }} className="text-purple-600 font-bold hover:underline">Create Free Account</button></span>
          )}
        </div>
      </div>
    </div>
  );
};
