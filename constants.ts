import { ColumnData } from './types';

// Helper to create consistent mock items with rich summaries
const createItem = (id: string, title: string, source: string, time: string, sentiment: 'bullish' | 'bearish' | 'neutral') => ({
  id, 
  title, 
  source, 
  time, 
  sentiment, 
  url: "#",
  summary: `> INCOMING SIGNAL DETECTED FROM [${source.toUpperCase()}]\n> TIMESTAMP: ${new Date().toISOString()}\n> ANALYSIS: Significant on-chain movement correlated with social sentiment volume. Liquidity depths appearing stable. 0xMeta nodes are tracking this event for potential alpha generation.`
});

export const CATEGORIES: ColumnData[] = [
  {
    id: 'agents',
    title: 'AI AGENTS',
    bullishCount: 12,
    bearishCount: 2,
    neutralCount: 4,
    items: [
      createItem('a1', 'Truth Terminal validates first on-chain inference for GOAT token burn', 'Etherscan', '2m', 'bullish'),
      createItem('a2', 'Zerebro launches automated liquidity rebalancing on Base L2', 'Mirror', '15m', 'bullish'),
      createItem('a3', 'AI Agent "Luna" suffers bridging exploit, 20ETH lost', 'Rekt', '4h', 'bearish'),
      createItem('a4', 'Standardizing Agent-to-Agent communication protocols (ERC-7521)', 'Ethereum Mag', '6h', 'neutral'),
    ]
  },
  {
    id: 'virtuals',
    title: 'VIRTUALS',
    bullishCount: 8,
    bearishCount: 1,
    neutralCount: 3,
    items: [
      createItem('v1', 'Virtuals Protocol crosses $100M TVL as AI idol narrative heats up', 'DefiLlama', '1h', 'bullish'),
      createItem('v2', 'Simulacrum v2 brings high-fidelity avatars to web browsers', 'TechCrunch', '3h', 'bullish'),
      createItem('v3', 'V-Tuber DAO governance proposal fails to reach quorum', 'Snapshot', '1d', 'neutral'),
    ]
  },
  {
    id: 'x402',
    title: 'X402 ECOSYSTEM',
    bullishCount: 42,
    bearishCount: 0,
    neutralCount: 1,
    items: [
      createItem('x1', '0xMeta facilitator x402 activates new liquidity grid', 'X402.sys', 'Now', 'bullish'),
      createItem('x2', 'Mainnet expansion: x402 nodes reporting 99.9% uptime', 'NodeWatch', '10m', 'bullish'),
      createItem('x3', 'Governance: Proposal to increase burn rate by 0.5%', 'Forum', '2h', 'bullish'),
      createItem('x4', 'Strategic partnership with major DePIN provider announced', 'Medium', '5h', 'bullish'),
    ]
  },
  {
    id: 'solana',
    title: 'SOLANA',
    bullishCount: 15,
    bearishCount: 8,
    neutralCount: 5,
    items: [
      createItem('s1', 'Solana network hits 4,000 TPS amidst meme coin frenzy', 'SolanaFM', '30m', 'bullish'),
      createItem('s2', 'Jito validator tips reach all-time high', 'Dune', '1h', 'bullish'),
      createItem('s3', 'Congestion issues reported on Jupiter aggregator', 'Status', '2h', 'bearish'),
    ]
  },
  {
    id: 'btc',
    title: 'BITCOIN',
    bullishCount: 5,
    bearishCount: 5,
    neutralCount: 10,
    items: [
      createItem('b1', 'BTC ETF inflows turn net positive for 5th consecutive day', 'Farside', '4h', 'bullish'),
      createItem('b2', 'Miners selling pressure increases as hashrate hits new ATH', 'Glassnode', '6h', 'bearish'),
      createItem('b3', 'MicroStrategy acquires additional 12,000 BTC', 'SEC Filing', '12h', 'bullish'),
    ]
  },
  {
    id: 'base',
    title: 'BASE ECOSYSTEM',
    bullishCount: 20,
    bearishCount: 2,
    neutralCount: 6,
    items: [
      createItem('ba1', 'Base daily active addresses flip Arbitrum', 'L2Beat', '2h', 'bullish'),
      createItem('ba2', 'Coinbase smart wallet rollout accelerates on-chain adoption', 'Coinbase Blog', '5h', 'bullish'),
      createItem('ba3', 'Friend.tech v2 migration causes confusion among users', 'X.com', '1d', 'bearish'),
    ]
  },
  {
    id: 'icm',
    title: 'INTERNET CAPITAL MARKETS',
    bullishCount: 9,
    bearishCount: 3,
    neutralCount: 7,
    items: [
      createItem('i1', 'Algorithmically managed treasuries outperform S&P500 YTD', 'Messari', '3h', 'bullish'),
      createItem('i2', 'Stripe acquires Bridge for stablecoin payment rails', 'TechCrunch', '1d', 'bullish'),
      createItem('i3', 'Regulatory uncertainty clouds permissionless lending pools', 'Coindesk', '2d', 'bearish'),
    ]
  },
  {
    id: 'prediction',
    title: 'PREDICTION MARKETS',
    bullishCount: 14,
    bearishCount: 1,
    neutralCount: 2,
    items: [
      createItem('p1', 'Prediction volume hits $2B in October', 'The Block', '1h', 'bullish'),
      createItem('p2', 'New "Futarchy" governance model adopted by major DAO', 'Tally', '6h', 'bullish'),
      createItem('p3', 'Limit order books coming to major prediction AMMs', 'Swap', '12h', 'neutral'),
    ]
  },
  {
    id: 'polymarket',
    title: 'POLYMARKET ECO',
    bullishCount: 11,
    bearishCount: 4,
    neutralCount: 5,
    items: [
      createItem('pm1', 'Polymarket odds now cited on major news networks', 'CNBC', '30m', 'bullish'),
      createItem('pm2', 'Whale bets $5M on election outcome via Polymarket', 'Whale Alert', '2h', 'neutral'),
      createItem('pm3', 'French regulator investigates gambling compliance', 'Reuters', '1d', 'bearish'),
    ]
  },
  {
    id: 'rwa',
    title: 'REAL WORLD ASSETS',
    bullishCount: 7,
    bearishCount: 0,
    neutralCount: 8,
    items: [
      createItem('r1', 'BlackRock tokenized fund BUIDL reaches $500M AUM', 'Bloomberg', '1h', 'bullish'),
      createItem('r2', 'Ondo Finance integrates with major custodian', 'Ondo Blog', '4h', 'bullish'),
      createItem('r3', 'Tokenized Treasury Bills yield spread narrows', 'RWA.xyz', '1d', 'neutral'),
    ]
  }
];