// ============================================================================
// EXISTING UI TYPES
// ============================================================================
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  url: string;
  tags?: string[];
  summary?: string;
}

export interface ColumnData {
  id: string;
  title: string;
  items: NewsItem[];
  bullishCount: number;
  bearishCount: number;
  neutralCount: number;
}

export interface UserPreferences {
  layout: '3-panel' | 'classic';
  viewMode: 'headlines' | 'recaps';
  showSentiment: boolean;
}

// ============================================================================
// API & PAYMENT TYPES (X402)
// ============================================================================
export interface ApiNewsItem {
  source: 'cryptonews' | 'twitter';
  title?: string;
  text: string;
  long_context?: string;
  short_context?: string;
  timestamp: number;
  tokens?: string[];
  categories?: string[];
  url?: string;
}

export interface NewsResponse {
  cryptonews: ApiNewsItem[];
  twitter: ApiNewsItem[];
}

export interface X402Authorization {
  from: string;
  to: string;
  value: string;
  validAfter: string;
  validBefore: string;
  nonce: string;
  token: string;
}

export interface X402PaymentPayload {
  x402Version: number;
  scheme: string;
  network: string;
  payload: {
    authorization: X402Authorization;
    signature: string;
  };
}

export interface AppConfig {
  facilitator_base_url: string;
  treasury_wallet: string;
  merchant_address: string;
  usdc_address: string;
  price_usdc_wei: string;
  price_usdc: number;
  total_price_usdc_wei: string;
  total_price_usdc: number;
  network: string;
  chain_id: string;
  rpc_url: string;
  block_explorer: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type PaymentStatus = 'idle' | 'authorizing' | 'verifying' | 'settling' | 'complete' | 'error';