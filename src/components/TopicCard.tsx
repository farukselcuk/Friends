import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip, Text } from 'react-native-paper';
import { ConversationTopic } from '../types';

interface TopicCardProps {
  topic: ConversationTopic;
  onPress: (topic: ConversationTopic) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Mizah': return '#FFC107'; // Amber
    case 'Derin Düşünce': return '#4CAF50'; // Green
    case 'Tartışma': return '#3F51B5'; // Indigo
    case 'İtiraf': return '#FF5722'; // Deep Orange
    case 'Eğlence': return '#E91E63'; // Pink
    default: return '#9E9E9E'; // Grey
  }
};

export const TopicCard = ({ topic, onPress }: TopicCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(topic)}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>{topic.title}</Title>
            <Chip 
              style={{ backgroundColor: getCategoryColor(topic.category) }}
              textStyle={{ color: 'white' }}
            >
              {topic.category}
            </Chip>
          </View>
          <Paragraph>{topic.description}</Paragraph>
          <Text style={styles.date}>Tarih: {topic.date}</Text>
          <Text style={styles.responses}>
            {topic.responses?.length || 0} yanıt
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
  },
  responses: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
}); 