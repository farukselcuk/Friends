import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  GestureResponderEvent
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  gradientColors
}) => {
  const { colors, gradients } = useTheme();
  
  // Buton boyu
  const buttonSize = {
    small: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
    medium: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25 },
    large: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30 },
  };
  
  // Buton tipi
  const buttonType = {
    primary: {
      backgroundColor: colors.primary,
      textColor: '#ffffff',
      borderColor: 'transparent',
      gradient: gradientColors || gradients.primary,
    },
    secondary: {
      backgroundColor: 'transparent',
      textColor: colors.text.primary,
      borderColor: colors.border,
      gradient: null,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: colors.primary,
      borderColor: colors.primary,
      gradient: null,
    },
  };
  
  const selectedType = buttonType[type];
  const selectedSize = buttonSize[size];
  
  // Devre dışı stil
  const disabledStyle = disabled 
    ? { opacity: 0.5 } 
    : {};
  
  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };
  
  // Gradient buton için
  if (type === 'primary' && selectedType.gradient) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        style={[styles.buttonContainer, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={selectedType.gradient as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.button,
            selectedSize,
            disabledStyle,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={selectedType.textColor} size="small" />
          ) : (
            <Text style={[
              styles.buttonText, 
              { color: selectedType.textColor },
              textStyle
            ]}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  // Normal buton
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.button,
        selectedSize,
        { 
          backgroundColor: selectedType.backgroundColor,
          borderColor: selectedType.borderColor,
          borderWidth: type !== 'primary' ? 1 : 0,
        },
        disabledStyle,
        style
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={selectedType.textColor} size="small" />
      ) : (
        <Text style={[
          styles.buttonText, 
          { color: selectedType.textColor },
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 50,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button; 