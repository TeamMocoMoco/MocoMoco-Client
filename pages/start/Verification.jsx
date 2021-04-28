import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const diviceWidth = Dimensions.get('window').width;

import { HeaderBack } from '../../components/header';
import { SignInput, InputWithButton } from '../../components/input';

export default function Verification({ navigation }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="전화번호 인증" />

      <View style={styles.topBox}>
        {/* 전화번호 입력란 */}
        <View style={styles.inputBox}>
          <InputWithButton
            value={phone}
            type={'phone'}
            hint={'전화번호를 입력하세요.'}
            setValue={setPhone}
          />
        </View>
      </View>

      <View style={styles.inputBox}>
        <SignInput
          label={'인증번호'}
          value={code}
          type={'code'}
          hint={'인증번호를 입력하세요.'}
          setValue={setCode}
        />
      </View>

      {/* 전화번호 인증완료 버튼 */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.VerificationBox}
          onPress={() => navigation.navigate('SignUp')}
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
  topBox: {
    flexDirection: 'row',
    marginTop: diviceWidth * 0.4,
  },
  inputBox: {
    alignItems: 'center',
    marginTop: 20,
  },
  sendMessageBox: {
    backgroundColor: 'skyblue',
    padding: 10,
    marginVertical: 30,
    borderRadius: 5,
    width: diviceWidth * 0.3,
  },
  VerificationBox: {
    backgroundColor: 'skyblue',
    padding: 10,
    marginHorizontal: '10%',
    marginVertical: 10,
  },
});
