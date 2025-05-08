export type Topic = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export type Game = {
  id: string;
  title: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  duration: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  category: string;
  requirements?: string[];
}; 