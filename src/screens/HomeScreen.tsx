import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text, Portal, Dialog, Paragraph } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { NavigationProp } from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Game } from '../types/models';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import GradientHeader from '../components/GradientHeader';
import { LinearGradient } from 'expo-linear-gradient';

const todaysTopic = {
  title: 'Günün Konusu',
  description: 'Bugün en son ne zaman kendinizi gerçekten mutlu hissettiniz?',
};

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

type Props = {
  navigation: NavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { colors, gradients } = useTheme();
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

  const renderCardHeader = (icon: string, title: string) => (
    <View style={styles.cardHeader}>
      <Icon name={icon} size={22} color={colors.text.accent} style={styles.cardIcon} />
      <Text style={[styles.cardHeaderTitle, { color: colors.text.primary }]}>
        {title}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <GradientHeader 
        title="Ana Sayfa" 
        gradientColors={gradients.primary as any}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: colors.text.accent }]}>
            Hoş Geldin, {user?.username}! 👋
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.text.secondary }]}>
            Bugün arkadaşlarınla ne yapmak istersin?
          </Text>
        </View>

        {/* Yeni Tanışma Modu */}
        <Card>
          {renderCardHeader('account-multiple-plus', 'Yeni Tanışma Modu')}
          <Text style={[styles.cardText, { color: colors.text.secondary }]}>
            Yeni insanlarla tanışmak için özel sohbet konuları ve soru önerileri!
          </Text>
          <View style={styles.cardFooter}>
            <View />
            <Button
              title="Keşfet"
              onPress={() => navigation.navigate('NewAcquaintance')}
              type="primary"
            />
          </View>
        </Card>

        {/* Günün Konusu */}
        <Card>
          {renderCardHeader('message-text', 'Günün Konusu')}
          <Text style={[styles.cardText, { color: colors.text.secondary }]}>
            {todaysTopic.description}
          </Text>
          <View style={styles.cardFooter}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Topics');
            }}>
              <Text style={[styles.linkText, { color: colors.text.accent }]}>
                Tüm Konular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Messages');
            }}>
              <Text style={[styles.linkText, { color: colors.text.accent }]}>
                Paylaş
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Önerilen Oyun */}
        <Card>
          {renderCardHeader('gamepad-variant', 'Önerilen Oyun')}
          <Text style={[styles.cardText, { color: colors.text.secondary }]}>
            Oyun önerisi almak için oyuncu sayısını girin!
          </Text>
          <View style={styles.cardFooter}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Games');
            }}>
              <Text style={[styles.linkText, { color: colors.text.accent }]}>
                Tüm Oyunlar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Games');
            }}>
              <Text style={[styles.linkText, { color: colors.text.accent }]}>
                Oyun Seç
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Etkinlik */}
        <Card>
          {renderCardHeader('calendar', 'Arkadaşlarınla Buluş')}
          <Text style={[styles.cardText, { color: colors.text.secondary }]}>
            Yeni bir etkinlik planla ve arkadaşlarını davet et!
          </Text>
          <View style={styles.cardFooter}>
            <View />
            <Button
              title="Etkinlik Oluştur"
              onPress={() => navigation.navigate('Events')}
              type="primary"
            />
          </View>
        </Card>
      </ScrollView>

      {/* Modals */}
      {/* Günün Konusu Modal */}
      <Portal>
        <Dialog 
          visible={topicDialogVisible} 
          onDismiss={() => setTopicDialogVisible(false)}
          style={{ backgroundColor: colors.card }}
        >
          <Dialog.Title style={{ color: colors.text.primary }}>Günün Konusu</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ color: colors.text.secondary }}>{todaysTopic.description}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              title="Kapat"
              onPress={() => setTopicDialogVisible(false)}
              type="outline"
              size="small"
            />
            <Button 
              title="Paylaş"
              onPress={() => { setTopicDialogVisible(false); }}
              size="small"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Oyun Önerisi Modal */}
      <Portal>
        <Dialog 
          visible={gameDialogVisible} 
          onDismiss={() => setGameDialogVisible(false)}
          style={{ backgroundColor: colors.card }}
        >
          <Dialog.Title style={{ color: colors.text.primary }}>Oyun Önerisi</Dialog.Title>
          <Dialog.Content>
            <TextInput
              placeholder="Oyuncu sayısı"
              value={playerCount}
              onChangeText={setPlayerCount}
              keyboardType="numeric"
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text.primary
                }
              ]}
            />
            <Button
              title="Öner"
              onPress={suggestGame}
              style={{ marginVertical: 10 }}
              size="small"
            />
            {gameError ? (
              <Text style={{ color: colors.status.error, marginBottom: 8 }}>
                {gameError}
              </Text>
            ) : null}
            {suggestedGame && (
              <View style={{ marginTop: 8 }}>
                <Text style={[styles.gameTitle, { color: colors.text.primary }]}>
                  {suggestedGame.title}
                </Text>
                <Text style={{ color: colors.text.secondary }}>
                  {suggestedGame.description}
                </Text>
                <Text style={[styles.gameDetails, { color: colors.text.accent }]}>
                  {suggestedGame.minPlayers}-{suggestedGame.maxPlayers} Kişi • 
                  {suggestedGame.duration} • {suggestedGame.difficulty} Zorluk
                </Text>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              title="Kapat"
              onPress={() => setGameDialogVisible(false)}
              type="outline"
              size="small"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  welcomeSection: {
    marginVertical: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gameDetails: {
    fontSize: 14,
    marginTop: 4,
  },
}); 