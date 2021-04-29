import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BigCategoryButton } from '../../components/button';

export default function MainCategory({ route }) {
  const navigation = route.navigation;
  const title = route.title;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BigCategoryButton
          navigation={navigation}
          title={title}
          category={'프로젝트'}
        />
        <BigCategoryButton
          navigation={navigation}
          title={title}
          category={'알고리즘 스터디'}
        />
      </View>
      <View style={styles.content}>
        <BigCategoryButton
          navigation={navigation}
          title={title}
          category={'면접 스터디'}
        />
        <BigCategoryButton
          navigation={navigation}
          title={title}
          category={'개념 스터디'}
        />
      </View>
      <View style={styles.content}>
        <BigCategoryButton
          navigation={navigation}
          title={title}
          category={'모각코'}
        />
        <BigCategoryButton category={'transparent'} />
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
