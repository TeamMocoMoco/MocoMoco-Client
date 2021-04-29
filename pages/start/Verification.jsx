import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const diviceWidth = Dimensions.get('window').width;

import { HeaderBack } from '../../components/header';

export default function Verification({ navigation }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const showSendButton = () => {
    if (phone == '') {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, { opacity: 0.4 }]}
        >
          <Text style={styles.buttonText}>인증번호 발송</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.buttonContainer, { opacity: 1 }]}>
          <Text style={styles.buttonText}>인증번호 발송</Text>
        </TouchableOpacity>
      );
    }
  };

  const showConfirmButton = () => {
    if (code == '') {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, { opacity: 0.4 }]}
        >
          <Text style={styles.buttonText}>인증번호 확인</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.buttonContainer, { opacity: 1 }]}>
          <Text style={styles.buttonText}>인증번호 확인</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="전화번호 인증" />
      <View style={styles.content}>
        {/* 전화번호 입력 + 인증번호 발송버튼 */}
        <View style={styles.row}>
          <View
            style={{
              width: '100%',
              paddingBottom: 20,
              paddingTop: diviceWidth * 0.5,
            }}
          >
            <Text
              style={{
                color: '#263238',
                fontWeight: 'bold',
                marginVertical: 10,
              }}
            >
              전화번호
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '70%',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#999',
                  borderRadius: 4,
                }}
              >
                <TextInput
                  placeholder={'전화번호를 입력하세요.'}
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                  }}
                />
              </View>
              {/* 인증번호 발송버튼 */}
              <View style={{ width: '27%' }}>{showSendButton()}</View>
            </View>
          </View>
        </View>

        {/* 인증번호 입력 + 인증완료 버튼 */}
        <View style={[styles.row, { opacity: 1 }]}>
          <View
            style={{
              width: '100%',
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#263238',
                fontWeight: 'bold',
                marginVertical: 10,
              }}
            >
              인증번호
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '70%',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#999',
                  borderRadius: 4,
                }}
              >
                <TextInput
                  placeholder={'인증번호를 입력하세요.'}
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                  }}
                />
              </View>
              {/* 인증번호 확인버튼 */}
              <View style={{ width: '27%' }}>{showConfirmButton()}</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#1EA7F8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
