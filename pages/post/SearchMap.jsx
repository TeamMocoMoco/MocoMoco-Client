import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Location from 'expo-location';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { Feather } from '@expo/vector-icons';

import { MainCard } from '../../components/card';

import { getColor } from '../../styles/styles';
import { getPostsByLocation } from '../../config/api/MapAPI';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function SearchMap({ navigation }) {
  const mapRef = useRef(null);
  const pannelRef = useRef(null);

  const locationGangNam = [37.49799799400392, 127.02754613036706];

  const [ready, setReady] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: locationGangNam[0],
    longitude: locationGangNam[1],
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      setTimeout(async () => {
        const result = await getPostsByLocation(
          mapRegion.latitude,
          mapRegion.longitude
        );
        setPosts(result);
      });
      setReady(true);
    });
    return () => setReady(false);
  }, [navigation]);

  const getCurrentLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '위치 정보를 가져올 수 없습니다.',
        'MocoMoco 앱 설정에서 위치 권한을 허용해주세요. ',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '앱 설정',
            onPress: async () => {
              await Linking.openSettings();
            },
            style: 'default',
          },
        ]
      );
    } else {
      let location = await Location.getCurrentPositionAsync({});
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  });

  const onRegionChange = (region) => {
    setMapRegion(region);
  };

  return ready ? (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 지도 */}
        <MapView
          ref={(ref) => (mapRef.current = ref)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={mapRegion}
          onRegionChange={(region) => onRegionChange(region)}
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
                pinColor={getColor('defaultColor')}
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
          initialRegion={mapRegion}
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
    marginBottom: 50,
    marginHorizontal: 25,
  },
  FAB: {
    backgroundColor: getColor('defaultColor'),
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
