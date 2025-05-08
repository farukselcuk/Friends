import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import GradientHeader from '../../components/GradientHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TabuWord {
  id: string;
  word: string;
  forbiddenWords: string[];
  category: string;
}

const tabuWords: TabuWord[] = [
  {
    id: '1',
    word: 'FUTBOL',
    forbiddenWords: ['Top', 'Saha', 'Gol', 'Oyuncu', 'Maç'],
    category: 'Spor',
  },
  {
    id: '2',
    word: 'PIZZA',
    forbiddenWords: ['İtalyan', 'Hamur', 'Peynir', 'Domates', 'Yemek'],
    category: 'Yemek',
  },
  {
    id: '3',
    word: 'TELEFON',
    forbiddenWords: ['Arama', 'Konuşma', 'Cihaz', 'Mobil', 'İletişim'],
    category: 'Teknoloji',
  },
  {
    id: '4',
    word: 'KAHVE',
    forbiddenWords: ['İçecek', 'Sıcak', 'Kafein', 'Fincan', 'Türk'],
    category: 'İçecek',
  },
  {
    id: '5',
    word: 'SİNEMA',
    forbiddenWords: ['Film', 'Salon', 'Bilet', 'İzleme', 'Koltuk'],
    category: 'Eğlence',
  },
];

export default function TabuGameScreen() {
  const { colors, gradients } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const currentWord = tabuWords[currentWordIndex];

  const endTurn = useCallback(() => {
    setIsPlaying(false);
    setShowWord(false);
    setCurrentTeam((prev) => prev === 1 ? 2 : 1);
    setTimeLeft(60);
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTurn();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, timeLeft, endTurn]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(60);
    setShowWord(true);
  };

  const handleCorrect = () => {
    if (currentTeam === 1) {
      setTeam1Score(team1Score + 1);
    } else {
      setTeam2Score(team2Score + 1);
    }
    setScore(score + 1);
    nextWord();
  };

  const handlePass = () => {
    nextWord();
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % tabuWords.length);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Tabu" 
        gradientColors={gradients.primary as any}
      />

      <View style={styles.content}>
        {/* Skor Tablosu */}
        <View style={styles.scoreBoard}>
          <View style={[styles.teamScore, { backgroundColor: colors.card }]}>
            <Text style={[styles.teamLabel, { color: colors.text.secondary }]}>
              Takım 1
            </Text>
            <Text style={[styles.scoreText, { color: colors.text.primary }]}>
              {team1Score}
            </Text>
          </View>
          <View style={[styles.teamScore, { backgroundColor: colors.card }]}>
            <Text style={[styles.teamLabel, { color: colors.text.secondary }]}>
              Takım 2
            </Text>
            <Text style={[styles.scoreText, { color: colors.text.primary }]}>
              {team2Score}
            </Text>
          </View>
        </View>

        {/* Süre ve Kelime */}
        <View style={styles.gameArea}>
          <Text style={[styles.timer, { color: colors.text.primary }]}>
            {formatTime(timeLeft)}
          </Text>

          {showWord ? (
            <Card style={{
              width: '100%',
              padding: 24,
              borderRadius: 16,
              backgroundColor: colors.card
            }}>
              <Text style={[styles.category, { color: colors.text.secondary }]}>
                {currentWord.category}
              </Text>
              <Text style={[styles.word, { color: colors.text.primary }]}>
                {currentWord.word}
              </Text>
              <View style={styles.forbiddenWords}>
                {currentWord.forbiddenWords.map((word, index) => (
                  <Text 
                    key={index} 
                    style={[styles.forbiddenWord, { color: colors.text.secondary }]}
                  >
                    {word}
                  </Text>
                ))}
              </View>
            </Card>
          ) : (
            <Card style={{
              width: '100%',
              padding: 24,
              borderRadius: 16,
              backgroundColor: colors.card
            }}>
              <Text style={[styles.waitingText, { color: colors.text.primary }]}>
                {currentTeam === 1 ? 'Takım 1' : 'Takım 2'} Hazır mı?
              </Text>
            </Card>
          )}
        </View>

        {/* Kontrol Butonları */}
        <View style={styles.controls}>
          {!isPlaying ? (
            <Button
              title="Başlat"
              onPress={startGame}
              type="primary"
            />
          ) : (
            <View style={styles.gameControls}>
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: '#FF6B6B' }]}
                onPress={handlePass}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
                <Text style={styles.controlButtonText}>Pas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: '#4CAF50' }]}
                onPress={handleCorrect}
              >
                <Icon name="check" size={24} color="#FFFFFF" />
                <Text style={styles.controlButtonText}>Doğru</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
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
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  teamScore: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  teamLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  wordCard: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
  },
  category: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  forbiddenWords: {
    alignItems: 'center',
  },
  forbiddenWord: {
    fontSize: 18,
    marginBottom: 8,
  },
  waitingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    marginTop: 24,
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 