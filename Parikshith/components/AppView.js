import React, {useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Login from './Login/Login';
import SiteEngHome from './SiteEngHome/SiteEngHome';
import AllProjects from './AllInfo/AllProjects';
import AllRequests from './AllInfo/AllRequests';
import DrawerNav from './DrawerNav';
import OrderMaterials from './OrderMaterials/OrderMaterials';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

function AppView({navigate}) {
  return (
    <NavigationContainer>
      {/* <Login/> */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={DrawerNav}
        />
        <Stack.Screen
          name="AllProjects"
          options={{
            title: 'Your Projects',
            headerTitleStyle: {
              fontFamily: 'Gilroy-Bold',
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
          component={AllProjects}
        />
        <Stack.Screen
          name="AllRequests"
          options={{
            title: 'Your Requests',
            headerTitleStyle: {
              fontFamily: 'Gilroy-Bold',
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
          component={AllRequests}
        />
        <Stack.Screen
          name="OrderMaterials"
          options={{
            title: 'Order Materials',
            headerTitleStyle: {
              fontFamily: 'Gilroy-Bold',
            },
            headerStyle:{
              backgroundColor: '#F8F8F8',
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            
          }}
          component={OrderMaterials}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppView;
