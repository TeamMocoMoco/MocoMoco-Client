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

import { PickRoleCard } from '../../components/card';
import { HeaderBack } from '../../components/header';
import { getColor } from '../../styles/styles';

import { register } from '../../config/api/UserAPI';

const diviceWidth = Dimensions.get('window').width;

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [pickRole, setPickRole] = useState('');

  const doRegister = async () => {
    await register(name, pickRole);
    navigation.push('TabNavigator');
  };

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
          style={[styles.buttonContainer, styles.inactive]}
        >
          <Text style={styles.buttonText}>선택 완료</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, styles.active]}
          onPress={() => {
            doRegister();
          }}
        >
          <Text style={styles.buttonText}>선택완료</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={''} />
      <View style={styles.content}>
        <Text style={styles.title}>
          사용할 이름과{'\n'}관심있는 직군을 알려주세요!
        </Text>

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

          {/* 이름 입력 */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'김정훈'}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              style={{ fontSize: 15, width: '50%' }}
            />
            <Text style={{ width: '50%' }}>Tip! 대부분 실명을 사용해요</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {/* 완료 버튼 */}
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
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: diviceWidth * 0.1,
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
  choiceRoleBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: diviceWidth * 0.25,
  },
});
