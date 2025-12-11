import React from 'react';
import { ColumnData } from '../types';

interface CategoryPillsProps {
  categories: ColumnData[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ categories, selectedIds, onToggle }) => {
  const isAllSelected = selectedIds.length === 0;

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 md:px-6 bg-gradient-to-b from-[#030303] to-transparent sticky top-[137px] z-30">
      <div className="flex items-center gap-2 min-w-max">
        {/* 'ALL' Pill */}
        <button
          onClick={() => onToggle('all')}
          className={`
            px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border transition-all duration-300
            ${isAllSelected 
              ? 'bg-accent text-black border-accent shadow-[0_0_10px_rgba(184,255,1,0.2)]' 
              : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'}
          `}
        >
          // ALL SECTORS
        </button>

        <div className="w-px h-4 bg-zinc-800 mx-1"></div>

        {/* Category Pills */}
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => onToggle(cat.id)}
              className={`
                px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border transition-all duration-200 flex items-center gap-2
                ${isSelected 
                  ? 'bg-zinc-100 text-black border-white' 
                  : 'bg-transparent text-zinc-500 border-zinc-900 hover:border-zinc-700 hover:text-zinc-300'}
              `}
            >
              {isSelected && <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>}
              {cat.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};