import React, { useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Permissions from 'expo-permissions';

import MapView, { Marker } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { Feather } from '@expo/vector-icons';

import { MainCard } from '../../components/card';

import { getColor } from '../../styles/styles';
import { getPostsByLocation } from '../../config/api/MapAPI';

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

export default function SearchMap({ navigation }) {
  const mapRef = useRef(null);
  const pannelRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [mapCenter, setMapCenter] = useState([
    37.49799799400392, 127.02754613036706,
  ]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getPostsByLocation(mapCenter[0], mapCenter[1]);
        // result.map((post) => {
        //   console.log(post._id);
        //   console.log(post.location);
        // });
        setPosts(result);
        setReady(true);
      });
    });
  }, []);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.getAsync(
        Permissions.LOCATION_FOREGROUND
      );
      if (status !== 'granted') {
        Alert.alert('현재 위치에 접근할 수 없습니다.');
        return false;
      } else {
        return true;
      }
    }
  };

  const getCurrentLocation = async () => {
    const status = getPermission();
    if (status) {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    }
  };

  return ready ? (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 지도 */}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: mapCenter[0],
            longitude: mapCenter[1],
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        >
          {posts.map((post) => {
            return (
              <Marker
                coordinate={{
                  latitude: post.location[0],
                  longitude: post.location[1],
                }}
                onPress={() => {
                  pannelRef.current.show();
                }}
                key={post._id}
              />
            );
          })}
        </MapView>

        {/* 슬라이딩 패널 */}
        <SlidingUpPanel ref={(c) => (pannelRef.current = c)}>
          {(dragHandler) => (
            <View style={styles.modalFrame}>
              {/* 패널 헤더 */}
              <View style={styles.modalHeader} {...dragHandler}>
                <View style={styles.dragHandle}></View>
                <View style={styles.modalHeaderText}>
                  <Text style={styles.nearby}>{'내 주변\n3Km 이내'}</Text>
                  <Text style={styles.studyCount}>
                    {`총 ${posts.length}개의 스터디 진행중...`}
                  </Text>
                </View>
              </View>

              {/* 패널 바디 */}
              <View style={styles.modalContent}>
                <FlatList
                  data={posts}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  renderItem={(post) => {
                    return (
                      <MainCard
                        navigation={navigation}
                        post={post.item}
                        key={post.item._id}
                      />
                    );
                  }}
                />
              </View>
            </View>
          )}
        </SlidingUpPanel>
      </View>
      <TouchableOpacity
        style={styles.FAB}
        onPress={() => {
          getCurrentLocation();
        }}
      >
        <Feather name="navigation" size={24} color="white" />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 지도 */}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 37.497961,
            longitude: 127.027574,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={0}
          minZoomLevel={0}
        ></MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalFrame: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 100,
    paddingBottom: screenHeight - windowHeight + 50,
  },
  modalHeader: {
    alignItems: 'center',
    backgroundColor: getColor('defaultColor'),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  dragHandle: {
    backgroundColor: '#373B4F',
    width: 40,
    height: 5,
    marginVertical: 7,
    borderRadius: 10,
  },
  modalHeaderText: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginBottom: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  nearby: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  studyCount: {
    color: '#FFF',
    fontSize: 12,
  },
  modalContent: {
    marginVertical: 10,
    marginHorizontal: 25,
  },
  FAB: {
    backgroundColor: getColor('defaultColor'),
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
