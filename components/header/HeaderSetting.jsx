import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { SettingModal } from '../../components/modal';

import { SimpleLineIcons } from '@expo/vector-icons';

export default function HeaderSetting({ title, modalOpen, setModalOpen }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity disabled>
        <SimpleLineIcons name="settings" size={24} color="transparent" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>

      <TouchableOpacity
        onPress={() => {
          setModalOpen(true);
        }}
      >
        <SimpleLineIcons name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  headerText: {
    color: 'black',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
