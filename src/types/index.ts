export type ConversationTopic = {
  id: string;
  title: string;
  description: string;
  category: 'Mizah' | 'Derin Düşünce' | 'Tartışma' | 'İtiraf' | 'Eğlence';
  date: string;
  responses?: TopicResponse[];
};

export type TopicResponse = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
};

export type Game = {
  id: string;
  title: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  category: 'Fiziksel' | 'Digital' | 'Kart' | 'Tahta';
  materials?: string[];
  location?: 'İç Mekan' | 'Dış Mekan' | 'Herhangi';
};

export type User = {
  id: string;
  name: string;
  avatar?: string;
}; 