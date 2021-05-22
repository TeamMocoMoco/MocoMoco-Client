import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';

import { Entypo } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocationDetail({ navigation, route }) {
  const location = route.params;

  const [lastPress, setLastPress] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLastPress(false);
    }, 1000);
    return () => clearInterval(id);
  }, [lastPress]);

  const back = () => {
    if (!lastPress) {
      setLastPress(true);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* 지도 */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location[0],
          longitude: location[1],
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Circle
          center={{
            latitude: location[0],
            longitude: location[1],
          }}
          radius={windowWidth / 4}
          strokeWidth={10}
          strokeColor={'#FFFFFF99'}
          fillColor={'#435BEF99'}
        />
      </MapView>

      {/* 돌아가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => back()}>
        <Entypo name="chevron-small-left" size={40} color="black" />
        <Text style={styles.backText}>게시글로 돌아가기</Text>
      </TouchableOpacity>
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
  backButton: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    left: 20,
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
