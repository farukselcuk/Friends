import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import GradientHeader from '../components/GradientHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { uploadMockData } from '../services/database';
import { GameType } from '../utils/mockData';

// Firebase'den çekilecek oyun bilgisi arayüzü
interface GameInfo {
  id: string;
  title: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  hasPlayableVersion: boolean;
  rules?: string[];
  image?: string;
}

export default function GamesScreen() {
  const { colors, gradients } = useTheme();
  const navigation = useNavigation();
  const [playerCount, setPlayerCount] = useState(4);
  const [allGames, setAllGames] = useState<GameInfo[]>([]);
  const [suggestedGames, setSuggestedGames] = useState<GameInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRules, setShowRules] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular' | 'quick' | 'team'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  useEffect(() => {
    initializeGames();
  }, []);

  const initializeGames = async () => {
    try {
      setLoading(true);
      // Firebase'e mock verileri yükle
      await uploadMockData();
      
      // Firebase'den oyun bilgilerini çek
      // Şimdilik mock veri kullanıyoruz
      const games: GameInfo[] = [
        {
          id: 'tabu',
          title: 'Tabu',
          description: 'Yasaklı kelimeleri kullanmadan bir kelimeyi anlatmaya çalıştığınız eğlenceli takım oyunu.',
          minPlayers: 4,
          maxPlayers: 10,
          duration: 30,
          difficulty: 'medium',
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
          difficulty: 'easy',
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
          difficulty: 'easy',
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
          difficulty: 'medium',
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
          difficulty: 'hard',
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
          difficulty: 'medium',
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
      
      setAllGames(games);
      updateSuggestedGames(games, playerCount);
      setLoading(false);
    } catch (error) {
      console.error('Oyunlar yüklenirken hata oluştu:', error);
      setLoading(false);
    }
  };

  const updateSuggestedGames = useCallback((games: GameInfo[], count: number) => {
    // Belirli bir oyuncu sayısına uygun oyunları filtrele
    const filteredGames = games.filter(game => 
      count >= game.minPlayers && count <= game.maxPlayers
    );
    
    // Zorluk seviyesine göre filtrele
    let difficultyFiltered = filteredGames;
    if (selectedDifficulty !== 'all') {
      difficultyFiltered = filteredGames.filter(game => game.difficulty === selectedDifficulty);
    }
    
    // Kategori tipine göre filtrele
    let result = difficultyFiltered;
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'popular':
          // Popüler oyunları önere (şimdilik oynanabilenleri popüler sayalım)
          result = difficultyFiltered.filter(game => game.hasPlayableVersion);
          break;
        case 'quick':
          // Hızlı oyunları filtrele (20 dakikadan az süren)
          result = difficultyFiltered.filter(game => game.duration <= 20);
          break;
        case 'team':
          // Takım oyunlarını filtrele (min oyuncu sayısı 4 ve üzeri)
          result = difficultyFiltered.filter(game => game.minPlayers >= 4);
          break;
      }
    }
    
    setSuggestedGames(result);
  }, [selectedDifficulty, selectedFilter]);

  useEffect(() => {
    if (allGames.length > 0) {
      updateSuggestedGames(allGames, playerCount);
    }
  }, [playerCount, selectedDifficulty, selectedFilter, allGames, updateSuggestedGames]);

  const handlePlayGame = (gameId: string) => {
    // Oyun türüne göre ilgili ekrana yönlendir
    switch (gameId) {
      case 'tabu':
        navigation.navigate('TabuGame' as never);
        break;
      case 'charades':
        navigation.navigate('CharadesScreen' as never);
        break;
      case 'bottleSpin':
        navigation.navigate('BottleSpin' as never);
        break;
      case 'cityName':
        navigation.navigate('CityNameScreen' as never);
        break;
      default:
        // Oynanabilir versiyonu olmayan oyunlar için bilgilendirme
        alert(`${gameId} oyununun oynanabilir versiyonu henüz eklenmedi.`);
        break;
    }
  };

  const toggleRules = (gameId: string) => {
    if (showRules === gameId) {
      setShowRules(null);
    } else {
      setShowRules(gameId);
    }
  };

  const renderGameCard = ({ item }: { item: GameInfo }) => (
    <Card style={{
      marginVertical: 10,
      padding: 16,
      backgroundColor: colors.card
    }}>
      <View style={styles.gameHeader}>
        <Text style={[styles.gameTitle, { color: colors.text.primary }]}>{item.title}</Text>
        <TouchableOpacity onPress={() => toggleRules(item.id)}>
          <Icon name={showRules === item.id ? "chevron-up" : "chevron-down"} size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.gameDescription, { color: colors.text.secondary }]}>
        {item.description}
      </Text>
      
      <View style={styles.gameDetails}>
        <View style={styles.detailItem}>
          <Icon name="account-group" size={16} color={colors.text.secondary} />
          <Text style={[styles.detailText, { color: colors.text.secondary }]}>
            {item.minPlayers}-{item.maxPlayers} Kişi
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Icon name="clock-outline" size={16} color={colors.text.secondary} />
          <Text style={[styles.detailText, { color: colors.text.secondary }]}>
            {item.duration} dk
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Icon 
            name={
              item.difficulty === 'easy' ? "star-outline" : 
              item.difficulty === 'medium' ? "star-half-full" : "star"
            } 
            size={16} 
            color={colors.text.secondary} 
          />
          <Text style={[styles.detailText, { color: colors.text.secondary }]}>
            {item.difficulty === 'easy' ? "Kolay" : 
             item.difficulty === 'medium' ? "Orta" : "Zor"}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Icon name="tag-outline" size={16} color={colors.text.secondary} />
          <Text style={[styles.detailText, { color: colors.text.secondary }]}>
            {item.category}
          </Text>
        </View>
      </View>
      
      {showRules === item.id && item.rules && (
        <View style={styles.rulesContainer}>
          <Text style={[styles.rulesTitle, { color: colors.text.primary }]}>Oyun Kuralları:</Text>
          {item.rules.map((rule, index) => (
            <View key={index} style={styles.ruleItem}>
              <Text style={[styles.ruleBullet, { color: colors.text.secondary }]}>•</Text>
              <Text style={[styles.ruleText, { color: colors.text.secondary }]}>{rule}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.actionButtons}>
        {item.hasPlayableVersion ? (
          <Button
            title="Oyna"
            onPress={() => handlePlayGame(item.id)}
            type="primary"
          />
        ) : (
          <Button
            title="Yakında"
            onPress={() => {}}
            disabled={true}
            type="secondary"
          />
        )}
      </View>
    </Card>
  );

  const renderFilterButton = (filterType: 'all' | 'popular' | 'quick' | 'team', label: string, iconName: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filterType && { backgroundColor: colors.primary }
      ]}
      onPress={() => setSelectedFilter(filterType)}
    >
      <Icon 
        name={iconName} 
        size={18} 
        color={selectedFilter === filterType ? '#FFFFFF' : colors.text.secondary} 
      />
      <Text 
        style={[
          styles.filterButtonText, 
          { color: selectedFilter === filterType ? '#FFFFFF' : colors.text.secondary }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderDifficultyButton = (level: 'all' | 'easy' | 'medium' | 'hard', label: string, iconName: string) => (
    <TouchableOpacity
      style={[
        styles.difficultyButton,
        selectedDifficulty === level && { backgroundColor: colors.primary }
      ]}
      onPress={() => setSelectedDifficulty(level)}
    >
      <Icon 
        name={iconName} 
        size={18} 
        color={selectedDifficulty === level ? '#FFFFFF' : colors.text.secondary} 
      />
      <Text 
        style={[
          styles.difficultyButtonText, 
          { color: selectedDifficulty === level ? '#FFFFFF' : colors.text.secondary }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <GradientHeader 
          title="Oyunlar" 
          gradientColors={gradients.primary as any}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text.primary }]}>
            Oyunlar yükleniyor...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Oyunlar" 
        gradientColors={gradients.primary as any}
      />
      
      <ScrollView style={styles.content}>
        {/* Oyuncu Sayısı Giriş Alanı */}
        <Card style={{
          padding: 16,
          marginVertical: 10,
          backgroundColor: colors.card
        }}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Kaç kişisiniz?
          </Text>
          
          <View style={styles.playerCountContainer}>
            <TouchableOpacity
              style={[styles.countButton, { backgroundColor: colors.button.secondary }]}
              onPress={() => setPlayerCount(Math.max(2, playerCount - 1))}
            >
              <Icon name="minus" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            
            <Text style={[styles.playerCountText, { color: colors.text.primary }]}>
              {playerCount}
            </Text>
            
            <TouchableOpacity
              style={[styles.countButton, { backgroundColor: colors.button.secondary }]}
              onPress={() => setPlayerCount(Math.min(20, playerCount + 1))}
            >
              <Icon name="plus" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
        </Card>
        
        {/* Filtre Butonları */}
        <Text style={[styles.filterTitle, { color: colors.text.primary }]}>
          Filtreler
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterButtonsContainer}
        >
          {renderFilterButton('all', 'Tümü', 'view-grid')}
          {renderFilterButton('popular', 'Popüler', 'trending-up')}
          {renderFilterButton('quick', 'Hızlı', 'clock-fast')}
          {renderFilterButton('team', 'Takım', 'account-group')}
        </ScrollView>
        
        {/* Zorluk Seviyesi Filtreleri */}
        <Text style={[styles.filterTitle, { color: colors.text.primary }]}>
          Zorluk
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterButtonsContainer}
        >
          {renderDifficultyButton('all', 'Tümü', 'star-settings')}
          {renderDifficultyButton('easy', 'Kolay', 'star-outline')}
          {renderDifficultyButton('medium', 'Orta', 'star-half-full')}
          {renderDifficultyButton('hard', 'Zor', 'star')}
        </ScrollView>
        
        {/* Önerilen Oyunlar */}
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Size Önerilen Oyunlar
        </Text>
        
        {suggestedGames.length > 0 ? (
          <FlatList
            data={suggestedGames}
            renderItem={renderGameCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        ) : (
          <Text style={[styles.noGamesText, { color: colors.text.secondary }]}>
            {playerCount > 0 
              ? `${playerCount} kişi için uygun oyun bulunamadı. Farklı bir oyuncu sayısı deneyin.`
              : 'Lütfen oyuncu sayısını girin.'}
          </Text>
        )}
        
        {/* Tüm Oyunlar */}
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Tüm Oyunlar
        </Text>
        
        <FlatList
          data={allGames}
          renderItem={renderGameCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  playerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  countButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  filterButtonsContainer: {
    paddingBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 14,
  },
  difficultyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
  },
  difficultyButtonText: {
    marginLeft: 4,
    fontSize: 14,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  gameDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  actionButtons: {
    marginTop: 12,
  },
  rulesContainer: {
    marginTop: 8,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ruleBullet: {
    fontSize: 14,
    marginRight: 8,
  },
  ruleText: {
    fontSize: 14,
    flex: 1,
  },
  noGamesText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
  },
}); 