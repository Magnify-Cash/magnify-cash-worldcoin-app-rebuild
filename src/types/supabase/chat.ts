export interface ChatMessage {
  id: number;
  conversation_id?: number;
  created_at: string;
  role: string;
  content: string;
  tokens_used?: number;
  metadata?: Record<string, any>;
}

export interface ChatConversation {
  id: number;
  created_at: string;
  user_session_id: string;
  context?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface ChatQuery {
  id: number;
  created_at: string;
  query: string;
  conversation_id?: number;
  response?: string;
  tokens_used?: number;
  effectiveness_score?: number;
  processing_time_ms?: number;
  metadata?: Record<string, any>;
}

export interface AIAgentMetric {
  id: number;
  created_at: string;
  message_id?: number;
  response_time_ms?: number;
  tokens_total?: number;
  context_tokens?: number;
  completion_tokens?: number;
  market_context?: Record<string, any>;
  effectiveness_score?: number;
  feedback?: Record<string, any>;
}