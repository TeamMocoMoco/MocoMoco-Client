import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HeaderBack } from '../../components/header';

import { getColor } from '../../styles/styles';
import { checkSMS, sendSMS } from '../../config/api/UserAPI';

const diviceWidth = Dimensions.get('window').width;

export default function VerificationConfirm({ navigation, route }) {
  let phone = route.params;
  const [code, setCode] = useState('');

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const reSend = async () => {
    await sendSMS(phone);
    Alert.alert('인증번호가 재전송되었습니다.');
    setMinutes(3);
    setSeconds(0);
  };

  const doCheck = async () => {
    await checkSMS(navigation, phone, code);
  };

  const showConfirmButton = () => {
    if (code == '') {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, styles.inactive]}
        >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, styles.active]}
          onPress={() => {
            doCheck();
          }}
        >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={''} />
      <View style={styles.content}>
        {/* 타이틀 */}
        <Text style={styles.title}>
          스터디 신청을 위해{'\n'}전화번호 인증이 필요합니다
        </Text>

        {/* 전화번호 표시란 */}
        <View
          style={[styles.inputContainer, { marginTop: diviceWidth * 0.25 }]}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{phone}</Text>
        </View>

        {/* 인증번호 입력란 */}
        <KeyboardAwareScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'인증번호 6자리'}
              value={code}
              onChangeText={(text) => {
                setCode(text);
              }}
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                width: 250,
              }}
              keyboardType="number-pad"
            />
            <View>
              <Text>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            </View>
          </View>

          <View style={styles.resendBox}>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => reSend()}
            >
              <Text style={styles.resendText}>인증번호가 오지 않았어요!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {/* 인증번호 발송버튼 */}
      <View>{showConfirmButton()}</View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  buttonContainer: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  active: {
    backgroundColor: getColor('defaultColor'),
  },
  inactive: {
    backgroundColor: getColor('inactiveColor'),
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  resendBox: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resendButton: { padding: 5 },
  resendText: { fontSize: 15, color: 'lightgrey', fontWeight: 'bold' },
});
