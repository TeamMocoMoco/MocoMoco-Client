import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

export default function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={'검색어를 입력하세요.'}
          placeholderTextColor="#FFF"
          onChangeText={(text) => {
            setValue(text);
          }}
        />
      </View>
      <TouchableHighlight style={styles.buttonContainer}>
        <Text style={styles.buttonText}>검색</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2293F4',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    backgroundColor: '#339DFF',
    flex: 1,
    height: 40,
    marginEnd: 10,
    borderRadius: 5,
  },
  input: {
    width: '85%',
    color: 'white',
    marginStart: 15,
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#1EA7F8',
    width: '15%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
