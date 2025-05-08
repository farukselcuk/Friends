export interface Topic {
  id: string;
  title: string;
  category: 'mizah' | 'derin' | 'tartisma' | 'itiraf' | 'eglence';
  description?: string;
  createdAt: string;
}

export const topics: Topic[] = [
  {
    id: '1',
    title: 'En utanç verici anın neydi?',
    category: 'itiraf',
    description: 'Arkadaşlarınla paylaşabileceğin en utanç verici anını anlat.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Eğer bir süper gücün olsaydı, ne olmasını isterdin?',
    category: 'eglence',
    description: 'Ve bu gücü nasıl kullanırdın?',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Hayatında yaptığın en iyi karar neydi?',
    category: 'derin',
    description: 'Bu kararın hayatını nasıl değiştirdi?',
    createdAt: new Date().toISOString(),
  },
]; 