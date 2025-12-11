import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Share2, ShieldCheck } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sentimentColor = 
    item.sentiment === 'bullish' ? 'text-bullish' :
    item.sentiment === 'bearish' ? 'text-bearish' :
    'text-neutral';

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        group relative pl-3 py-3 pr-2 border-l-2 transition-all cursor-pointer select-none
        ${isExpanded 
          ? 'bg-[#0A0A0A] border-accent shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-zinc-800'}
      `}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start gap-3">
        <h4 className={`text-xs font-sans font-medium leading-snug transition-colors ${isExpanded ? 'text-white' : 'text-zinc-300 group-hover:text-zinc-200'} line-clamp-2`}>
          {item.title}
        </h4>
        <span className={`text-[9px] font-mono uppercase tracking-wider shrink-0 ${sentimentColor} opacity-90`}>
          {item.sentiment.substr(0, 4)}
        </span>
      </div>
      
      {/* Collapsed Meta */}
      {!isExpanded && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
             <span className="text-[9px] text-zinc-600 font-mono">{item.source}</span>
             <span className="text-[9px] text-zinc-700 font-mono">•</span>
             <span className="text-[9px] text-zinc-600 font-mono">{item.time}</span>
          </div>
          <ArrowRight className="w-3 h-3 text-zinc-700 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200 cursor-default">
          <div className="h-px w-full bg-zinc-900 mb-3"></div>
          
          {/* Terminal Log Summary */}
          <div className="font-mono text-[10px] text-zinc-400 leading-relaxed bg-black/50 p-2 rounded-sm border border-zinc-900 mb-3">
            <span className="text-accent/50 mr-2">$</span>
            {item.summary || "Retrieving on-chain data context... Signal verified."}
          </div>

          {/* Actions & Footer */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-600 hover:text-white text-[9px] font-mono text-zinc-400 transition-colors">
                <ExternalLink className="w-2.5 h-2.5" />
                SOURCE
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-600 hover:text-white text-[9px] font-mono text-zinc-400 transition-colors">
                <Share2 className="w-2.5 h-2.5" />
                SHARE
              </button>
            </div>
            
            <div className="flex items-center gap-1 text-[8px] font-mono text-zinc-600 tracking-widest uppercase opacity-70">
              <ShieldCheck className="w-2.5 h-2.5 text-accent" />
              0xMeta Micro Protocol
            </div>
          </div>
        </div>
      )}
    </div>
  );
};