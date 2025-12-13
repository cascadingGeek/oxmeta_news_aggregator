import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Wallet, Loader2, Github, LogOut, Copy } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useConfig } from '@/hooks/useNews';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TerminalHeaderProps {
  onPaymentClick?: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = () => {
  const { data: config } = useConfig();
  const {
    isConnected,
    walletAddress,
    isConnecting,
    connect,
    disconnect,
    shortenAddress
  } = useWallet();

  const handleConnect = () => {
    if (config) {
      connect(config);
    }
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      {/* Top micro-ticker */}
      <div className="w-full bg-acid text-black h-5 flex items-center justify-between px-4 text-[9px] font-mono font-bold uppercase tracking-widest select-none">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-black rounded-full animate-blink"></span>
          0xmeta Opensource micro protocol
        </span>
        <span className="hidden md:block">POWERED BY 0xMETA FACILITATOR</span>
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
          </nav>
        </div>

        {/* Right: Wallet Connection */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end text-[9px] font-mono text-zinc-500 uppercase tracking-wider leading-tight">
            <Link 
              href="https://github.com/0xmetaHQ/0xmeta_news_aggregator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github className="w-3 h-3" />
              <span>Github</span>
            </Link>
            <span className={cn(
              "flex items-center gap-1",
              isConnected ? "text-acid" : "text-zinc-500"
            )}>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                isConnected ? "bg-acid animate-pulse" : "bg-zinc-600"
              )}></span>
              {isConnected ? "CONNECTED" : "DISCONNECTED"}
            </span>
          </div>
          
          {!isConnected ? (
            <Button 
              onClick={handleConnect}
              disabled={isConnecting || !config}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs font-mono text-zinc-300 hover:text-white transition-all uppercase tracking-wide group disabled:opacity-50 disabled:cursor-not-allowed h-auto"
              variant="ghost"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Connecting...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Connect Wallet</span>
                  <span className="sm:hidden">Connect</span>
                </>
              )}
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-acid/30 text-xs font-mono text-acid hover:bg-zinc-800 h-auto"
                  variant="ghost"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-acid"></div>
                  <code className="hidden sm:inline">{shortenAddress(walletAddress || '')}</code>
                  <code className="sm:hidden">{walletAddress?.slice(0, 6)}...</code>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
                <DropdownMenuLabel className="font-mono text-xs text-zinc-400">
                  Wallet
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                  onClick={handleCopyAddress}
                  className="font-mono text-xs cursor-pointer focus:bg-zinc-800 focus:text-white"
                >
                  <Copy className="mr-2 h-3.5 w-3.5" />
                  <span>Copy Address</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={disconnect}
                  className="font-mono text-xs cursor-pointer focus:bg-zinc-800 focus:text-red-400"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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