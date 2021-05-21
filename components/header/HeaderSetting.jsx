import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

import { getColor } from '../../styles/styles';

const windowHeight = Dimensions.get('window').height;

export default function HeaderSetting({ title, setModalOpen }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity disabled style={styles.settingIcon}>
        <SimpleLineIcons name="settings" size={27} color="transparent" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>

      <TouchableOpacity
        onPress={() => {
          setModalOpen(true);
        }}
        style={styles.settingIcon}
      >
        <SimpleLineIcons name="settings" size={27} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: getColor('HeaderBorderColor'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingIcon: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
