import React from 'react';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import GamesScreen from './src/screens/GamesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import EventsScreen from './src/screens/EventsScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#fb923c',
        tabBarInactiveTintColor: '#a3a3a3',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Friends') iconName = 'account-group';
          else if (route.name === 'Events') iconName = 'calendar';
          else if (route.name === 'Messages') iconName = 'message-text';
          else if (route.name === 'Profile') iconName = 'menu';
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Friends" component={FriendsScreen} options={{ title: 'Arkadaşlar' }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'Etkinlikler' }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: 'Mesajlar' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Menü' }} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // veya bir loading ekranı gösterilebilir
  }

  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={NavigationDefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <Stack.Screen name="Auth" component={AuthScreen} />
          ) : (
            <Stack.Screen name="Main" component={MainTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
