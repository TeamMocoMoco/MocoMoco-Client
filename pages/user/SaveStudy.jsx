import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, View, Text } from 'react-native';

import { HeaderBackTitle } from '../../components/header';

export default function SaveStudy({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBackTitle title={'저장 스터디'} navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.readyText}>🚧준비중입니다...🚧</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  readyText: {
    fontSize: 20,
    marginBottom: 300,
  },
});
