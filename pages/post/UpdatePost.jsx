import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View } from 'react-native';

export default function UpdatePost() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>UpdatePost</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
});
