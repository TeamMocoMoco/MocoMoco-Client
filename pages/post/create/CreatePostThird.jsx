import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { ProgressBar, Colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { HeaderBack } from '../../../components/header';
import { FullButton } from '../../../components/button';

export default function CreatePostThird({ navigation, route }) {
  const [position, setPosition] = useState('');
  const [language, setLanguage] = useState('');

  let onAndOff = route.params.onAndOff;
  let category = route.params.category;
  let personnel = route.params.personnel;
  let location = route.params.location;
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
          포지션과{'\n'}사용언어를 작성해주세요.
        </Text>

        {/* 포지션 / 사용언어 */}
        <View style={styles.column}>
          {/* 작성자 포지션 */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>나의 포지션</Text>
            <TextInput
              style={{ flex: 3, fontSize: 18 }}
              value={position}
              type={'position'}
              placeholder={'ex) 백엔드 개발자'}
              onChangeText={(text) => {
                setPosition(text);
              }}
            />
          </View>

          {/* 작성자 사용 언어 */}
          <View style={styles.inputBox}>
            <Text style={styles.label}>사용 언어</Text>
            <TextInput
              style={{ flex: 3, fontSize: 18 }}
              value={language}
              type={'language'}
              placeholder={'ex) Python, JS'}
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
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '5%',
    color: 'black',
  },
  inputBox: {
    width: '100%',
    paddingVertical: '2%',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: '3%',
  },
});
