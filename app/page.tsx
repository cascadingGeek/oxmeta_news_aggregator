"use client";

import React, { useState } from 'react';
import { TerminalHeader } from '@/components/TerminalHeader';
import { Toolbar } from '@/components/Toolbar';
import { NewsColumn } from '@/components/NewsColumn';
import { CategoryPills } from '@/components/CategoryPills';
import { CATEGORIES } from '@/constants';
import { generateMarketBriefingAction } from './actions';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [briefing, setBriefing] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const filteredCategories = selectedCategoryIds.length === 0
    ? CATEGORIES
    : CATEGORIES.filter(c => selectedCategoryIds.includes(c.id));

  const handleCategoryToggle = (id: string) => {
    if (id === 'all') {
      setSelectedCategoryIds([]);
      return;
    }
    setSelectedCategoryIds(prev => {
      if (prev.includes(id)) return prev.filter(c => c !== id);
      return [...prev, id];
    });
  };

  const handleGenerateBriefing = async () => {
    setIsGenerating(true);
    const allItems = filteredCategories.flatMap(c => c.items).slice(0, 15);
    // Use Server Action instead of client-side service
    const result = await generateMarketBriefingAction(allItems);
    setBriefing(result);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Visual Effects Layer */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-radial from-transparent to-background pointer-events-none z-0"></div>
      
      <TerminalHeader />
      
      <main className="relative z-10 flex flex-col pt-14">
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

        {/* AI Briefing Modal */}
        {briefing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-black border border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
               {/* Decorative top bar */}
               <div className="h-1 w-full bg-gradient-to-r from-acid to-transparent"></div>
               
               <div className="p-6">
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-acid/10 rounded-sm">
                       <Sparkles className="w-4 h-4 text-acid" />
                     </div>
                     <div className="flex flex-col">
                       <h3 className="text-sm font-bold font-mono text-white tracking-widest uppercase">Executive Alpha Brief</h3>
                       <span className="text-[10px] text-zinc-500 font-mono uppercase">Generated via Gemini-2.5-Flash</span>
                     </div>
                   </div>
                   <Button variant="ghost" size="icon" onClick={() => setBriefing(null)} className="text-zinc-500 hover:text-white">
                     <X className="w-5 h-5" />
                   </Button>
                 </div>
                 
                 <div className="font-mono text-xs md:text-sm text-zinc-300 leading-relaxed border-l-2 border-acid pl-4 py-1">
                   {briefing}
                 </div>

                 <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-zinc-600 border-t border-zinc-900 pt-4">
                   <CheckCircle2 className="w-3 h-3 text-acid" />
                   <span>CONFIDENCE SCORE: 98.4%</span>
                   <span className="mx-2">•</span>
                   <span>LATENCY: 42ms</span>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Bento Grid Layout */}
        <div className="p-4 md:p-6 pb-20 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[2400px] mx-auto">
            {filteredCategories.map((category) => (
              <NewsColumn 
                key={category.id}
                data={category} 
                filter={searchTerm} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* Persistent Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-[#020202]/90 backdrop-blur flex items-center justify-between px-4 py-1.5 text-[9px] font-mono uppercase tracking-widest z-50 text-zinc-500">
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-1.5 text-acid">
             <div className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse"></div>
             Node: Stable
           </span>
           <span className="hidden sm:inline">Gas: 15 Gwei</span>
        </div>
        <div>
          <span>0xMeta Terminal // 2024</span>
        </div>
      </footer>
    </div>
  );
}