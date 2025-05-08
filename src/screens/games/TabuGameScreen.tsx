import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const tabuWords = [
  { word: 'Telefon', forbidden: ['Arama', 'Mesaj', 'Mobil', 'Cihaz', 'Numara'] },
  { word: 'Kedi', forbidden: ['Hayvan', 'Tüy', 'Miyav', 'Evcil', 'Köpek'] },
  { word: 'Deniz', forbidden: ['Su', 'Yüzmek', 'Kum', 'Plaj', 'Gemi'] },
  { word: 'Kitap', forbidden: ['Okumak', 'Sayfa', 'Yazar', 'Roman', 'Kütüphane'] },
  { word: 'Bilgisayar', forbidden: ['Teknoloji', 'Ekran', 'Klavye', 'Fare', 'İnternet'] },
];

export default function TabuGameScreen() {
  const [index, setIndex] = useState(Math.floor(Math.random() * tabuWords.length));

  const nextWord = () => {
    let newIndex = Math.floor(Math.random() * tabuWords.length);
    while (newIndex === index) newIndex = Math.floor(Math.random() * tabuWords.length);
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabu</Text>
      <Text style={styles.word}>{tabuWords[index].word}</Text>
      <Text style={styles.subtitle}>Yasaklı Kelimeler:</Text>
      {tabuWords[index].forbidden.map((f, i) => (
        <Text key={i} style={styles.forbidden}>{f}</Text>
      ))}
      <View style={{ marginTop: 24 }}>
        <Button title="Sonraki" onPress={nextWord} />
      </View>
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
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b45309',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#a16207',
    marginBottom: 8,
  },
  forbidden: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 2,
  },
}); 