import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import LabourerDataInput from './LabourerDataInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  ToastAndroid,
} from 'react-native';

function AddLabourData(props) {
  const [modalVisible, setModalVisible] = useState(true);
  const [conName, setConName] = useState('');
  const [labourStatus, setLabourStatus] = useState('');
  const [desc, setDesc] = useState('');
  const [todayDate, setDate] = useState('');
  const [labourCounter, setLabourCounter] = useState(0);
  const [labourerData, setLabourerData] = useState([]);
  const [labourerDataInputFields, setLabourerDataInputFields] = useState([]);

  //   Validation
  const [conNameError, setConNameError] = useState('#E3E3E3');
  const [LabourStatusError, setLabourStatusError] = useState('#E3E3E3');
  const [contractorList, setContractorList] = useState([]);
  const [Uname, setUname] = useState('');

  const axios = require('axios').default;

  function closeModal() {
    setModalVisible(false);
    props.closePopup();
  }

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setDate(date + '/' + month + '/' + year);
    addInputFields();
  }, []);

  useEffect(() => {
    const proj_id = props.proj_id;
    setUname(AsyncStorage.getItem('Name'));
    try {
      axios({
        method: 'get',
        url: `https://94.237.65.99:4000/getcontractor?project_id=${proj_id}`,
      }).then(response => {
        setContractorList([]);
        response.data.contractor.map(cont =>
          setContractorList(contList => [...contList, cont.name]),
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function addInputFields() {
    setLabourerDataInputFields([]);
    setLabourerDataInputFields([
      ...labourerDataInputFields,
      <LabourerDataInput
        labourDataInputs={labourDataInputs}
        counter={labourCounter + 1}
      />,
    ]);
    setLabourCounter(labourCounter + 1);
  }

  function labourDataInputs(labour_type, qty) {
    const labourerArray = labourerData;
    labourerArray.splice(labourCounter, 1, {
      labour_type: labour_type,
      qty: qty,
    });
    setLabourerData([]);
    setLabourerData(labourerArray);
  }

  function dataValidation() {
    if (conName === '' || labourStatus === '') {
      // Alert.alert(
      //   'Data Incomplete',
      //   'Select both Contractor Name and Labour Status.',
      // );
      if (conName === '') {
        setConNameError('red');
        return false;
      } else {
        setConNameError('#E3E3E3');
      }
      if (labourStatus === '') {
        setLabourStatusError('red');
        return false;
      } else {
        setLabourStatusError('#E3E3E3');
      }
    } else {
      setConNameError('#E3E3E3');
      setLabourStatusError('#E3E3E3');
      return true;
    }
  }

  function dynamicFieldValidation() {
    let len = labourerData.length;
    if (len >= 1) {
      labourerData.map(data => {
        if (data.labour_type === '' || data.qty === '') {
          Alert.alert(
            'Labour Data Incomplete',
            'Enter both Labour Type and No. Of Labour.',
          );
          return false;
        }
      });
    } else {
      Alert.alert('Labour Data Incomplete', 'Enter Labour Data.');
      return false;
    }

    return true;
  }

  function submitLabourData() {
    if (dataValidation()) {
      if (dynamicFieldValidation()) {
        
        const proj_name = props.proj_name;
        const project_stage = props.project_stage;
        const task_id = props.task_id;
        dataToBeSent = {
          project_name: proj_name,
          // project_stage: project_stage,
          work_description: desc,
          labour_status: labourStatus,
          task_id: task_id,
          labour: labourerData,
          date: todayDate,
        };
        console.log(dataToBeSent);
        axios
          .post(
            `https://94.237.65.99:4000/addlabour?contractor_name=${conName}`,
            dataToBeSent,
          )
          .then(function (response) {
            setModalVisible(true);
            Alert.alert('Data Sent', 'Labour data added successfully.', [
              {text: 'Ok', onPress: () => closeModal()},
            ]);
          });
      } else {
        ToastAndroid.showWithGravity(
          'Error in data input',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  }

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}>
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* Modal View */}
              <View style={styles.closeBtnDiv}>
                <TouchableOpacity onPress={() => closeModal()}>
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
                  Add Labour Data
                </Text>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.lableText}>Project Name</Text>
                  <View style={styles.inputBorder}>
                    <Text style={styles.infoText}>Maple Crest</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.lableText}>Date Of Upload</Text>
                  <View style={styles.inputBorder}>
                    <Text style={styles.infoText}>{todayDate}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.lableText}>Contractor Name</Text>
                  <View
                    style={[
                      styles.inputBorder,
                      {
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderColor: conNameError,
                      },
                    ]}>
                    <Picker
                      style={{
                        paddingTop: 40,
                        alignItems: 'center',
                        color: 'black',
                      }}
                      itemStyle={{backgroundColor: 'white'}}
                      placeholder="Select Contractor Name"
                      enabled={true}
                      dropdownIconColor="#FCC314"
                      dropdownIcon
                      dropdownIconRippleColor="#FCC314"
                      selectedValue={conName}
                      onValueChange={(itemValue, itemIndex) => {
                        setConName(itemValue);
                      }}>
                      <Picker.Item label="Select" value="" />
                      {contractorList.map(cont => (
                        <Picker.Item label={cont} value={cont} />
                      ))}
                    </Picker>
                  </View>
                  {conNameError === 'red' && (
                    <Text style={{color: 'red', fontFamily: 'Gilroy-Medium'}}>
                      Required
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.lableText}>Labour Status</Text>
                  <View
                    style={[
                      styles.inputBorder,
                      {
                        paddingLeft: 0,
                        paddingRight: 0,
                        borderColor: LabourStatusError,
                      },
                    ]}>
                    <Picker
                      style={{
                        paddingTop: 40,
                        alignItems: 'center',
                        color: 'black',
                      }}
                      itemStyle={{backgroundColor: 'white'}}
                      placeholder="Select Contractor Name"
                      enabled={true}
                      dropdownIconColor="#FCC314"
                      dropdownIcon
                      dropdownIconRippleColor="#FCC314"
                      selectedValue={labourStatus}
                      onValueChange={(itemValue, itemIndex) => {
                        setLabourStatus(itemValue);
                      }}>
                      <Picker.Item label="Select" value="" />
                      <Picker.Item label="Half Came" value="HalfCame" />
                      <Picker.Item label="Full Came" value="FullCame" />
                      <Picker.Item label="Didn't Came" value="DidntCame" />
                    </Picker>
                  </View>
                  {LabourStatusError === 'red' && (
                    <Text style={{color: 'red', fontFamily: 'Gilroy-Medium'}}>
                      Required
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.tableHeader}>
                <Text
                  style={[styles.lableText, {color: 'white', marginTop: 0}]}>
                  Labour Type
                </Text>
                <Text
                  style={[styles.lableText, {color: 'white', marginTop: 0}]}>
                  No. Of Labour
                </Text>
              </View>
              {labourerDataInputFields}
              <View
                style={{
                  width: windowWidth / 1.2,
                  alignItems: 'flex-end',
                  borderBottomWidth: 0.5,
                  borderColor: '#E3E3E3',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    addInputFields();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: 15,
                    width: 100,
                  }}>
                  <Image
                    style={styles.addBtn}
                    source={require('../../assets/images/addMoreBtn.png')}
                  />
                  <Text style={{fontFamily: 'Gilroy-Medium'}}>
                    {'  '}Add More
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 25}}>
                <Text>Work Description</Text>
                <TextInput
                  style={[
                    styles.inputBorder,
                    {color: 'black', height: 100, width: windowWidth / 1.2},
                  ]}
                  multiline={true}
                  numberOfLines={10}
                  textAlignVertical={'top'}
                  placeholder="Enter Full Description"
                  placeholderTextColor="#969696"
                  onChange={e => setDesc(e.nativeEvent.text)}
                />
              </View>
              <TouchableOpacity
                title="sendOrder"
                style={styles.loginButton}
                onPress={() => submitLabourData()}>
                <Text style={[styles.text, {fontSize: 15, color: 'black'}]}>
                  SEND ORDER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

export default AddLabourData;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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
    backgroundColor: 'transparent',
    minHeight: windowHeight,
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
    color: 'black',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
    marginTop: 25,
  },
  infoText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 17,
  },
  header: {
    width: windowWidth / 1.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    alignItems: 'center',
  },
  closeBtnDiv: {
    width: windowWidth / 1.25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  inputBorder: {
    borderWidth: 1,
    width: windowWidth / 2.5,
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
    width: windowWidth / 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeader: {
    backgroundColor: '#221E1F',
    width: windowWidth / 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 15,
    height: 45,
    marginTop: 25,
    borderRadius: 3,
  },
  addBtn: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  loginButton: {
    backgroundColor: '#F9C423',
    width: windowWidth / 1.2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 25,
  },
});
