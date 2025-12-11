import React from 'react';
import { cn } from "@/lib/utils";

export const TerminalHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      {/* Top micro-ticker */}
      <div className="w-full bg-acid text-black h-5 flex items-center justify-between px-4 text-[9px] font-mono font-bold uppercase tracking-widest select-none">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-black rounded-full animate-blink"></span>
          SYSTEM ONLINE // V 4.0.2
        </span>
        <span className="hidden md:block">0xMeta x ItsGloria // CLONE</span>
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        {/* Left: Branding */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold font-display text-lg tracking-tighter hover:bg-acid transition-colors duration-300">
              0x
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-white tracking-widest leading-none">TERMINAL</span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5 group-hover:text-acid transition-colors">Intelligence Grid</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-1">
            <NavItem label="MARKET" active />
            <NavItem label="AGENTS" />
            <NavItem label="NODES" />
            <NavItem label="MEMPOOL" />
          </nav>
        </div>

        {/* Right: Status */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end text-[9px] font-mono text-zinc-500 uppercase tracking-wider leading-tight">
            <span>Block: 19284722</span>
            <span className="text-acid">Syncing...</span>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs font-mono text-zinc-300 hover:text-white transition-all uppercase tracking-wide group">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-acid transition-colors"></div>
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

const NavItem: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <button className={cn(
    "px-4 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-all border border-transparent rounded-sm",
    active ? "text-white bg-zinc-900 border-zinc-800" : "text-zinc-500 hover:text-white hover:bg-zinc-900/50"
  )}>
    {label}
  </button>
);