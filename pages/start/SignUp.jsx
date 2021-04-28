import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { HeaderBack } from '../../components/header';
import { SignInput } from '../../components/input';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="회원가입" />

      {/* 이름 */}
      <View style={styles.inputBox}>
        <SignInput
          label={'이름'}
          value={name}
          type={'name'}
          hint={'이름을 입력하세요.'}
          setValue={setName}
        />
      </View>

      {/* 닉네임 */}
      <View style={styles.inputBox}>
        <SignInput
          label={'닉네임'}
          value={nickname}
          type={'nickname'}
          hint={'닉네임을 입력하세요.'}
          setValue={setNickname}
        />
      </View>

      {/* 아이디 */}
      <View style={styles.inputBox}>
        <SignInput
          label={'아이디'}
          value={id}
          type={'id'}
          hint={'아이디를 입력하세요.'}
          setValue={setId}
        />
      </View>

      {/* 비밀번호 */}
      <View style={styles.inputBox}>
        <SignInput
          label={'비밀번호'}
          value={password}
          type={'password'}
          hint={'비밀번호를 입력하세요.'}
          setValue={setPassword}
        />
      </View>

      {/* 비밀번호 확인 */}
      <View style={styles.inputBox}>
        <SignInput
          label={'비밀번호 확인'}
          value={password}
          type={'password'}
          hint={'비밀번호를 다시 한 번 입력하세요.'}
          setValue={setPassword}
        />
      </View>

      {/* 전화번호 인증완료 버튼 */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.VerificationBox}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
            전화번호 인증 완료
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
  inputBox: {
    alignItems: 'center',
    marginTop: 20,
  },
  VerificationBox: {
    backgroundColor: 'skyblue',
    padding: 10,
    marginHorizontal: '10%',
    marginVertical: 10,
  },
});
