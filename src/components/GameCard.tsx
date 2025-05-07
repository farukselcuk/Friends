import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Chip, Text } from 'react-native-paper';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPress: (game: Game) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Fiziksel': return '#03A9F4'; // Light Blue
    case 'Digital': return '#673AB7'; // Deep Purple
    case 'Kart': return '#FF9800'; // Orange
    case 'Tahta': return '#8BC34A'; // Light Green
    default: return '#9E9E9E'; // Grey
  }
};

export const GameCard = ({ game, onPress }: GameCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(game)}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title}>{game.title}</Title>
            <Chip 
              style={{ backgroundColor: getCategoryColor(game.category) }}
              textStyle={{ color: 'white' }}
            >
              {game.category}
            </Chip>
          </View>
          <Paragraph numberOfLines={2}>{game.description}</Paragraph>
          <View style={styles.details}>
            <Text style={styles.players}>
              {game.minPlayers === game.maxPlayers 
                ? `${game.minPlayers} oyuncu` 
                : `${game.minPlayers}-${game.maxPlayers} oyuncu`}
            </Text>
            {game.location && (
              <Chip 
                style={styles.locationChip}
                textStyle={{ fontSize: 12 }}
              >
                {game.location}
              </Chip>
            )}
          </View>
          {game.materials && game.materials.length > 0 && (
            <Text style={styles.materials}>
              Gerekenler: {game.materials.join(', ')}
            </Text>
          )}
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
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  players: {
    fontSize: 14,
    color: '#424242',
  },
  locationChip: {
    height: 24,
  },
  materials: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
    fontStyle: 'italic',
  },
}); 