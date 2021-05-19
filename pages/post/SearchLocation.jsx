import React, { useCallback, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';

import { SearchBar } from '../../components/input';
import { LocationCard } from '../../components/card';
import { HeaderBack } from '../../components/header';

import { getLocations } from '../../config/api/MapAPI';
import { getColor } from '../../styles/styles';

export default function SearchLocation({ navigation, route }) {
  const info = route.params.info;

  const [ready, setReady] = useState(true);
  const [results, setResults] = useState([]);

  const download = useCallback(async (address) => {
    setReady(false);
    const result = await getLocations(address);
    setResults(result);
    setReady(true);
  });

  return ready ? (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} />
      {/* 검색창 */}
      <SearchBar doFunction={download} />

      {/* 검색한 주소 목록 */}
      <View style={styles.content}>
        <FlatList
          data={results}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.place_id}
          renderItem={(location) => {
            return (
              <LocationCard
                navigation={navigation}
                location={location.item}
                info={info}
                key={location.item.place_id}
              />
            );
          }}
        />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <SearchBar doFunction={download} />
      <ActivityIndicator
        size="large"
        color={getColor('defaultColor')}
        style={{ flex: 1, alignSelf: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  content: {
    flex: 1,
    marginVertical: 10,
  },
});
