import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Chip, Portal, Dialog, Paragraph, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '../types/navigation';
import { Game } from '../types/models';

const categories = ['Tümü', 'Kart', 'Kelime', 'Rol', 'Strateji', 'Parti'];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Kart':
      return 'cards';
    case 'Kelime':
      return 'text-box';
    case 'Rol':
      return 'account-group';
    case 'Strateji':
      return 'chess-queen';
    case 'Parti':
      return 'party-popper';
    default:
      return 'gamepad-variant';
  }
};

type Props = {
  navigation: NavigationProp;
};

const gameList: Game[] = [
  {
    id: '1',
    title: 'Tabu',
    description: 'Kelimeleri anlatırken yasaklı kelimeleri kullanmamaya çalışın!',
    minPlayers: 4,
    maxPlayers: 8,
    duration: '30-45 dk',
    difficulty: 'Orta',
    category: 'Kelime',
    requirements: ['Tabu kartları', 'Kum saati'],
  },
  {
    id: '2',
    title: 'Sessiz Sinema',
    description: 'Film isimlerini sadece hareketlerle anlatmaya çalışın!',
    minPlayers: 3,
    maxPlayers: 10,
    duration: '20-30 dk',
    difficulty: 'Kolay',
    category: 'Parti',
  },
  {
    id: '3',
    title: 'Kim Milyoner Olmak İster',
    description: 'Bilgi yarışması formatında eğlenceli bir oyun!',
    minPlayers: 2,
    maxPlayers: 6,
    duration: '45-60 dk',
    difficulty: 'Zor',
    category: 'Bilgi',
    requirements: ['Soru kartları', 'Joker hakkı kartları'],
  },
  // Daha fazla oyun eklenebilir
];

export default function GamesScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [playerCount, setPlayerCount] = useState('');

  const filteredGames = gameList.filter(game => {
    const matchesCategory = selectedCategory === 'Tümü' || game.category === selectedCategory;
    const matchesPlayers = !playerCount || (
      parseInt(playerCount) >= game.minPlayers &&
      parseInt(playerCount) <= game.maxPlayers
    );
    return matchesCategory && matchesPlayers;
  });

  const showGameDetails = (game: Game) => {
    setSelectedGame(game);
    setDialogVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryChip}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
        <TextInput
          label="Oyuncu Sayısı"
          value={playerCount}
          onChangeText={setPlayerCount}
          keyboardType="numeric"
          style={styles.playerInput}
        />
      </View>

      {filteredGames.map((game) => (
        <Card key={game.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              {game.title}
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {game.description}
            </Text>
            <View style={styles.details}>
              <Chip icon="account-group" style={styles.chip}>
                {game.minPlayers}-{game.maxPlayers} Kişi
              </Chip>
              <Chip icon="clock-outline" style={styles.chip}>
                {game.duration}
              </Chip>
              <Chip icon="star" style={styles.chip}>
                {game.difficulty}
              </Chip>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => showGameDetails(game)}>
              Detaylar
            </Button>
            <Button mode="contained" onPress={() => {}}>
              Başlat
            </Button>
          </Card.Actions>
        </Card>
      ))}

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          {selectedGame && (
            <>
              <Dialog.Title style={styles.dialogTitle}>
                <MaterialCommunityIcons
                  name={getCategoryIcon(selectedGame.category)}
                  size={24}
                  color="#6200ee"
                />
                {selectedGame.title}
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph style={styles.dialogSubtitle}>
                  Oyuncu Sayısı: {selectedGame.minPlayers}-{selectedGame.maxPlayers}
                </Paragraph>
                <Paragraph style={styles.dialogDescription}>
                  {selectedGame.description}
                </Paragraph>
                {selectedGame.requirements && (
                  <>
                    <Paragraph style={styles.requirementsTitle}>
                      Gerekli Malzemeler:
                    </Paragraph>
                    {selectedGame.requirements.map((req, index) => (
                      <View key={index} style={styles.requirementItem}>
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={20}
                          color="#6200ee"
                        />
                        <Paragraph style={styles.requirementText}>{req}</Paragraph>
                      </View>
                    ))}
                  </>
                )}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setDialogVisible(false)}>Kapat</Button>
                <Button mode="contained" icon="play">Oyna</Button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  filters: {
    marginBottom: 16,
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  playerInput: {
    backgroundColor: 'white',
  },
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  dialogTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dialogSubtitle: {
    color: '#666',
    marginBottom: 8,
  },
  dialogDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  requirementsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    marginLeft: 8,
  },
}); 