import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

function MaterialsInput(props) {
    console.log('findKey',props.counter)

    useEffect(()=>{
        props.materialInfo(props.counter, props.materialName, props.materialQty);
    },[])

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.lableText}>Material Name</Text>
        <Text
          style={[styles.infoText, styles.inputBorder, {width: 175}]}>
          {props.materialName}
        </Text>
      </View>
      <View>
        <Text style={styles.lableText}>Material Received</Text>
        <TextInput
          onChange={e => {
            props.materialInfo(props.counter, props.materialName, e.nativeEvent.text);
          }}
          style={[styles.infoText, styles.inputBorder, {width: 135}]}>
          {props.materialQty}
        </TextInput>
      </View>
    </View>
  );
}

export default MaterialsInput;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  lableText: {
    color: '#a1a1a1',
    fontSize: 13,
    marginTop: 18,
  },
  infoText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 17,
  },
  inputBorder: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#969696',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0.5,
    marginTop: 10,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    width: windowWidth / 1.25,
    justifyContent: 'space-between',
  },
});
