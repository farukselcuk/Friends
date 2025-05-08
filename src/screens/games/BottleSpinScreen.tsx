import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const players = ['Ayşe', 'Mehmet', 'Zeynep', 'Ali', 'Elif', 'Can'];

export default function BottleSpinScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [spinCount, setSpinCount] = useState(0);

  const spin = () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    setSelected(players[randomIndex]);
    setSpinCount(spinCount + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şişe Çevirmece</Text>
      <Text style={styles.bottle}>🍾</Text>
      <Button title="Çevir" onPress={spin} />
      {selected && (
        <Text style={styles.result}>{selected} seçildi!</Text>
      )}
      <Text style={styles.info}>Toplam çevirmeler: {spinCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fb923c',
    marginBottom: 16,
  },
  bottle: {
    fontSize: 64,
    marginVertical: 24,
  },
  result: {
    fontSize: 22,
    color: '#b45309',
    marginTop: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#a3a3a3',
    marginTop: 12,
  },
}); 