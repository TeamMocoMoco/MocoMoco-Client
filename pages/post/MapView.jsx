import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
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
        <Modal transparent visible={modalOpen} animationType="slide">
          <View
            style={{
              flex: 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              marginTop: 100,
              backgroundColor: 'white',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1EA7F8',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                height: 60,
                padding: 15,
              }}
            >
              <AntDesign
                name="arrowleft"
                size={30}
                color="white"
                onPress={() => setModalOpen(false)}
              />
              <Text
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  textAlign: 'center',
                  fontSize: 18,
                }}
              >
                서울시 강남구 대치동
              </Text>
              <AntDesign name="arrowleft" size={30} color="transparent" />
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
  },
});
