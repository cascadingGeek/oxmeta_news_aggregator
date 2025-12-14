"use client";

import React, { useState, useEffect } from 'react';
import { TerminalHeader } from '@/components/TerminalHeader';
import { Toolbar } from '@/components/Toolbar';
import { NewsColumn } from '@/components/NewsColumn';
import { CategoryPills } from '@/components/CategoryPills';
import { useWallet } from '@/hooks/useWallet';
import { useConfig, usePayAndFetchNews } from '@/hooks/useNews';
import { useNewsStore } from '@/store/useNewsStore';
import { CATEGORIES } from '@/constants';
import { generateMarketBriefingAction } from './actions';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NewsResponse, NewsItem, ColumnData } from '@/types';
import { FREE_CATEGORIES } from '@/constants';
import { apiService } from '@/services/apiService';

function transformNewsToItems(
  news: NewsResponse,
  category: string
): NewsItem[] {
  const allItems = [...news.cryptonews, ...news.twitter];

  return allItems.slice(0, 20).map((item) => ({
    id: item.oxmeta_id,
    title: item.title ?? item.text,
    source: item.source === 'cryptonews' ? 'CryptoNews' : 'Twitter/X',
    time: new Date(item.timestamp * 1000).toISOString(),
    sentiment: item.sentiment as 'bullish' | 'bearish' | 'neutral',
    url: item.sources?.[0] ?? item.url ?? '#',
    tags: item.tokens ?? [],
    summary: item.text, 
  }));
}


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [briefing, setBriefing] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    ['rwa', 'macro', 'virtuals']
  );
  // Track loading state for each category
  const [loadingCategories, setLoadingCategories] = useState<Set<string>>(new Set());
  const { paidNews, setPaidNews } = useNewsStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchFreeCategories = async () => {
      for (const category of FREE_CATEGORIES) {
        // skip if already cached & valid
        const cached = paidNews[category];
        if (cached && Date.now() - cached.timestamp < 5 * 60 * 60 * 1000) {
          continue;
        }

        try {
          const response = await apiService.getFreeNews(category);
          const items = transformNewsToItems(response, category);

          setPaidNews(category, items);
        } catch (err) {
          console.error(`Failed to auto-fetch ${category}`, err);
        }
      }
    };

    fetchFreeCategories();
  }, []);

  
  const { isConnected, connect } = useWallet();
  const { data: config } = useConfig();
  const { mutateAsync: payAndFetch } = usePayAndFetchNews();

  // Merge static categories with paid ones
  const displayCategories: ColumnData[] = CATEGORIES.map(cat => {
    // We access the store state directly. 
    // Since we are inside the component, this will re-render when store changes.
    // However, we need to check expiration. 
    // The store's getPaidNews is a function, but we can also just access the raw state and check here 
    // OR allow the component to use the raw state and filter.
    // Given the store structure, let's use the raw state for reactivity and check timestamp here or rely on the store's valid data if we filtered it.
    // BETTER APPROACH for Reactivity: 
    // The store exposes `paidNews`. We can use a helper or just check directly.
    
    // To avoid hydration mismatch, we must ensure this logic is client-side or handled gracefully.
    // We'll use the raw data if available and valid.
    
    let paidItems: NewsItem[] | undefined;
    
    if (isClient) {
        const data = paidNews[cat.id];
        if (data && (Date.now() - data.timestamp < 5 * 60 * 60 * 1000)) {
            paidItems = data.items;
        }
    }

    if (paidItems) {
      const bullish = paidItems.filter(i => i.sentiment === 'bullish').length;
      const bearish = paidItems.filter(i => i.sentiment === 'bearish').length;
      const neutral = paidItems.filter(i => i.sentiment === 'neutral').length;
      
      return {
        id: cat.id,
        title: cat.name,
        items: paidItems,
        bullishCount: bullish,
        bearishCount: bearish,
        neutralCount: neutral,
      };
    }
    return {
      id: cat.id,
      title: cat.name,
      items: [],
      bullishCount: 0,
      bearishCount: 0,
      neutralCount: 0,
    };
  });

  const filteredCategories = selectedCategoryIds.length === 0
    ? displayCategories
    : displayCategories.filter(c => selectedCategoryIds.includes(c.id));

  const handleCategoryToggle = (id: string) => {
    if (id === 'all') {
      setSelectedCategoryIds(CATEGORIES.map(c => c.id));
      return;
    }
    setSelectedCategoryIds(prev => {
      // If currently showing all (length == all), and user clicks one, 
      // do we toggle it off or switch to specific selection?
      // Logic: standard toggle.
      if (prev.includes(id)) {
          const newItem = prev.filter(c => c !== id);
          return newItem.length === 0 ? CATEGORIES.map(c => c.id) : newItem;
      }
      return [...prev, id];
    });
  };

  const handlePayAndAccess = async (categoryId: string) => {
    if (!config) return;

    try {
      if (!isConnected) {
        await connect(config);
      }
      
      // We'll proceed to pay immediately after connecting if possible, 
      // or user might need to click again. 
      // For better UX, let's try to proceed.
      // However, connect is async. 
      
      // Update loading state
      setLoadingCategories(prev => new Set(prev).add(categoryId));
      
      const news = await payAndFetch({ category: categoryId, config });
      const items = transformNewsToItems(news, categoryId);
      
      setPaidNews(categoryId, items);
    } catch (error) {
      console.error("Payment or Connection failed", error);
      // Optional: Add toast notification here
    } finally {
        setLoadingCategories(prev => {
            const next = new Set(prev);
            next.delete(categoryId);
            return next;
        });
    }
  };

  const handleGenerateBriefing = async () => {
    setIsGenerating(true);
    const allItems = filteredCategories.flatMap(c => c.items || []).slice(0, 15);
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
          categories={displayCategories}
          selectedIds={selectedCategoryIds}
          onToggle={handleCategoryToggle}
        />

        {/* Bento Grid Layout */}
        <div className="p-4 md:p-6 pb-20 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[2400px] mx-auto">
            {filteredCategories.map((category) => (
              <NewsColumn 
                key={category.id}
                data={category} 
                filter={searchTerm} 
                onPayAndAccess={handlePayAndAccess}
                isLoading={loadingCategories.has(category.id)}
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
             X402 ACTIVE
           </span>
           <span className="hidden sm:inline">Gas: 15 Gwei</span>
           <span className="hidden md:inline">ETH: $3,240.50</span>
        </div>
        <div>
          <span>POWERED BY 0xMETA FACILITATOR</span>
        </div>
      </footer>
    </div>
  );
}
