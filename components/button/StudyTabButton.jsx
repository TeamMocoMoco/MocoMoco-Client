import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getColor } from '../../styles/styles';

export default function StudyTabButton({ title, state, download, scroll }) {
  if (title == state) {
    return (
      <View
        style={[
          styles.container,
          { borderBottomWidth: 2, borderColor: getColor('defaultColor') },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          download(title);
          scroll();
        }}
      >
        <Text style={[styles.title, { color: '#DADADA' }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 19,
    paddingBottom: 9,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
