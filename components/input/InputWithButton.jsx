import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const diviceWidth = Dimensions.get('window').width;

export default function InputWithButton({ value, type, hint, setValue }) {
  // const message = () => {
  //   if (msg !== undefined) {
  //     return <Text style={styles.msg}>{msg}</Text>;
  //   }
  // };

  return (
    <View style={{ width: '100%', marginBottom: 20 }}>
      <View regular style={styles.allBox}>
        <View style={styles.inputBox}>
          {/* 입력란 */}
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

          {/* 버튼 */}
          <TouchableOpacity style={styles.sendMessageBox}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>
              인증번호 발송
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {message()} */}
    </View>
  );
}

const styles = StyleSheet.create({
  allBox: {
    paddingLeft: 5,
    borderRadius: 4,
    borderColor: '#999',
  },
  inputBox: {
    flexDirection: 'row',
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
  sendMessageBox: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
