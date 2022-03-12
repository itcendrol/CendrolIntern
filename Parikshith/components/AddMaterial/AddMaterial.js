import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
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
} from 'react-native';

function AddMaterial(props) {
  const [materialNames, setMaterialNames] = useState('');
  const [qty, setQty] = useState(1);
  const [specs, setSpecs] = useState('');
  const [specBorder, setSpecBorder] = useState('#969696');

  return (
    <View style={styles.inputRows}>
      {/* {console.log('got props: ', props)} */}
      <View style={[styles.inputBorder, {width: windowWidth / 3}]}>
        <Picker
          style={{paddingTop: 40, alignItems: 'center', color: 'black'}}
          itemStyle={{backgroundColor: 'white'}}
          placeholder="Select Material"
          dropdownIconColor="#FCC314"
          dropdownIconRippleColor="#FCC314"
          selectedValue={materialNames}
          onValueChange={(itemValue, itemIndex) => {
            setMaterialNames(itemValue);
            props.materialInfo(itemValue, qty, specs);
          }}>
          {props.matNames.Materials.map(matName => (
            <Picker.Item label={matName} value={matName} />
          ))}
        </Picker>
      </View>
      <View
        style={[
          styles.inputBorder,
          {
            width: windowWidth / 9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <TextInput
          color="black"
          keyboardType="numeric"
          onChange={e => {
            setQty(parseInt(e.nativeEvent.text));
            qty === String('NaN') && setQty('1');
            props.materialInfo(materialNames, e.nativeEvent.text, specs);
          }}
          value={isNaN(qty) ? setQty(0) : String(qty)}
          style={{width: 45}}
          maxLength={3}
        />
      </View>
      <View style={[styles.inputBorder, {width: windowWidth / 4.5, borderColor: specBorder}]}>
        <TextInput
          color="black"
          onChange={e => {
            e.nativeEvent.text === ''
              ? setSpecBorder('red')
              : setSpecBorder('#969696');
            setSpecs(e.nativeEvent.text);
            props.materialInfo(materialNames, qty, e.nativeEvent.text);
          }}
          maxLength={10}
        />
      </View>
    </View>
  );
}

export default AddMaterial;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputBorder: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#969696',
    justifyContent: 'center',
    margin: 10,
    height: 40,
  },
  inputRows: {
    flexDirection: 'row',
    width: windowWidth / 3.6,
  },
  incDec: {
    height: 24.5,
    width: 25,
    color: '#FCC314',
    fontSize: 20,
    alignItems: 'center',
    padding: 5,
  },
});
