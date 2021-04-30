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

import { PickRoleCard } from '../../components/card';
import { HeaderBack } from '../../components/header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUp({ navigation, route }) {
  let phone = route.params;
  const [name, setName] = useState('');
  const [pickRole, setPickRole] = useState('');
  const roles = [
    { role: '기획자', name: 'ellipse' },
    { role: '디자이너', name: 'triangle-sharp' },
    { role: '개발자', name: 'md-square-sharp' },
  ];

  const showCompleteButton = () => {
    if (name == '' || pickRole == '') {
      return (
        <TouchableOpacity
          disabled
          style={[styles.buttonContainer, { opacity: 0.4 }]}
        >
          <Text style={styles.buttonText}>선택 완료</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, { opacity: 1 }]}
          onPress={() => navigation.push('TabNavigator', phone, pickRole)}
        >
          <Text style={styles.buttonText}>선택완료</Text>
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
            사용할 이름과{'\n'}관심있는 직군을 알려주세요!
          </Text>
        </View>

        <KeyboardAwareScrollView>
          {/* 직군선택 */}
          <View style={styles.choiceRoleBox}>
            {roles.map((item, i) => {
              return (
                <PickRoleCard
                  item={item}
                  pickRole={pickRole}
                  setPickRole={setPickRole}
                  key={i}
                />
              );
            })}
          </View>
          {/* 전화번호 입력 + 인증번호 발송버튼 */}
          <View>
            <View
              style={{
                width: '100%',
                paddingBottom: 20,
                paddingTop: diviceWidth * 0.1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    width: '100%',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextInput
                    placeholder={'홍모코'}
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    style={{ fontSize: 15 }}
                  />
                  <Text>Tip! 대부분 실명을 사용해요</Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {/* 인증번호 발송버튼 */}
      <View>{showCompleteButton()}</View>
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
  choiceRoleBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: diviceWidth * 0.25,
  },
});
