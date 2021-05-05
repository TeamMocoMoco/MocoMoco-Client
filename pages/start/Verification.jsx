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
const diviceWidth = Dimensions.get('window').width;

import { HeaderBack } from '../../components/header';
import { sendSMS } from '../../config/api/UserAPI';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
          style={[styles.buttonContainer, { opacity: 0.4 }]}
        >
          <Text style={styles.buttonText}>인증 요청</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, { opacity: 1 }]}
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
        <View style={styles.headTextBox}>
          <Text style={styles.headText}>
            스터디 신청을 위해{'\n'}전화번호 인증이 필요합니다
          </Text>
        </View>

        {/* 전화번호 입력 */}
        <KeyboardAwareScrollView>
          <View
            style={{
              width: '100%',
              paddingBottom: 20,
              paddingTop: diviceWidth * 0.25,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '100%',
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: 'black',
                }}
              >
                <TextInput
                  maxLength={11}
                  placeholder={'010-0000-0000 (-없이 번호만 입력)'}
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                  }}
                  style={{ fontSize: 15 }}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
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
  headTextBox: { backgroundColor: 'white' },
  headText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: '#1EA7F8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
