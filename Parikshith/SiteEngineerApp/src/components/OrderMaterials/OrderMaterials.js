import React, {useEffect, useState} from 'react';
import AddMaterial from '../AddMaterial/AddMaterial';
import {Picker} from '@react-native-picker/picker';
// import {Picker} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
  ToastAndroid,
} from 'react-native';

function OrderMaterials(props, {navigation}) {
  const [materialCategory, setMaterialCategory] = useState();
  const [matCatList, setMatCatlist] = useState([]);
  const [matNames, setMatNames] = useState([]);
  const [materialInputBorder, setMaterialInputBorder] = useState('Java');
  const [dueDate, setDueDate] = useState('');
  const [materialCounter, setMaterialCounter] = useState(parseInt(0));
  const [materials, setMaterials] = useState([]);
  const [matNameList, setMatNamelist] = useState([]);
  const [approver, setApprover] = useState([]);
  const [categoryEnable, setCategoryEnable] = useState(true);
  const [selectedApprover, setSelectedApprover] = useState('');
  const [purpose, setPurpose] = useState('');
  const [addMatVis, setAddMatVis] = useState(false);
  const [desc, setDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(true);

  //Validation useState
  const [matSpecValid, setMatSpecValid] = useState('');
  const [dueDateValid, setDueDateValid] = useState('#969696');
  const [approverValid, setApproverValid] = useState('#969696');
  const [purposeValid, setPurposeValid] = useState('#969696');
  const [priorityValid, setPriorityValid] = useState('#969696');

  const axios = require('axios').default;

  useEffect(() => {
    getApiData();
    async function getApiData() {
      try {
        axios({
          method: 'get',
          url: `https://94.237.65.99:4000/getcategories`,
        }).then(response => {
          setMatCatlist([]);
          setMatCatlist(response.data.Category);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    getApiData();
    async function getApiData() {
      try {
        axios({
          method: 'get',
          url: `https://94.237.65.99:4000/getmanagernames`,
        }).then(response => {
          setApprover([]);
          setApprover(response.data.Project_Managers);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  async function getApiMatNameOfCategory(catg) {
    try {
      axios({
        method: 'get',
        url: `https://94.237.65.99:4000/getmaterialnames?category=${catg}`,
      }).then(response => {
        setMatNamelist(response.data);
        console.log('got data', response.data.Materials);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const materialInfo = (materialName, qty, specs) => {
    // console.log('Index: ',materialCounter);
    // console.log('MaterialName: ', materialName);
    // console.log('Qty: ', qty);
    // console.log('Specs: ', specs);
    const materialArray = materials;
    materialArray.splice(materialCounter, 1, {
      material_name: materialName,
      quantity: qty,
      uom: specs,
    });
    setMaterials([]);
    setMaterials(materialArray);
    console.log(materialArray);
  };

  const [addMaterials, setAddMaterials] = useState([]);

  const [priority, setPriority] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    setDueDate(date);
    setDueDateValid('#969696');
    hideDatePicker();
  };

  function handleAddMore() {
    setAddMaterials([]);
    setAddMaterials([
      ...addMaterials,
      <AddMaterial materialInfo={materialInfo} matNames={matNameList} />,
    ]);
    setMaterialCounter(parseInt(materialCounter) + 1);
    setCategoryEnable(false);
  }

  function validData() {
    var flag = 1;
    if (materials.length === 0) {
      ToastAndroid.show('Add materials', ToastAndroid.CENTER);
      flag = 0;
    }

    if (
      JSON.stringify(dueDate) === '""' ||
      purpose === '' ||
      selectedApprover === '0' ||
      priority === '0' ||
      selectedApprover === "" ||
      priority === ""
    ) {
      if (JSON.stringify(dueDate) === '""') {
        setDueDateValid('red');
      }
      if (purpose === '') {
        setPurposeValid('red');
      }
      console.log(approver);
      if (selectedApprover === '0' || selectedApprover === "") {
        setApproverValid('red');
      }
      if (priority === '0' || priority === "") {
        setPriorityValid('red');
      }
      flag = 0;
    }

    function validateMatSpecData() {
      materials.map(materialUom => {
        if (materialUom.uom === '' || materialUom.material_name === '0') {
          ToastAndroid.show(
            'Enter details for all materials',
            ToastAndroid.CENTER,
          );
          console.log(materialUom.materialName, 'UOM Invalid');
          flag = 0;
          return false;
        }
      });
      if (flag === 1) {
        return true;
      } else {
        return false;
      }
    }

    if (validateMatSpecData() && flag === 1) {
      submitForm();
    } else {
      ToastAndroid.show('Enter all fields', ToastAndroid.CENTER);
    }
  }

  function submitForm() {
    const postData = {
      project_id: props.route.params.projectId,
      project_name: props.route.params.projectName,
      project_stage: props.route.params.projectStage,
      material_category: materialCategory,
      material_description: desc,
      priority: priority,
      purpose: purpose,
      due_date: JSON.stringify(dueDate).slice(1, 11),
      approved_by: selectedApprover,
      materials: materials,
      site_engineer: props.route.params.userName,
    };
    const dataToBeSent = postData;
    console.log('Data Being Sent: ', dataToBeSent);
    axios
      .post('https://94.237.65.99:4000/addrequests', dataToBeSent)
      .then(function (response) {
        console.log('Post response: ', response);
        setModalVisible(true);
      });
    // setModalVisible(true);
  }

  return (
    <SafeAreaView style={{backgroundColor: '#F8F8F8'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // navigation.navigate('Home');
          // setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.successImg}
              source={require('../../assets/images/success.png')}
            />
            <Text style={styles.modalText}>Order sent successfully!</Text>
            <TouchableOpacity
              onPress={() => {
                // setModalVisible(false);
                props.navigation.goBack(null)
              }}
              title="sendOrder"
              style={[styles.loginButton,{width: windowWidth / 1.5}]}>
              <Text style={[styles.text, {fontSize: 16, color: 'black'}]}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.parentCard}>
          <View style={styles.projectInfo}>
            <View style={styles.ProjectInfoDivs}>
              <Text style={[styles.text, styles.lableText]}>Project ID</Text>
              <Text
                style={[
                  styles.text,
                  styles.infoText,
                  {textAlign: 'center', fontSize: 14},
                ]}>
                {props.route.params.projectId}
              </Text>
            </View>
            <View style={styles.ProjectInfoDivs}>
              <Text style={[styles.text, styles.lableText]}>Project Name</Text>
              <Text
                style={[
                  styles.text,
                  styles.infoText,
                  {textAlign: 'center', fontSize: 14},
                ]}>
                {props.route.params.projectName}
              </Text>
            </View>
            <View style={styles.ProjectInfoDivs}>
              <Text style={[styles.text, styles.lableText]}>Project Stage</Text>
              <Text
                style={[
                  styles.text,
                  styles.infoText,
                  {textAlign: 'center', fontSize: 14},
                ]}>
                {props.route.params.projectStage}
              </Text>
            </View>
          </View>

          <Text style={[styles.text, {paddingLeft: 15, marginTop: 15}]}>
            Material Category
          </Text>
          <View style={[styles.inputBorder, {paddingLeft: 5}]}>
            <Picker
              style={{paddingTop: 40, alignItems: 'center', color: 'black'}}
              itemStyle={{backgroundColor: 'white'}}
              placeholder="Select Material Category"
              enabled={categoryEnable}
              dropdownIconColor="#FCC314"
              dropdownIcon
              dropdownIconRippleColor="#FCC314"
              selectedValue={materialCategory}
              onValueChange={(itemValue, itemIndex) => {
                setMaterialCategory(itemValue);
                itemValue === 'default'
                  ? setAddMatVis(false)
                  : setAddMatVis(true);
                getApiMatNameOfCategory(itemValue);
              }}>
              <Picker.Item label="Select Category" value="default" />
              {matCatList.map(matCat => (
                <Picker.Item
                  label={matCat.category_name}
                  value={matCat.category_name}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.MateriallabelDiv}>
            <Text
              style={[
                styles.text,
                {
                  width: windowWidth / 2.4,
                  marginBottom: 15,
                  flexDirection: 'row',
                  paddingLeft: 25,
                },
              ]}>
              Material Name
            </Text>
            <Text
              style={[
                styles.text,
                {
                  width: windowWidth / 5,
                  marginBottom: 15,
                  flexDirection: 'row',
                  paddingLeft: 5,
                },
              ]}>
              Qty
            </Text>
            <Text
              style={[
                styles.text,
                {
                  width: windowWidth / 4.3,
                  marginBottom: 15,
                  flexDirection: 'row',
                  paddingLeft: 5,
                },
              ]}>
              Specs
            </Text>
          </View>
          {categoryEnable && (
            <View
              style={[
                styles.inputBorder,
                {
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingLeft: 0,
                  paddingTop: 15,
                  paddingBottom: 15,
                  width: windowWidth / 1.2,
                  backgroundColor: '#ffebeb',
                  borderWidth: 0,
                },
              ]}>
              <Text style={[styles.text, styles.lableText]}>
                Select material category, then add material
              </Text>
            </View>
          )}
          {addMaterials}
          {addMatVis && (
            <TouchableOpacity
              onPress={() => {
                handleAddMore();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: 15,
                borderBottomWidth: 0.5,
                borderColor: '#969696',
              }}>
              <Image
                style={styles.addBtn}
                source={require('../../assets/images/addMoreBtn.png')}
              />
              <Text style={styles.text}>{'  '}Add Material</Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              alignContent: 'flex-start',
              marginTop: 25,
              marginBottom: 15,
            }}>
            <Text style={[styles.text, {paddingLeft: 15}]}>
              Material Description
            </Text>
            <TextInput
              style={[styles.inputBorder, {color: 'black', height: 150}]}
              multiline={true}
              numberOfLines={10}
              textAlignVertical={'top'}
              placeholder="Enter Full Description"
              placeholderTextColor="#969696"
              onChange={e => setDesc(e.nativeEvent.text)}
            />
          </View>
          <View style={{flexDirection: 'row', width: windowWidth / 1.2}}>
            <View style={{width: windowWidth / 2.4}}>
              <Text style={[styles.text, {paddingLeft: 15}]}>Due Date</Text>
              <TouchableOpacity
                style={[
                  styles.inputBorder,
                  {
                    width: windowWidth / 2.7,
                    flexDirection: 'row',
                    alignSelf: 'center',
                  },
                ]}
                onPress={showDatePicker}>
                <Text
                  style={[
                    styles.text,
                    {alignSelf: 'center', width: 80, color: dueDateValid},
                  ]}>
                  {JSON.stringify(dueDate) !== '""'
                    ? JSON.stringify(dueDate).slice(1, 11)
                    : ' Select Date'}
                </Text>
                <Image
                  style={styles.cal}
                  source={require('../../assets/images/Calendar.png')}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.text, {paddingLeft: 15}]}>Priority</Text>
              <View
                style={[
                  styles.inputBorder,
                  {
                    width: windowWidth / 2.8,
                    paddingLeft: 2,
                    borderColor: priorityValid,
                  },
                ]}>
                <Picker
                  style={{paddingTop: 40, alignItems: 'center', color: 'black'}}
                  placeholder="Select Priority"
                  selectedValue={priority}
                  dropdownIconColor="#FCC314"
                  dropdownIconRippleColor="#FCC314"
                  onValueChange={(itemValue, itemIndex) => {
                    // itemValue === '0'
                    //   ? setPriorityValid('red')
                    //   : setPriorityValid('#969696');
                    setPriority(itemValue);
                  }}>
                  <Picker.Item label="Select" value="0" />
                  <Picker.Item label="High" value="High" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="Low" value="Low" />
                </Picker>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.text, {paddingLeft: 15, marginTop: 15}]}>
              Approver
            </Text>
            <View style={[styles.inputBorder, {borderColor: approverValid}]}>
              <Picker
                style={{paddingTop: 40, alignItems: 'center', color: 'black'}}
                placeholder="Select Approver"
                dropdownIconColor="#FCC314"
                dropdownIconRippleColor="#FCC314"
                selectedValue={selectedApprover}
                onValueChange={(itemValue, itemIndex) => {
                  // itemValue === '0'
                  //   ? setApproverValid('red')
                  //   : setApproverValid('#969696');
                  setSelectedApprover(itemValue);
                }}>
                <Picker.Item label="Select Approver" value="0" />
                {approver.map(approverName => (
                  <Picker.Item label={approverName} value={approverName} />
                ))}
              </Picker>
            </View>
          </View>
          <View>
            <View
              style={{
                alignContent: 'flex-start',
                marginTop: 25,
                marginBottom: 15,
              }}>
              <Text style={[styles.text, {paddingLeft: 15}]}>Purpose</Text>
              <TextInput
                style={[
                  styles.inputBorder,
                  {color: 'black', borderColor: purposeValid},
                ]}
                placeholder="Enter the purpose"
                placeholderTextColor="#969696"
                onChange={e => {
                  setPurpose(e.nativeEvent.text);
                  e.nativeEvent.text !== '' && setPurposeValid('#969696');
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            title="sendOrder"
            style={styles.loginButton}
            onPress={() => validData()}>
            <Text style={[styles.text, {fontSize: 15, color: 'black'}]}>
              SEND ORDER
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OrderMaterials;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
  },
  parentCard: {
    margin: 15,
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
  },
  projectInfo: {
    backgroundColor: '#FFF5D6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    borderRadius: 7,
    marginBottom: 15,
  },
  ProjectInfoDivs: {
    height: 60,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    width: windowWidth / 4,
    alignItems: 'center',
  },
  MateriallabelDiv: {
    width: windowWidth / 1.2,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#969696',
    paddingBottom: 5,
    marginBottom: 10,
    marginTop: 25,
  },
  inputBorder: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#969696',
    justifyContent: 'center',
    paddingLeft: 15,
    borderWidth: 0.5,
    margin: 10,
    height: 50,
  },
  addBtn: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  cal: {
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  dropdownArrow: {
    height: 25,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#F9C423',
    width: windowWidth / 1.28,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
  lableText: {
    color: '#a1a1a1',
    fontSize: 13,
  },
  infoText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 17,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
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
    width: windowWidth / 1.2,
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
  },
  successImg: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
});
