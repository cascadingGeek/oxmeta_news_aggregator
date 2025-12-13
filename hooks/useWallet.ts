'use client';

import { useState, useEffect, useCallback } from 'react';
import { walletService } from '@/services/walletService';
import { AppConfig } from '@/types';

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkConnection = async () => {
      if (walletService.isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            await walletService.reconnect(accounts[0]);
            setIsConnected(true);
          }
        } catch (err) {
          console.error("Error checking wallet connection:", err);
        }
      }
    };

    checkConnection();

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        setIsConnected(false);
        setWalletAddress(null);
      } else {
        setWalletAddress(accounts[0]);
        await walletService.reconnect(accounts[0]);
        setIsConnected(true);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    walletService.setupAccountListener(handleAccountsChanged);
    walletService.setupChainListener(handleChainChanged);
  }, []);

  const connect = useCallback(async (config: AppConfig) => {
    setIsConnecting(true);
    setError(null);

    try {
      const address = await walletService.connectWallet();
      setWalletAddress(address);
      setIsConnected(true);
      await walletService.switchToNetwork(config);
      return address;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    walletService.disconnect();
    setWalletAddress(null);
    setIsConnected(false);
    setError(null);
  }, []);

  return {
    isConnected,
    walletAddress,
    isConnecting,
    error,
    connect,
    disconnect,
    shortenAddress: walletService.shortenAddress,
    isMetaMaskInstalled: walletService.isMetaMaskInstalled,
  };
}