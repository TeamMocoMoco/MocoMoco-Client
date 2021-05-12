import React, { useState } from 'react';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';

import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';

const pickerWidth = Dimensions.get('window').width * 0.8;

export default function DatePickModal({
  modalOpen,
  setModalOpen,
  setDateTime,
}) {
  let currentDate = moment().format('YYYY.MM.DD');

  const [time, setTime] = useState('00:00');

  return (
    <Modal transparent visible={modalOpen}>
      <View style={styles.modalFrame}>
        <View style={styles.modalContent}>
          <DatePicker
            style={styles.datePicker}
            minimumDate={currentDate}
            onTimeChange={(t) => {
              setTime(t);
            }}
            onDateChange={(date) => {
              setDateTime(date + ' ' + time);
              setModalOpen(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFrame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: pickerWidth,
    height: pickerWidth * 1.1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    elevation: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#777',
  },
  datePicker: {
    borderRadius: 5,
  },
});
