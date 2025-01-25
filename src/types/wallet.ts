export interface WalletBalance {
  id: number;
  currency: string;
  symbol: string;
  balance: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  currency: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  metadata?: Record<string, any>;
}