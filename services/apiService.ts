// services/apiService.ts
import { AppConfig, NewsResponse, X402PaymentPayload } from '@/types';
import { API_BASE_URL } from '@/constants';

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getConfig(): Promise<AppConfig> {
    const response = await fetch(`${this.baseUrl}/api/config`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status}`);
    }

    const config = await response.json();

    // Validate and convert
    if (!config.facilitator_base_url) {
      throw new Error('Missing facilitator_base_url');
    }

    config.price_usdc_wei = String(config.price_usdc_wei);
    config.total_price_usdc_wei = String(
      parseInt(config.price_usdc_wei) + 10000
    );
    config.total_price_usdc = (
      parseFloat(config.price_usdc) + 0.01
    ).toFixed(2);

    return config;
  }

  async getNews(
    category: string,
    paymentPayload: X402PaymentPayload
  ): Promise<NewsResponse> {
    const xPaymentHeader = btoa(JSON.stringify(paymentPayload));

    const response = await fetch(`${this.baseUrl}/news/${category}`, {
      headers: {
        'X-Payment': xPaymentHeader,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Payment verification failed');
    }

    return response.json();
  }
}

export const apiService = new ApiService();