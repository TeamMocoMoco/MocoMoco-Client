import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ProgressBar, Colors } from 'react-native-paper';

import { HeaderBack } from '../../../components/header';
import { FullButton, TodayButton } from '../../../components/button';
import { DatePickModal, TimePickModal } from '../../../components/modal/';

export default function CreatePostSecond({ navigation, route }) {
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [currentModal, setCurrentModal] = useState('');
  const [today, setToday] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  let onAndOff = route.params.onAndOff;
  let category = route.params.category;
  let personnel = route.params.personnel;
  let location = route.params.location;

  const showSubmitButton = () => {
    if (
      dueDate == '' ||
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
              startDate,
              dueDate,
            })
          }
        />
      );
    }
  };

  const showDateModal = () => {
    if (currentModal == 'start') {
      return (
        <DatePickModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDateTime={setStartDate}
        />
      );
    } else {
      return (
        <DatePickModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDateTime={setDueDate}
        />
      );
    }
  };

  const showTimeModal = () => {
    if (currentModal == 'start') {
      return (
        <TimePickModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDateTime={setStartDate}
        />
      );
    } else {
      return (
        <TimePickModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDateTime={setDueDate}
        />
      );
    }
  };

  const showPicker = () => {
    if (today == '기간스터디') {
      return showDateModal();
    } else if (today == '당일스터디') {
      return showTimeModal();
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'시간까지 설정하는 센스!'} />
      {/* 진행 현황 */}
      <ProgressBar
        progress={0.5}
        color={Colors.grey900}
        backgroundColor={Colors.grey50}
      />

      <View style={styles.content}>
        <Text style={styles.serviceComment}>
          스터디 종류와{'\n'}시작일 / 종료일을 설정해주세요.
        </Text>

        {/* 당일스터디 / 기간스터디
        <View style={{ width: '100%', marginBottom: 20 }}>
          <View style={styles.row}>
            {['당일스터디', '기간스터디'].map((title, i) => {
              return (
                <TodayButton
                  title={title}
                  today={today}
                  doFunction={(value) => {
                    setToday(value);
                    setStartDate('');
                    setDueDate('');
                  }}
                  key={i}
                />
              );
            })}
          </View>
        </View> */}

        {/* 시작일 */}
        <View style={styles.startBox}>
          <View style={styles.midBox}>
            <Text style={styles.label}>시작일</Text>
          </View>
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => {
              setCurrentModal('start');
              setModalOpen(true);
            }}
          >
            <TextInput
              style={{ color: '#111' }}
              editable={false}
              placeholder={'시작 일시를 선택하세요.'}
              placeholderTextColor={'#999'}
              value={startDate}
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
              setCurrentModal('due');
              setModalOpen(true);
            }}
          >
            <TextInput
              style={{ color: '#111' }}
              editable={false}
              placeholder={'종료 일시를 선택하세요.'}
              placeholderTextColor={'#999'}
              value={dueDate}
            />
          </TouchableOpacity>
        </View>

        {showDateModal()}
        {/* {showPicker()} */}
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
    fontWeight: 'bold',
    marginVertical: 10,
  },

  serviceComment: {
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
  midBox: { flex: 2, marginEnd: 20 },
  dateBox: {
    flex: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#CBCBCB',
  },
  dueBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
