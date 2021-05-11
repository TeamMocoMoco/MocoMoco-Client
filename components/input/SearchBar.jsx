import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableHighlight, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ doFunction }) {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableHighlight style={styles.buttonContainer}>
          <Ionicons name="md-search-outline" size={25} color="#8E8E8E" />
        </TouchableHighlight>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={'검색어를 입력하세요.'}
          placeholderTextColor="#777"
          onChangeText={(text) => {
            setValue(text);
          }}
          onEndEditing={() => {
            doFunction(value);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  inputContainer: {
    backgroundColor: '#F6F7F9',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#777',
    marginStart: 15,
    fontSize: 14,
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
  },
});
