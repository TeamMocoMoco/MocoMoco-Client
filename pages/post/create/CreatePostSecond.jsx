import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';

import { ProgressBar, Colors } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import { HeaderBack } from '../../../components/header';
import { FullButton } from '../../../components/button';
import { getColor } from '../../../styles/styles';

export default function CreatePostSecond({ navigation, route }) {
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  let onAndOff = route.params.onAndOff;
  let category = route.params.category;
  let personnel = route.params.personnel;
  let location = route.params.location;
  let address = route.params.address;
  let name = route.params.name;

  const showSubmitButton = () => {
    if (
      startDate == '' ||
      new Date(dueDate).getTime() - new Date(startDate).getTime() < 0
    ) {
      return <FullButton title={'저장하고 다음으로'} empty={true} />;
    } else {
      return (
        <FullButton
          title={'저장하고 다음으로'}
          empty={false}
          doFunction={() =>
            navigation.push('CreatePostThird', {
              onAndOff,
              category,
              personnel,
              location,
              address,
              name,
              startDate,
              dueDate,
            })
          }
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'시간까지 설정하는 센스!'} />
      {/* 진행 현황 */}
      <ProgressBar
        progress={0.66}
        color={Colors.grey900}
        backgroundColor={Colors.grey50}
      />

      <View style={styles.content}>
        <Text style={styles.serviceComment}>
          모임의{'\n'}시작일과 종료일을 정해주세요.
        </Text>

        {/* 시작일 */}
        <View style={styles.startBox}>
          <View style={styles.midBox}>
            <Text style={styles.label}>시작일</Text>
          </View>
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => {
              setShowStartPicker(true);
            }}
          >
            <TextInput
              style={{ color: '#111' }}
              editable={false}
              placeholder={'시작 일시를 선택하세요.'}
              placeholderTextColor={'#999'}
              value={moment(startDate).format('YYYY년 MM월 DD일')}
            />
          </TouchableOpacity>
        </View>

        {/* 종료일 */}
        <View style={styles.dueBox}>
          <View style={styles.midBox}>
            <Text style={styles.label}>종료일</Text>
          </View>
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => {
              setShowEndPicker(true);
            }}
          >
            <TextInput
              style={{ color: '#111' }}
              editable={false}
              placeholder={'종료 일시를 선택하세요.'}
              placeholderTextColor={'#999'}
              value={moment(dueDate).format('YYYY년 MM월 DD일')}
            />
          </TouchableOpacity>
        </View>

        {showStartPicker && !showEndPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            minimumDate={new Date()}
            mode={'date'}
            display="default"
            onChange={(event, selectedDate) => {
              setStartDate(selectedDate || startDate);
              setShowStartPicker(false);
              setShowEndPicker(false);
            }}
          />
        )}

        {!showStartPicker && showEndPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dueDate}
            minimumDate={startDate}
            mode={'date'}
            display="default"
            onChange={(event, selectedDate) => {
              setDueDate(selectedDate || dueDate);
              setShowStartPicker(false);
              setShowEndPicker(false);
            }}
          />
        )}
      </View>
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
  row: {
    flexDirection: 'row',
  },
  label: {
    color: '#263238',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  serviceComment: {
    lineHeight: 28,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '5%',
    color: 'black',
    marginTop: '5%',
  },
  startBox: {
    flexDirection: 'row',
    marginVertical: '5%',
    alignItems: 'center',
  },
  midBox: {
    flex: 2,
    marginEnd: 20,
  },
  dateBox: {
    flex: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: getColor('inactiveBorderColor'),
  },
  dueBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
