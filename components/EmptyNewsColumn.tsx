import React from 'react';
import { Hash, MoreHorizontal, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EmptyNewsColumnProps {
  title: string;
  categoryId: string;
  onPayClick: (categoryId: string) => void;
  isProcessing?: boolean;
}

export const EmptyNewsColumn: React.FC<EmptyNewsColumnProps> = ({ 
  title, 
  categoryId, 
  onPayClick,
  isProcessing = false 
}) => {
  return (
    <div className="flex flex-col h-[500px] border border-border bg-[#050505] overflow-hidden group hover:border-zinc-700 transition-colors duration-500">
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-border bg-[#080808] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Hash className="w-3 h-3 text-zinc-600" />
          <h3 className="text-xs font-mono font-bold text-zinc-100 tracking-widest uppercase">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-1.5 py-0.5 rounded-full border-zinc-700 text-zinc-500">
            <Lock className="w-2.5 h-2.5 mr-1" />
            LOCKED
          </Badge>
          <MoreHorizontal className="w-3 h-3 text-zinc-600 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Sentiment Micro-Bar - Disabled */}
      <div className="h-[2px] w-full bg-zinc-900 flex" />

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-16 h-16 border-2 border-dashed border-zinc-700 rounded-full flex items-center justify-center group-hover:border-zinc-600 transition-colors">
          <div className="w-2 h-2 bg-zinc-600 rounded-full animate-ping"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">AWAITING SIGNAL</span>
          <Button
            onClick={() => onPayClick(categoryId)}
            disabled={isProcessing}
            size="sm"
            className="mt-2 bg-acid hover:bg-acid/90 text-black font-mono text-xs uppercase tracking-wider"
          >
            {isProcessing ? (
              <>
                <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 mr-2" />
                Pay & Access 
              </>
            )}
          </Button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-[9px] text-zinc-600 font-mono">0.02 USDC TOTAL</p>
          <p className="text-[8px] text-zinc-700 font-mono mt-1">0.01 CONTENT + 0.01 FEE</p>
        </div>
      </div>

      {/* Footer Stats - Disabled */}
      <div className="px-3 py-2 border-t border-border bg-[#060606] flex justify-between items-center text-[9px] font-mono text-zinc-600 uppercase tracking-wider">
        <div className="flex gap-3">
          <span>BULL: --</span>
          <span>BEAR: --</span>
        </div>
        <span>VOL: --</span>
      </div>
    </div>
  );
};