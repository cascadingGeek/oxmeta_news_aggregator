// constants.ts
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'ai', name: 'AI', icon: '🤖' },
  { id: 'ai_agents', name: 'AI Agents', icon: '🧠' },
  { id: 'aptos', name: 'Aptos', icon: '⚡' },
  { id: 'base', name: 'Base', icon: '🔵' },
  { id: 'bitcoin', name: 'Bitcoin', icon: '₿' },
  { id: 'crypto', name: 'Crypto', icon: '💎' },
  { id: 'dats', name: 'Dats', icon: '📊' },
  { id: 'defi', name: 'Defi', icon: '🏦' },
  { id: 'eth', name: 'ETH', icon: 'Ξ' },
  { id: 'hyperliquid', name: 'HyperLiquid', icon: '💧' },
  { id: 'machine_learning', name: 'Machine Learning', icon: '🔬' },
  { id: 'macro', name: 'Macro', icon: '🌍' },
  { id: 'whale_movement', name: 'On-chain whale wallet movement', icon: '🐋' },
  { id: 'ondo', name: 'Ondo', icon: '🏢' },
  { id: 'perp_dexs', name: 'Perp Dexs', icon: '📈' },
  { id: 'rwa', name: 'RWA', icon: '🏛️' },
  { id: 'ripple', name: 'Ripple', icon: '🌊' },
  { id: 'solana', name: 'Solana', icon: '◎' },
  { id: 'tech', name: 'Tech', icon: '💻' },
  { id: 'virtuals', name: 'Virtuals', icon: '🌐' },
  { id: 'token_listings', name: 'Token Listings', icon: '🚀' },
];

export const FREE_CATEGORIES = ['rwa', 'macro', 'virtuals'];

export const OXMETA_FEE_USDC = 0.01;
export const OXMETA_FEE_USDC_WEI = 10000;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';