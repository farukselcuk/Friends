export interface Game {
  id: string;
  title: string;
  minPlayers: number;
  maxPlayers: number;
  category: 'kart' | 'kelime' | 'rol' | 'strateji' | 'parti';
  description: string;
  requirements?: string[];
  isDigital: boolean;
}

export const games: Game[] = [
  {
    id: '1',
    title: 'Doğruluk mu Cesaret mi',
    minPlayers: 2,
    maxPlayers: 10,
    category: 'parti',
    description: 'Klasik bir parti oyunu. Sırayla doğruluk veya cesaret seçeneklerinden birini seçin.',
    requirements: ['Boş şişe'],
    isDigital: false,
  },
  {
    id: '2',
    title: 'Sessiz Sinema',
    minPlayers: 4,
    maxPlayers: 12,
    category: 'kelime',
    description: 'Bir kişi film adını seçer ve diğerleri tahmin etmeye çalışır.',
    isDigital: false,
  },
  {
    id: '3',
    title: 'Mafya',
    minPlayers: 6,
    maxPlayers: 20,
    category: 'rol',
    description: 'Gizli rollerle oynanan bir sosyal dedüksiyon oyunu.',
    requirements: ['Kartlar'],
    isDigital: false,
  },
  {
    id: '4',
    title: 'Tabu',
    description: 'Bir kelimeyi, yasaklı 5 kelimeyi kullanmadan anlatmaya çalışırsınız.',
    minPlayers: 4,
    maxPlayers: 12,
    category: 'kart',
    location: 'İç Mekan',
    materials: ['Tabu kartları veya uygulama']
  },
  {
    id: '5',
    title: 'Kimim Ben?',
    description: 'Her oyuncunun alnına bir ünlü kişinin adının yazılı olduğu kağıt yapıştırılır. Oyuncular sırayla evet/hayır cevaplı sorular sorarak kim olduklarını tahmin etmeye çalışırlar.',
    minPlayers: 3,
    maxPlayers: 10,
    category: 'kelime',
    location: 'Herhangi',
    materials: ['Yapışkan kağıt, kalem']
  },
  {
    id: '6',
    title: 'İsim-Şehir-Hayvan-Eşya',
    description: 'Belirlenen bir harfle başlayan isim, şehir, hayvan ve eşya bulmaya çalışırsınız.',
    minPlayers: 2,
    maxPlayers: 10,
    category: 'kelime',
    location: 'Herhangi',
    materials: ['Kağıt, kalem']
  },
  {
    id: '7',
    title: 'Kelime Zincirleme',
    description: 'Bir kişi bir kelime söyler, sıradaki kişi o kelimenin son harfiyle başlayan yeni bir kelime bulmalıdır.',
    minPlayers: 2,
    maxPlayers: 15,
    category: 'kelime',
    location: 'Herhangi'
  },
  {
    id: '8',
    title: 'Bil Bakalım Ne Çizdim',
    description: 'Bir kişi çizer, diğerleri ne çizdiğini tahmin etmeye çalışır.',
    minPlayers: 3,
    maxPlayers: 10,
    category: 'kelime',
    location: 'İç Mekan',
    materials: ['Kağıt, kalem']
  }
]; 