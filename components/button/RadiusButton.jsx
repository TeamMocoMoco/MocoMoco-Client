import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function RadiusButton({ title, status, doFunction }) {
  if (status) {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => doFunction()}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        disabled
        style={[styles.buttonContainer, { opacity: 0.4 }]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#6A6A6A',
    paddingVertical: 13,
    marginTop: 20,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
