import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RootStackParamList } from './types/navigation';

// Screens
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import EventsScreen from './screens/EventsScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import TopicsScreen from './screens/TopicsScreen';
import NewAcquaintanceScreen from './screens/NewAcquaintanceScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import GamesScreen from './screens/GamesScreen';

// Game Screens
import TabuGameScreen from './screens/games/TabuGameScreen';
import BottleSpinScreen from './screens/games/BottleSpinScreen';
import CharadesScreen from './screens/games/CharadesScreen';
import CityNameScreen from './screens/games/CityNameScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'message-text' : 'message-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName as string} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Friends" component={FriendsScreen} options={{ title: 'Arkadaşlar' }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'Etkinlikler' }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: 'Mesajlar' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {isAuthenticated ? (
              <>
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="TabuGame" component={TabuGameScreen} />
                <Stack.Screen name="BottleSpin" component={BottleSpinScreen} />
                <Stack.Screen name="CharadesScreen" component={CharadesScreen} />
                <Stack.Screen name="CityNameScreen" component={CityNameScreen} />
                <Stack.Screen name="Chat" component={MessagesScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="NewAcquaintance" component={NewAcquaintanceScreen} />
                <Stack.Screen name="Topics" component={TopicsScreen} />
                <Stack.Screen name="Games" component={GamesScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Main" component={HomeScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 