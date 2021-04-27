import * as React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { MainList, MainCategory } from '../pages/post';

const renderScene = SceneMap({
  MainList: MainList,
  Online: MainCategory,
  Offline: MainCategory,
});

const renderTabBar = (props) => (
  <TabBar {...props} indicatorStyle={{ backgroundColor: 'white' }} />
);

export default function TabTopNavigator() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'MainList', title: '전체' },
    { key: 'Online', title: '온라인' },
    { key: 'Offline', title: '오프라인' },
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
}
