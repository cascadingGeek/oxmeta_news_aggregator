// hooks/useNews.ts
'use client';

import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';
import { walletService } from '@/services/walletService';
import { AppConfig, NewsResponse, X402PaymentPayload } from '@/types';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

export function useConfig() {
  return useQuery({
    queryKey: ['config'],
    queryFn: () => apiService.getConfig(),
    staleTime: Infinity, // Config rarely changes
  });
}

export function usePayAndFetchNews() {
  return useMutation({
    mutationFn: async ({
      category,
      config,
    }: {
      category: string;
      config: AppConfig;
    }) => {
      // Create EIP-3009 authorization
      const { authorization, signature } =
        await walletService.createEIP3009Authorization(config);

      // Build payment payload
      const paymentPayload: X402PaymentPayload = {
        x402Version: 1,
        scheme: 'exact',
        network: config.network,
        payload: {
          authorization,
          signature,
        },
      };

      // Fetch news with payment
      return apiService.getNews(category, paymentPayload);
    },
  });
}

export function useFetchFreeNews(category: string) {
  return useQuery({
    queryKey: ['freeNews', category],
    queryFn: () => apiService.getFreeNews(category),
    enabled: ['rwa', 'macro', 'virtuals'].includes(category),
    staleTime: 5 * 60 * 1000,
  });
}