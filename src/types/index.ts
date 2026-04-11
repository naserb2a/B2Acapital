export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
};

export type Module = {
  id: string;
  name: string;
  description: string;
  category: ModuleCategory;
  price: number;
  author: string;
  author_id: string;
  tags: string[];
  rating: number;
  review_count: number;
  installs: number;
  created_at: string;
  updated_at: string;
};

export type ModuleCategory =
  | "signal-generation"
  | "risk-management"
  | "execution"
  | "data-feeds"
  | "backtesting"
  | "portfolio-optimization"
  | "sentiment-analysis"
  | "infrastructure";

export type Subscription = {
  id: string;
  user_id: string;
  module_id: string;
  status: "active" | "cancelled" | "expired";
  started_at: string;
  expires_at: string;
};
