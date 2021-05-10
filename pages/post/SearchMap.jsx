import React, { useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { MainCard } from '../../components/card';

import { getColor } from '../../styles/styles';
import { getPostsByLocation } from '../../config/api/MapAPI';

const dummy = [
  {
    hashtag: ['javascript', 'nodejs'],
    location: [37.50508186031737, 127.05248533166306],
    participants: [],
    status: true,
    _id: '60923a41333d3505035bbc82',
    title: '프로그래머스 같이 하실분',
    category: '알고리즘 스터디',
    content: '하루에 10개씩 문제 푸실 분들 채팅 주세요',
    position: '백엔드',
    language: 'javascript',
    personnel: 6,
    meeting: '온라인',
    startDate: '2021-05-10T14:00:00.000Z',
    dueDate: '2021-05-13T14:00:00.000Z',
    user: {
      _id: '608fab880fab1733316eeff1',
      name: '이다은',
      role: '개발자',
    },
    createdAt: '2021-05-05T06:25:05.885Z',
    updatedAt: '2021-05-06T14:59:00.035Z',
    __v: 0,
  },
];

export default function SearchMap({ navigation }) {
  const mapRef = useRef(null);
  const pannelRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState(dummy);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const {
          northEast,
          southhWest,
        } = await mapRef.current.getMapBoundaries();
        console.log(northEast, southhWest);
      } catch (e) {
        console.warn(e);
      }
      // const result = await getPostsByLocation('5,6', '50,50');
      // setPosts(result);
      setReady(true);
    });
  }, []);

  return ready ? (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 지도 */}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 37.497961,
            longitude: 127.027574,
          }}
          minZoomLevel={0}
          minZoomLevel={0}
        >
          {posts.map((post) => {
            return (
              <MapView.Marker
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
          <View style={styles.modalFrame}>
            <View style={styles.modalHeader}>
              <View style={styles.dragHandle}></View>
              <View style={styles.modalHeaderText}>
                <Text style={styles.nearby}>{'내 주변\n3Km 이내'}</Text>
                <Text style={styles.studyCount}>
                  {'총 38개의 스터디 진행중...'}
                </Text>
              </View>
            </View>

            <View style={styles.modalContent}>
              <FlatList
                data={posts}
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
        </SlidingUpPanel>
      </View>
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 100,
    backgroundColor: 'white',
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
});
