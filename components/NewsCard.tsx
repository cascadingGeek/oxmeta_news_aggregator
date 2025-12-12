import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NewsItem } from '../types';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NewsDetailModal } from './NewsDetailModal';

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "group relative border-b border-zinc-900 hover:bg-zinc-900/30 transition-all cursor-pointer overflow-hidden"
        )}
      >
        {/* Active Indicator Line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-acid scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h4 className={cn(
              "text-xs md:text-sm font-medium font-sans leading-snug transition-colors text-zinc-300 group-hover:text-white"
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
            <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      <NewsDetailModal 
        item={item} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};