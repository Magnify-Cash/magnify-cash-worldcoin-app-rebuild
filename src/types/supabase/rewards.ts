export interface MagRewards {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  amount: number;
  claimed: boolean;
  claim_deadline?: string;
  metadata?: Record<string, any>;
}