import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import GradientHeader from '../../components/GradientHeader';
import Button from '../../components/Button';

export default function BottleSpinScreen() {
  const { colors, gradients } = useTheme();
  const [players, setPlayers] = useState(4);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [playerNames, setPlayerNames] = useState(['Oyuncu 1', 'Oyuncu 2', 'Oyuncu 3', 'Oyuncu 4']);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const newPlayerNames = Array(players).fill().map((_, i) => `Oyuncu ${i+1}`);
    setPlayerNames(newPlayerNames);
  }, [players]);

  const spinBottle = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    const spinDuration = 3000 + Math.random() * 2000;
    const randomSpins = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = 360 * randomSpins + randomAngle;

    Animated.timing(spinAnimation, {
      toValue: totalRotation,
      duration: spinDuration,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      const finalAngle = totalRotation % 360;
      const anglePerPlayer = 360 / players;
      let playerIndex = Math.floor(finalAngle / anglePerPlayer);
      playerIndex = (players - playerIndex) % players;
      setResult(playerNames[playerIndex]);
    });
  };

  const increasePlayerCount = () => {
    if (players < 10) {
      setPlayers(players + 1);
    }
  };

  const decreasePlayerCount = () => {
    if (players > 2) {
      setPlayers(players - 1);
    }
  };

  const spinStyle = {
    transform: [{
      rotate: spinAnimation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
      })
    }]
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Şişe Çevirmece" 
        gradientColors={gradients.primary as any}
      />

      <View style={styles.content}>
        {/* Oyuncu Sayısı Ayarlama */}
        <View style={styles.playerCountContainer}>
          <TouchableOpacity 
            style={[styles.playerCountButton, { backgroundColor: colors.card }]}
            onPress={decreasePlayerCount}
            disabled={players <= 2 || isSpinning}
          >
            <Text style={[styles.playerCountButtonText, { color: colors.text.primary }]}>-</Text>
          </TouchableOpacity>
          <View style={styles.playerCountText}>
            <Text style={[styles.playerCountLabel, { color: colors.text.secondary }]}>
              Oyuncu Sayısı
            </Text>
            <Text style={[styles.playerCountValue, { color: colors.text.primary }]}>
              {players}
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.playerCountButton, { backgroundColor: colors.card }]}
            onPress={increasePlayerCount}
            disabled={players >= 10 || isSpinning}
          >
            <Text style={[styles.playerCountButtonText, { color: colors.text.primary }]}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Şişe ve Oyuncular Çemberi */}
        <View style={styles.gameArea}>
          <View style={[styles.playerCircle, { borderColor: colors.border }]}>
            {playerNames.map((name, index) => {
              const angle = (360 / players) * index - 90;
              const radians = angle * (Math.PI / 180);
              const x = Math.cos(radians) * 130 + 130;
              const y = Math.sin(radians) * 130 + 130;

              return (
                <View 
                  key={index} 
                  style={[
                    styles.playerDot,
                    { 
                      backgroundColor: colors.card,
                      left: x,
                      top: y,
                    }
                  ]}
                >
                  <Text style={[styles.playerName, { color: colors.text.primary }]}>
                    {name}
                  </Text>
                </View>
              );
            })}
          </View>

          <Animated.View style={[styles.bottle, spinStyle]}>
            <View style={[styles.bottleBody, { backgroundColor: colors.card }]} />
            <View style={[styles.bottleNeck, { backgroundColor: colors.card }]} />
          </Animated.View>
        </View>

        {/* Sonuç */}
        {result && (
          <View style={[styles.resultContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.resultLabel, { color: colors.text.secondary }]}>
              Şişe şunu gösteriyor:
            </Text>
            <Text style={[styles.resultValue, { color: colors.text.primary }]}>
              {result}
            </Text>
          </View>
        )}

        {/* Çevirme Butonu */}
        <Button
          title={isSpinning ? 'Dönüyor...' : 'Şişeyi Çevir'}
          onPress={spinBottle}
          type="primary"
          disabled={isSpinning}
        />
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
  playerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  playerCountButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCountButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  playerCountText: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  playerCountLabel: {
    fontSize: 14,
  },
  playerCountValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playerCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2,
    borderStyle: 'dashed',
    position: 'relative',
  },
  playerDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -24,
    marginTop: -24,
  },
  playerName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottle: {
    width: 48,
    height: 48,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottleBody: {
    width: 36,
    height: 8,
    borderRadius: 4,
  },
  bottleNeck: {
    width: 8,
    height: 16,
    borderRadius: 4,
    position: 'absolute',
    top: -8,
  },
  resultContainer: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 