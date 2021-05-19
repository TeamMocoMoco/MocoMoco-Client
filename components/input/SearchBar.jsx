import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ hint, keyword, doFunction }) {
  const [value, setValue] = useState(keyword);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons
          style={styles.search}
          name="md-search-outline"
          size={25}
          color="#8E8E8E"
        />
        <TextInput
          style={styles.input}
          value={value}
          placeholder={hint}
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
  search: {
    alignSelf: 'center',
    marginLeft: '5%',
  },
});
