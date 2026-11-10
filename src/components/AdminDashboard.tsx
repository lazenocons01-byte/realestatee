import React, { useState } from 'react';
import { Property, EnquiryLead, Agent } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus, 
  Search, 
  MoreVertical,
  ShieldAlert,
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  properties: Property[];
  leads: EnquiryLead[];
  agents: Agent[];
  onApproveProperty?: (id: string) => void;
  onRejectProperty?: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  leads,
  agents,
}) => {
  const { theme, themeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'leads' | 'agents' | 'analytics'>('overview');
  const [leadList, setLeadList] = useState<EnquiryLead[]>(leads);

  const handleUpdateLeadStatus = (leadId: string, newStatus: EnquiryLead['status']) => {
    setLeadList(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft bg-white dark:bg-[#0b1120]">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
        
        {/* Admin Left Sidebar */}
        <aside className="lg:col-span-2.5 p-5 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
              <Home className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
              Admin Console
            </span>
          </div>

          <nav className="space-y-1.5 text-xs font-semibold">
            {[
              { id: 'overview', label: 'Dashboard', icon: Home },
              { id: 'properties', label: 'Properties', icon: FileText, count: properties.length },
              { id: 'leads', label: 'Leads & Enquiries', icon: TrendingUp, count: leadList.length },
              { id: 'agents', label: 'Agents', icon: Users, count: agents.length },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-purple-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
              <div className="text-[11px] font-bold text-purple-700 dark:text-purple-300">Live Status: Operational</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">RERA Sync active • SSL Verified</div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9.5 p-6 lg:p-8 space-y-6">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Dashboard Overview
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time platform activity, leads conversion, listing verification and revenue
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Super Admin</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Admin"
                className="w-9 h-9 rounded-full object-cover border border-purple-400 shadow-sm"
              />
            </div>
          </div>

          {/* 4 Metric Cards (Matching reference screenshot) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Listings */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Total Listings</span>
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300">
                  <Home className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">2,480</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +12% from last month
              </div>
            </div>

            {/* Active Leads */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Active Leads</span>
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">426</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +18.4% conversion
              </div>
            </div>

            {/* Total Agents */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Total Agents</span>
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">145</div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1 mt-1">
                12 Pending verification
              </div>
            </div>

            {/* Revenue */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Revenue</span>
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">₹12.6L</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +24% MoM profit
              </div>
            </div>

          </div>

          {/* 2 Analytics Panels (Listing Trend & Property Type Donut) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Listing Trend Area Chart (7 cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Listing Growth Trend</h3>
                  <p className="text-[11px] text-slate-500">Monthly new registered property count</p>
                </div>
                <span className="text-xs text-purple-600 font-semibold bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full">
                  2026 YTD
                </span>
              </div>

              {/* Vector SVG Trend Graph */}
              <div className="h-44 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Gradient Area Fill */}
                  <path
                    d="M 20,130 Q 90,110 150,75 T 280,60 T 380,30 T 480,20 L 480,150 L 20,150 Z"
                    fill="url(#trendGradient)"
                  />

                  {/* Smooth Trend Line */}
                  <path
                    d="M 20,130 Q 90,110 150,75 T 280,60 T 380,30 T 480,20"
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Points */}
                  <circle cx="20" cy="130" r="4" fill="#9333ea" />
                  <circle cx="150" cy="75" r="4" fill="#9333ea" />
                  <circle cx="280" cy="60" r="4" fill="#9333ea" />
                  <circle cx="380" cy="30" r="4" fill="#9333ea" />
                  <circle cx="480" cy="20" r="5" fill="#9333ea" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between text-[11px] text-slate-400 font-medium px-2 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </div>

            {/* Property Type Donut Chart (5 cols) */}
            <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Property Type Distribution</h3>
                <p className="text-[11px] text-slate-500">Market share by listing inventory</p>
              </div>

              {/* Donut representation */}
              <div className="flex items-center justify-center my-3">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Apartment 42% (Purple) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#9333ea" strokeWidth="5" strokeDasharray="42 58" strokeDashoffset="0" />
                    {/* Villa 28% (Amber) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDasharray="28 72" strokeDashoffset="-42" />
                    {/* Plot 18% (Emerald) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="18 82" strokeDashoffset="-70" />
                    {/* Commercial 12% (Sky Blue) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#0ea5e9" strokeWidth="5" strokeDasharray="12 88" strokeDashoffset="-88" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-slate-400 font-medium">Total</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">100%</span>
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
                  <span className="text-slate-600 dark:text-slate-300">Apartment (42%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="text-slate-600 dark:text-slate-300">Villa (28%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-600 dark:text-slate-300">Plot (18%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                  <span className="text-slate-600 dark:text-slate-300">Commercial (12%)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Active Enquiry Leads Queue */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Active Enquiry Leads</h3>
                <p className="text-[11px] text-slate-500">Track incoming buyer requests, visits, and agent assignments</p>
              </div>
              <span className="text-xs text-slate-500">{leadList.length} Total Enquiries</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                    <th className="pb-2">User / Contact</th>
                    <th className="pb-2">Property Interested</th>
                    <th className="pb-2">Assigned Agent</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leadList.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{lead.userName}</div>
                        <div className="text-[11px] text-slate-400">{lead.userPhone}</div>
                      </td>
                      <td className="py-3 max-w-[200px]">
                        <div className="font-medium text-slate-800 dark:text-slate-200 truncate">{lead.propertyTitle}</div>
                        <div className="text-[10px] text-purple-600 dark:text-purple-400">{lead.budget}</div>
                      </td>
                      <td className="py-3">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{lead.assignedAgent}</span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === 'visit_scheduled'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200'
                            : lead.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200'
                            : lead.status === 'converted'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                        }`}>
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-medium"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="visit_scheduled">Visit Scheduled</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
};

