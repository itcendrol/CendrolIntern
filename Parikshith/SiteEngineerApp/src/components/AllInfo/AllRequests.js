import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backIcon from 'react-native-vector-icons/AntDesign';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  RefreshControl,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function AllRequests() {
  const [allRequests, setAllRequests] = useState([]);
  const [orderDetails, setOrderDerails] = useState();
  const axios = require('axios').default;

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
            console.log(response.data.requests);
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
    setAllRequests([]);
    getApiData();
    async function getApiData() {
      try {
        const Uname = await AsyncStorage.getItem('Name');
        if (Uname !== null) {
          axios({
            method: 'get',
            url: `https://94.237.65.99:4000/SErequests?site_engineer=${Uname}`,
          }).then(response => {
            console.log(response.data.requests);
            setAllRequests(response.data.requests);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      {orderDetails}
      <ScrollView
        style={{backgroundColor: 'white'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {allRequests.map(requestsInfo => (
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
}

export default AllRequests;

const styles = StyleSheet.create({
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
    borderRadius: 10,
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
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
    borderRadius: 15,
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
