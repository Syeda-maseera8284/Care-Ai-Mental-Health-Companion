export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment: string;
  isEmergency?: boolean;
}

export interface MoodEntry {
  date: Date;
  value: number;
  note: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'meditation' | 'breathing' | 'mindfulness' | 'physical';
  imageUrl?: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'crisis' | 'therapy' | 'self-help' | 'community';
  isEmergency?: boolean;
}