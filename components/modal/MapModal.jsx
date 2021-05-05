import React from 'react';
import { StyleSheet, View, Modal, ScrollView, Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import MapCard from '../card/MapCard';

export default function MapModal({
  navigation,
  modalOpen,
  setModalOpen,
  where,
}) {
  return (
    <Modal transparent visible={modalOpen} animationType="slide">
      <View style={styles.modalFrame}>
        <View style={styles.modalHeader}>
          <AntDesign
            name="arrowleft"
            size={30}
            color="white"
            onPress={() => setModalOpen(false)}
          />
          <Text style={styles.modalTopText}>{where}</Text>
          <AntDesign name="arrowleft" size={30} color="transparent" />
        </View>

        <ScrollView>
          <MapCard navigation={navigation} setModalOpen={setModalOpen} />
          <MapCard navigation={navigation} setModalOpen={setModalOpen} />
          <MapCard navigation={navigation} setModalOpen={setModalOpen} />
          <MapCard navigation={navigation} setModalOpen={setModalOpen} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFrame: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 100,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#08F',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 60,
    padding: 15,
  },
  modalTopText: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 18,
  },
});
