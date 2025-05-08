import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TextInput, Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { colors, gradients } = useTheme();
  const [username, setUsername] = useState('Kullanıcı Adı');
  const [bio, setBio] = useState('Merhaba! Ben arkadaş uygulamasını kullanıyorum.');
  const [location, setLocation] = useState('İstanbul');
  const [interests, setInterests] = useState('Yürüyüş, Sinema, Kitap Okuma');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Fotoğraflara erişim izni gerekiyor!');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  const saveProfile = () => {
    alert('Profil bilgileriniz kaydedildi!');
    navigation.goBack();
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <GradientHeader 
        title="Profili Düzenle" 
        gradientColors={gradients.primary as any}
        leftContent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        }
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.profileImageCard}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={pickImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Avatar.Text
                  size={120}
                  label={username.substring(0, 2).toUpperCase()}
                  style={[styles.avatar, { backgroundColor: colors.primary }]}
                  color="#fff"
                />
              )}
              <View style={[styles.editIconContainer, { backgroundColor: colors.primary }]}>
                <Icon name="camera" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Card style={styles.formCard}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text.primary, fontSize: 16, fontWeight: '500' }]}>Kullanıcı Adı</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card }]}
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text.primary, fontSize: 16, fontWeight: '500' }]}>Hakkımda</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card }]}
              value={bio}
              onChangeText={setBio}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              multiline
              numberOfLines={3}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text.primary, fontSize: 16, fontWeight: '500' }]}>Konum</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card }]}
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text.primary, fontSize: 16, fontWeight: '500' }]}>İlgi Alanları</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card }]}
              value={interests}
              onChangeText={setInterests}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              placeholder="Virgülle ayrılmış ilgi alanları"
            />
          </View>
        </Card>
        
        <Button
          title="Değişiklikleri Kaydet"
          onPress={saveProfile}
          style={styles.saveButton}
          size="large"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  profileImageCard: {
    marginBottom: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatar: {
    backgroundColor: '#fb923c',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCard: {
    marginBottom: 16,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 40,
  },
}); 