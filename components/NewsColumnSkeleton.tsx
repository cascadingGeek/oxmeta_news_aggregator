import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Hash, MoreHorizontal } from 'lucide-react';

export const NewsColumnSkeleton: React.FC = () => {
  return (
    <div className="relative flex flex-col h-[500px] border border-zinc-800 bg-[#050505] overflow-hidden">
      {/* Scanner Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 h-32 animate-scan bg-gradient-to-b from-transparent to-acid/20 border-b border-acid/50 shadow-[0_0_20px_rgba(203,255,0,0.3)]"></div>
      </div>
      
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-[#080808] flex items-center justify-between shrink-0 opacity-50">
        <div className="flex items-center gap-2">
          <Hash className="w-3 h-3 text-zinc-600" />
          <Skeleton className="h-3 w-32 bg-zinc-800" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-8 rounded-full bg-zinc-800" />
          <MoreHorizontal className="w-3 h-3 text-zinc-600" />
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-acid rounded-full animate-ping"></div>
                 <span className="text-acid font-mono text-xs tracking-[0.2em] font-bold">DECRYPTING FEED</span>
            </div>
            <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-acid animate-shimmer-wave w-1/3"></div>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">ESTABLISHING SECURE LINK...</span>
        </div>
        
        {/* Fake Code Lines */}
        <div className="w-full space-y-1.5 opacity-20 mask-gradient">
             {[...Array(6)].map((_, i) => (
                 <div key={i} className="flex justify-between items-center text-[8px] font-mono text-acid">
                     <span>{`> BLOCK_${Math.random().toString(16).slice(2, 8).toUpperCase()}`}</span>
                     <span>{`${Math.floor(Math.random() * 999)}ms`}</span>
                 </div>
             ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-zinc-800 bg-[#060606] flex justify-between items-center opacity-50">
        <Skeleton className="h-3 w-24 bg-zinc-800" />
        <Skeleton className="h-3 w-16 bg-zinc-800" />
      </div>
    </div>
  );
};