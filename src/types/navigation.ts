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
  Main: {
    screen?: keyof MainTabParamList;
    params?: any;
  };
  Chat: {
    friendName: string;
    friendAvatar?: string;
    initialMessage?: string;
  };
  TabuGame: undefined;
  BottleSpin: undefined;
  NewAcquaintance: undefined;
  EditProfile: undefined;
};

export type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>; 