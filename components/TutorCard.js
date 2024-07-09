import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TutorCard = ({ tutor, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(tutor)}>
      <Image source={{ uri: tutor.image }} style={styles.image} />
      <Text style={styles.name}>{tutor.name}</Text>
      <Text style={styles.subject}>{tutor.subject}</Text>
      <Text style={styles.qualifications}>{tutor.qualifications}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  subject: {
    fontSize: 16,
    color: '#888',
  },
  qualifications: {
    fontSize: 14,
    color: '#444',
  },
});

export default TutorCard;
