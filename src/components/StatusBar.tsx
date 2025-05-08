import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface StatusBarProps {
  time?: string;
  style?: ViewStyle;
}

const StatusBar: React.FC<StatusBarProps> = ({ time = '08:17', style }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: colors.background },
      style
    ]}>
      <Text style={[styles.time, { color: colors.text.tertiary }]}>
        {time}
      </Text>
      <View style={styles.indicators}>
        <Text style={[styles.indicator, { color: colors.text.tertiary }]}>📶</Text>
        <Text style={[styles.indicator, { color: colors.text.tertiary }]}>🔋 67%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  indicators: {
    flexDirection: 'row',
    gap: 6,
  },
  indicator: {
    fontSize: 12,
  },
});

export default StatusBar; 