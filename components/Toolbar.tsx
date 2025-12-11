import React from 'react';
import { Search, Command, Zap, Activity, SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ToolbarProps {
  onSearch: (term: string) => void;
  onGenerateBriefing: () => void;
  isGenerating: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onSearch, onGenerateBriefing, isGenerating }) => {
  return (
    <div className="sticky top-[76px] z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 md:px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* Search Input Area */}
      <div className="relative w-full md:w-[480px] group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-3.5 w-3.5 text-zinc-500 group-focus-within:text-acid transition-colors" />
        </div>
        <Input
          type="text"
          className="pl-10 pr-12 bg-[#090909] font-mono uppercase tracking-wider"
          placeholder="Query Protocol or Agent ID..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <div className="flex items-center gap-1 border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 rounded-[2px]">
             <Command className="w-2.5 h-2.5 text-zinc-500" />
             <span className="text-[9px] font-mono text-zinc-500">K</span>
          </div>
        </div>
      </div>

      {/* Control Surface */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <div className="hidden md:flex h-4 w-px bg-zinc-800"></div>

        <Button 
          onClick={onGenerateBriefing}
          disabled={isGenerating}
          variant={isGenerating ? "secondary" : "acid"}
          size="sm"
          className="gap-2"
        >
          <Zap className={`w-3 h-3 ${isGenerating ? 'animate-pulse' : 'fill-black'}`} />
          {isGenerating ? 'ANALYZING...' : 'GENERATE ALPHA'}
        </Button>

        <div className="flex border border-zinc-800 bg-[#090909] p-0.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-zinc-800 text-zinc-500 hover:text-white">
            <Activity className="w-3.5 h-3.5" />
          </Button>
          <div className="w-px bg-zinc-800 my-1"></div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-zinc-800 text-zinc-500 hover:text-white">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};