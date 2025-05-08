import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { NavigationProp } from '../types/navigation';
import { Topic } from '../types/models';

type Props = {
  navigation: NavigationProp;
};

const topics: Topic[] = [
  {
    id: '1',
    title: 'Günün Konusu',
    description: 'Bugün en son ne zaman kendinizi gerçekten mutlu hissettiniz?',
    category: 'Duygular',
  },
  {
    id: '2',
    title: 'Gelecek Planları',
    description: 'Gelecek 5 yıl içinde gerçekleştirmek istediğiniz 3 hedef nedir?',
    category: 'Kişisel Gelişim',
  },
  {
    id: '3',
    title: 'Anılar',
    description: 'Çocukluğunuzdan en unutamadığınız anı nedir?',
    category: 'Geçmiş',
  },
  // Daha fazla konu eklenebilir
];

export default function TopicsScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      {topics.map((topic) => (
        <Card key={topic.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              {topic.title}
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {topic.description}
            </Text>
            <Text variant="labelSmall" style={styles.category}>
              {topic.category}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => {}}>
              Paylaş
            </Button>
            <Button mode="contained" onPress={() => {}}>
              Başlat
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  category: {
    color: '#666',
  },
}); 