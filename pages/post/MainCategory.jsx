import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BigCategoryButton } from '../../components/button';

export default function MainCategory() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BigCategoryButton title={'프로젝트'} />
        <BigCategoryButton title={'알고리즘 스터디'} />
      </View>
      <View style={styles.content}>
        <BigCategoryButton title={'면접 스터디'} />
        <BigCategoryButton title={'개념 스터디'} />
      </View>
      <View style={styles.content}>
        <BigCategoryButton title={'모각코'} />
        <BigCategoryButton title={'transparent'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  content: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});
