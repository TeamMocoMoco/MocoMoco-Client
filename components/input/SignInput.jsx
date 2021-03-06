import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function SignInput({ label, value, type, hint, setValue }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={value == '' ? styles.hint : styles.input}
          // type이 패스워드면 화면상에 텍스트가 안보이게 처리하는 속성
          secureTextEntry={type == 'password' ? true : false}
          placeholder={hint}
          placeholderTextColor={'#111'}
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#263238',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  inputBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
  },
  hint: {
    opacity: 0.4,
    fontSize: 18,
  },
  input: {
    opacity: 1,
  },
  msg: {
    color: '#999',
    fontSize: 12,
    marginStart: 5,
  },
});
