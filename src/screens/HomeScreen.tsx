import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { NavigationProp } from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const amber = '#fb923c';
const orange = '#f59e42';

type Props = {
  navigation: NavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();

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
          <Text style={styles.cardText}>Bugün en son ne zaman kendinizi gerçekten mutlu hissettiniz?</Text>
          <View style={styles.cardActionsRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Topics')}>
              <Text style={styles.linkBtn}>Tüm Konular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn}>
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
          <Text style={styles.cardText}>Tabu - Kelimeleri anlatırken yasaklı kelimeleri kullanmamaya çalışın!</Text>
          <View style={styles.chipRow}>
            <Text style={styles.chip}>4-8 Kişi</Text>
            <Text style={styles.chip}>30-45 dk</Text>
            <Text style={styles.chip}>Orta Zorluk</Text>
          </View>
          <View style={styles.cardActionsRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Games')}>
              <Text style={styles.linkBtn}>Tüm Oyunlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn}>
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
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Etkinlik Oluştur</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  statusBar: {
    backgroundColor: '#ffedd5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
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
    padding: 20,
    shadowColor: '#fb923c',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeBox: {
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b45309',
  },
  welcomeSubtitle: {
    color: '#f59e42',
    fontWeight: '500',
    marginTop: 4,
  },
  cardBox: {
    backgroundColor: '#fff7ed',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
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
    marginBottom: 8,
  },
  cardHeaderTitle: {
    fontWeight: 'bold',
    color: '#b45309',
    fontSize: 16,
  },
  cardText: {
    color: '#a16207',
    fontWeight: '500',
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#fde68a',
    color: '#b45309',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    marginRight: 6,
    fontWeight: 'bold',
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  linkBtn: {
    color: '#fb923c',
    fontWeight: 'bold',
    fontSize: 14,
  },
  primaryBtn: {
    backgroundColor: '#fb923c',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#fb923c',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 