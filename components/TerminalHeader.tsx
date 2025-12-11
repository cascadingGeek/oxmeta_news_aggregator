import React from 'react';
import { Terminal, Github, Circle, Box, Cpu } from 'lucide-react';

export const TerminalHeader: React.FC = () => {
  return (
    <header className="border-b border-border bg-[#030303]/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top Ticker Line - UPDATED BRANDING */}
      <div className="bg-accent text-black text-[9px] md:text-[10px] py-1 px-4 flex justify-between items-center font-mono font-bold uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <Box className="w-3 h-3" />
          0xMETA MICRO PROTOCOL // SYSTEM ONLINE
        </span>
        <span className="hidden md:inline opacity-80">POWERED BY X402 FACILITATOR</span>
      </div>

      <div className="flex items-center justify-between px-4 h-14 md:px-6">
        {/* Left: Branding */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-accent/20 blur-md rounded-full"></div>
              <div className="relative w-full h-full border border-border bg-black rounded-sm flex items-center justify-center group cursor-pointer overflow-hidden">
                 <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 <span className="font-display font-bold text-accent text-lg relative z-10">0x</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-wide text-sm leading-none text-white">META TERMINAL</span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-widest mt-1 uppercase">Micro Protocol v1.0</span>
            </div>
          </div>

          <div className="hidden lg:flex h-4 w-px bg-border mx-2"></div>
          
          <nav className="hidden lg:flex items-center gap-6">
            <NavItem label="DASHBOARD" active />
            <NavItem label="INTEL" />
            <NavItem label="NODES" />
          </nav>
        </div>

        {/* Right: Connect */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <span className="flex items-center gap-1"><Circle className="w-2 h-2 fill-accent text-accent animate-pulse" /> NET_SYNC</span>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-xs font-mono transition-all text-zinc-200 group">
            <Github className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
            <span>SOURCE</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-1.5 bg-accent text-black font-bold border border-accent rounded-sm text-xs font-mono hover:bg-accent/90 transition-all uppercase tracking-tight shadow-[0_0_15px_rgba(184,255,1,0.3)]">
            Connect
          </button>
        </div>
      </div>
    </header>
  );
};

const NavItem: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <button className={`
    text-[11px] font-mono tracking-wider transition-colors relative py-4 uppercase
    ${active ? 'text-accent' : 'text-zinc-500 hover:text-zinc-300'}
  `}>
    {label}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_8px_rgba(184,255,1,0.8)]"></span>
    )}
  </button>
);