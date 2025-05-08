import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Category = 'date' | 'group';

const dateQuestions = [
  {
    id: '1',
    question: 'Hayalinizdeki ilk buluşma nasıl olurdu?',
    category: 'date',
  },
  {
    id: '2',
    question: 'Bir film karakteri olsaydınız hangisi olurdunuz?',
    category: 'date',
  },
  {
    id: '3',
    question: 'En son ne zaman gerçekten mutlu hissettiniz?',
    category: 'date',
  },
  {
    id: '4',
    question: 'Hayatınızda değiştirmek istediğiniz bir şey var mı?',
    category: 'date',
  },
  {
    id: '5',
    question: 'Sizi en çok ne güldürür?',
    category: 'date',
  },
];

const groupQuestions = [
  {
    id: '1',
    question: 'Eğer bir süper gücünüz olsaydı ne olmasını isterdiniz?',
    category: 'group',
  },
  {
    id: '2',
    question: 'Hayatınızın en unutulmaz anı nedir?',
    category: 'group',
  },
  {
    id: '3',
    question: 'Bir günlüğüne başka biri olabilseydiniz kim olurdunuz?',
    category: 'group',
  },
  {
    id: '4',
    question: 'En son ne zaman kendinizi gerçekten cesur hissettiniz?',
    category: 'group',
  },
  {
    id: '5',
    question: 'Hayatınızda en çok pişman olduğunuz şey nedir?',
    category: 'group',
  },
];

export default function NewAcquaintanceScreen() {
  const { colors, gradients } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category>('date');

  const questions = selectedCategory === 'date' ? dateQuestions : groupQuestions;
  const gradientColors = selectedCategory === 'date' 
    ? ['#FF6B6B', '#FF8E8E'] 
    : gradients.primary;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Keşfet" 
        gradientColors={gradientColors as any}
      />

      <View style={styles.content}>
        {/* Kategori Seçimi */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'date' && { backgroundColor: '#FF6B6B' }
            ]}
            onPress={() => setSelectedCategory('date')}
          >
            <Icon name="heart" size={24} color={selectedCategory === 'date' ? '#FFFFFF' : '#FF6B6B'} />
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === 'date' ? '#FFFFFF' : '#FF6B6B' }
            ]}>
              Date
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'group' && { backgroundColor: colors.primary }
            ]}
            onPress={() => setSelectedCategory('group')}
          >
            <Icon name="account-group" size={24} color={selectedCategory === 'group' ? '#FFFFFF' : colors.primary} />
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === 'group' ? '#FFFFFF' : colors.primary }
            ]}>
              Toplu Tanışma
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sorular */}
        <ScrollView style={styles.questionsContainer}>
          {questions.map((item) => (
            <Card
              key={item.id}
              style={{
                padding: 16,
                marginBottom: 12,
                borderRadius: 12,
                backgroundColor: selectedCategory === 'date' ? '#FFF5F5' : colors.card
              }}
            >
              <Text style={[
                styles.questionText,
                { color: selectedCategory === 'date' ? '#FF6B6B' : colors.text.primary }
              ]}>
                {item.question}
              </Text>
            </Card>
          ))}
        </ScrollView>
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
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  questionsContainer: {
    flex: 1,
  },
  questionCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 