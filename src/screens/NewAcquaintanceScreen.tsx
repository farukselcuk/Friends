import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Button, Chip, RadioButton, Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ModeType = 'friendship' | 'dating';
type QuestionCategory = 'light' | 'deep' | 'fun';

// Define the navigation types
type RootStackParamList = {
  Chat: {
    friendName: string;
    initialMessage?: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
}

const questions: Question[] = [
  // Light questions
  { id: '1', text: 'En sevdiğin tatil yeri neresidir?', category: 'light' },
  { id: '2', text: 'Hangi filmi tekrar tekrar izlersin?', category: 'light' },
  { id: '3', text: 'En sevdiğin yemek nedir?', category: 'light' },
  { id: '4', text: 'Hobilerin nelerdir?', category: 'light' },
  
  // Deep questions
  { id: '5', text: 'Hayatta en büyük başarın nedir?', category: 'deep' },
  { id: '6', text: 'Bir günlüğüne başka biri olabilsen kim olurdun?', category: 'deep' },
  { id: '7', text: 'Geçmişte değiştirmek istediğin bir şey var mı?', category: 'deep' },
  { id: '8', text: 'Seni en çok ne motive eder?', category: 'deep' },
  
  // Fun questions
  { id: '9', text: 'En komik anın neydi?', category: 'fun' },
  { id: '10', text: 'Süper gücün olsa ne olmasını isterdin?', category: 'fun' },
  { id: '11', text: 'Üç dilek hakkın olsa ne dilerdin?', category: 'fun' },
  { id: '12', text: 'En son ne zaman deli gibi güldün?', category: 'fun' },
];

export default function NewAcquaintanceScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [mode, setMode] = useState<ModeType>('friendship');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('light');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  const getRandomQuestion = (category: QuestionCategory) => {
    const filteredQuestions = questions.filter(q => q.category === category);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestion(filteredQuestions[randomIndex]);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Yeni Tanışma Modu</Text>
        <View style={{ width: 50 }} />
      </View>
      
      <Text style={styles.description}>
        Yeni insanlarla tanışmak için hangi modda sohbet etmek istediğinizi seçin.
        Seviyenize göre sohbet başlatma soruları önerebiliriz.
      </Text>
      
      <View style={styles.modeSelector}>
        <Text style={styles.sectionTitle}>Mod Seçimi</Text>
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton
              value="friendship"
              status={mode === 'friendship' ? 'checked' : 'unchecked'}
              onPress={() => setMode('friendship')}
              color="#fb923c"
            />
            <Text style={styles.radioLabel}>Arkadaşlık</Text>
          </View>
          
          <View style={styles.radioButton}>
            <RadioButton
              value="dating"
              status={mode === 'dating' ? 'checked' : 'unchecked'}
              onPress={() => setMode('dating')}
              color="#fb923c"
            />
            <Text style={styles.radioLabel}>Flört / Tanışma</Text>
          </View>
        </View>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.categorySelector}>
        <Text style={styles.sectionTitle}>Soru Kategorisi</Text>
        <View style={styles.chipContainer}>
          <Chip 
            selected={selectedCategory === 'light'} 
            onPress={() => setSelectedCategory('light')}
            style={[styles.chip, selectedCategory === 'light' && styles.selectedChip]}
            textStyle={selectedCategory === 'light' ? styles.selectedChipText : {}}
          >
            Yüzeysel Sorular
          </Chip>
          
          <Chip 
            selected={selectedCategory === 'deep'} 
            onPress={() => setSelectedCategory('deep')}
            style={[styles.chip, selectedCategory === 'deep' && styles.selectedChip]}
            textStyle={selectedCategory === 'deep' ? styles.selectedChipText : {}}
          >
            Derin Sorular
          </Chip>
          
          <Chip 
            selected={selectedCategory === 'fun'} 
            onPress={() => setSelectedCategory('fun')}
            style={[styles.chip, selectedCategory === 'fun' && styles.selectedChip]}
            textStyle={selectedCategory === 'fun' ? styles.selectedChipText : {}}
          >
            Eğlenceli Sorular
          </Chip>
        </View>
      </View>
      
      <Button
        mode="contained"
        onPress={() => getRandomQuestion(selectedCategory)}
        style={styles.generateButton}
        buttonColor="#fb923c"
      >
        Soru Öner
      </Button>
      
      {currentQuestion && (
        <Card style={styles.questionCard}>
          <Card.Content>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="outlined"
              onPress={() => setCurrentQuestion(null)}
              style={styles.cardButton}
              textColor="#fb923c"
            >
              Yeni Soru
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate('Chat', { 
                  friendName: mode === 'friendship' ? 'Yeni Arkadaş' : 'Yeni Tanışma',
                  initialMessage: currentQuestion.text
                });
              }}
              style={styles.cardButton}
              buttonColor="#fb923c"
            >
              Bu Soruyla Başla
            </Button>
          </Card.Actions>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fb923c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b45309',
  },
  description: {
    fontSize: 16,
    color: '#666',
    padding: 16,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a16207',
    marginBottom: 12,
  },
  modeSelector: {
    padding: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 50,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#fde68a',
    height: 1,
  },
  categorySelector: {
    padding: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
    backgroundColor: '#fff',
    borderColor: '#fb923c',
  },
  selectedChip: {
    backgroundColor: '#fb923c',
  },
  selectedChipText: {
    color: '#fff',
  },
  generateButton: {
    margin: 16,
  },
  questionCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderColor: '#fde68a',
    borderWidth: 1,
  },
  questionText: {
    fontSize: 18,
    color: '#b45309',
    textAlign: 'center',
    padding: 8,
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardButton: {
    flex: 1,
    margin: 4,
  },
}); 