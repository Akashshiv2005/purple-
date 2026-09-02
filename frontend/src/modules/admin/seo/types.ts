export interface BusinessOption {
  id: number;
  business_name: string;
  category: string | null;
  city: string | null;
  keyword_count: number;
}

export interface Keyword {
  id: number;
  business_id: number;
  keyword: string;
  category: string | null;
  city: string | null;
  priority: string;
  monthly_search_volume: number | null;
  difficulty: number | null;
  status: string;
}
