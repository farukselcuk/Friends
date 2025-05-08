import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton, Avatar, Text } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'friend';
  timestamp: Date;
};

type RouteParams = {
  friendName: string;
  friendAvatar?: string;
  initialMessage?: string;
};

export default function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { friendName, friendAvatar, initialMessage } = route.params as RouteParams;
  const { colors, gradients } = useTheme();
  
  const [messageText, setMessageText] = useState(initialMessage || '');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Nasılsın?',
      sender: 'friend',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'İyiyim, teşekkürler! Sen nasılsın?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: '3',
      text: 'Ben de iyiyim. Bugün ne yapıyorsun?',
      sender: 'friend',
      timestamp: new Date(Date.now() - 3400000),
    },
  ]);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setMessageText('');
      
      // Simulate friend reply after 1 second
      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Bu harika! Devam edelim...',
          sender: 'friend',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, replyMessage]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <LinearGradient
        colors={gradients.primary as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor="#fff"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Avatar.Text
          size={40}
          label={friendName.substring(0, 2).toUpperCase()}
          style={[styles.avatar, { backgroundColor: colors.primary }]}
          color="#fff"
        />
        <Text style={styles.headerTitle}>{friendName}</Text>
      </LinearGradient>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.messageList, { backgroundColor: colors.background }]}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'user'
                ? [styles.userMessageBubble, { backgroundColor: colors.primary }]
                : [styles.friendMessageBubble, { 
                    backgroundColor: colors.card,
                    borderColor: colors.border
                  }],
            ]}
          >
            <Text 
              style={[
                styles.messageText, 
                { color: item.sender === 'user' ? '#fff' : colors.text.primary }
              ]}
            >
              {item.text}
            </Text>
            <Text 
              style={[
                styles.messageTime, 
                { color: item.sender === 'user' ? 'rgba(255,255,255,0.7)' : colors.text.tertiary }
              ]}
            >
              {formatTime(item.timestamp)}
            </Text>
          </View>
        )}
      />

      <View style={[styles.inputContainer, { 
        backgroundColor: colors.card,
        borderTopColor: colors.border
      }]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background }]}
          placeholder="Mesajınızı yazın..."
          value={messageText}
          onChangeText={setMessageText}
          mode="outlined"
          outlineColor={colors.primary}
          activeOutlineColor={colors.secondary}
        />
        <TouchableOpacity onPress={sendMessage} disabled={!messageText.trim()}>
          <LinearGradient
            colors={gradients.primary as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButtonContainer}
          >
            <IconButton
              icon="send"
              size={24}
              iconColor="#fff"
              style={styles.sendButton}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  avatar: {
    marginLeft: 5,
  },
  messageList: {
    padding: 10,
    paddingTop: 15,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  userMessageBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  friendMessageBubble: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 25,
  },
  sendButtonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    marginLeft: 8,
  },
  sendButton: {
    margin: 0,
  },
}); 