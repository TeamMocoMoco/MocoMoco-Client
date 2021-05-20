import React, { useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Entypo, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { ProgressBar, Colors } from 'react-native-paper';

import { HeaderBack } from '../../../components/header';
import { FullButton, OnAndOffButton } from '../../../components/button';
import { getColor } from '../../../styles/styles';

import kind from '../../../config/mock/category.json';

export default function CreatePostFirst({ navigation }) {
  const categoryList = kind.category;

  const locationInfo = useRef();

  const [onAndOff, setOnAndOff] = useState('');
  const [category, setCategory] = useState('선택');
  const [personnel, setPersonnel] = useState(0);
  const [location, setLocation] = useState([]);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    navigation.addListener('focus', (e) => {
      if (locationInfo.current != null) {
        const lat = locationInfo.current.geometry.location.lat;
        const lng = locationInfo.current.geometry.location.lng;
        setLocation([lat, lng]);
        let array = locationInfo.current.vicinity.split(' ');
        if (array.length > 1) {
          array.pop();
          setAddress(array.join(' '));
        } else {
          setAddress(array);
        }
        setName(locationInfo.current.name);
      }
    });
  });

  const showSubmitButton = () => {
    if (onAndOff == '' || category == '선택' || personnel == '') {
      return <FullButton title={'저장하고 다음으로'} empty={true} />;
    } else if (onAndOff == '오프라인' && address == '') {
      return <FullButton title={'저장하고 다음으로'} empty={true} />;
    } else {
      return (
        <FullButton
          title={'저장하고 다음으로'}
          empty={false}
          doFunction={() =>
            navigation.push('CreatePostSecond', {
              onAndOff,
              category,
              personnel,
              location,
              address,
              name,
            })
          }
        />
      );
    }
  };

  const showAdressInput = () => {
    if (onAndOff == '오프라인') {
      return (
        <View>
          <Text style={styles.serviceComment}>주소</Text>
          <TouchableOpacity
            style={styles.adressBox}
            onPress={() => {
              navigation.push('SearchLocation', { info: locationInfo });
            }}
          >
            {name == '' ? (
              <Text style={{ color: '#AAA' }}>예) 스타벅스 강남</Text>
            ) : (
              <Text style={{ color: '#000' }}>{name}</Text>
            )}
            <Ionicons name="md-search-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={'시작이 반이다!'} />
      {/* 진행도 현황 */}
      <ProgressBar
        progress={0.33}
        color={Colors.grey900}
        backgroundColor={Colors.grey50}
      />
      <View style={styles.content}>
        {/* 온/오프라인 */}
        <Text style={styles.serviceComment}>
          진행 방식을{'\n'}선택해주세요.
        </Text>
        <View style={{ width: '100%', marginBottom: 20 }}>
          <View style={styles.row}>
            {['오프라인', '온라인'].map((title, i) => {
              return (
                <OnAndOffButton
                  title={title}
                  onAndOff={onAndOff}
                  doFunction={(value) => {
                    setOnAndOff(value);
                    setLocation([]);
                    setAddress('');
                    setName('');
                    locationInfo.current = null;
                  }}
                  key={i}
                />
              );
            })}
          </View>
        </View>

        {/* 주소 */}
        {showAdressInput()}

        {/* 모집분류 */}
        <Text style={styles.serviceComment}>
          어떤 모임인지와{'\n'}참여가능 인원을 알려주세요.
        </Text>
        <View style={styles.catepersonBox}>
          <View style={{ flex: 2, marginEnd: 20 }}>
            <Text style={styles.label}>모집 분류</Text>
          </View>
          <View style={styles.dropdownBox}>
            <Picker
              mode="dropdown"
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
            >
              {categoryList.map((item, i) => {
                return <Picker.Item label={item} value={item} key={i} />;
              })}
            </Picker>
          </View>
        </View>

        {/* 모집 인원 */}
        <View style={styles.catepersonBox}>
          <View style={{ flex: 2, marginEnd: 20 }}>
            <Text style={styles.label}>모집 인원</Text>
          </View>
          <View style={styles.buttonBox}>
            {/* 마이너스 버튼 */}
            <TouchableOpacity
              style={styles.mpButton}
              onPress={() => {
                if (personnel > 0) {
                  setPersonnel(personnel - 1);
                }
              }}
            >
              <Entypo name="minus" size={18} color="white" />
            </TouchableOpacity>

            {/* 인원 */}
            <Text style={styles.numberText}>{personnel}</Text>

            {/* 플러스 버튼 */}
            <TouchableOpacity
              style={styles.mpButton}
              onPress={() => {
                setPersonnel(personnel + 1);
              }}
            >
              <Entypo name="plus" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ alignContent: 'flex-end' }}>{showSubmitButton()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '5%',
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    color: '#263238',
    fontWeight: 'bold',
    marginVertical: 10,
  },

  serviceComment: {
    lineHeight: 28,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '5%',
    color: 'black',
  },
  adressBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: getColor('inactiveBorderColor'),
    padding: '3%',
    marginBottom: '5%',
    paddingHorizontal: 20,
  },
  picker: {
    backgroundColor: '#FFF0E0',
    flex: 1,
    minHeight: 28,
  },
  pickerItem: {
    color: 'red',
    height: 44,
    fontSize: 20,
  },
  catepersonBox: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  dropdownBox: {
    flex: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#CBCBCB',
  },
  buttonBox: {
    flex: 5,
    flexDirection: 'row',
    marginEnd: '20%',
    alignItems: 'center',
  },
  mpButton: {
    backgroundColor: getColor('defaultColor'),
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
