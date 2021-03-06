import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';

import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';

const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const SiteEngHome = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [allProjects, setAllProjects] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [orderDetails, setOrderDerails] = useState();

  function handleBack() {
    BackHandler.exitApp();
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const value = await AsyncStorage.getItem('Name');
        console.log('User: ', value);
        if (value !== null) {
          setUsername(value);
        }
      } catch (e) {
        alert(e);
      }
    };
    getAsyncStorageData();
  }, []);

  useEffect(() => {
    getApiData();
    async function getApiData() {
      try {
        const Uname = await AsyncStorage.getItem('Name');
        if (Uname !== null) {
          axios({
            method: 'get',
            url: `https://94.237.65.99:4000/SEprojects?site_engineer=${Uname}`,
          }).then(response => {
            // console.log(response.data.projects);
            setAllProjects(response.data.projects);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    getApiData();
    async function getApiData() {
      try {
        const Uname = await AsyncStorage.getItem('Name');
        if (Uname !== null) {
          axios({
            method: 'get',
            url: `https://94.237.65.99:4000/SErequests?site_engineer=${Uname}`,
          }).then(response => {
            // console.log(response.data.requests);
            setAllRequests(response.data.requests);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setAllProjects([]);
    setAllRequests([]);
    getRequestData();
    async function getRequestData() {
      try {
        const Uname = await AsyncStorage.getItem('Name');
        if (Uname !== null) {
          axios({
            method: 'get',
            url: `https://94.237.65.99:4000/SErequests?site_engineer=${Uname}`,
          }).then(response => {
            // console.log(response.data.requests);
            setAllRequests(response.data.requests);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    getProjectsData();
    async function getProjectsData() {
      try {
        const Uname = await AsyncStorage.getItem('Name');
        if (Uname !== null) {
          axios({
            method: 'get',
            url: `https://94.237.65.99:4000/SEprojects?site_engineer=${Uname}`,
          }).then(response => {
            // console.log(response.data.projects);
            setAllProjects(response.data.projects);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const axios = require('axios').default;

  return (
    <SafeAreaView>
      {orderDetails}
      <ScrollView
        style={{backgroundColor: 'white'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.burgerMenu}
              source={require('../../assets/images/Burger.png')}
            />
          </TouchableOpacity>

          <Text style={styles.header}>Hello, {username} </Text>
          {/* <View style={styles.notifCircle}>
            <Text>
              <Icon style={styles.notifIcon} name="notifications-outline" />
            </Text>
          </View> */}
        </View>

        <View style={styles.taskBoxTextContainer}>
          <Image
            style={styles.taskImg}
            source={require('../../assets/images/tasks.png')}
          />
          <View>
            <Text style={styles.taskBoxText}>
              Contact project manager in{'    '}
            </Text>
            <Text style={styles.taskBoxText}>case of any queries.</Text>
            {/* <Text
              style={[styles.taskBoxText, {textDecorationLine: 'underline'}]}>
              View Details
            </Text> */}
          </View>
          {/* <Image style={styles.xImg} source={require('../../assets/images/xIcon.png')} /> */}
        </View>

        <View style={styles.header2}>
          <Text
            style={{fontSize: 20, fontFamily: 'Gilroy-Bold', color: 'black'}}>
            Your Projects{' '}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Gilroy-Medium',
              color: '#969696',
            }}
            onPress={() => navigation.navigate('AllProjects')}>
            View all{' '}
          </Text>
        </View>

        {allProjects.slice(0, 2).map(projectInfo => (
          <View style={styles.cards} key={projectInfo._id}>
            <View
              style={[
                styles.divCardContent,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(150, 150, 150, 0.3)',
                },
              ]}>
              <View style={styles.cardContent}>
                <Text style={[styles.lableText, {marginBottom: 5}]}>
                  {projectInfo.project_id}
                </Text>
                <Text style={styles.infoText}>{projectInfo.project_name}</Text>
              </View>
              <TouchableOpacity
                title="orderMaterials"
                style={styles.orderMaterials}
                onPress={() =>
                  navigation.navigate('OrderMaterials', {
                    projectId: projectInfo.project_id,
                    projectName: projectInfo.project_name,
                    projectStage: projectInfo.project_stage,
                    userName: username,
                  })
                }>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  Order Materials
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divCardContent}>
              <View style={styles.cardContent}>
                <Text style={[styles.lableText, {marginBottom: 5}]}>
                  Location
                </Text>
                <Text style={[styles.infoText, {width: windowWidth / 1.4}]}>
                  {projectInfo.location}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* ------------------------------------------------------------------------------- */}

        <View style={styles.header2}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Your Requests{' '}
          </Text>
          <Text
            style={{fontSize: 15, color: '#969696'}}
            onPress={() => navigation.navigate('AllRequests')}>
            View all{' '}
          </Text>
        </View>

        {allRequests.slice(0, 3).map(requestsInfo => (
          <View style={styles.cards} key={requestsInfo._id}>
            <View
              style={[
                styles.divCardContent,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(150, 150, 150, 0.3)',
                },
              ]}>
              <View style={styles.cardContent}>
                <Text style={styles.lableText}>Project ID</Text>
                <Text style={styles.infoText}>{requestsInfo.project_id}</Text>
              </View>
              <TouchableOpacity
                title="orderMaterials"
                style={styles.orderMaterials}
                onPress={() => {
                  axios({
                    method: 'get',
                    url: `https://94.237.65.99:4000/getrequestsbyid?_id=${requestsInfo._id}`,
                  }).then(response => {
                    console.log(response.data.Requests);
                    setOrderDerails();
                    setOrderDerails(
                      <OrderDetailsModal
                        _id={response.data.Requests._id}
                        projectId={response.data.Requests.project_id}
                        projectName={response.data.Requests.project_name}
                        projectStage={response.data.Requests.project_stage}
                        materialCategory={
                          response.data.Requests.material_category
                        }
                        status={response.data.Requests.status}
                        materials={response.data.Requests.materials}
                        dueDate={response.data.Requests.due_date}
                        approver={response.data.Requests.approved_by}
                        matDesc={response.data.Requests.material_description}
                        purpose={response.data.Requests.purpose}
                        priority={response.data.Requests.priority}
                        matCat={response.data.Requests.material_category}
                      />,
                    );
                  });
                }}>
                <Text style={{fontSize: 15, color: 'black'}}>View Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divCardContent}>
              <View style={styles.cardContent}>
                <Text style={styles.lableText}>Project Name</Text>
                <Text style={styles.infoText}>{requestsInfo.project_name}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.lableText}>Status</Text>
                <Text style={[styles.infoText,{width: windowWidth/3}]}>{requestsInfo.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SiteEngHome;

const styles = StyleSheet.create({
  homeHeader: {
    marginTop: 35,
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  burgerMenu: {
    width: 28,
    height: 22.5,
  },

  header: {
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    color: 'black',
    alignItems: 'center',
  },
  notifCircle: {
    borderRadius: 25,
    backgroundColor: '#F8F8F8',
    padding: 5,
  },
  notifIcon: {
    color: 'black',
    fontSize: 30,
  },
  taskBoxText: {
    color: 'black',
    padding: 5,
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
  },
  taskBoxTextContainer: {
    backgroundColor: '#fff5f5',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  taskImg: {
    height: 80,
    width: 80,
  },
  xImg: {
    height: 40,
    width: 40,
  },
  header2: {
    marginTop: 25,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderMaterials: {
    backgroundColor: '#ffd142',
    width: windowWidth / 2.7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
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
  cards: {
    height: 200,
    justifyContent: 'center',
    margin: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
    borderRadius: 8,
  },
  cardContent: {
    justifyContent: 'flex-start',
    margin: 10,
    paddingBottom: 15,
    paddingTop: 15,
  },
  divCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
