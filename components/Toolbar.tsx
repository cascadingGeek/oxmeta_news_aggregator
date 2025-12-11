import React from 'react';
import { Search, SlidersHorizontal, Cpu, Activity, RefreshCw } from 'lucide-react';

interface ToolbarProps {
  onSearch: (term: string) => void;
  onGenerateBriefing: () => void;
  isGenerating: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onSearch, onGenerateBriefing, isGenerating }) => {
  return (
    <div className="border-b border-border bg-[#050505] px-4 py-3 md:px-6 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-[88px] z-40 backdrop-blur-sm bg-opacity-80">
      {/* Search Input */}
      <div className="relative w-full md:w-[400px] group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-3.5 w-3.5 text-zinc-600 group-focus-within:text-accent transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-9 pr-3 py-2 border border-zinc-900 rounded-sm leading-5 bg-[#0A0A0A] text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-zinc-700 focus:bg-black sm:text-xs font-mono transition-all uppercase tracking-wide"
          placeholder="SEARCH PROTOCOLS, AGENTS, OR TICKERS..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto no-scrollbar">
        <button 
          onClick={onGenerateBriefing}
          disabled={isGenerating}
          className="group flex items-center gap-2 px-4 py-1.5 bg-[#0A0A0A] text-zinc-400 border border-zinc-800 rounded-sm hover:border-accent/50 hover:text-accent transition-all text-[10px] font-mono font-bold uppercase tracking-wider disabled:opacity-50"
        >
          <Cpu className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-accent' : 'group-hover:text-accent'}`} />
          {isGenerating ? 'PROCESSING...' : 'RUN AI ANALYSIS'}
        </button>

        <div className="h-4 w-px bg-zinc-900 mx-1"></div>

        <FilterButton icon={<Activity className="w-3.5 h-3.5" />} label="LIVE" active />
        <FilterButton icon={<RefreshCw className="w-3.5 h-3.5" />} label="AUTO" />
        <button className="p-2 border border-zinc-800 bg-[#0A0A0A] rounded-sm hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`
    flex items-center gap-2 px-3 py-1.5 border rounded-sm text-[10px] font-mono font-bold transition-all uppercase
    ${active 
      ? 'bg-zinc-900 border-zinc-700 text-white' 
      : 'bg-[#0A0A0A] border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'}
  `}>
    {icon}
    {label}
  </button>
);