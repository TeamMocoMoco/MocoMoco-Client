import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getColor } from '../../styles/styles';

export default function OnAndOffButton({
  title,
  onAndOff,
  setOnAndOff,
  setLocation,
}) {
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
          setLocation([]);
        }}
      >
        <Text style={{ color: '#8E8E8E', fontSize: 14 }}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: getColor('defaultColor'),
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: getColor('defaultColor'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    backgroundColor: getColor('inactiveColor'),
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: getColor('inactiveColor'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
  },
});
