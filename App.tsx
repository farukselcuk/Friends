import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import EventsScreen from './src/screens/EventsScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import ChatScreen from './src/screens/ChatScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import NewAcquaintanceScreen from './src/screens/NewAcquaintanceScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import TabuGameScreen from './src/screens/games/TabuGameScreen';
import BottleSpinScreen from './src/screens/games/BottleSpinScreen';
import { RootStackParamList, MainTabParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.icon.active,
        tabBarInactiveTintColor: colors.icon.inactive,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 10,
        },
        tabBarLabelStyle: { 
          fontSize: 12, 
          marginBottom: 4,
          fontWeight: '500',
        },
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
  const { themePaper, themeNavigation } = useTheme();

  if (isLoading) {
    return null; // veya bir loading ekranı gösterilebilir
  }

  return (
    <PaperProvider theme={themePaper}>
      <NavigationContainer theme={themeNavigation}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <Stack.Screen name="Auth" component={AuthScreen} />
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen name="TabuGame" component={TabuGameScreen} />
              <Stack.Screen name="BottleSpin" component={BottleSpinScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="NewAcquaintance" component={NewAcquaintanceScreen} />
            </>
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
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
