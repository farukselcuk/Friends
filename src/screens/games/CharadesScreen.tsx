import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import GradientHeader from '../../components/GradientHeader';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getWords, saveGameResult } from '../../services/database';

interface CharadesWord {
  id: string;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description?: string;
  type: 'tabu' | 'charades' | 'wordGame' | 'quiz';
}

export default function CharadesScreen() {
  const { colors, gradients } = useTheme();
  const [words, setWords] = useState<CharadesWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      const charadesWords = await getWords('charades');
      setWords(charadesWords as CharadesWord[]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading words:', error);
      setLoading(false);
    }
  };

  const currentWord = words[currentWordIndex];

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
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const saveGame = async () => {
    try {
      await saveGameResult({
        gameType: 'charades',
        players: ['Takım 1', 'Takım 2'],
        scores: {
          'Takım 1': team1Score,
          'Takım 2': team2Score,
        },
        duration: 60 - timeLeft,
        date: Date.now(),
      });
    } catch (error) {
      console.error('Error saving game result:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <GradientHeader 
          title="Sessiz Sinema" 
          gradientColors={gradients.primary as any}
        />
        <View style={styles.content}>
          <Text style={[styles.loadingText, { color: colors.text.primary }]}>
            Yükleniyor...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Sessiz Sinema" 
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

          {showWord && currentWord ? (
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
                {currentWord.text}
              </Text>
              {currentWord.description && (
                <Text style={[styles.description, { color: colors.text.secondary }]}>
                  {currentWord.description}
                </Text>
              )}
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
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
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
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
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