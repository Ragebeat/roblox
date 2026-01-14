
export type SlideType = 
  | 'title' 
  | 'list' 
  | 'chart' 
  | 'image' 
  | 'twocolumn' 
  | 'conclusion'
  | 'roadmap';

export type Language = 'ja' | 'ru';

export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  type: SlideType;
  items?: string[];
  description?: string;
  chartData?: any[];
  leftContent?: string[];
  rightContent?: string[];
  columns?: { title: string; items: string[] }[];
}

export interface BusinessIdea {
  title: string;
  target: string;
  monetization: string;
  scalability: string;
}
