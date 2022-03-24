import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SiteEngHome from './SiteEngHome/SiteEngHome';
import ToDo from './ToDo/ToDo';
import ProjectSchedule from './ProjectSchedule/ProjectSchedule';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require('../assets/images/NavHome.png')}></Image>
          ),
        }}
        name="Home"
        component={SiteEngHome}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'To-Do',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require('../assets/images/NavToDo.png')}></Image>
          ),
          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
          },
          headerTitleAlign: 'center',
        }}
        name="To -Do"
        component={ToDo}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Project Schedule',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require('../assets/images/NavSch.png')}></Image>
          ),
          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
          },
          headerTitleAlign: 'center',
        }}
        name="Project Schedule"
        component={ProjectSchedule}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default TabNav;
