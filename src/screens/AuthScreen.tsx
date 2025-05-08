import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Switch, useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (isLogin) {
        await login(email, password);
      } else {
        if (!username) {
          setError('Kullanıcı adı gerekli');
          return;
        }
        await register(username, email, password);
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {isLogin
              ? 'Hesabınıza giriş yapın'
              : 'Yeni bir hesap oluşturun'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <TextInput
              label="Kullanıcı Adı"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode="outlined"
            />
          )}

          <TextInput
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
          />

          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            loading={isLoading}
            disabled={isLoading}
          >
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </Button>

          <Button
            mode="text"
            onPress={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            {isLogin
              ? 'Hesabınız yok mu? Kayıt olun'
              : 'Zaten hesabınız var mı? Giriş yapın'}
          </Button>
        </View>

        <View style={styles.themeSwitch}>
          <Text>Karanlık Tema</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    padding: 4,
  },
  switchButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  themeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
}); 