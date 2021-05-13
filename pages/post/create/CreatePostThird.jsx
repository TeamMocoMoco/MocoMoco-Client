import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { ProgressBar, Colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HeaderBack } from '../../../components/header';
import { FullButton } from '../../../components/button';
import { getColor } from '../../../styles/styles';

export default function CreatePostThird({ navigation, route }) {
  const [position, setPosition] = useState('');
  const [language, setLanguage] = useState('');

  let onAndOff = route.params.onAndOff;
  let category = route.params.category;
  let personnel = route.params.personnel;
  let location = route.params.location;
  let address = route.params.address;
  let startDate = route.params.startDate;
  let dueDate = route.params.dueDate;

  const showSubmitButton = () => {
    if (position == '' || language == '') {
      return <FullButton title={'저장하고 다음으로'} empty={true} />;
    } else {
      return (
        <FullButton
          title={'저장하고 다음으로'}
          empty={false}
          doFunction={() =>
            navigation.push('CreatePostFourth', {
              onAndOff,
              category,
              personnel,
              location,
              address,
              startDate,
              dueDate,
              position,
              language,
            })
          }
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'거의 다 왔어요!'} />
      {/* 진행 현황 */}
      <ProgressBar
        progress={0.75}
        color={Colors.grey900}
        backgroundColor={Colors.grey50}
      />
      <KeyboardAwareScrollView style={styles.content}>
        <Text style={styles.serviceComment}>
          개발 스터디의 경우{'\n'}포지션과 주 사용언어가 중요합니다.
        </Text>

        {/* 포지션 / 사용언어 */}
        <View style={styles.column}>
          {/* 작성자 포지션 */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>나의 포지션</Text>
            <TextInput
              style={{ flex: 3, fontSize: 22, fontWeight: 'bold' }}
              value={position}
              type={'position'}
              placeholder={'ex) 백엔드 개발자'}
              placeholderTextColor={getColor('inactiveBorderColor')}
              onChangeText={(text) => {
                setPosition(text);
              }}
            />
          </View>

          {/* 작성자 사용 언어 */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>사용 언어</Text>
            <TextInput
              style={{ flex: 3, fontSize: 22, fontWeight: 'bold' }}
              value={language}
              type={'language'}
              placeholder={'ex) Python, JS'}
              placeholderTextColor={getColor('inactiveBorderColor')}
              onChangeText={(text) => {
                setLanguage(text);
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {showSubmitButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  column: { flexDirection: 'column' },
  serviceComment: {
    lineHeight: 28,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '5%',
    color: 'black',
  },
  inputBox: {
    width: '100%',
    paddingVertical: '2%',
    borderBottomWidth: 2,
    borderColor: getColor('inactiveBorderColor'),
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: '3%',
  },
});
