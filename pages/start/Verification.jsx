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
import { SignInput } from '../../components/input';

export default function Verification({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="전화번호 인증" />

      <TouchableOpacity style={styles.sendMessageBox}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
          인증번호 발송
        </Text>
      </TouchableOpacity>

      {/* 인증 완료 버튼 */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={styles.VerificationBox}>
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
  varifacationTextBox: { flex: 1, alignItems: 'flex-start' },
  varifacationText: {
    color: 'grey',
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  sendMessageBox: {
    backgroundColor: 'skyblue',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  VerificationBox: {
    backgroundColor: 'skyblue',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
