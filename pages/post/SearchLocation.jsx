import React, { useCallback, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { SearchBar } from '../../components/input';
import { LocationCard } from '../../components/card';

import { Entypo } from '@expo/vector-icons';

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
      {/* 검색창 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{ paddingVertical: 10, paddingEnd: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={30} color="black" />
        </TouchableOpacity>
        <SearchBar doFunction={download} />
      </View>

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ paddingVertical: 10, paddingEnd: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={30} color="black" />
        </TouchableOpacity>
        <SearchBar doFunction={download} />
      </View>
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
