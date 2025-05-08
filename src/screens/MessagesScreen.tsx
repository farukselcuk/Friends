import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    <View style={styles.container}>
      <Text style={styles.header}>Mesajlar</Text>
      
      <View style={styles.friendsList}>
        <Text style={styles.sectionTitle}>Arkadaşlarınız</Text>
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
              <View style={styles.friendAvatar}>
                <Text style={styles.friendInitial}>{item.name.charAt(0)}</Text>
              </View>
              <Text style={styles.friendName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={startNewChat}>
          <Text style={styles.primaryBtnText}>Arkadaşına Mesaj Başlat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Grup Sohbeti Başlat</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Önerilen İlk Mesajlar</Text>
      <FlatList
        data={starterMessages}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
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
            <Text style={styles.messageText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      
      <Text style={styles.sectionTitle}>Grup Sohbeti İçin Buz Kırıcılar</Text>
      <FlatList
        data={groupStarters}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.messageCard}>
            <Text style={styles.messageText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b45309',
    marginBottom: 16,
    textAlign: 'center',
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
    backgroundColor: '#fb923c',
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
    color: '#b45309',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  primaryBtn: {
    backgroundColor: '#fb923c',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fb923c',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryBtnText: {
    color: '#fb923c',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#a16207',
    marginTop: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  messageText: {
    fontSize: 16,
    color: '#b45309',
  },
}); 