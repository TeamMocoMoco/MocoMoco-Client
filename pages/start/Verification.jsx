import React, { useState } from 'react';
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
import { sendSMS } from '../../config/api/UserAPI';

const diviceWidth = Dimensions.get('window').width;

export default function Verification({ navigation }) {
  const [phone, setPhone] = useState('');

  const send = async () => {
    if (phone.length < 10) {
      Alert.alert('올바른 전화번호를 입력해주세요.');
    } else {
      await sendSMS(phone);
      navigation.push('VerificationConfirm', phone);
    }
  };

  const showSendButton = () => {
    if (phone == '') {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, styles.inactive]}
        >
          <Text style={styles.buttonText}>인증 요청</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, styles.active]}
          onPress={() => send()}
        >
          <Text style={styles.buttonText}>인증 요청</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={''} />
      <View style={styles.content}>
        {/* 타이틀 */}
        <Text style={styles.title}>
          스터디 신청을 위해{'\n'}전화번호 인증이 필요합니다
        </Text>

        {/* 전화번호 입력란 */}
        <KeyboardAwareScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              maxLength={11}
              placeholder={'01020021004'}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
              style={{ fontSize: 20 }}
              keyboardType="number-pad"
            />
          </View>
          <Text style={styles.comment}>( - 없이 번호만 입력)</Text>
        </KeyboardAwareScrollView>
      </View>
      {/* 인증번호 발송버튼 */}
      <View>{showSendButton()}</View>
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
    width: '100%',
    padding: 10,
    marginTop: diviceWidth * 0.25,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  comment: {
    color: 'grey',
    fontSize: 14,
    marginTop: 10,
    marginEnd: 5,
    alignSelf: 'flex-end',
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
});
