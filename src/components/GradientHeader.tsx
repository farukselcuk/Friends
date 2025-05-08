import React from 'react';
import { StyleSheet, View, Text, Platform, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface GradientHeaderProps {
  title: string;
  gradientColors?: any;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  gradientColors,
  rightContent,
  leftContent,
  containerStyle,
  titleStyle,
}) => {
  const { gradients, colors } = useTheme();
  const headerColors = gradientColors || [colors.primary, colors.secondary];

  return (
    <LinearGradient
      colors={headerColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.header, containerStyle]}
    >
      {leftContent && <View style={styles.leftContent}>{leftContent}</View>}
      
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      
      {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 25 : 25,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  leftContent: {
    position: 'absolute',
    left: 16,
    bottom: 18,
    zIndex: 1,
  },
  rightContent: {
    position: 'absolute',
    right: 16,
    bottom: 18,
    zIndex: 1,
  }
});

export default GradientHeader; 