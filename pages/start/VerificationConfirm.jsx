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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HeaderBack } from '../../components/header';

import { getColor } from '../../styles/styles';
import { checkSMS } from '../../config/api/UserAPI';

const diviceWidth = Dimensions.get('window').width;

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
              style={{ fontSize: 20, fontWeight: 'bold' }}
              keyboardType="number-pad"
            />
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
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
