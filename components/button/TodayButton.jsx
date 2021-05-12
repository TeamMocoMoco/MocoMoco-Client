import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getColor } from '../../styles/styles';

export default function TodayButton({ title, today, setToday }) {
  if (title == today) {
    return (
      <TouchableOpacity disabled style={styles.active}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.inactive}
        onPress={() => {
          setToday(title);
        }}
      >
        <Text style={{ color: 'black', fontSize: 14 }}>{title}</Text>
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
    backgroundColor: 'white',
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
