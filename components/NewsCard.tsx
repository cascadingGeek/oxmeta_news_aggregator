import React, { useState } from 'react';
import { ArrowUpRight, Copy, Terminal } from 'lucide-react';
import { NewsItem } from '../types';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group relative border-b border-zinc-900 hover:bg-zinc-900/30 transition-all cursor-pointer overflow-hidden",
        isExpanded && "bg-zinc-900/50"
      )}
    >
      {/* Active Indicator Line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-acid scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h4 className={cn(
            "text-xs md:text-sm font-medium font-sans leading-snug transition-colors",
            isExpanded ? "text-white" : "text-zinc-300 group-hover:text-white"
          )}>
            {item.title}
          </h4>
          <Badge variant={item.sentiment} className="opacity-70 group-hover:opacity-100">
            {item.sentiment.substr(0, 4)}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
            <span className="text-zinc-500 group-hover:text-acid transition-colors">[{item.source}]</span>
            <span>{item.time}</span>
          </div>
          {isExpanded && <ArrowUpRight className="w-3 h-3 text-zinc-500" />}
        </div>
      </div>

      {/* Expanded Data View */}
      {isExpanded && (
        <div className="px-4 pb-4 animate-accordion-down">
          <div className="bg-black/40 border border-zinc-800 p-3 font-mono text-[10px] text-zinc-400 leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-20">
              <Terminal className="w-12 h-12" />
            </div>
            <div className="relative z-10">
              <span className="text-acid block mb-1">{`> DECRYPTING SIGNAL...`}</span>
              <p className="opacity-80">{item.summary}</p>
            </div>
            
            <div className="mt-3 pt-2 border-t border-dashed border-zinc-800 flex items-center justify-between">
              <div className="flex gap-4">
                <button className="hover:text-white transition-colors flex items-center gap-1">
                  <span className="w-1 h-1 bg-zinc-600 rounded-full"></span> OPEN
                </button>
                <button className="hover:text-white transition-colors flex items-center gap-1">
                  <span className="w-1 h-1 bg-zinc-600 rounded-full"></span> SHARE
                </button>
              </div>
              <button className="text-zinc-600 hover:text-acid">
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};