import React, { useState } from 'react';
import { Agent, Property } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  Users, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Building, 
  ExternalLink,
  Search
} from 'lucide-react';

interface AgentDirectoryProps {
  agents: Agent[];
  properties: Property[];
  onOpenAgentContact: (agent: Agent) => void;
  onFilterByAgent: (agentId: string) => void;
}

export const AgentDirectory: React.FC<AgentDirectoryProps> = ({
  agents,
  properties,
  onOpenAgentContact,
  onFilterByAgent
}) => {
  const { theme, themeConfig } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const filteredAgents = agents.filter((agent) => {
    if (selectedSpecialization !== 'all' && !agent.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase())) {
      return false;
    }
    if (searchTerm && !agent.name.toLowerCase().includes(searchTerm.toLowerCase()) && !agent.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Directory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-purple-600 dark:text-purple-400">
            Certified Broker Network
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
            Meet Our Top Real Estate Advisors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            100% verified credentials, government RERA registrations, and localized neighborhood expertise.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search agents by name or locality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Agents Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => {
          const agentListings = properties.filter((p) => p.agent.id === agent.id);

          return (
            <div
              key={agent.id}
              className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                themeConfig.isDark 
                  ? 'bg-[#150a0f] border-rose-900/40 text-rose-50' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-soft'
              }`}
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-md"
                    />
                    {agent.verified && (
                      <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white rounded-full shadow-sm" title="Verified Agent">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate">
                        {agent.name}
                      </h3>
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold truncate">
                      {agent.agency}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {agent.rating}
                      </span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-slate-500 text-xs">{agent.experienceYears}+ yrs exp</span>
                    </div>
                  </div>
                </div>

                {/* Specialization & Bio */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Specialization: </span>
                    <span className="text-slate-500 dark:text-slate-400">{agent.specialization}</span>
                  </div>
                  <div className="text-xs flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span className="truncate">{agent.location}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {agent.bio}
                  </p>
                </div>

                {/* Performance stats */}
                <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center text-xs">
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">{agent.activeListingsCount}</div>
                    <div className="text-[10px] text-slate-400">Active Listings</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">{agent.dealsClosed}+</div>
                    <div className="text-[10px] text-slate-400">Deals Closed</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onOpenAgentContact(agent)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 ${themeConfig.primaryBtnClass}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire Now</span>
                </button>
                <a
                  href={`tel:${agent.phone}`}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Call Agent"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

