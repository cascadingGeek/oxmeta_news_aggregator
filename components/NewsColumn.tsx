import React from 'react';
import { ColumnData } from '../types';
import { NewsCard } from './NewsCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NewsColumnProps {
  data: ColumnData;
  filter: string;
}

export const NewsColumn: React.FC<NewsColumnProps> = ({ data, filter }) => {
  const filteredItems = data.items.filter(item => 
    item.title.toLowerCase().includes(filter.toLowerCase()) || 
    item.source.toLowerCase().includes(filter.toLowerCase())
  );

  // Calculate sentiment percentage for visual bar
  const total = data.bullishCount + data.bearishCount + data.neutralCount;
  const bullPct = total ? (data.bullishCount / total) * 100 : 0;
  const bearPct = total ? (data.bearishCount / total) * 100 : 0;

  const dominantSentiment = 
    data.bullishCount > data.bearishCount ? 'bullish' : 
    data.bearishCount > data.bullishCount ? 'bearish' : 'neutral';

  return (
    <div className="flex flex-col border border-border bg-card rounded-sm overflow-hidden h-[340px] hover:border-zinc-700 transition-colors group">
      {/* Widget Header */}
      <div className="px-3 py-2.5 bg-[#0E0E0E] border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-sm ${dominantSentiment === 'bullish' ? 'bg-accent shadow-[0_0_8px_#B8FF01]' : dominantSentiment === 'bearish' ? 'bg-red-500' : 'bg-zinc-500'}`}></div>
          <h3 className="text-xs font-display font-bold text-zinc-200 tracking-wider uppercase">{data.title}</h3>
        </div>
        <span className="text-[9px] font-mono text-zinc-600">{filteredItems.length} SIGS</span>
      </div>

      {/* Sentiment Bar */}
      <div className="h-0.5 w-full flex bg-zinc-900">
        <div style={{ width: `${bullPct}%` }} className="bg-accent h-full opacity-80" />
        <div style={{ width: `${bearPct}%` }} className="bg-red-500 h-full opacity-80" />
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050505]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-700 gap-2">
             <Minus className="w-4 h-4" />
             <span className="text-[10px] font-mono">NO SIGNAL</span>
          </div>
        )}
      </div>

      {/* Footer / Meta */}
      <div className="px-3 py-1.5 border-t border-zinc-900 bg-[#080808] flex items-center justify-between text-[9px] font-mono text-zinc-600">
         <div className="flex items-center gap-2">
           <span className="flex items-center gap-1 text-zinc-500"><TrendingUp className="w-2.5 h-2.5" />{data.bullishCount}</span>
           <span className="flex items-center gap-1 text-zinc-500"><TrendingDown className="w-2.5 h-2.5" />{data.bearishCount}</span>
         </div>
         <span className="group-hover:text-accent transition-colors">VIEW ALL ></span>
      </div>
    </div>
  );
};