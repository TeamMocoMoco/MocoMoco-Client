import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FullButton({ title, empty, doFunction }) {
  if (empty) {
    return (
      <TouchableOpacity
        disabled
        style={[styles.buttonContainer, { opacity: 0.4 }]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => doFunction()}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#0085FF',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
});
