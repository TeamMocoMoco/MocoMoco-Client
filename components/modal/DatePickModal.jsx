import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';

import DatePicker from 'react-native-modern-datepicker';

export default function DatePickModal({ modalOpen, setModalOpen, setDate }) {
  return (
    <Modal
      transparent
      visible={modalOpen}
      onRequestClose={() => {
        setModalOpen(false);
      }}
    >
      <TouchableOpacity
        style={styles.modalFrame}
        onPressOut={() => {
          setModalOpen(false);
        }}
      >
        <View style={styles.modalContent}>
          <DatePicker
            style={styles.datePicker}
            onSelectedChange={(date) => setDate(date)}
          />
        </View>
      </TouchableOpacity>
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
    width: '80%',
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
