import React, { useState, useId } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Calculator, DollarSign, Calendar, Percent, CheckCircle2, ArrowRight } from 'lucide-react';

interface EMICalculatorProps {
  defaultPrice?: number;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({ defaultPrice = 12500000 }) => {
  const { theme, themeConfig } = useTheme();

  const [propertyPrice, setPropertyPrice] = useState<number>(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Derived values
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  // Monthly EMI Formula
  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = loanAmount > 0
    ? Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      )
    : 0;

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;
  const interestPercent = 100 - principalPercent;

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleApplyLoan = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 4000);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
      themeConfig.isDark 
        ? 'bg-[#150a0f] border-rose-900/40 text-rose-50' 
        : 'bg-white border-slate-200 text-slate-900 shadow-soft'
    }`}>
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div 
          className="p-3 rounded-2xl text-white shadow-sm"
          style={{ backgroundColor: themeConfig.primaryColor }}
        >
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Home Loan EMI Estimator</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Customize loan parameters to instantly estimate monthly repayments & interest breakdown
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Property Cost */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Property Value</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">{formatINR(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={100000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹10 Lakhs</span>
              <span>₹2.5 Cr</span>
              <span>₹5 Cr</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatINR(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>10% (Minimum)</span>
              <span>20% (Standard)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Annual Interest Rate</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={6.5}
              max={13}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>6.5% (Prime)</span>
              <span>8.5% (Average)</span>
              <span>13.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Loan Tenure</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>5 Years</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Right: Calculated Summary Card */}
        <div className={`lg:col-span-5 p-6 rounded-2xl flex flex-col justify-between ${
          themeConfig.isDark ? 'bg-[#220f18] border border-rose-900/40' : 'bg-slate-50 border border-slate-200'
        }`}>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">
              Estimated Monthly Repayment
            </div>
            <div 
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: themeConfig.primaryColor }}
            >
              ₹{emi.toLocaleString('en-IN')}<span className="text-sm font-normal text-slate-400"> / month</span>
            </div>

            {/* Breakdown progress bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
                  Principal: {principalPercent}%
                </span>
                <span className="text-amber-500 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  Interest: {interestPercent}%
                </span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                <div style={{ width: `${principalPercent}%` }} className="bg-purple-600 transition-all duration-300" />
                <div style={{ width: `${interestPercent}%` }} className="bg-amber-500 transition-all duration-300" />
              </div>
            </div>

            {/* Metric numbers */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs mt-6">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Loan Amount:</span>
                <span className="font-bold">{formatINR(loanAmount)}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Total Interest Payable:</span>
                <span className="font-bold text-amber-500">{formatINR(totalInterest)}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Total Repayment:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{formatINR(totalPayment)}</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-6 pt-4">
            {appliedSuccess ? (
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pre-approval request submitted! Our banking partner (HDFC/SBI) will connect within 2 hours.</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleApplyLoan}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 ${themeConfig.primaryBtnClass}`}
              >
                <span>Get Instant Pre-Approved Home Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

