import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EventsScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    if (!title) return;
    setCreated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Etkinlik Oluştur</Text>
      <TextInput
        style={styles.input}
        placeholder="Etkinlik Başlığı"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Yer"
        value={location}
        onChangeText={setLocation}
      />
      <View style={styles.dateRow}>
        <Text style={styles.label}>Tarih & Saat:</Text>
        <Button title={date.toLocaleString()} onPress={() => setShowDatePicker(true)} />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (event.type === 'set' && selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
      <Button title="Oluştur" onPress={handleCreate} disabled={!title} />
      {created && <Text style={styles.success}>Etkinlik oluşturuldu! (Takvime ekleme yakında)</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b45309',
    marginTop: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#a16207',
    marginRight: 8,
  },
  success: {
    color: '#22c55e',
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
}); 