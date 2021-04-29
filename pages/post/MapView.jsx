import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MapModal } from '../../components/map';

export default function MapView({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setModalOpen(true)}
          style={{ margin: 100 }}
        >
          <Text>openModal</Text>
        </TouchableOpacity>

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
});
