// Zorluk seviyesi tanımlaması
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameType = 'tabu' | 'charades' | 'wordGame' | 'quiz' | 'cityName';

// Tabu kelimeleri
export const tabuWords = [
  {
    text: 'FUTBOL',
    category: 'Spor',
    difficulty: 'easy' as Difficulty,
    forbiddenWords: ['Top', 'Saha', 'Gol', 'Oyuncu', 'Maç'],
    type: 'tabu' as GameType,
  },
  {
    text: 'PIZZA',
    category: 'Yemek',
    difficulty: 'easy' as Difficulty,
    forbiddenWords: ['İtalyan', 'Hamur', 'Peynir', 'Domates', 'Yemek'],
    type: 'tabu' as GameType,
  },
  {
    text: 'TELEFON',
    category: 'Teknoloji',
    difficulty: 'easy' as Difficulty,
    forbiddenWords: ['Arama', 'Konuşma', 'Cihaz', 'Mobil', 'İletişim'],
    type: 'tabu' as GameType,
  },
  {
    text: 'KAHVE',
    category: 'İçecek',
    difficulty: 'medium' as Difficulty,
    forbiddenWords: ['İçecek', 'Sıcak', 'Kafein', 'Fincan', 'Türk'],
    type: 'tabu' as GameType,
  },
  {
    text: 'SİNEMA',
    category: 'Eğlence',
    difficulty: 'medium' as Difficulty,
    forbiddenWords: ['Film', 'Salon', 'Bilet', 'İzleme', 'Koltuk'],
    type: 'tabu' as GameType,
  },
  {
    text: 'SAAT',
    category: 'Eşya',
    difficulty: 'medium' as Difficulty,
    forbiddenWords: ['Zaman', 'Akrep', 'Yelkovan', 'Kol', 'Duvar'],
    type: 'tabu' as GameType,
  },
  {
    text: 'YAĞMUR',
    category: 'Doğa',
    difficulty: 'hard' as Difficulty,
    forbiddenWords: ['Su', 'Gökyüzü', 'Bulut', 'Islanmak', 'Şemsiye'],
    type: 'tabu' as GameType,
  },
  {
    text: 'INTERNET',
    category: 'Teknoloji',
    difficulty: 'hard' as Difficulty,
    forbiddenWords: ['Ağ', 'Web', 'Bağlantı', 'Tarayıcı', 'Google'],
    type: 'tabu' as GameType,
  }
];

// Sessiz Sinema kelimeleri
export const charadesWords = [
  {
    text: 'UYUYAKALMAK',
    category: 'Eylem',
    difficulty: 'easy' as Difficulty,
    description: 'Yatakta ya da koltukta başımıza gelen durum',
    type: 'charades' as GameType,
  },
  {
    text: 'SÜPERMAN',
    category: 'Karakter',
    difficulty: 'easy' as Difficulty,
    description: 'Uçan süper kahraman',
    type: 'charades' as GameType,
  },
  {
    text: 'DONDURMA YEMEK',
    category: 'Eylem',
    difficulty: 'easy' as Difficulty,
    description: 'Yaz aylarında yapılan ferahlatıcı aktivite',
    type: 'charades' as GameType,
  },
  {
    text: 'FOTOĞRAF ÇEKMEK',
    category: 'Eylem',
    difficulty: 'medium' as Difficulty,
    description: 'Kamera veya telefonla yapılan eylem',
    type: 'charades' as GameType,
  },
  {
    text: 'AĞAÇ TIRMANMAK',
    category: 'Eylem',
    difficulty: 'medium' as Difficulty,
    description: 'Çocukların parkta yaptığı eğlenceli aktivite',
    type: 'charades' as GameType,
  },
  {
    text: 'MARANGOZ',
    category: 'Meslek',
    difficulty: 'medium' as Difficulty,
    description: 'Ahşap işleriyle uğraşan kişi',
    type: 'charades' as GameType,
  },
  {
    text: 'ZİL ÇALMAK',
    category: 'Eylem',
    difficulty: 'hard' as Difficulty,
    description: 'Bir kapıya gelince yapılan eylem',
    type: 'charades' as GameType,
  },
  {
    text: 'KORKU FİLMİ İZLEMEK',
    category: 'Eylem',
    difficulty: 'hard' as Difficulty,
    description: 'Genelde gece yapılan ve bazen korkutucu olabilen aktivite',
    type: 'charades' as GameType,
  }
];

