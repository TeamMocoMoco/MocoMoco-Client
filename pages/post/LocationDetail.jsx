import React, { useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, StyleSheet, View } from 'react-native';

import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';

import { getColor } from '../../styles/styles';
import { getPostsByLocation } from '../../config/api/MapAPI';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocationDetail({ navigation, route }) {
  const location = route.params;

  const mapRef = useRef(null);

  const [mapCenter, setMapCenter] = useState([location[0], location[1]]);

  return (
    <View style={styles.container}>
      {/* 지도 */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: mapCenter[0],
          longitude: mapCenter[1],
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Circle
          center={{
            latitude: location[0],
            longitude: location[1],
          }}
          radius={windowWidth / 10}
          strokeWidth={0}
          fillColor={'#435BEF99'}
        />
      </MapView>
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
});
