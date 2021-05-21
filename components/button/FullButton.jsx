import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getColor } from '../../styles/styles';

export default function FullButton({ title, empty, doFunction }) {
  const [lastPress, setLastPress] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLastPress(false);
    }, 1000);
    return () => clearInterval(id);
  }, [lastPress]);

  const back = () => {
    if (!lastPress) {
      setLastPress(true);
      doFunction();
    }
  };

  if (empty) {
    return (
      <TouchableOpacity
        disabled
        style={[styles.buttonContainer, styles.inactive]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.active]}
        onPress={() => back()}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 13,
  },
  active: {
    backgroundColor: getColor('defaultColor'),
  },
  inactive: {
    backgroundColor: getColor('inactiveColor'),
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
});
