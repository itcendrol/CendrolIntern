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
  Alert,
} from 'react-native';
import MaterialsInput from './MaterialsInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {NavigationContainer} from '@react-navigation/native';

function Reconcilation(props) {
    console.log('Recon: ',props);
  const [modalVisible, setModalVisible] = useState(true);
  const [materials, setMaterials] = useState([]);
  //   const [addMaterials, setAddMaterials] = useState([]);

  const axios = require('axios').default;

  const materialInfo = (counter, materialName, qty) => {
    const materialArray = materials;
    materialArray.splice(counter, 1, {
      material_name: materialName,
      received: qty,
    });
    setMaterials([]);
    setMaterials(materialArray);
    console.log(materialArray);
  };

  function setReconStatus() {
    console.log('Setting Status for ID ', props.req_id);
    axios
      .post(`https://94.237.65.99:4000/reconciled?_id=${props.req_id}`,materials)
      .then(function (response) {
        ToastAndroid.show('Drag down to refresh data', ToastAndroid.CENTER);
        setModalVisible(false);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('Reconcilation error: '.error);
      });
  }

  function submitRecon() {
    setReconStatus();
    Alert.alert('Order ' + props.header, 'Status sent successfully', [
      {text: 'OK', onPress: () => setModalVisible(false)},
    ]);
  }

  const imagepicker = () => {
    launchImageLibrary((mediaType = 'photo')).then(function (response) {
      //   axios
      //     .post('https://94.237.65.99:4000/addinvoice?project_id=PR001', {
      //       invoice: response.assets,
      //     })
      //     .then(function (response) {
      //       console.log(response);
      //     });
      console.log(response.assets);
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeBtnDiv}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  style={[styles.closeBtn, {height: 15, width: 15}]}
                  source={require('../../assets/images/closeBtn.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.header}>
              <Text
                style={[
                  styles.infoText,
                  {fontFamily: 'Gilroy-Bold', fontSize: 22},
                ]}>
                {props.header}
              </Text>
            </View>
            {props.materials.map((matName, index) => (
              <MaterialsInput
                key={index}
                counter={index}
                materialInfo={materialInfo}
                materialName={matName.material_name}
                materialQty={matName.quantity}
              />
            ))}
            <View>
              {/* Image File Upload */}
              <View
                style={[
                  styles.header,
                  {
                    height: 100,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  },
                ]}>
                <Text style={styles.lableText}>Upload Photo</Text>
                <TouchableOpacity onPress={imagepicker}>
                  <View
                    style={[
                      styles.inputBorder,
                      {
                        flexDirection: 'row',
                        width: windowWidth / 1.25,
                      },
                    ]}>
                    <Text style={[styles.lableText, {marginTop: 0}]}>
                      Choose Photo
                    </Text>
                    <Image
                      style={styles.upload}
                      source={require('../../assets/images/Upload.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => submitRecon()}
              style={[styles.buttons, {backgroundColor: '#F4F4F4'}]}>
              <Text style={[styles.infoText, {fontSize: 15}]}>
                {props.header}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

export default Reconcilation;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
    textAlign: 'center',
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: windowHeight,
  },
  modalButtonClose: {
    backgroundColor: 'red',
    marginTop: 15,
    // objectFit: 'contain',
    height: 45,
    width: windowWidth / 2,
    borderRadius: 5,
  },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0.5,
    marginTop: 10,
    height: 50,
  },
  row1: {
    flexDirection: 'row',
    width: windowWidth / 1.25,
    justifyContent: 'space-between',
  },
  closeBtnDiv: {
    width: windowWidth / 1.25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttons: {
    backgroundColor: '#ffd142',
    width: windowWidth / 2.8,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
  header: {
    width: windowWidth / 1.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    alignItems: 'center',
    paddingLeft: 8,
  },
  upload: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
