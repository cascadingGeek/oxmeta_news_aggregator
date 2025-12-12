'use client';

import { useState } from 'react';
import { CATEGORIES, OXMETA_FEE_USDC } from '@/constants';
import { useWallet } from '@/hooks/useWallet';
import { useConfig, usePayAndFetchNews } from '@/hooks/useNews';
// import { PaymentModal } from './PaymentModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Wallet } from 'lucide-react';
import { NewsResponse, PaymentStatus } from '@/types';

interface CategorySelectorProps {
  onNewsLoaded: (news: NewsResponse, category: string) => void;
}

export function CategorySelector({ onNewsLoaded }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: config, isLoading: configLoading } = useConfig();
  const {
    isConnected,
    walletAddress,
    isConnecting,
    connect,
    shortenAddress,
    isMetaMaskInstalled,
  } = useWallet();
  const { mutateAsync: payAndFetch, isPending: isPaymentPending } =
    usePayAndFetchNews();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'other') {
      setIsCustomModalOpen(true);
      return;
    }
    setSelectedCategory(categoryId);
  };

  const handleCustomCategorySubmit = () => {
    const trimmed = customCategory.trim().toLowerCase();

    if (!trimmed) {
      alert('⚠️ Please enter a category name');
      return;
    }

    if (!/^[a-z0-9_-]+$/.test(trimmed)) {
      alert(
        '⚠️ Category name can only contain letters, numbers, hyphens, and underscores'
      );
      return;
    }

    setSelectedCategory(trimmed);
    setIsCustomModalOpen(false);
    setCustomCategory('');
  };

  const handleConnectWallet = async () => {
    if (!config) return;

    try {
      await connect(config);
    } catch (error: any) {
      alert('❌ Failed to connect: ' + error.message);
    }
  };

  const handlePayment = async () => {
    if (!selectedCategory || !config) return;

    try {
      setIsPaymentModalOpen(true);
      setPaymentStatus('authorizing');
      setPaymentMessage('🔐 Creating EIP-3009 authorization...');

      await new Promise((resolve) => setTimeout(resolve, 500));

      setPaymentStatus('verifying');
      setPaymentMessage('📦 Building X-Payment header...');

      await new Promise((resolve) => setTimeout(resolve, 800));

      setPaymentStatus('settling');
      setPaymentMessage('⚡ Verifying and settling payment...');

      const newsData = await payAndFetch({
        category: selectedCategory,
        config,
      });

      setPaymentStatus('complete');
      setPaymentMessage('✅ Payment successful! Loading news...');

      await new Promise((resolve) => setTimeout(resolve, 500));

      onNewsLoaded(newsData, selectedCategory);
      setIsPaymentModalOpen(false);
    } catch (error: any) {
      setPaymentStatus('error');
      setPaymentMessage(`❌ ${error.message}`);
      setTimeout(() => {
        setIsPaymentModalOpen(false);
        setPaymentStatus('idle');
      }, 3000);
    }
  };

  if (configLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">📂 Select a Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                p-4 rounded-lg border-2 transition-all hover:scale-105
                ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }
              `}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Info */}
      {config && (
        <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Content Access:</span>
            <strong>{config.price_usdc} USDC</strong>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">0xMeta Facilitator Fee:</span>
            <span>{OXMETA_FEE_USDC} USDC</span>
          </div>
          <div className="flex justify-between text-base border-t border-gray-700 pt-2">
            <span className="font-semibold">Total Payment:</span>
            <strong className="text-blue-400">{config.total_price_usdc} USDC</strong>
          </div>
        </div>
      )}

      {/* Wallet Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">💳 Connect Your Wallet</h3>

        {!isMetaMaskInstalled() && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-400">
            ❌ MetaMask not found. Please install it to continue.
          </div>
        )}

        {!isConnected ? (
          <Button
            onClick={handleConnectWallet}
            disabled={isConnecting || !isMetaMaskInstalled()}
            className="w-full"
            size="lg"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect MetaMask
              </>
            )}
          </Button>
        ) : (
          <>
            <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
              <span className="text-sm text-gray-400">✅ Connected:</span>
              <code className="text-sm font-mono text-blue-400">
                {shortenAddress(walletAddress!)}
              </code>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!selectedCategory || isPaymentPending}
              className="w-full"
              size="lg"
              variant="default"
            >
              {isPaymentPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  💰 Pay {config?.total_price_usdc} USDC & Access News
                </>
              )}
            </Button>
          </>
        )}
      </div>

      {/* Custom Category Modal */}
      <Dialog open={isCustomModalOpen} onOpenChange={setIsCustomModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>✨ Enter Custom Category</DialogTitle>
            <DialogDescription>
              Enter a custom category name to search for specific crypto news
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="e.g., layer2, dao, privacy, etc."
              maxLength={50}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCustomCategorySubmit();
              }}
            />
            <p className="text-xs text-gray-500">
              💡 Examples: layer2, dao, privacy, metaverse, web3, zkp
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCustomModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCustomCategorySubmit}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      {/* 
      <PaymentModal
        isOpen={isPaymentModalOpen}
        status={paymentStatus}
        message={paymentMessage}
        onClose={() => setIsPaymentModalOpen(false)}
      /> 
      */}
    </div>
  );
}