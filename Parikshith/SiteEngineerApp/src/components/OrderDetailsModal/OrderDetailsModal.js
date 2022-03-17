import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Reconcilation from '../Reconcilation/Reconcilation';

const axios = require('axios').default;

function OrderDetailsModal(props) {
  console.log('modalprops:', props._id);
  const [modalVisible, setModalVisible] = useState(true);
  const [priorityColor, setPriorityColor] = useState('#969696');
  const [reconcileVisible, setReconcileVisible] = useState(false);
  const [modalHeader, setModalHeader] = useState('');

  useEffect(() => {
    setModalVisible(true);
    const priorityColor = () => {
      switch (props.priority) {
        case 'High':
        case 'high':
          return '#FE3E3E';
        case 'Medium':
        case 'medium':
          return '#FCC314';
        case 'Low':
        case 'low':
          return '#3ADD5E';
        default:
          return '#969696';
      }
    };
    setPriorityColor(priorityColor);
  }, []);

  function setReceivedStatus() {
    console.log('Setting Status for ID ', props._id);
    axios
      .post(`https://94.237.65.99:4000/requeststatus?_id=${props._id}&statusvalue=Material Received`)
      .then(function (response) {
        setModalVisible(false);
        ToastAndroid.show('Drag down to refresh data', ToastAndroid.CENTER);
        console.log(response.data.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function setReceived() {
    Alert.alert('Are you sure?', 'Set status to received', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => setReceivedStatus(),
      },
    ]);
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      {reconcileVisible && (
        <Reconcilation materials={props.materials} header={modalHeader} req_id={props._id} />
      )}
      <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Modal View */}
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
                Order Details
              </Text>
              <Text
                style={[
                  styles.infoText,
                  {
                    fontSize: 10,
                    backgroundColor: priorityColor,
                    marginLeft: 20,
                    padding: 8,
                    borderRadius: 5,
                    color: 'white',
                  },
                ]}>
                {props.priority + ' Priority'}
              </Text>
            </View>
            <View style={styles.projectInfo}>
              <View style={styles.ProjectInfoDivs}>
                <Text style={[styles.text, styles.lableText]}>Project ID</Text>
                <Text style={[styles.text, styles.infoText]}>
                  {props.projectId}
                </Text>
              </View>
              <View style={styles.ProjectInfoDivs}>
                <Text style={[styles.text, styles.lableText]}>
                  Project Name
                </Text>
                <Text style={[styles.text, styles.infoText]}>
                  {props.projectName}
                </Text>
              </View>
              <View style={styles.ProjectInfoDivs}>
                <Text style={[styles.text, styles.lableText]}>
                  Project Stage
                </Text>
                <Text style={[styles.text, styles.infoText]}>
                  {props.projectStage}
                </Text>
              </View>
            </View>
            <View style={styles.matCatStat}>
              <View style={styles.matCatDiv}>
                <Text style={styles.lableText}>Material Category</Text>
                <Text style={styles.infoText}>{props.matCat}</Text>
              </View>
              <View style={styles.matStatDiv}>
                <Text style={styles.lableText}>Status</Text>
                <Text style={styles.infoText}>{props.status}</Text>
              </View>
            </View>
            <View style={styles.materialTable}>
              <View style={styles.materialTableLabels}>
                <Text
                  style={[
                    styles.lableText,
                    {
                      color: 'black',
                      width: windowWidth / 3,
                      alignSelf: 'center',
                    },
                  ]}>
                  Material Name
                </Text>
                <Text
                  style={[
                    styles.lableText,
                    {
                      color: 'black',
                      width: windowWidth / 6,
                      alignSelf: 'center',
                    },
                  ]}>
                  Qty
                </Text>
                <Text
                  style={[
                    styles.lableText,
                    {
                      color: 'black',
                      width: windowWidth / 5,
                      alignSelf: 'center',
                    },
                  ]}>
                  Specs
                </Text>
              </View>
              {props.materials.map(matData => (
                // console.log('testing data',matData.material_name);
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.infoText,
                      {width: windowWidth / 4, margin: 15},
                    ]}>
                    {matData.material_name}
                  </Text>
                  <Text
                    style={[
                      styles.infoText,
                      {width: windowWidth / 6, margin: 15},
                    ]}>
                    {matData.quantity}
                  </Text>
                  <Text
                    style={[
                      styles.infoText,
                      {width: windowWidth / 5, margin: 15},
                    ]}>
                    {matData.uom}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.dateAndApprover}>
              <View style={styles.dueDate}>
                <Text style={styles.lableText}>Due Date</Text>
                <Text style={styles.infoText}>03/02/2022</Text>
              </View>
              <View style={styles.approver}>
                <Text style={styles.lableText}>Approver</Text>
                <Text style={styles.infoText}>CH Sunil Kumar</Text>
              </View>
            </View>
            <View style={styles.matDescPurp}>
              <Text style={styles.lableText}>Material Description</Text>
              <Text
                style={[
                  styles.infoText,
                  {fontFamily: 'Gilroy-Medium', marginTop: 10},
                ]}>
                {props.matDesc}
              </Text>
            </View>
            <View style={[styles.matDescPurp, {borderBottomWidth: 0}]}>
              <Text style={styles.lableText}>Purpose</Text>
              <Text
                style={[
                  styles.infoText,
                  {fontFamily: 'Gilroy-Medium', marginTop: 10},
                ]}>
                {props.purpose}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalHeader('Reconcile');
                  setReconcileVisible(true);
                }}
                style={[styles.buttons, {backgroundColor: '#F4F4F4'}]}>
                <Text style={[styles.infoText, {fontSize: 15}]}>Reconcile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setReceived();
                }}
                style={styles.buttons}>
                <Text style={[styles.infoText, {fontSize: 15}]}>Received</Text>
              </TouchableOpacity>
            </View>
            {/* Modal View end */}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
export default OrderDetailsModal;

const windowWidth = Dimensions.get('window').width;

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
  },
  infoText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 17,
  },
  projectInfo: {
    backgroundColor: '#FFF5D6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    borderRadius: 7,
    marginBottom: 35,
    width: windowWidth / 1.2,
  },
  ProjectInfoDivs: {
    height: 60,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    width: windowWidth / 4,
    alignItems: 'center',
  },
  matCatStat: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#969696',
    borderStyle: 'dashed',
    marginBottom: 25,
  },
  matStatDiv: {
    width: windowWidth / 3.5,
  },
  matCatDiv: {
    width: windowWidth / 2,
  },
  materialTableLabels: {
    padding: 15,
    flexDirection: 'row',
    width: windowWidth / 1.2,
    justifyContent: 'space-between',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#F2F2F2',
  },
  materialTable: {
    width: windowWidth / 1.2,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    marginBottom: 35,
  },
  dateAndApprover: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#969696',
    borderStyle: 'dashed',
    marginBottom: 25,
    width: windowWidth / 1.2,
  },
  dueDate: {
    width: windowWidth / 2,
  },
  approver: {
    width: windowWidth / 2,
  },
  matDescPurp: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#969696',
    borderStyle: 'dashed',
    marginBottom: 25,
    width: windowWidth / 1.2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    marginBottom: 35,
    alignItems: 'center',
  },
  closeBtnDiv: {
    width: windowWidth / 1.25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
