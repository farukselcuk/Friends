import { ref, set, get, push, remove } from 'firebase/database';
import { database } from '../config/firebase';
import { tabuWords, charadesWords, wordGameWords, quizQuestions, gameInfoList, Difficulty, GameType } from '../utils/mockData';

// Mock verileri Firebase'e yükleme
export const uploadMockData = async () => {
  try {
    // Mevcut verileri kontrol et
    const wordsRef = ref(database, 'words');
    const wordsSnapshot = await get(wordsRef);
    
    // Eğer words koleksiyonu boşsa verileri yükle
    if (!wordsSnapshot.exists()) {
      console.log('Veritabanı boş, mock veriler yükleniyor...');
      
      // Tabu kelimeleri
      for (const word of tabuWords) {
        await addWord(word);
      }
      
      // Sessiz sinema kelimeleri
      for (const word of charadesWords) {
        await addWord(word);
      }
      
      // Kelime oyunu kelimeleri
      for (const word of wordGameWords) {
        await addWord(word);
      }
      
      // Bilgi yarışması soruları
      for (const question of quizQuestions) {
        const wordRef = ref(database, 'words');
        const newWordRef = push(wordRef);
        await set(newWordRef, {
          ...question,
          createdAt: Date.now(),
        });
      }
      
      // Oyun bilgileri
      const gamesRef = ref(database, 'games_info');
      await set(gamesRef, {});
      
      for (const game of gameInfoList) {
        const gameInfoRef = ref(database, `games_info/${game.id}`);
        await set(gameInfoRef, {
          ...game,
          createdAt: Date.now(),
        });
      }
      
      console.log('Mock veriler başarıyla yüklendi!');
      return true;
    } else {
      console.log('Veritabanında zaten veriler mevcut, yükleme yapılmadı.');
      return false;
    }
  } catch (error) {
    console.error('Mock veri yükleme hatası:', error);
    return false;
  }
};

// Kelime işlemleri
export const addWord = async (word: {
  text: string;
  category: string;
  difficulty: Difficulty;
  forbiddenWords?: string[];
  description?: string;
  type: GameType;
}) => {
  const wordsRef = ref(database, 'words');
  const newWordRef = push(wordsRef);
  await set(newWordRef, {
    ...word,
    createdAt: Date.now(),
  });
  return newWordRef.key;
};

export const getWords = async (type: GameType, category?: string) => {
  const wordsRef = ref(database, 'words');
  const snapshot = await get(wordsRef);
  if (snapshot.exists()) {
    const words = snapshot.val();
    return Object.entries(words)
      .map(([id, word]: [string, any]) => ({ id, ...word }))
      .filter((word: any) => {
        if (category) {
          return word.type === type && word.category === category;
        }
        return word.type === type;
      });
  }
  return [];
};

export const deleteWord = async (wordId: string) => {
  const wordRef = ref(database, `words/${wordId}`);
  await remove(wordRef);
};

// Oyun işlemleri
export const saveGameResult = async (gameData: {
  gameType: string;
  players: string[];
  scores: { [key: string]: number };
  duration: number;
  date: number;
}) => {
  const gamesRef = ref(database, 'games');
  const newGameRef = push(gamesRef);
  await set(newGameRef, gameData);
  return newGameRef.key;
};

export const getGameHistory = async (gameType?: string) => {
  const gamesRef = ref(database, 'games');
  const snapshot = await get(gamesRef);
  if (snapshot.exists()) {
    const games = snapshot.val();
    return Object.entries(games)
      .map(([id, game]: [string, any]) => ({ id, ...game }))
      .filter((game: any) => {
        if (gameType) {
          return game.gameType === gameType;
        }
        return true;
      });
  }
  return [];
};

// Kategori işlemleri
export const addCategory = async (category: {
  name: string;
  description?: string;
  icon?: string;
}) => {
  const categoriesRef = ref(database, 'categories');
  const newCategoryRef = push(categoriesRef);
  await set(newCategoryRef, {
    ...category,
    createdAt: Date.now(),
  });
  return newCategoryRef.key;
};

export const getCategories = async () => {
  const categoriesRef = ref(database, 'categories');
  const snapshot = await get(categoriesRef);
  if (snapshot.exists()) {
    const categories = snapshot.val();
    return Object.entries(categories)
      .map(([id, category]: [string, any]) => ({ id, ...category }));
  }
  return [];
};

// Kullanıcı işlemleri
export const saveUserGameStats = async (userId: string, gameType: string, stats: {
  gamesPlayed: number;
  totalScore: number;
  bestScore: number;
  averageScore: number;
}) => {
  const statsRef = ref(database, `users/${userId}/gameStats/${gameType}`);
  await set(statsRef, {
    ...stats,
    updatedAt: Date.now(),
  });
};

export const getUserGameStats = async (userId: string, gameType?: string) => {
  const statsRef = ref(database, `users/${userId}/gameStats`);
  const snapshot = await get(statsRef);
  if (snapshot.exists()) {
    const stats = snapshot.val();
    if (gameType) {
      return stats[gameType];
    }
    return stats;
  }
  return null;
}; 