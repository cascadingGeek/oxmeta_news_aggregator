import React, { useState } from 'react';
import { TerminalHeader } from './components/TerminalHeader';
import { Toolbar } from './components/Toolbar';
import { NewsColumn } from './components/NewsColumn';
import { CategoryPills } from './components/CategoryPills';
import { CATEGORIES } from './constants';
import { generateMarketBriefing } from './services/geminiService';
import { X, Sparkles, Terminal, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [briefing, setBriefing] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  // Filter Categories Logic
  const filteredCategories = selectedCategoryIds.length === 0
    ? CATEGORIES
    : CATEGORIES.filter(c => selectedCategoryIds.includes(c.id));

  // Handler for Pill Toggles
  const handleCategoryToggle = (id: string) => {
    if (id === 'all') {
      setSelectedCategoryIds([]);
      return;
    }
    setSelectedCategoryIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(c => c !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleGenerateBriefing = async () => {
    setIsGenerating(true);
    // Aggregate top items from visible categories
    const allItems = filteredCategories.flatMap(c => c.items).slice(0, 15);

    const result = await generateMarketBriefing(allItems);
    setBriefing(result);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background text-zinc-100 flex flex-col font-sans selection:bg-accent selection:text-black">
      {/* Background Ambient Noise */}
      <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-0"></div>
      
      <TerminalHeader />
      
      <Toolbar 
        onSearch={setSearchTerm} 
        onGenerateBriefing={handleGenerateBriefing} 
        isGenerating={isGenerating}
      />

      <CategoryPills 
        categories={CATEGORIES}
        selectedIds={selectedCategoryIds}
        onToggle={handleCategoryToggle}
      />

      {/* AI Briefing Overlay */}
      {briefing && (
        <div className="relative z-30 px-4 md:px-6 py-4 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="glass-panel border border-accent/20 rounded-md p-6 max-w-4xl mx-auto shadow-[0_0_50px_rgba(184,255,1,0.05)]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 border border-accent/20 rounded-full shrink-0">
                <Cpu className="w-5 h-5 text-accent animate-pulse-fast" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-xs font-mono text-accent font-bold tracking-widest uppercase">0xMeta Executive Signal</h3>
                   <span className="text-[10px] text-zinc-500 font-mono">MODEL: GEMINI-PRO-X</span>
                </div>
                <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans font-light tracking-wide">{briefing}</p>
              </div>
              <button 
                onClick={() => setBriefing(null)}
                className="p-2 hover:bg-white/5 rounded-sm text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bento Grid */}
      <main className="relative z-10 flex-1 p-4 md:px-6 md:pb-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1800px] mx-auto">
          {filteredCategories.map((category) => (
            <div key={category.id} className="animate-in zoom-in-95 duration-300">
              <NewsColumn 
                data={category} 
                filter={searchTerm} 
              />
            </div>
          ))}
        </div>
      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-border bg-[#020202] text-[10px] font-mono text-zinc-600 sticky bottom-0 z-40 py-1.5 px-4 flex items-center justify-between uppercase tracking-wider">
        <div className="flex items-center gap-6">
           <span className="flex items-center gap-2 text-accent">
             <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
             Node Active
           </span>
           <span>Gas: 12 gwei</span>
           <span>ETH: $3,240.50</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">0xMeta Micro Protocol v1.0</span>
          <span>Build: 402.88a</span>
        </div>
      </footer>
    </div>
  );
};

export default App;