// Kelime Oyunu kelimeleri
export const wordGameWords = [
  {
    text: 'ATMOSFER',
    category: 'Bilim',
    difficulty: 'medium' as Difficulty,
    hints: ['Dünyayı saran gaz tabakası', 'İçinde oksijen bulunur', 'Uzayı dünyadan ayırır'],
    points: 10,
    type: 'wordGame' as GameType,
  },
  {
    text: 'DİPLOMASİ',
    category: 'Politika',
    difficulty: 'hard' as Difficulty,
    hints: ['Ülkeler arası ilişkiler', 'Barışçıl yöntemlerle sorun çözme', 'Büyükelçilerin yaptığı iş'],
    points: 15,
    type: 'wordGame' as GameType,
  },
  {
    text: 'KÜTÜPHANE',
    category: 'Eğitim',
    difficulty: 'easy' as Difficulty,
    hints: ['Kitapların bulunduğu yer', 'Sessiz olunması gereken mekan', 'Okuma yapılan alan'],
    points: 5,
    type: 'wordGame' as GameType,
  }
];

// İsim Şehir kategorileri
export const cityNameCategories = [
  { 
    name: 'İsim',
    examples: ['Ali', 'Berna', 'Canan', 'Deniz', 'Emre']
  },
  { 
    name: 'Şehir',
    examples: ['Ankara', 'Bursa', 'Çanakkale', 'Denizli', 'Eskişehir']
  },
  { 
    name: 'Hayvan',
    examples: ['Aslan', 'Balina', 'Ceylan', 'Deve', 'Eşek']
  },
  { 
    name: 'Eşya',
    examples: ['Ayna', 'Bardak', 'Cüzdan', 'Dolap', 'El feneri']
  },
  { 
    name: 'Ülke',
    examples: ['Almanya', 'Brezilya', 'Cezayir', 'Danimarka', 'Ermenistan']
  }
];

// Bilgi Yarışması soruları
export const quizQuestions = [
  {
    question: 'Türkiye\'nin başkenti neresidir?',
    options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'],
    correctAnswer: 'Ankara',
    category: 'Coğrafya',
    difficulty: 'easy' as Difficulty,
    points: 5,
    type: 'quiz' as GameType,
  },
  {
    question: 'Hangisi bir programlama dilidir?',
    options: ['HTML', 'CSS', 'JavaScript', 'Excel'],
    correctAnswer: 'JavaScript',
    category: 'Teknoloji',
    difficulty: 'medium' as Difficulty,
    points: 10,
    type: 'quiz' as GameType,
  },
  {
    question: 'Hangisi Nobel ödülü kategorilerinden biri değildir?',
    options: ['Fizik', 'Edebiyat', 'Matematik', 'Kimya'],
    correctAnswer: 'Matematik',
    category: 'Genel Kültür',
    difficulty: 'hard' as Difficulty,
    points: 15,
    type: 'quiz' as GameType,
  }
];

