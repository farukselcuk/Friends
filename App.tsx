import React from 'react';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import GamesScreen from './src/screens/GamesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // veya bir loading ekranı gösterilebilir
  }

  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={NavigationDefaultTheme}>
        <Stack.Navigator>
          {!user ? (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Ana Sayfa' }}
              />
              <Stack.Screen
                name="Topics"
                component={TopicsScreen}
                options={{ title: 'Konuşma Konuları' }}
              />
              <Stack.Screen
                name="Games"
                component={GamesScreen}
                options={{ title: 'Oyunlar' }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
