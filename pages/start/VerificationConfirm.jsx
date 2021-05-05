import React, { useState } from 'react';
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
import { checkSMS } from '../../config/api/UserAPI';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function VerificationConfirm({ navigation, route }) {
  let phone = route.params;
  const [code, setCode] = useState('');

  const doCheck = async () => {
    await checkSMS(navigation, phone, code);
  };

  const showConfirmButton = () => {
    if (code == '') {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, { opacity: 0.4 }]}
        >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, { opacity: 1 }]}
          onPress={() => {
            doCheck();
          }}
        >
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="전화번호 인증" />
      <View style={styles.content}>
        <View style={styles.headTextBox}>
          <Text style={styles.headText}>
            스터디 신청을 위해{'\n'}전화번호 인증이 필요합니다
          </Text>
        </View>

        {/* 전화번호 입력 + 인증번호 발송버튼 */}
        <View>
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
                <Text style={{ fontSize: 15 }}>{phone}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 인증번호 입력 */}
        <KeyboardAwareScrollView>
          <View
            style={{
              width: '100%',
              paddingBottom: 20,
              paddingTop: diviceWidth * 0.05,
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
                  placeholder={'인증번호 6자리'}
                  value={code}
                  onChangeText={(text) => {
                    setCode(text);
                  }}
                  style={{ fontSize: 15 }}
                />
              </View>
            </View>
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
