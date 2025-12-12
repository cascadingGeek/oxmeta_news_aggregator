# 0xMeta News Aggregator - X402 Integration

High-performance crypto news terminal with X402 payment integration powered by 0xMeta Facilitator.

## 🚀 Features

- **X402 Payment Protocol**: Gasless USDC payments using EIP-3009
- **21 Crypto Categories**: AI, AI Agents, Aptos, Base, Bitcoin, Crypto, Dats, DeFi, ETH, HyperLiquid, Machine Learning, Macro, Whale Movements, Ondo, Perp DEXs, RWA, Ripple, Solana, Tech, Virtuals, Token Listings
- **Individual Category Payments**: Pay only for the categories you want to access
- **Smart Wallet Connection**: Auto-connect wallet when attempting payment
- **MetaMask Integration**: Seamless wallet connection and payment signing
- **Base Network**: Optimized for Base Sepolia (testnet) and Base Mainnet
- **AI-Powered Briefings**: Gemini 2.5 Flash analysis of market trends
- **Modern UI**: Built with Next.js 16, Tailwind CSS, and shadcn/ui
- **Beautiful Loading States**: Animated skeleton screens with shimmer effects

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MetaMask browser extension
- USDC tokens on Base Sepolia (for testing)
- Backend API running (FastApi app from provided codebase)

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install
```

Required packages:
- `@tanstack/react-query` - API state management
- `web3` - Ethereum interaction
- `@google/genai` - AI briefing generation
- `eth-utils` - Address validation
- shadcn/ui components

### 2. Environment Setup

Create `.env.local`:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080

# Gemini API for AI briefings (optional)
API_KEY=your_gemini_api_key_here
```

## 🎯 How It Works

### New User Flow

1. **Click Category**: Select any category from the filter pills or click directly on a card
2. **Click "Pay & Access"**: Button appears on each locked category card
3. **Auto Wallet Connect**: If not connected, MetaMask prompts automatically
4. **Authorize Payment**: Sign EIP-3009 authorization (no gas!)
5. **View Content**: News loads instantly into the category card

### Payment Flow Details

1. **Wallet Check**: System checks if wallet is connected
   - If not → Auto-prompts MetaMask connection
   - If yes → Proceeds to payment
2. **EIP-3009 Authorization**: Creates typed signature for USDC transfer
3. **X-Payment Header**: Builds X402 payment payload
4. **API Request**: Sends payment header to `/news/{category}` endpoint
5. **Verification**: 0xMeta Facilitator verifies and settles payment
6. **Content Delivery**: News items populate the category card
7. **Visual Feedback**: Loading skeleton → Shimmer animation → Content

### Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│             │         │              │         │             │
│   Next.js   │────────▶│   FastApi API  │────────▶│   0xMeta    │
│  Frontend   │ X-Payment│   Backend    │  Verify │ Facilitator │
│             │◀────────│              │◀────────│             │
└─────────────┘  News   └──────────────┘         └─────────────┘
```

## 📁 Project Structure

```
0xmeta_news_aggregator/
├── app/
│   ├── actions.ts              # Server actions (Gemini AI)
│   ├── layout.tsx              # Root layout with QueryProvider
│   ├── page.tsx                # Main page with payment integration
│   └── globals.css             # Global styles + shimmer animations
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── CategoryPills.tsx       # Category filter pills
│   ├── EmptyNewsColumn.tsx     # Empty state with Pay & Access button
│   ├── NewsCard.tsx            # Individual news item
│   ├── NewsColumn.tsx          # Populated news column layout
│   ├── NewsColumnSkeleton.tsx  # Animated loading state
│   ├── NewsDetailModal.tsx     # Displays news details
│   ├── QueryProvider.tsx       # TanStack Query setup
│   ├── TerminalHeader.tsx      # App header with wallet connection
│   └── Toolbar.tsx             # Search and controls
├── hooks/
│   ├── useNews.ts              # TanStack Query hooks
│   └── useWallet.ts            # Wallet management
├── services/
│   ├── apiService.ts           # API integration
│   ├── geminiService.ts        # AI briefing service
│   └── walletService.ts        # Web3 & EIP-3009
├── lib/
│   └── utils.ts                # Utility functions
├── constants.ts                # 21 categories configuration
├── types.ts                    # TypeScript definitions
└── .env.local                  # Environment variables
```

## 🎮 Usage

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### User Journey

1. **Open App**: Browse all 21 categories 
2. **Select**: Click on any category button of interest
3. **Pay**: Click "Pay & Access" button on the card
4. **Connect** (if needed): MetaMask auto-prompts for connection
5. **Authorize**: Sign the payment authorization
6. **Enjoy**: News loads with beautiful shimmer animation

### Testing Payment Flow

1. Ensure you have Base Sepolia USDC (minimum 0.02 USDC)
2. Click any category's "Pay & Access" button
3. If wallet not connected, MetaMask will prompt automatically
4. Approve the USDC authorization signature (no gas!)
5. Watch the shimmer animation as payment processes
6. News populates the card instantly

### Getting Test USDC

For Base Sepolia testing:
1. Bridge Sepolia ETH to Base Sepolia
2. Swap for test USDC at Base Sepolia faucet or DEX
3. Ensure you have at least 0.02 USDC per category

## 🎨 UI Features

### Empty State Cards
- All category buttons displayed 
- "AWAITING SIGNAL" placeholder text
- Lock icon indicating paid content
- "Pay & Access" button prominently displayed
- Pricing information (0.02 USDC total)

### Loading States
- Beautiful shimmer animations
- Pulsing skeleton screens
- Wave animations on sentiment bars
- Staggered loading effects

### Wallet Integration
- "Connect Wallet" button in header
- Real-time connection status indicator
- Shortened address display when connected
- Auto-connect on payment attempt

### Category Management
- Filter by category using pills
- "ALL SECTORS" shows everything
- Paid categories remain accessible
- Smooth transitions and animations

## 🔑 Key Components Explained

### `EmptyNewsColumn.tsx`
New component for locked categories:
- Displays category name and lock icon
- Shows "Pay & Access" button
- Displays pricing information
- Handles loading state during payment

### `NewsColumnSkeleton.tsx`
Beautiful loading animation:
- Shimmer effects on all elements
- Pulsing animations
- Staggered timing for realism
- Matches actual column layout

### `TerminalHeader.tsx`
Simplified header:
- "Connect Wallet" button only
- Shows connection status
- Displays wallet address when connected
- No payment modal trigger

### `app/page.tsx`
Main application logic:
- Displays all 21 categories by default
- Manages payment state per category
- Auto-connects wallet when needed
- Transforms API data to UI format
- Handles loading states

## 🔒 Security Notes

- **Never commit private keys**: Use environment variables
- **Client-side signing only**: Private keys never leave browser
- **EIP-3009 benefits**: No direct USDC approval needed, gasless
- **0xMeta Facilitator**: Handles settlement securely
- **Auto wallet connection**: Only prompts when needed
- **Treasury wallet**: Checksummed addresses required

## 🎨 Customization

### Adding New Categories

Edit `constants.ts`:

```typescript
export const CATEGORIES: Category[] = [
  // ... existing categories
  { id: 'new_category', name: 'New Category', icon: '🆕' },
];
```

### Changing Payment Amounts

Backend controls pricing via `PRICE_PER_REQUEST` in `.env`:

```bash
PRICE_PER_REQUEST=10000  # 0.01 USDC (6 decimals)
```

### Customizing Animations

Edit `globals.css` to modify shimmer timing:

```css
.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
  /* Change 2s to your preferred speed */
}
```

## 📚 API Endpoints

### `GET /api/config`
Returns app configuration (network, addresses, pricing)

### `GET /news/{category}`
Requires `X-Payment` header with X402 payload
Returns `NewsResponse` with cryptonews and twitter items

**Supported Categories:**
ai, ai_agents, aptos, base, bitcoin, crypto, dats, defi, eth, hyperliquid, machine_learning, macro, whale_movement, ondo, perp_dexs, rwa, ripple, solana, tech, virtuals, token_listings

## 🐛 Troubleshooting

### MetaMask Not Detected
- Ensure MetaMask extension is installed
- Refresh page after installation
- Check browser console for errors

### Wallet Doesn't Connect on Payment
- Make sure MetaMask is unlocked
- Check that you're on the correct network
- Try clicking "Connect Wallet" manually first

### Payment Fails
- Verify USDC balance (minimum 0.02 USDC)
- Check network (must be Base Sepolia/Mainnet)
- Ensure backend API is running
- Check treasury wallet address is correct

### News Not Loading
- Open browser console for error details
- Verify API endpoint URL in `.env.local`
- Check backend logs for payment verification issues
- Ensure category name matches backend valid categories

### Shimmer Animation Not Working
- Check that `globals.css` animations are loaded
- Verify Tailwind configuration
- Clear browser cache
- Check browser console for CSS errors

## 📖 Learn More

- [X402 Protocol](https://www.x402.org/)
- [0xMeta Facilitator](https://facilitator.0xmeta.ai)
- [EIP-3009](https://eips.ethereum.org/EIPS/eip-3009)
- [Base Network](https://base.org)
- [Next.js Docs](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query)

## 🎯 Design Decisions

### Why In-Card Payment Buttons?
- Reduces friction in payment flow
- Clear call-to-action on each category
- Better mobile experience
- No modal interruption

### Why Auto-Connect?
- Seamless user experience
- Reduces steps in payment flow
- Progressive enhancement approach
- Users only connect when needed

## 📄 License

MIT License - see backend repo for full license details

## 🤝 Contributing

This is an integration example. For production use:
1. Add proper error boundaries
2. Implement retry logic with exponential backoff
3. Add transaction monitoring and receipts
4. Set up analytics and tracking
5. Add rate limiting on frontend
6. Implement session management
7. Add payment history tracking
8. Add receipt download functionality
9. Implement refund mechanism
10. Add comprehensive error messages

---

Built with ❤️ using Next.js 16, X402 Protocol, and 0xMeta Facilitator