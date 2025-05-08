import React from 'react';
import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  const { colors } = useTheme();

  if (onPress) {
    return (
      <TouchableOpacity 
        style={[
          styles.card, 
          { 
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          }, 
          style
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        }, 
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default Card; 