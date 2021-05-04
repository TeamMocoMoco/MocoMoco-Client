import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function OnAndOffButton({ title, onAndOff, setOnAndOff }) {
  if (title == onAndOff) {
    return (
      <TouchableOpacity disabled style={styles.active}>
        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: 'bold' }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.inactive}
        onPress={() => {
          setOnAndOff(title);
        }}
      >
        <Text style={{ color: '#8E8E8E', fontSize: 14 }}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#979797',
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#CBCBCB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
  },
});
