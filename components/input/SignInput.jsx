import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function SignInput({ label, value, type, hint, setValue }) {
  // const message = () => {
  //   if (msg !== undefined) {
  //     return <Text style={styles.msg}>{msg}</Text>;
  //   }
  // };

  return (
    <View style={{ width: '100%', marginBottom: 20 }}>
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
      {/* {message()} */}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#263238',
    fontWeight: 'bold',
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
