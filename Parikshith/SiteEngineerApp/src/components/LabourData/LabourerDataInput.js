import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input';
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

function LabourerDataInput(props) {
  const [labourer, setLabourer] = useState('');
  const [noOfLabour, setNoOfLabour] = useState('');

  return (
    <View style={styles.row}>
      <View style={[styles.inputBorder, {paddingLeft: 0, paddingRight: 0}]}>
        <Picker
          style={{
            paddingTop: 40,
            alignItems: 'center',
            color: 'black',
          }}
          itemStyle={{backgroundColor: 'white'}}
          placeholder="Select Labout Type"
          enabled={true}
          dropdownIconColor="#FCC314"
          dropdownIcon
          dropdownIconRippleColor="#FCC314"
          selectedValue={labourer}
          onValueChange={(itemValue, itemIndex) => {
            setLabourer(itemValue);
            props.labourDataInputs(itemValue, noOfLabour);
          }}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Mason" value="Mason" />
          <Picker.Item label="Helper" value="Helper" />
          <Picker.Item label="Female Helper" value="FemaleHelper" />
          <Picker.Item label="Carpenter" value="Carpenter" />
          <Picker.Item label="Painter" value="Painter" />
          <Picker.Item label="Electrician" value="Electrician" />
        </Picker>
      </View>
      <View style={{paddingTop:5}}>
        <NumericInput
          type="plus-minus"
          minValue={0}
          rounded
          totalHeight={50}
          onChange={value => {
            setNoOfLabour(value);
            props.labourDataInputs(labourer, value);
          }}
          borderColor="white"
          rightButtonBackgroundColor="#FEEDB9"
          leftButtonBackgroundColor="#FEEDB9"
        />
      </View>
    </View>
  );
}

export default LabourerDataInput;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  inputBorder: {
    borderWidth: 1,
    width: windowWidth / 2.2,
    borderRadius: 5,
    borderColor: '#E3E3E3',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0.5,
    marginTop: 10,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth / 1.2,
    marginTop: 15,
  },
});
