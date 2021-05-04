import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

export default function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={'검색어를 입력하세요.'}
          placeholderTextColor="#777"
          onChangeText={(text) => {
            setValue(text);
          }}
        />
      </View>
      <View></View>
      <TouchableHighlight style={styles.buttonContainer}>
        <Entypo name="magnifying-glass" size={20} color="#8E8E8E" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    backgroundColor: '#F6F7F9',
    flex: 1,
    height: 40,
    marginEnd: 10,
    borderRadius: 5,
  },
  input: {
    color: '#777',
    marginStart: 15,
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
