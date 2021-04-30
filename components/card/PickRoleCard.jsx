import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PickRoleCard({ item, pickRole, setPickRole }) {
  if (pickRole == item.role) {
    return (
      <TouchableOpacity disabled>
        <Text style={{ textAlign: 'center' }}>{item.role}</Text>
        <Ionicons name={item.name} size={80} color="black" />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ opacity: 0.3 }}
        onPress={() => {
          setPickRole(item.role);
        }}
      >
        <Text style={{ textAlign: 'center' }}>{item.role}</Text>
        <Ionicons name={item.name} size={80} color="black" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
