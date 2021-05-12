import React from 'react';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';

import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';

const pickerWidth = Dimensions.get('window').width * 0.8;

export default function DatePickModal({
  modalOpen,
  setModalOpen,
  setDateTime,
}) {
  let currentDate = moment().format('YYYY-MM-DD');

  return (
    <Modal transparent visible={modalOpen}>
      <View style={styles.modalFrame}>
        <View style={styles.modalContent}>
          <DatePicker
            style={styles.datePicker}
            minimumDate={currentDate}
            onDateChange={(date) => {
              setDateTime(date + ' ' + '00:00');
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
