import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login/Login';
import Logout from './Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import 'react-native-gesture-handler';
import SiteEngHome from './SiteEngHome/SiteEngHome';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
      <Drawer.Navigator initialRouteName="SiteEngHome">
        <Drawer.Screen options={{headerShown: false}} name="SiteEngHome" component={SiteEngHome} />
        <Drawer.Screen options={{headerShown: false}} name="Logout" component={Logout}/>
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
  );
}

export default DrawerNav;
