import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Text, List, Switch } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import GradientHeader from '../components/GradientHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  EditProfile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme, colors, gradients } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <GradientHeader 
        title="Profil" 
        gradientColors={gradients.primary as any}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={80}
              label={user?.username?.substring(0, 2).toUpperCase() || '??'}
              style={[styles.avatar, { backgroundColor: colors.primary }]}
              color="#fff"
            />
            <View style={styles.userInfo}>
              <Text 
                style={[styles.username, { color: colors.text.primary, fontSize: 20, fontWeight: 'bold' }]}
              >
                {user?.username}
              </Text>
              <Text 
                style={[styles.email, { color: colors.text.tertiary, fontSize: 14 }]}
              >
                {user?.email}
              </Text>
            </View>
          </View>
          
          <Button
            title="Profili Düzenle"
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.editButton}
          />
        </Card>

        <Card>
          <View style={styles.cardHeader}>
            <Icon name="cog" size={22} color={colors.text.accent} style={styles.cardIcon} />
            <Text style={[styles.cardHeaderTitle, { color: colors.text.primary }]}>
              Ayarlar
            </Text>
          </View>
          
          <List.Item
            title="Karanlık Tema"
            titleStyle={{ color: colors.text.primary }}
            left={props => (
              <List.Icon {...props} icon="theme-light-dark" color={colors.icon.active} />
            )}
            right={() => (
              <Switch 
                value={isDarkMode} 
                onValueChange={toggleTheme}
                color={colors.primary}
              />
            )}
          />
          <List.Item
            title="Bildirimler"
            titleStyle={{ color: colors.text.primary }}
            left={props => (
              <List.Icon {...props} icon="bell-outline" color={colors.icon.active} />
            )}
            right={props => (
              <List.Icon {...props} icon="chevron-right" color={colors.icon.inactive} />
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Gizlilik"
            titleStyle={{ color: colors.text.primary }}
            left={props => (
              <List.Icon {...props} icon="shield-account" color={colors.icon.active} />
            )}
            right={props => (
              <List.Icon {...props} icon="chevron-right" color={colors.icon.inactive} />
            )}
            onPress={() => {}}
          />
          <List.Item
            title="Yardım ve Destek"
            titleStyle={{ color: colors.text.primary }}
            left={props => (
              <List.Icon {...props} icon="help-circle" color={colors.icon.active} />
            )}
            right={props => (
              <List.Icon {...props} icon="chevron-right" color={colors.icon.inactive} />
            )}
            onPress={() => {}}
          />
        </Card>

        <Button
          title="Çıkış Yap"
          onPress={logout}
          type="outline"
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  profileCard: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  editButton: {
    marginTop: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 24,
  },
}); 