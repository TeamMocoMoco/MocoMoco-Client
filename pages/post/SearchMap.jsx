import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';

import { MapModal } from '../../components/map';

export default function SearchMap({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.497961,
            longitude: 127.027574,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={0}
          minZoomLevel={0}
        >
          <MapView.Marker
            coordinate={{ latitude: 37.497961, longitude: 127.027574 }}
            onPress={() => {
              setModalOpen(true);
            }}
          />
        </MapView>

        {/* 모달 */}
        <MapModal
          navigation={navigation}
          where={'서울시 강남구 대치동'}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
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
});
