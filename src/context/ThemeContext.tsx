import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, Theme as NavigationThemeType } from '@react-navigation/native';
import { COLORS, gradientColors } from '../constants/colors';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Yeni tema renkleriyle güncellenen tema
const CustomLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    background: COLORS.background,
    card: COLORS.card,
    text: COLORS.text.primary,
    border: COLORS.border,
    notification: COLORS.status.error,
  },
};

const CustomDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    card: '#1e1e1e',
    text: '#ffffff',
  },
};

export type ThemeType = {
  isDarkMode: boolean;
  colors: typeof COLORS;
  gradients: typeof gradientColors;
  toggleTheme: () => void;
  themePaper: typeof CustomLightTheme;
  themeNavigation: NavigationThemeType;
};

const ThemeContext = createContext<ThemeType>({
  isDarkMode: false,
  colors: COLORS,
  gradients: gradientColors,
  toggleTheme: () => {},
  themePaper: CustomLightTheme,
  themeNavigation: NavigationDefaultTheme,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false); // Varsayılan olarak light mode kullanıyoruz

  useEffect(() => {
    // setIsDarkMode(colorScheme === 'dark');
    // Şimdilik dark mode'u devre dışı bırakıyoruz yeni tema için
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themePaper = isDarkMode ? CustomDarkTheme : CustomLightTheme;
  const themeNavigation = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      themePaper, 
      themeNavigation,
      colors: COLORS,
      gradients: gradientColors
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 