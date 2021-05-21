import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { getColor } from '../../styles/styles';

const windowHeight = Dimensions.get('window').height;

export default function HeaderProfile({ navigation, title, update }) {
  const [lastPress, setLastPress] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLastPress(false);
    }, 1000);
    return () => clearInterval(id);
  }, [lastPress]);

  const back = () => {
    if (!lastPress) {
      setLastPress(true);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => back()}>
        <Entypo name="chevron-small-left" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          if (!lastPress) {
            setLastPress(true);
            update();
          }
        }}
      >
        <Text style={styles.confirmText}>완료</Text>
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
  confirmButton: {
    paddingHorizontal: 10,
  },
  confirmText: {
    color: getColor('defaultColor'),
    fontSize: 16,
    fontWeight: 'bold',
  },
});
