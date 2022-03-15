import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';

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

function AllProjects({navigation}) {
  const [allProjects, setAllProjects] = useState([]);
  const axios = require('axios').default;

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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        style={{backgroundColor: 'white'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {allProjects.map(projectInfo => (
          <View style={styles.cards} key={projectInfo._id}>
            {/* {console.log(projectInfo._id)} */}
            <View
              style={[
                styles.divCardContent,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(150, 150, 150, 0.3)',
                },
              ]}>
              <View style={styles.cardContent}>
                <Text style={styles.lableText}>{projectInfo.project_id}</Text>
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
                  })
                }>
                <Text style={{fontSize: 15, color: 'black'}}>
                  Order Materials
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divCardContent}>
              <View style={styles.cardContent}>
                <Text style={styles.lableText}>Location</Text>
                <Text style={[styles.infoText, {width: windowWidth / 1.4}]}>
                  {projectInfo.location}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AllProjects;

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
  backBtn: {
    fontSize: 25,
  },
});
