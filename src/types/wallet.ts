export interface MiniAppWalletAuthPayload {
  wallet: string;
}

export interface MiniAppWalletAuthErrorPayload {
  error: string;
}

export interface WalletBalance {
  id: number;
  currency: string;
  symbol: string;
  balance: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  created_at: string;
  user_id?: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  currency: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
}