import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Touchable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MapCard } from '../../components/card';
export default function MapView() {
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

        {/* pin모달 (컴포넌트화 해야됨)*/}
        <View>
          <Modal visible={modalOpen} animationType="slide">
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: 'ligtgrey',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <Ionicons name="chevron-back" size={40} color="black" />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center' }}>
                  서울시 강남구 대치동
                </Text>
              </View>

              <ScrollView style={styles.modalView}>
                <MapCard />
                <MapCard />
                <MapCard />
                <MapCard />
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
  content: {},
  modalView: {},
});
