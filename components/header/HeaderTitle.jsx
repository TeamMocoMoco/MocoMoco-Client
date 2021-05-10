import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { getColor } from '../../styles/styles';

export default function HeaderTitle({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: getColor('HeaderBorderColor'),
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
