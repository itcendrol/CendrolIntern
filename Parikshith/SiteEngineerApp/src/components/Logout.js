import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Logout({navigation}) {
    useEffect(()=>{
        AsyncStorage.clear();
        navigation.navigate('Login');
    })
  return (
    <SafeAreaView>
      <View>
        <Text style={{color:'black'}}>Bye!</Text>
      </View>
    </SafeAreaView>
  );
}

export default Logout;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth / 1.1,
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'left',
    color: 'black',
  },
});
