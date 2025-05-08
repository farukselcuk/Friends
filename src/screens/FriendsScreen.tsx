import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, Share } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import GradientHeader from '../components/GradientHeader';

export default function FriendsScreen() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const { colors, gradients } = useTheme();

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Arkadaşlarım" 
        gradientColors={gradients.primary}
      />

      <View style={styles.content}>
        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text.primary
          }]}
          placeholder="Arkadaş ara..."
          placeholderTextColor={colors.text.tertiary}
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.addRow}>
          <TextInput
            style={[styles.input, { 
              flex: 1, 
              marginRight: 8,
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text.primary
            }]}
            placeholder="Kullanıcı adı ile ekle"
            placeholderTextColor={colors.text.tertiary}
            value={input}
            onChangeText={setInput}
          />
          <Button 
            title="Ekle" 
            onPress={handleAdd}
            type="primary"
            size="small"
          />
        </View>

        <Button 
          title="Bağlantı ile Davet Et" 
          onPress={handleInvite}
          type="secondary"
          style={styles.inviteButton}
        />

        <Text style={[styles.listTitle, { color: colors.text.accent }]}>
          Eklenen Arkadaşlar
        </Text>

        <FlatList
          data={filteredFriends}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Card style={styles.friendItem}>
              <Text style={[styles.friendName, { color: colors.text.primary }]}>
                {item}
              </Text>
            </Card>
          )}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.text.tertiary }]}>
              Henüz arkadaş eklemedin.
            </Text>
          }
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
  input: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inviteButton: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    marginTop: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  friendItem: {
    marginBottom: 8,
  },
  friendName: {
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
  },
}); 