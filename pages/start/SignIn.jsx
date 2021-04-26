import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View } from 'react-native';

import HeaderTitle from '../../components/HeaderTitle';

export default function SignIn() {
  return (
    <View style={styles.container}>
      <HeaderTitle headerTitle="로그인" />
      <View style={styles.content}>
        <Text>signin</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
  content: {
    alignItems: 'center',
  },
});
