'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { walletService } from '@/services/walletService';
import { AppConfig } from '@/types';

const WALLET_CONNECTION_KEY = 'wallet_connection_state';

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasRestoredRef = useRef(false);

  // Check if user previously connected and restore connection
  useEffect(() => {
    if (typeof window === 'undefined' || hasRestoredRef.current) return;

    const restoreConnection = async () => {
      // Check if user previously connected (stored in localStorage)
      const wasConnected = localStorage.getItem(WALLET_CONNECTION_KEY);
      
      if (!wasConnected || wasConnected !== 'true') {
        hasRestoredRef.current = true;
        return;
      }

      if (!walletService.isMetaMaskInstalled()) {
        localStorage.removeItem(WALLET_CONNECTION_KEY);
        hasRestoredRef.current = true;
        return;
      }

      try {
        // Wait for MetaMask to be ready
        await new Promise(resolve => setTimeout(resolve, 100));

        // Use eth_accounts which doesn't trigger popup
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });

        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          await walletService.reconnect(accounts[0]);
          setIsConnected(true);
        } else {
          // No accounts found, clear stored state
          localStorage.removeItem(WALLET_CONNECTION_KEY);
        }
      } catch (err) {
        console.error("Error restoring wallet connection:", err);
        localStorage.removeItem(WALLET_CONNECTION_KEY);
      } finally {
        hasRestoredRef.current = true;
      }
    };

    restoreConnection();
  }, []);

  // Setup event listeners
  useEffect(() => {
    if (typeof window === 'undefined' || !walletService.isMetaMaskInstalled()) {
      return;
    }

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected from MetaMask
        setIsConnected(false);
        setWalletAddress(null);
        localStorage.removeItem(WALLET_CONNECTION_KEY);
      } else {
        // Account switched
        const wasConnected = localStorage.getItem(WALLET_CONNECTION_KEY);
        if (wasConnected === 'true') {
          setWalletAddress(accounts[0]);
          await walletService.reconnect(accounts[0]);
          setIsConnected(true);
        }
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    walletService.setupAccountListener(handleAccountsChanged);
    walletService.setupChainListener(handleChainChanged);

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const connect = useCallback(async (config: AppConfig) => {
    setIsConnecting(true);
    setError(null);

    try {
      const address = await walletService.connectWallet();
      setWalletAddress(address);
      setIsConnected(true);
      
      // Store connection state
      localStorage.setItem(WALLET_CONNECTION_KEY, 'true');
      
      await walletService.switchToNetwork(config);
      return address;
    } catch (err: any) {
      setError(err.message);
      localStorage.removeItem(WALLET_CONNECTION_KEY);
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
    
    // Clear connection state
    localStorage.removeItem(WALLET_CONNECTION_KEY);
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