export interface DefiMarketData {
  id: number;
  created_at: string;
  coin_id: string;
  symbol: string;
  name: string;
  current_price?: number;
  market_cap?: number;
  total_volume?: number;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  total_value_locked?: number;
  raw_data?: Record<string, any>;
}

export interface DefiLlamaProtocol {
  id: number;
  created_at: string;
  protocol_id: string;
  name: string;
  symbol?: string;
  category?: string;
  tvl?: number;
  change_1h?: number;
  change_1d?: number;
  change_7d?: number;
  staking?: number;
  derivatives?: number;
  raw_data?: Record<string, any>;
}

export interface DefiLlamaNews {
  id: number;
  created_at: string;
  title: string;
  link: string;
  source: string;
  published_at: string;
  category?: string;
  sentiment?: number;
  raw_data?: Record<string, any>;
}