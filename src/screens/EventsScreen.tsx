import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import GradientHeader from '../components/GradientHeader';

export default function EventsScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { colors, gradients } = useTheme();

  const handleCreateEvent = () => {
    // Burada etkinlik oluşturma mantığı olacak
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader 
        title="Etkinlikler" 
        gradientColors={gradients.primary}
      />

      <View style={styles.content}>
        <Card style={styles.formCard}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text.primary
            }]}
            placeholder="Etkinlik Adı"
            placeholderTextColor={colors.text.tertiary}
            value={eventName}
            onChangeText={setEventName}
          />

          <View style={styles.dateRow}>
            <Text style={[styles.label, { color: colors.text.primary }]}>Tarih:</Text>
            <TextInput
              style={[styles.input, { 
                flex: 1,
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.text.primary
              }]}
              placeholder="GG/AA/YYYY"
              placeholderTextColor={colors.text.tertiary}
              value={eventDate}
              onChangeText={setEventDate}
            />
          </View>

          <View style={styles.dateRow}>
            <Text style={[styles.label, { color: colors.text.primary }]}>Saat:</Text>
            <TextInput
              style={[styles.input, { 
                flex: 1,
                backgroundColor: colors.card,
                borderColor: colors.border,
                color: colors.text.primary
              }]}
              placeholder="SS:DD"
              placeholderTextColor={colors.text.tertiary}
              value={eventTime}
              onChangeText={setEventTime}
            />
          </View>

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text.primary
            }]}
            placeholder="Konum"
            placeholderTextColor={colors.text.tertiary}
            value={eventLocation}
            onChangeText={setEventLocation}
          />

          <Button
            title="Etkinlik Oluştur"
            onPress={handleCreateEvent}
            type="primary"
            style={styles.createButton}
          />
        </Card>

        {showSuccess && (
          <Text style={[styles.success, { color: colors.status.success }]}>
            Etkinlik başarıyla oluşturuldu!
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    padding: 16,
  },
  input: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  createButton: {
    marginTop: 8,
  },
  success: {
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
}); 