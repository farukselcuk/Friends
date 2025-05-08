import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { NavigationProp } from '../types/navigation';

type Props = {
  navigation: NavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.welcome}>
          Hoş Geldin, {user?.username}!
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Bugün arkadaşlarınla ne yapmak istersin?
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Günün Konusu
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            Bugün en son ne zaman kendinizi gerçekten mutlu hissettiniz?
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text" onPress={() => navigation.navigate('Topics')}>
            Tüm Konular
          </Button>
          <Button mode="contained" onPress={() => {}}>
            Başlat
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Önerilen Oyun
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            Tabu - Kelimeleri anlatırken yasaklı kelimeleri kullanmamaya çalışın!
          </Text>
          <Text variant="bodySmall" style={styles.gameInfo}>
            4-8 Kişi • 30-45 dk • Orta Zorluk
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text" onPress={() => navigation.navigate('Games')}>
            Tüm Oyunlar
          </Button>
          <Button mode="contained" onPress={() => {}}>
            Başlat
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Arkadaşlarınla Buluş
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            Yeni bir etkinlik planla ve arkadaşlarını davet et!
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => {}}>
            Etkinlik Oluştur
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  welcome: {
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  card: {
    margin: 16,
    marginTop: 8,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardDescription: {
    marginBottom: 8,
  },
  gameInfo: {
    color: '#666',
  },
}); 