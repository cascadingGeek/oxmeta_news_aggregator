export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  url: string;
  tags?: string[];
  summary?: string;
}

export interface ColumnData {
  id: string;
  title: string;
  items: NewsItem[];
  bullishCount: number;
  bearishCount: number;
  neutralCount: number;
}

export interface UserPreferences {
  layout: '3-panel' | 'classic';
  viewMode: 'headlines' | 'recaps';
  showSentiment: boolean;
}