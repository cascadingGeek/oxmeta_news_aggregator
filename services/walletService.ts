import Web3 from 'web3';
import { AppConfig, X402Authorization } from '@/types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class WalletService {
  private web3: Web3 | null = null;
  private walletAddress: string | null = null;

  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && 
           typeof window.ethereum !== 'undefined' && 
           window.ethereum.isMetaMask;
  }

  async connectWallet(): Promise<string> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask not found. Please install it.');
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    this.walletAddress = accounts[0];
    this.web3 = new Web3(window.ethereum);

    if (!this.walletAddress) {
      throw new Error('Failed to retrieve wallet address');
    }

    return this.walletAddress;
  }

  // fast reconnect without prompting if already authorized
  async reconnect(address: string): Promise<void> {
    if (!this.isMetaMaskInstalled()) return;
    this.walletAddress = address;
    this.web3 = new Web3(window.ethereum);
  }

  async switchToNetwork(config: AppConfig): Promise<void> {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: config.chain_id }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        const networkParams = {
          chainId: config.chain_id,
          chainName: config.network === 'base' ? 'Base' : 'Base Sepolia',
          nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
          rpcUrls: [config.rpc_url],
          blockExplorerUrls: [config.block_explorer],
        };

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkParams],
        });
      }
    }
  }

  async createEIP3009Authorization(config: AppConfig): Promise<{
    authorization: X402Authorization;
    signature: string;
  }> {
    if (!this.web3 || !this.walletAddress) {
      throw new Error('Wallet not connected');
    }

    const fromAddress = this.web3.utils.toChecksumAddress(this.walletAddress);
    const toAddress = this.web3.utils.toChecksumAddress(config.treasury_wallet);
    const tokenAddress = this.web3.utils.toChecksumAddress(config.usdc_address);

    const usdcContract = new this.web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [{ name: '', type: 'string' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'version',
          outputs: [{ name: '', type: 'string' }],
          type: 'function',
        },
      ],
      tokenAddress
    );

    const [tokenName, tokenVersion] = await Promise.all([
      usdcContract.methods.name().call(),
      usdcContract.methods.version().call(),
    ]);

    // Generate nonce
    const nonceBytes = new Uint8Array(32);
    window.crypto.getRandomValues(nonceBytes);
    const nonce = '0x' + Array.from(nonceBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const domain = {
      name: tokenName,
      version: tokenVersion,
      chainId: parseInt(config.chain_id, 16),
      verifyingContract: tokenAddress,
    };

    const types = {
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' },
      ],
    };

    const validAfter = '0';
    const validBefore = String(Math.floor(Date.now() / 1000) + 86400);

    const message = {
      from: fromAddress,
      to: toAddress,
      value: config.total_price_usdc_wei,
      validAfter: validAfter,
      validBefore: validBefore,
      nonce: nonce,
    };

    const signature = await window.ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [
        fromAddress,
        JSON.stringify({
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            TransferWithAuthorization: types.TransferWithAuthorization,
          },
          primaryType: 'TransferWithAuthorization',
          domain: domain,
          message: message,
        }),
      ],
    });

    return {
      authorization: {
        from: fromAddress,
        to: toAddress,
        value: config.total_price_usdc_wei,
        validAfter: String(validAfter),
        validBefore: String(validBefore),
        nonce: nonce,
        token: tokenAddress,
      },
      signature: signature,
    };
  }

  disconnect(): void {
    this.walletAddress = null;
    this.web3 = null;
  }

  getWalletAddress(): string | null {
    return this.walletAddress;
  }

  shortenAddress(addr: string): string {
    if (!addr) return '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
  }

  setupAccountListener(callback: (accounts: string[]) => void): void {
    if (this.isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  setupChainListener(callback: () => void): void {
    if (this.isMetaMaskInstalled()) {
      window.ethereum.on('chainChanged', callback);
    }
  }
}

export const walletService = new WalletService();