import { Game } from '../types';

export const games: Game[] = [
  {
    id: '1',
    title: 'Doğruluk mu Cesaret mi',
    description: 'Klasik "Doğruluk mu Cesaret mi" oyunu. Sırayla kişiler doğruluk veya cesaret seçeneğini seçer. Doğruluk seçilirse kişiye bir soru sorulur, cesaret seçilirse yapması gereken bir görev verilir.',
    minPlayers: 2,
    maxPlayers: 20,
    category: 'Fiziksel',
    location: 'Herhangi'
  },
  {
    id: '2',
    title: 'Sessiz Sinema',
    description: 'Bir kişi, konuşmadan ve ses çıkarmadan, sadece hareketlerle bir kelime veya film anlatmaya çalışır, diğerleri tahmin eder.',
    minPlayers: 4,
    maxPlayers: 20,
    category: 'Fiziksel',
    location: 'İç Mekan'
  },
  {
    id: '3',
    title: 'Tabu',
    description: 'Bir kelimeyi, yasaklı 5 kelimeyi kullanmadan anlatmaya çalışırsınız.',
    minPlayers: 4,
    maxPlayers: 12,
    category: 'Kart',
    location: 'İç Mekan',
    materials: ['Tabu kartları veya uygulama']
  },
  {
    id: '4',
    title: 'Mafya (Köy-Kasaba)',
    description: 'Köylüler ve mafya rollerinde bir oyun. Her gece mafya bir kişiyi öldürür, gündüz ise tüm köy kimin mafya olduğunu tahmin etmeye çalışır.',
    minPlayers: 6,
    maxPlayers: 20,
    category: 'Fiziksel',
    location: 'İç Mekan'
  },
  {
    id: '5',
    title: 'Kimim Ben?',
    description: 'Her oyuncunun alnına bir ünlü kişinin adının yazılı olduğu kağıt yapıştırılır. Oyuncular sırayla evet/hayır cevaplı sorular sorarak kim olduklarını tahmin etmeye çalışırlar.',
    minPlayers: 3,
    maxPlayers: 10,
    category: 'Fiziksel',
    location: 'Herhangi',
    materials: ['Yapışkan kağıt, kalem']
  },
  {
    id: '6',
    title: 'İsim-Şehir-Hayvan-Eşya',
    description: 'Belirlenen bir harfle başlayan isim, şehir, hayvan ve eşya bulmaya çalışırsınız.',
    minPlayers: 2,
    maxPlayers: 10,
    category: 'Fiziksel',
    location: 'Herhangi',
    materials: ['Kağıt, kalem']
  },
  {
    id: '7',
    title: 'Kelime Zincirleme',
    description: 'Bir kişi bir kelime söyler, sıradaki kişi o kelimenin son harfiyle başlayan yeni bir kelime bulmalıdır.',
    minPlayers: 2,
    maxPlayers: 15,
    category: 'Fiziksel',
    location: 'Herhangi'
  },
  {
    id: '8',
    title: 'Bil Bakalım Ne Çizdim',
    description: 'Bir kişi çizer, diğerleri ne çizdiğini tahmin etmeye çalışır.',
    minPlayers: 3,
    maxPlayers: 10,
    category: 'Fiziksel',
    location: 'İç Mekan',
    materials: ['Kağıt, kalem']
  }
]; 