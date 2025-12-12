import React from 'react';
import { ColumnData } from '../types';
import { NewsCard } from './NewsCard';
import { Hash, MoreHorizontal } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Zap } from 'lucide-react';

import { NewsColumnSkeleton } from './NewsColumnSkeleton';

interface NewsColumnProps {
  data: ColumnData;
  filter: string;
  onPayAndAccess?: (id: string) => void;
  isLoading?: boolean;
}

export const NewsColumn: React.FC<NewsColumnProps> = ({ data, filter, onPayAndAccess, isLoading }) => {
  if (isLoading) {
    return <NewsColumnSkeleton />;
  }

  const filteredItems = data?.items?.filter(item => 
    item.title.toLowerCase().includes(filter.toLowerCase()) || 
    item.source.toLowerCase().includes(filter.toLowerCase())
  );

  const total = data.bullishCount + data.bearishCount + data.neutralCount;
  const bullPct = total ? (data.bullishCount / total) * 100 : 0;

  return (
    <div className="flex flex-col h-[500px] border border-border bg-[#050505] overflow-hidden group hover:border-zinc-700 transition-colors duration-500">
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-border bg-[#080808] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Hash className="w-3 h-3 text-zinc-600" />
          <h3 className="text-xs font-mono font-bold text-zinc-100 tracking-widest uppercase">{data.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="acid" className="px-1.5 py-0.5 rounded-full">{filteredItems?.length}</Badge>
          <MoreHorizontal className="w-3 h-3 text-zinc-600 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Sentiment Micro-Bar */}
      <div className="h-[2px] w-full bg-zinc-900 flex">
        <div style={{ width: `${bullPct}%` }} className="bg-acid h-full shadow-[0_0_10px_rgba(203,255,0,0.5)] transition-all duration-1000" />
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredItems?.length > 0 ? (
          <div className="flex flex-col">
            {filteredItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-4 opacity-100 px-6">
             <div className="w-12 h-12 border border-dashed border-zinc-600 rounded-full flex items-center justify-center opacity-30">
               <div className="w-1 h-1 bg-zinc-500 rounded-full animate-ping"></div>
             </div>
             <span className="text-[9px] font-mono tracking-widest opacity-50">AWAITING SIGNAL</span>
             
             {onPayAndAccess && (
               <Button 
                 size="sm" 
                 variant="outline" 
                 className="w-full border-acid/20 hover:bg-acid/10 hover:border-acid/50 text-acid font-mono text-[10px] tracking-wider uppercase h-8"
                 onClick={() => onPayAndAccess(data.id)}
               >
                 <Zap className="w-3 h-3 mr-2" />
                 Pay & Access
               </Button>
             )}
          </div>
        )}
      </div>
      
      {/* Footer Stats */}
      <div className="px-3 py-2 border-t border-border bg-[#060606] flex justify-between items-center text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
        <div className="flex gap-3">
          <span className="text-zinc-400">BULL: {data.bullishCount}</span>
          <span>BEAR: {data.bearishCount}</span>
        </div>
        <span>VOL: HIGH</span>
      </div>
    </div>
  );
};