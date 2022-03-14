import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import 'react-native-gesture-handler';
import SiteEngHome from './SiteEngHome/SiteEngHome';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
      <Drawer.Navigator initialRouteName="SiteEngHome">
        <Drawer.Screen options={{headerShown: false}} name="SiteEngHome" component={SiteEngHome} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
  );
}

export default DrawerNav;
