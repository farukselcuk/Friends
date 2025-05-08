import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import GradientHeader from '../components/GradientHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
}

const initialTopics: Topic[] = [
  {
    id: '1',
    title: 'Günün Konusu',
    description: 'Bugün en son ne zaman kendinizi gerçekten mutlu hissettiniz?',
    category: 'Duygusal',
    likes: 42,
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    title: 'Gelecek Planları',
    description: 'Gelecek 5 yıl içinde neler yapmak istiyorsunuz?',
    category: 'Planlama',
    likes: 28,
    isLiked: false,
    isSaved: false,
  },
  {
    id: '3',
    title: 'Anılar',
    description: 'En unutamadığınız çocukluk anınız nedir?',
    category: 'Anılar',
    likes: 35,
    isLiked: false,
    isSaved: false,
  },
];

export default function TopicsScreen() {
  const { colors, gradients } = useTheme();
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');

  const handleLike = (topicId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          likes: topic.isLiked ? topic.likes - 1 : topic.likes + 1,
          isLiked: !topic.isLiked
        };
      }
      return topic;
    }));
  };

  const handleSave = (topicId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          isSaved: !topic.isSaved
        };
      }
      return topic;
    }));
  };

  const filteredTopics = activeTab === 'saved' 
    ? topics.filter(topic => topic.isSaved)
    : topics;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Konular" 
        gradientColors={gradients.primary as any}
      />

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'all' && { borderBottomColor: colors.text.accent }
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'all' ? colors.text.accent : colors.text.secondary }
          ]}>
            Tüm Konular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'saved' && { borderBottomColor: colors.text.accent }
          ]}
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'saved' ? colors.text.accent : colors.text.secondary }
          ]}>
            Kaydedilenler
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {filteredTopics.map((topic) => (
          <Card key={topic.id}>
            <Text style={[styles.topicTitle, { color: colors.text.primary }]}>
              {topic.title}
            </Text>
            <Text style={[styles.topicDescription, { color: colors.text.secondary }]}>
              {topic.description}
            </Text>
            <View style={styles.topicFooter}>
              <Text style={[styles.topicCategory, { color: colors.text.accent }]}>
                {topic.category}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleLike(topic.id)}
                >
                  <Icon 
                    name={topic.isLiked ? 'heart' : 'heart-outline'} 
                    size={20} 
                    color={topic.isLiked ? colors.status.error : colors.text.secondary} 
                  />
                  <Text style={[
                    styles.actionText, 
                    { color: topic.isLiked ? colors.status.error : colors.text.secondary }
                  ]}>
                    {topic.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSave(topic.id)}
                >
                  <Icon 
                    name={topic.isSaved ? 'bookmark' : 'bookmark-outline'} 
                    size={20} 
                    color={topic.isSaved ? colors.text.accent : colors.text.secondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicCategory: {
    fontSize: 14,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
  },
}); 