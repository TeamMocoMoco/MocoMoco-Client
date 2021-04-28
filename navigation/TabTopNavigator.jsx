import React, { useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { MainList, MainCategory } from '../pages/post';
import { useNavigation } from '@react-navigation/native';

const renderScene = SceneMap({
  MainList: MainList,
  Online: MainCategory,
  Offline: MainCategory,
});

const renderTabBar = (props) => (
  <TabBar {...props} indicatorStyle={{ backgroundColor: 'white' }} />
);

const TabTopNavigator = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'MainList', title: '전체', navigation: navigation },
    { key: 'Online', title: '온라인', navigation: navigation },
    { key: 'Offline', title: '오프라인', navigation: navigation },
  ]);

  return (
    <TabView
      style={{ marginTop: getStatusBarHeight() }}
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default TabTopNavigator;
