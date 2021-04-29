import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView, StyleSheet, View } from 'react-native';

import { HeaderBack } from '../../components/header';
import { DetailCard } from '../../components/card';
import { FullButton } from '../../components/button';

export default function ReadPost({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'모집글 상세'} />
      <ScrollView>
        <View style={styles.content}>
          <DetailCard />
          <View style={{ width: '50%', alignSelf: 'center' }}>
            <FullButton title={'신청하기'} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
});
