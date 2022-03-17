import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SiteEngHome from './SiteEngHome/SiteEngHome';

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{headerShown: false}} name="Home" component={SiteEngHome} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default TabNav;
