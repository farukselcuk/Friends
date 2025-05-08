import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import GradientHeader from '../components/GradientHeader';

const starterMessages = [
  'Selam! Nasılsın?',
  'Bugün en çok neye güldün?',
  'Birlikte oynayabileceğimiz favori oyunun nedir?',
  'En son izlediğin film neydi?',
  'Birlikte bir etkinlik planlamak ister misin?'
];

const groupStarters = [
  'Herkes kendini bir kelimeyle tanıtsın!',
  'En komik anınızı anlatın!',
  'Birlikte oynayabileceğimiz bir oyun önerin!',
  'Grubumuzun bir ismi olsa ne olurdu?',
  'Birlikte gitmek istediğiniz bir yer var mı?'
];

type Friend = {
  id: string;
  name: string;
};

// Define the type for our navigation
type RootStackParamList = {
  Chat: {
    friendName: string;
    initialMessage?: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

export default function MessagesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, gradients } = useTheme();
  const [friends] = useState<Friend[]>([
    { id: '1', name: 'Ahmet' },
    { id: '2', name: 'Zeynep' },
    { id: '3', name: 'Mehmet' },
    { id: '4', name: 'Ayşe' },
  ]);

  const startChat = (friendName: string) => {
    navigation.navigate('Chat', { friendName });
  };

  const startNewChat = () => {
    // For now, just navigate to the first friend
    if (friends.length > 0) {
      startChat(friends[0].name);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Mesajlar" 
        gradientColors={gradients.primary}
      />

      <View style={styles.content}>
        <View style={styles.friendsList}>
          <Text style={[styles.sectionTitle, { color: colors.text.accent }]}>
            Arkadaşlarınız
          </Text>
          <FlatList
            data={friends}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.friendItem}
                onPress={() => startChat(item.name)}
              >
                <View style={[styles.friendAvatar, { backgroundColor: colors.primary }]}>
                  <Text style={styles.friendInitial}>{item.name.charAt(0)}</Text>
                </View>
                <Text style={[styles.friendName, { color: colors.text.primary }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        
        <View style={styles.buttonRow}>
          <Button
            title="Arkadaşına Mesaj Başlat"
            onPress={startNewChat}
            type="primary"
            style={styles.primaryBtn}
          />
          <Button
            title="Grup Sohbeti Başlat"
            onPress={() => {}}
            type="secondary"
            style={styles.secondaryBtn}
          />
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text.accent }]}>
          Önerilen İlk Mesajlar
        </Text>
        <FlatList
          data={starterMessages}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Card 
              style={styles.messageCard}
              onPress={() => {
                if (friends.length > 0) {
                  navigation.navigate('Chat', { 
                    friendName: friends[0].name,
                    initialMessage: item
                  });
                }
              }}
            >
              <Text style={[styles.messageText, { color: colors.text.primary }]}>
                {item}
              </Text>
            </Card>
          )}
        />
        
        <Text style={[styles.sectionTitle, { color: colors.text.accent }]}>
          Grup Sohbeti İçin Buz Kırıcılar
        </Text>
        <FlatList
          data={groupStarters}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Card style={styles.messageCard}>
              <Text style={[styles.messageText, { color: colors.text.primary }]}>
                {item}
              </Text>
            </Card>
          )}
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
    padding: 20,
  },
  friendsList: {
    marginBottom: 16,
  },
  friendItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  friendName: {
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  primaryBtn: {
    flex: 1,
    marginRight: 8,
  },
  secondaryBtn: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  messageCard: {
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },
}); 