import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import GradientHeader from '../../components/GradientHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { cityNameCategories } from '../../utils/mockData';
import { saveGameResult } from '../../services/database';

interface Category {
  name: string;
  examples: string[];
}

interface Player {
  id: number;
  name: string;
  score: number;
  answers: { [category: string]: string };
}

export default function CityNameScreen() {
  const { colors, gradients } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [gameStarted, setGameStarted] = useState(false);
  const [roundFinished, setRoundFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<{[playerId: number]: {[category: string]: string}}>({});
  const [showScores, setShowScores] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Türkçe alfabesi (Ç, Ğ, İ, Ö, Ş, Ü dahil)
  const alphabet = ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'];
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  const loadCategories = () => {
    setCategories(cityNameCategories);
    // Tüm kategorileri varsayılan olarak seç
    setSelectedCategories(cityNameCategories.map(cat => cat.name));
    
    // Varsayılan 2 oyuncu oluştur
    const initialPlayers = [
      { id: 1, name: 'Oyuncu 1', score: 0, answers: {} },
      { id: 2, name: 'Oyuncu 2', score: 0, answers: {} },
    ];
    
    setPlayers(initialPlayers);
    
    // Oyuncu cevapları için boş nesne oluştur
    const initialAnswers: {[playerId: number]: {[category: string]: string}} = {};
    initialPlayers.forEach(player => {
      initialAnswers[player.id] = {};
      selectedCategories.forEach(category => {
        initialAnswers[player.id][category] = '';
      });
    });
    
    setAnswers(initialAnswers);
    setLoading(false);
  };
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      // Eğer en az 1 kategori seçili kalacaksa, kategoriyi kaldır
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(cat => cat !== category));
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const addPlayer = () => {
    if (players.length < 8) {
      const newPlayerId = Math.max(...players.map(p => p.id), 0) + 1;
      const newPlayer = { 
        id: newPlayerId, 
        name: `Oyuncu ${newPlayerId}`, 
        score: 0,
        answers: {}
      };
      
      setPlayers([...players, newPlayer]);
      
      // Yeni oyuncu için cevap nesnesini güncelle
      const updatedAnswers = { ...answers };
      updatedAnswers[newPlayerId] = {};
      selectedCategories.forEach(category => {
        updatedAnswers[newPlayerId][category] = '';
      });
      
      setAnswers(updatedAnswers);
    }
  };
  
  const removePlayer = (playerId: number) => {
    if (players.length > 2) {
      setPlayers(players.filter(player => player.id !== playerId));
      
      // Silinen oyuncunun cevaplarını kaldır
      const updatedAnswers = { ...answers };
      delete updatedAnswers[playerId];
      
      setAnswers(updatedAnswers);
    }
  };
  
  const updatePlayerName = (id: number, name: string) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, name } : player
    ));
  };
  
  const startGame = () => {
    // Rastgele bir harf seç
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    setCurrentLetter(randomLetter);
    setGameStarted(true);
    
    // Cevapları temizle
    const resetAnswers: {[playerId: number]: {[category: string]: string}} = {};
    players.forEach(player => {
      resetAnswers[player.id] = {};
      selectedCategories.forEach(category => {
        resetAnswers[player.id][category] = '';
      });
    });
    
    setAnswers(resetAnswers);
    setRoundFinished(false);
    setShowScores(false);
  };
  
  const updateAnswer = (playerId: number, category: string, value: string) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[playerId][category] = value;
    setAnswers(updatedAnswers);
  };
  
  const checkDuplicateAnswers = () => {
    const categoryScores: {[playerId: number]: {[category: string]: number}} = {};
    
    // Her oyuncu için kategorilere göre puanları hesapla
    players.forEach(player => {
      categoryScores[player.id] = {};
      
      selectedCategories.forEach(category => {
        const answer = answers[player.id][category].trim().toUpperCase();
        
        // Cevap boş veya uygun harfle başlamıyorsa 0 puan
        if (!answer || !answer.startsWith(currentLetter)) {
          categoryScores[player.id][category] = 0;
          return;
        }
        
        // Aynı cevabı veren başka oyuncu var mı kontrol et
        const isDuplicate = players.some(
          otherPlayer => 
            otherPlayer.id !== player.id && 
            answers[otherPlayer.id][category].trim().toUpperCase() === answer
        );
        
        // Benzersiz cevap için 10 puan, tekrarlanan cevap için 5 puan
        categoryScores[player.id][category] = isDuplicate ? 5 : 10;
      });
    });
    
    // Toplam puanları güncelle
    const updatedPlayers = players.map(player => {
      const roundScore = Object.values(categoryScores[player.id]).reduce((sum, score) => sum + score, 0);
      return {
        ...player,
        score: player.score + roundScore,
      };
    });
    
    setPlayers(updatedPlayers);
    setRoundFinished(true);
  };
  
  const showResults = () => {
    setShowScores(true);
  };
  
  const finishGame = async () => {
    try {
      // Oyun sonuçlarını kaydet
      const scores: { [key: string]: number } = {};
      players.forEach(player => {
        scores[player.name] = player.score;
      });
      
      await saveGameResult({
        gameType: 'cityName',
        players: players.map(p => p.name),
        scores,
        duration: 0, // Süre takibi yapmadığımız için 0
        date: Date.now(),
      });
      
      Alert.alert(
        "Oyun Bitti",
        `Kazanan: ${players.sort((a, b) => b.score - a.score)[0].name}`,
        [
          { text: "Tamam", onPress: () => resetGame() }
        ]
      );
    } catch (error) {
      console.error('Oyun sonuçları kaydedilirken hata oluştu:', error);
      resetGame();
    }
  };
  
  const resetGame = () => {
    setGameStarted(false);
    setRoundFinished(false);
    setShowScores(false);
    setCurrentLetter('');
    setPlayers(players.map(player => ({ ...player, score: 0, answers: {} })));
    
    const resetAnswers: {[playerId: number]: {[category: string]: string}} = {};
    players.forEach(player => {
      resetAnswers[player.id] = {};
      selectedCategories.forEach(category => {
        resetAnswers[player.id][category] = '';
      });
    });
    
    setAnswers(resetAnswers);
  };
  
  const renderPlayerAnswerInputs = (player: Player) => (
    <Card style={{
      marginVertical: 10,
      padding: 16,
      backgroundColor: colors.card
    }}>
      <Text style={[styles.playerName, { color: colors.text.primary }]}>
        {player.name}
      </Text>
      
      {selectedCategories.map((category) => (
        <View key={category} style={styles.answerRow}>
          <Text style={[styles.categoryLabel, { color: colors.text.secondary }]}>
            {category}:
          </Text>
          <TextInput
            style={[
              styles.answerInput,
              { 
                borderColor: colors.border,
                color: colors.text.primary,
                backgroundColor: colors.background
              }
            ]}
            placeholder={`${currentLetter}...`}
            placeholderTextColor={colors.text.secondary}
            value={answers[player.id][category]}
            onChangeText={(text) => updateAnswer(player.id, category, text)}
            editable={gameStarted && !roundFinished}
          />
        </View>
      ))}
    </Card>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="İsim Şehir" 
        gradientColors={gradients.primary as any}
      />
      
      <ScrollView style={styles.content}>
        {!gameStarted ? (
          <View>
            {/* Kategori Seçimi */}
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Kategoriler
            </Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: selectedCategories.includes(category.name)
                        ? colors.primary
                        : colors.button.secondary
                    }
                  ]}
                  onPress={() => toggleCategory(category.name)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      {
                        color: selectedCategories.includes(category.name)
                          ? '#FFFFFF'
                          : colors.text.primary
                      }
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Oyuncu Yönetimi */}
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Oyuncular
            </Text>
            
            {players.map((player) => (
              <View key={player.id} style={styles.playerRow}>
                <TextInput
                  style={[
                    styles.playerNameInput,
                    { 
                      borderColor: colors.border,
                      color: colors.text.primary,
                      backgroundColor: colors.background
                    }
                  ]}
                  value={player.name}
                  onChangeText={(text) => updatePlayerName(player.id, text)}
                />
                
                <TouchableOpacity
                  style={[styles.removePlayerButton, { backgroundColor: '#FF6B6B' }]}
                  onPress={() => removePlayer(player.id)}
                  disabled={players.length <= 2}
                >
                  <Icon name="close" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
            
            {players.length < 8 && (
              <Button
                title="Oyuncu Ekle"
                onPress={addPlayer}
                type="secondary"
              />
            )}
            
            {/* Oyunu Başlat */}
            <View style={styles.startButtonContainer}>
              <Button
                title="Oyunu Başlat"
                onPress={startGame}
                type="primary"
              />
            </View>
          </View>
        ) : (
          <View>
            {/* Oyun Ekranı */}
            <View style={styles.letterContainer}>
              <Text style={[styles.letterLabel, { color: colors.text.secondary }]}>
                Harf:
              </Text>
              <Text style={[styles.currentLetter, { color: colors.primary }]}>
                {currentLetter}
              </Text>
            </View>
            
            {/* Oyuncu Cevapları */}
            {showScores ? (
              // Skor Tablosu
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
                  Skorlar
                </Text>
                
                {players
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <View 
                      key={player.id} 
                      style={[
                        styles.scoreRow,
                        index === 0 && { backgroundColor: 'rgba(255, 215, 0, 0.2)' }
                      ]}
                    >
                      <Text style={[styles.scoreRank, { color: colors.text.primary }]}>
                        {index + 1}.
                      </Text>
                      <Text style={[styles.scorePlayerName, { color: colors.text.primary }]}>
                        {player.name}
                      </Text>
                      <Text style={[styles.scoreValue, { color: colors.primary }]}>
                        {player.score} puan
                      </Text>
                    </View>
                  ))
                }
                
                <View style={styles.actionButtonsContainer}>
                  <Button
                    title="Yeni Tur"
                    onPress={startGame}
                    type="secondary"
                  />
                  <Button
                    title="Oyunu Bitir"
                    onPress={finishGame}
                    type="primary"
                  />
                </View>
              </View>
            ) : (
              // Cevap Giriş Ekranı
              <View>
                {players.map((player) => renderPlayerAnswerInputs(player))}
                
                <View style={styles.actionButtonsContainer}>
                  {roundFinished ? (
                    <Button
                      title="Skorları Göster"
                      onPress={showResults}
                      type="primary"
                    />
                  ) : (
                    <Button
                      title="Tur Bitti"
                      onPress={checkDuplicateAnswers}
                      type="primary"
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerNameInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  removePlayerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  letterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  letterLabel: {
    fontSize: 18,
    marginRight: 8,
  },
  currentLetter: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    width: 80,
    fontSize: 14,
  },
  answerInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  actionButtonsContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  scoreRank: {
    width: 30,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scorePlayerName: {
    flex: 1,
    fontSize: 16,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 