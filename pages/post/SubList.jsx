import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView, StyleSheet, View } from 'react-native';

import { HeaderBack } from '../../components/header';
import { SearchBar } from '../../components/input';
import { MainCard } from '../../components/card';

export default function SubList({ route }) {
  const data = route.params;
  const navigation = data.navigation;
  const title = data.title + ' - ' + data.category;
  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={title} />
      <SearchBar />
      <ScrollView>
        <View style={styles.content}>
          <MainCard />
          <MainCard />
          <MainCard />
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
  },
  content: {
    flex: 1,
    marginVertical: 10,
  },
});
