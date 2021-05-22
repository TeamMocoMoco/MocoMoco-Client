import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { HeaderBackTitle } from '../../components/header';

import { getColor } from '../../styles/styles';

import { Ionicons } from '@expo/vector-icons';

export default function ParticipantsList({ navigation, route }) {
  const participants = route.params;

  const [lastPress, setLastPress] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLastPress(false);
    }, 1000);
    return () => clearInterval(id);
  }, [lastPress]);

  const showRoleIcon = (participant) => {
    let pickColor;
    let iconName;

    switch (participant.role) {
      case '기획자':
        pickColor = getColor('pmColor');
        iconName = 'ellipse';
        break;
      case '디자이너':
        pickColor = getColor('designerColor');
        iconName = 'triangle-sharp';
        break;
      case '개발자':
        pickColor = getColor('developerColor');
        iconName = 'md-square-sharp';
        break;
    }

    return (
      <>
        <Ionicons name={iconName} size={15} color={pickColor} />
        <Image
          source={{ uri: participant.userImg }}
          style={[styles.participantImg, { borderColor: pickColor }]}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBackTitle navigation={navigation} title={'참가자'} />
      <View style={styles.content}>
        <View style={styles.participants}>
          {participants.length == 0 || participants == null ? (
            <View style={styles.participantLine}>
              <Text>참가자가 아직 없습니다.</Text>
            </View>
          ) : (
            participants.map((participant) => {
              return (
                <TouchableOpacity
                  key={participant._id}
                  style={styles.participantLine}
                  onPress={() => {
                    if (!lastPress) {
                      setLastPress(true);
                      navigation.push(
                        'OtherProfile',
                        (navigation, participant._id)
                      );
                    }
                  }}
                >
                  {showRoleIcon(participant)}

                  <View style={styles.row}>
                    <Text style={styles.participantName}>
                      {participant.name}
                    </Text>
                    <Text style={styles.participantRole}>
                      {participant.role}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  row: { flexDirection: 'row' },
  participants: {
    margin: 3,
  },
  participantLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 10,
    padding: 10,
  },
  participantImg: {
    resizeMode: 'cover',
    height: 44,
    width: 44,
    borderRadius: 100,
    borderWidth: 2,
    marginLeft: 7,
  },
  participantName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  participantRole: {
    marginLeft: 5,
    color: 'grey',
    fontSize: 14,
  },
});
