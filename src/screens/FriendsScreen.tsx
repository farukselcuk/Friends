import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList, TouchableOpacity, Share } from 'react-native';

export default function FriendsScreen() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input && !friends.includes(input)) {
      setFriends([...friends, input]);
      setInput('');
    }
  };

  const handleInvite = async () => {
    try {
      await Share.share({
        message: 'Arkadaşım ol! Friends App ile arkadaşlarını ekle: https://yourapp.link',
      });
    } catch (e) {}
  };

  const filteredFriends = friends.filter(f => f.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Arkadaşlarım</Text>
      <TextInput
        style={styles.input}
        placeholder="Arkadaş ara..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.addRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="Kullanıcı adı ile ekle"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Ekle" onPress={handleAdd} />
      </View>
      <Button title="Bağlantı ile Davet Et" onPress={handleInvite} color="#fb923c" />
      <Text style={styles.listTitle}>Eklenen Arkadaşlar</Text>
      <FlatList
        data={filteredFriends}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Henüz arkadaş eklemedin.</Text>}
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    color: '#a16207',
    marginTop: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  friendItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  friendName: {
    fontSize: 16,
    color: '#b45309',
  },
  empty: {
    color: '#a3a3a3',
    textAlign: 'center',
    marginTop: 24,
  },
}); 