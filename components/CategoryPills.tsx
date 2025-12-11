import React from 'react';
import { ColumnData } from '../types';
import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  categories: ColumnData[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ categories, selectedIds, onToggle }) => {
  const isAllSelected = selectedIds.length === 0;

  return (
    <div className="sticky top-[148px] z-30 w-full overflow-hidden border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex overflow-x-auto no-scrollbar py-3 px-4 md:px-6 gap-2">
        <Pill 
          label="ALL SECTORS" 
          active={isAllSelected} 
          onClick={() => onToggle('all')} 
        />
        
        <div className="w-px h-5 bg-zinc-800 mx-2 shrink-0 self-center"></div>

        {categories.map((cat) => (
          <Pill 
            key={cat.id} 
            label={cat.title} 
            active={selectedIds.includes(cat.id)} 
            onClick={() => onToggle(cat.id)} 
          />
        ))}
      </div>
    </div>
  );
};

const Pill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap border",
      active 
        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
        : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-zinc-200"
    )}
  >
    {label}
  </button>
);