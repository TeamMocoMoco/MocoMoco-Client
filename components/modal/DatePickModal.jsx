import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';

import DatePicker from 'react-native-modern-datepicker';

const pickerWidth = Dimensions.get('window').width * 0.8;

export default function DatePickModal({
  modalOpen,
  setModalOpen,
  setDateTime,
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect;

  return (
    <Modal transparent visible={modalOpen}>
      <View style={styles.modalFrame}>
        <View style={styles.modalContent}>
          <DatePicker
            style={styles.datePicker}
            onDateChange={(d) => setDate(d)}
            onTimeChange={(t) => {
              setTime(t);
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
