import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SubjectCard = ({ subject, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(subject)}>
      <View style={styles.cardContent}>
        <Text style={styles.subjectName}>{subject.level}</Text>
      </View>
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
  cardContent: {
    flexDirection: 'column',
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subjectDescription: {
    fontSize: 14,
    color: '#444',
  },
});

export default SubjectCard;
