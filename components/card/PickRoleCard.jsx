import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { developer, designer, pm } from '../../assets/images';

const diviceWidth = Dimensions.get('window').width;

export default function PickRoleCard({ item, pickRole, setPickRole }) {
  let roleName;
  if (pickRole == item.role) {
    switch (item.role) {
      case '기획자':
        roleName = pm;
        break;
      case '디자이너':
        roleName = designer;
        break;
      case '개발자':
        roleName = developer;
        break;
    }
    return (
      <TouchableOpacity disabled>
        <Text style={{ textAlign: 'center' }}>{item.role}</Text>
        <Image source={roleName} style={styles.img} />
      </TouchableOpacity>
    );
  } else {
    switch (item.role) {
      case '기획자':
        roleName = pm;
        break;
      case '디자이너':
        roleName = designer;
        break;
      case '개발자':
        roleName = developer;
        break;
    }
    return (
      <TouchableOpacity
        style={{ opacity: 0.3 }}
        onPress={() => {
          setPickRole(item.role);
        }}
      >
        <Text style={{ textAlign: 'center' }}>{item.role}</Text>
        <Image source={roleName} style={styles.img} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: diviceWidth * 0.2,
    height: diviceWidth * 0.2,
  },
});
