import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backIcon from 'react-native-vector-icons/AntDesign';

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
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

function AllRequests() {
  const [allRequests, setAllRequests] = useState([]);
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

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: 'white'}}>

        {allRequests.map((requestsInfo) => (
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
                //   onPress={() => submitForm()}
              >
                <Text style={{fontSize: 15, color: 'black'}}>
                  Order Materials
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divCardContent}>
              <View style={styles.cardContent}>
                <Text style={styles.lableText}>Project Name</Text>
                <Text style={styles.infoText}>{requestsInfo.project_name}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.lableText}>Status</Text>
                <Text style={styles.infoText}>{requestsInfo.status}</Text>
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
