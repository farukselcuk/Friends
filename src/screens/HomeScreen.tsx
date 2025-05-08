import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Card, Text, Button, Portal, Dialog, Paragraph } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { NavigationProp } from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Game } from '../types/models';

const amber = '#fb923c';
const orange = '#f59e42';

const games: Game[] = [
  {
    id: '1',
    title: 'Tabu',
    description: 'Kelimeleri anlatırken yasaklı kelimeleri kullanmamaya çalışın!',
    minPlayers: 4,
    maxPlayers: 8,
    duration: '30-45 dk',
    difficulty: 'Orta',
    category: 'Kelime',
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
  },
];

const todaysTopic = {
  title: 'Günün Konusu',
  description: 'Bugün en son ne zaman kendinizi gerçekten mutlu hissettiniz?',
};

type Props = {
  navigation: NavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [topicDialogVisible, setTopicDialogVisible] = useState(false);
  const [gameDialogVisible, setGameDialogVisible] = useState(false);
  const [playerCount, setPlayerCount] = useState('');
  const [suggestedGame, setSuggestedGame] = useState<Game | null>(null);
  const [gameError, setGameError] = useState('');

  const handleStartTopic = () => {
    setTopicDialogVisible(true);
  };

  const handleStartGame = () => {
    setGameDialogVisible(true);
    setPlayerCount('');
    setSuggestedGame(null);
    setGameError('');
  };

  const suggestGame = () => {
    const count = parseInt(playerCount);
    if (isNaN(count) || count < 2) {
      setGameError('Lütfen geçerli bir oyuncu sayısı girin (en az 2).');
      setSuggestedGame(null);
      return;
    }
    const filtered = games.filter(g => count >= g.minPlayers && count <= g.maxPlayers);
    if (filtered.length === 0) {
      setGameError('Bu oyuncu sayısına uygun oyun bulunamadı.');
      setSuggestedGame(null);
      return;
    }
    const randomGame = filtered[Math.floor(Math.random() * filtered.length)];
    setSuggestedGame(randomGame);
    setGameError('');
  };

  return (
    <View style={styles.gradientBg}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>4:05</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <View style={styles.statusDot} />
            <View style={styles.statusDot} />
          </View>
        </View>
        {/* Header */}
        <View style={styles.headerGradient}>
          <Text style={styles.headerTitle}>Ana Sayfa</Text>
        </View>
        {/* Welcome */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>Hoş Geldin, {user?.username}!</Text>
          <Text style={styles.welcomeSubtitle}>Bugün arkadaşlarınla ne yapmak istersin?</Text>
        </View>
        {/* Günün Konusu */}
        <View style={styles.cardBox}>
          <View style={styles.cardHeader}>
            <Icon name="message-text" size={18} color={amber} style={{ marginRight: 8 }} />
            <Text style={styles.cardHeaderTitle}>Günün Konusu</Text>
          </View>
          <Text style={styles.cardText}>{todaysTopic.description}</Text>
          <View style={styles.cardActionsRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Topics')}>
              <Text style={styles.linkBtn}>Tüm Konular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleStartTopic}>
              <Text style={styles.primaryBtnText}>Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Oyun Önerisi */}
        <View style={styles.cardBox}>
          <View style={styles.cardHeader}>
            <Icon name="account-group" size={18} color={amber} style={{ marginRight: 8 }} />
            <Text style={styles.cardHeaderTitle}>Önerilen Oyun</Text>
          </View>
          <Text style={styles.cardText}>Oyun önerisi almak için oyuncu sayısını girin!</Text>
          <View style={styles.cardActionsRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Games')}>
              <Text style={styles.linkBtn}>Tüm Oyunlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleStartGame}>
              <Text style={styles.primaryBtnText}>Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Etkinlik */}
        <View style={styles.cardBox}>
          <View style={styles.cardHeader}>
            <Icon name="calendar" size={18} color={amber} style={{ marginRight: 8 }} />
            <Text style={styles.cardHeaderTitle}>Arkadaşlarınla Buluş</Text>
          </View>
          <Text style={styles.cardText}>Yeni bir etkinlik planla ve arkadaşlarını davet et!</Text>
          <View style={[styles.cardActionsRow, { justifyContent: 'flex-end' }] }>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Events')}>
              <Text style={styles.primaryBtnText}>Etkinlik Oluştur</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Günün Konusu Modal */}
      <Portal>
        <Dialog visible={topicDialogVisible} onDismiss={() => setTopicDialogVisible(false)}>
          <Dialog.Title>Günün Konusu</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{todaysTopic.description}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setTopicDialogVisible(false)}>Kapat</Button>
            <Button onPress={() => { setTopicDialogVisible(false); }}>Paylaş</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* Oyun Önerisi Modal */}
      <Portal>
        <Dialog visible={gameDialogVisible} onDismiss={() => setGameDialogVisible(false)}>
          <Dialog.Title>Oyun Önerisi</Dialog.Title>
          <Dialog.Content>
            <TextInput
              placeholder="Oyuncu sayısı"
              value={playerCount}
              onChangeText={setPlayerCount}
              keyboardType="numeric"
              style={{ marginBottom: 12, backgroundColor: '#fff' }}
            />
            <Button mode="contained" onPress={suggestGame} style={{ marginBottom: 8 }}>Öner</Button>
            {gameError ? <Text style={{ color: 'red', marginBottom: 8 }}>{gameError}</Text> : null}
            {suggestedGame && (
              <View style={{ marginTop: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{suggestedGame.title}</Text>
                <Text>{suggestedGame.description}</Text>
                <Text style={{ color: '#a16207', marginTop: 4 }}>{suggestedGame.minPlayers}-{suggestedGame.maxPlayers} Kişi • {suggestedGame.duration} • {suggestedGame.difficulty} Zorluk</Text>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setGameDialogVisible(false)}>Kapat</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  scrollContent: {
    paddingBottom: 12,
  },
  statusBar: {
    backgroundColor: '#ffedd5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#a3a3a3',
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a3a3a3',
  },
  headerGradient: {
    backgroundColor: '#fb923c',
    padding: 14,
    shadowColor: '#fb923c',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  welcomeBox: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#b45309',
    letterSpacing: 0.2,
  },
  welcomeSubtitle: {
    color: '#f59e42',
    fontWeight: '500',
    marginTop: 6,
    fontSize: 18,
  },
  cardBox: {
    backgroundColor: '#fff7ed',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 10,
    shadowColor: '#fb923c',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardHeaderTitle: {
    fontWeight: 'bold',
    color: '#b45309',
    fontSize: 20,
  },
  cardText: {
    color: '#a16207',
    fontWeight: '500',
    marginBottom: 6,
    fontSize: 17,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  chip: {
    backgroundColor: '#fde68a',
    color: '#b45309',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 14,
    marginRight: 6,
    fontWeight: 'bold',
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  linkBtn: {
    color: '#fb923c',
    fontWeight: 'bold',
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: '#fb923c',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: '#fb923c',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
}); 