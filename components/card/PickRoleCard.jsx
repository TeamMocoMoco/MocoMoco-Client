import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColor } from '../../styles/styles';

export default function PickRoleCard({ item, pickRole, setPickRole }) {
  let pickcolor;
  if (pickRole == item.role) {
    switch (item.role) {
      case '기획자':
        pickcolor = getColor('pmColor');
        break;
      case '디자이너':
        pickcolor = getColor('designerColor');
        break;
      case '개발자':
        pickcolor = getColor('developerColor');
        break;
    }
    return (
      <TouchableOpacity disabled>
        <Text style={{ textAlign: 'center' }}>{item.role}</Text>
        <Ionicons name={item.name} size={80} color={pickcolor} />
      </TouchableOpacity>
    );
  } else {
    switch (item.role) {
      case '기획자':
        pickcolor = getColor('pmColor');
        break;
      case '디자이너':
        pickcolor = getColor('designerColor');
        break;
      case '개발자':
        pickcolor = getColor('developerColor');
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
        <Ionicons name={item.name} size={80} color={pickcolor} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
