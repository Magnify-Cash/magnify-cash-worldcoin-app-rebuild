export interface TokenMetadata {
  id: number;
  created_at: string;
  symbol: string;
  name: string;
  coingecko_id?: string;
  description?: string;
  categories?: string[];
  platforms?: Record<string, any>;
  market_data?: Record<string, any>;
  last_updated?: string;
  metadata?: Record<string, any>;
}

export interface MagTokenAnalytics {
  id: number;
  created_at: string;
  price?: number;
  total_supply?: number;
  circulating_supply?: number;
  holders_count?: number;
  transactions_24h?: number;
  volume_24h?: number;
  market_cap?: number;
  raw_data?: Record<string, any>;
}