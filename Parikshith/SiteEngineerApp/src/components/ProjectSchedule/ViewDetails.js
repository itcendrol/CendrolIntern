import {Center} from 'native-base';
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
import LabourData from '../LabourData/LabourData';

function ViewDetails(props, {navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView style={{backgroundColor: 'white', paddingTop: 15}}>
        <View style={{alignItems: 'center'}}>
          <View style={{width: windowWidth / 1.05}}>
            <View style={styles.BiColorCardUp}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: '#3ADD5E',
                    borderRadius: 100,
                    margin: 5,
                  }}
                />
                <Text style={[styles.infoText, {color: 'white'}]}>
                  {props.route.params.main_task}
                </Text>
              </View>
              <Text style={[styles.infoText, {color: '#FCC314'}]}>
                {props.route.params.total_days + ' Days'}
              </Text>
            </View>
            <View style={styles.BiColorCardDn}>
              <Text style={[styles.lableText, {fontSize: 15}]}>Due Date</Text>
              <Text style={[styles.infoText, {fontSize: 15}]}>
                {props.route.params.from_date} - {props.route.params.to_date}
              </Text>
            </View>
          </View>
          <View style={{width: windowWidth / 1.1}}>
            <Text
              style={[
                styles.infoText,
                {fontSize: 20, fontFamily: 'Gilroy-Bold', marginBottom: 25},
              ]}>
              Sub Tasks
            </Text>

            {props.route.params.taskDets.map(det => (
              <View style={styles.SubTaskCard}>
                <View style={styles.SubTaskCard1}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: '#3ADD5E',
                        borderRadius: 100,
                        margin: 5,
                      }}
                    />
                    <Text
                      style={[
                        styles.infoText,
                        {width: windowWidth / 1.7, lineHeight: 20},
                      ]}>
                      {det.task}
                    </Text>
                  </View>
                  <Text style={[styles.infoText, {color: '#FCC314'}]}>
                    {det.total_days + ' Days'}
                  </Text>
                </View>
                <View style={styles.SubTaskCard2}>
                  <Text style={styles.lableText}>Due Date</Text>
                  <Text
                    style={[
                      styles.lableText,
                      {fontFamily: 'Gilroy-Bold', fontSize: 14},
                    ]}>
                    {det.from_date} - {det.to_date}
                  </Text>
                </View>
                <View
                  style={[
                    styles.SubTaskCard3,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ]}>
                  <TouchableOpacity
                    //   onPress={() => {
                    //     setModalHeader('Reconcile');
                    //     setReconcileVisible(true);
                    //   }}
                    style={[styles.buttons, {backgroundColor: '#F8F8F8'}]}>
                    <Text style={[styles.infoText, {fontSize: 15}]}>
                      Mark As Done
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('LabourData', {
                        task_id: det._id,
                        proj_id: props.route.params.proj_id,
                        proj_name: props.route.params.proj_name,
                        project_stage: props.route.params.project_stage,
                      });
                    }}
                    style={styles.buttons}>
                    <Text style={[styles.infoText, {fontSize: 15}]}>
                      View Labour Data
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <View style={styles.completedMsg}>
                  <Text style={{color: '#3ADD5E'}}>Completed</Text>
                </View> */}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ViewDetails;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  BiColorCardUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 15,
  },
  BiColorCardDn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 35,
  },
  lableText: {
    color: '#a1a1a1',
    fontSize: 16,
  },
  infoText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
  },
  SubTaskCard: {
    width: windowWidth / 1.1,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    marginBottom: 35,
  },
  SubTaskCard1: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SubTaskCard2: {
    backgroundColor: 'white',
    width: windowWidth / 1.25,
    alignSelf: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 2,
  },
  SubTaskCard3: {
    backgroundColor: 'white',
    width: windowWidth / 1.25,
    alignSelf: 'center',
    // padding: 20,
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: '#ffd142',
    width: windowWidth / 2.7,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  completedMsg: {
    backgroundColor: '#f0fff3',
    alignItems: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
});
