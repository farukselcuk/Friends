import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Text, Button, List, Switch } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NavigationProp } from '../types/navigation';

type Props = {
  navigation: NavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={80}
          label={user?.username?.substring(0, 2).toUpperCase() || '??'}
        />
        <Text variant="headlineSmall" style={styles.username}>
          {user?.username}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {user?.email}
        </Text>
      </View>

      <List.Section>
        <List.Subheader>Ayarlar</List.Subheader>
        <List.Item
          title="Karanlık Tema"
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
        />
        <List.Item
          title="Bildirimler"
          left={props => <List.Icon {...props} icon="bell-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Item
          title="Gizlilik"
          left={props => <List.Icon {...props} icon="shield-account" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Item
          title="Yardım ve Destek"
          left={props => <List.Icon {...props} icon="help-circle" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
        />
      </List.Section>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={logout}
          style={styles.logoutButton}
        >
          Çıkış Yap
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  username: {
    marginTop: 12,
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  actions: {
    padding: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
}); 