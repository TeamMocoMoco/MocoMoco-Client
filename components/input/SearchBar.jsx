import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar() {
  const [value, setValue] = useState('알고리즘');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ color: 'white' }}
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
        />
        <Button>
          <Text>검색</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2293F4',
    padding: 10,
    width: '100%',
  },
  inputContainer: {
    backgroundColor: '#339DFF',
    padding: 10,
    borderRadius: 5,
  },
});
