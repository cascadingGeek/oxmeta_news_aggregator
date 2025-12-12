import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from "@/components/ui/badge";
import { NewsItem } from '@/types';
import { Calendar, Link as LinkIcon, Twitter, FileText } from 'lucide-react';

interface NewsDetailModalProps {
  item: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0a0a0a] border-zinc-800 text-zinc-100 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
              {item.source}
            </Badge>
            <Badge variant={item.sentiment} className="uppercase">
              {item.sentiment}
            </Badge>
          </div>
          <DialogTitle className="text-xl md:text-2xl font-bold leading-tight font-display tracking-tight">
            {item.title}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-mono text-xs mt-2 flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            {item.time}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="bg-zinc-900/30 p-4 rounded-lg border border-zinc-800/50">
             <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase mb-2 flex items-center gap-2">
               <FileText className="w-3 h-3" /> Summary
             </h4>
             <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
               {item.summary || "No detailed summary available for this item."}
             </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-acid text-black font-bold text-sm rounded hover:bg-acid/90 transition-colors"
            >
              {item.source === 'Twitter/X' ? <Twitter className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
              Read Source
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