// Oyun bilgileri
export const gameInfoList = [
  {
    id: 'tabu',
    title: 'Tabu',
    description: 'Yasaklı kelimeleri kullanmadan bir kelimeyi anlatmaya çalıştığınız eğlenceli takım oyunu.',
    minPlayers: 4,
    maxPlayers: 10,
    duration: 30,
    difficulty: 'medium' as Difficulty,
    category: 'Kelime Oyunu',
    hasPlayableVersion: true,
    rules: [
      'İki takım oluşturulur',
      'Sırayla her takımdan bir kişi anlatıcı olur',
      'Anlatıcı, yasaklı kelimeleri kullanmadan kartı anlatmaya çalışır',
      'Tabu kelimelerden birini kullanırsa pas geçilir',
      'Süre dolduğunda sıra diğer takıma geçer'
    ],
    image: 'tabu.png'
  },
  {
    id: 'charades',
    title: 'Sessiz Sinema',
    description: 'Konuşmadan, sadece jest ve mimiklerle bir kelime veya cümleyi anlatmaya çalıştığınız klasik parti oyunu.',
    minPlayers: 4,
    maxPlayers: 20,
    duration: 30,
    difficulty: 'easy' as Difficulty,
    category: 'Taklit Oyunu',
    hasPlayableVersion: true,
    rules: [
      'İki takım oluşturulur',
      'Her takımdan bir kişi anlatıcı olur',
      'Anlatıcı, konuşmadan sadece hareketlerle kelimeyi anlatır',
      'Takım arkadaşları kelimeyi tahmin etmeye çalışır',
      'Süre dolduğunda sıra diğer takıma geçer'
    ],
    image: 'charades.png'
  },
  {
    id: 'bottleSpin',
    title: 'Şişe Çevirmece',
    description: 'Bir şişeyi çevirerek kimin kime soru soracağını belirlediğiniz eğlenceli tanışma oyunu.',
    minPlayers: 3,
    maxPlayers: 10,
    duration: 20,
    difficulty: 'easy' as Difficulty,
    category: 'Sosyal Oyun',
    hasPlayableVersion: true,
    rules: [
      'Oyuncular daire şeklinde oturur',
      'Şişe çevrilir ve kimi gösterirse o kişi soru sorar',
      'Soruya cevap vermek zorunludur',
      'Soru cevaplandıktan sonra şişeyi çeviren kişi değişir'
    ],
    image: 'bottleSpin.png'
  },
  {
    id: 'cityName',
    title: 'İsim Şehir',
    description: 'Belirli kategorilerde verilen harfle başlayan kelimeler bulmaya çalıştığınız hızlı düşünme oyunu.',
    minPlayers: 2,
    maxPlayers: 10,
    duration: 15,
    difficulty: 'medium' as Difficulty,
    category: 'Kelime Oyunu',
    hasPlayableVersion: false,
    rules: [
      'Bir harf belirlenir',
      'Oyuncular belirlenen kategorilerde o harfle başlayan kelimeler yazar',
      'Aynı kelimeyi yazan oyuncular o kategoriden puan alamaz',
      'Benzersiz kelimeler yazan oyuncular puan kazanır',
      'En çok puanı toplayan oyuncu kazanır'
    ],
    image: 'cityName.png'
  },
  {
    id: 'wordGame',
    title: 'Kelime Oyunu',
    description: 'Verilen ipuçlarından yola çıkarak kelimeleri tahmin etmeye çalıştığınız düşünme oyunu.',
    minPlayers: 2,
    maxPlayers: 6,
    duration: 25,
    difficulty: 'hard' as Difficulty,
    category: 'Kelime Oyunu',
    hasPlayableVersion: false,
    rules: [
      'Her kelime için üç ipucu verilir',
      'İlk ipucunda bilirse tam puan kazanır',
      'Her ipucu sonrası puan düşer',
      'En çok puanı toplayan oyuncu kazanır'
    ],
    image: 'wordGame.png'
  },
  {
    id: 'quiz',
    title: 'Bilgi Yarışması',
    description: 'Farklı kategorilerde sorular cevaplayarak bilginizi test ettiğiniz eğlenceli yarışma oyunu.',
    minPlayers: 2,
    maxPlayers: 10,
    duration: 30,
    difficulty: 'medium' as Difficulty,
    category: 'Bilgi Oyunu',
    hasPlayableVersion: false,
    rules: [
      'Sırayla sorular sorulur',
      'Doğru cevap veren oyuncu puan kazanır',
      'Yanlış cevap veren oyuncu puan kaybetmez',
      'Zorluk seviyesine göre sorulardan farklı puanlar kazanılır',
      'En çok puanı toplayan oyuncu kazanır'
    ],
    image: 'quiz.png'
  }
]; 