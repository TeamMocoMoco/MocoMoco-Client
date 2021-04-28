import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Form,
} from 'react-native';
const diviceWidth = Dimensions.get('window').width;

import { HeaderTitle } from '../../components/header';
import { SignInput } from '../../components/SignInput';
import SignUp from './SignUp';

export default function SignIn({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <HeaderTitle title="로그인" />

      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginTop: diviceWidth * 0.2,
        }}
      >
        MocoMoco 로그인
      </Text>

      <TextInput value={'아이디비밀번호인푹박스나중에'} />

      {/* 회원가입, 비번찾기 */}
      <View style={{ flexDirection: 'row', margin: 20 }}>
        <TouchableOpacity style={styles.varifacationTextBox}>
          <Text style={styles.varifacationText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.passwordTextBox}>
          <Text style={styles.passwordText}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
      </View>

      {/* 로그인, 회원가입 버튼 */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={styles.loginBox}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
            로그인
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBox}
          onPress={() => navigation.navigate('Verification')}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
  varifacationTextBox: { flex: 1, alignItems: 'flex-start' },
  varifacationText: {
    color: 'grey',
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  passwordTextBox: { flex: 1, alignItems: 'flex-end' },
  passwordText: { color: 'grey', borderBottomWidth: 1, borderColor: 'grey' },
  loginBox: {
    backgroundColor: 'skyblue',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
