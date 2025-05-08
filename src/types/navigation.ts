import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Friends: undefined;
  Events: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  TabuGame: undefined;
  BottleSpin: undefined;
  Chat: undefined;
  CharadesScreen: undefined;
  CityNameScreen: undefined;
  WordGameScreen: undefined;
  QuizScreen: undefined;
  EditProfile: undefined;
  NewAcquaintance: undefined;
  Topics: undefined;
  Games: undefined;
};

export type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>; 