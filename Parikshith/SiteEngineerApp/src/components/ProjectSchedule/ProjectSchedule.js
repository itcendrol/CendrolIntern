import React, {useEffect, useState} from 'react';
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
} from 'react-native';

function ProjectSchedule({navigation}) {
  const axios = require('axios').default;
  const [allSchedules, setAllSchedules] = useState([]);

  useEffect(() => {
    getApiData();
    async function getApiData() {
      try {
        const Uname = await AsyncStorage.getItem('Name');
        if (Uname !== null) {
          axios({
            method: 'get',
            url: `https://94.237.65.99:4000/schedulelist?site_engineer=${Uname}`,
          }).then(response => {
            setAllSchedules(response.data.Schedule);
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
        <View style={styles.homeHeader}>
          <Text style={styles.header}>Project Schedule</Text>
        </View>
        <View style={styles.searchContainer}>
          <Image
            style={styles.searchImg}
            source={require('../../assets/images/Search.png')}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Project Name"
          />
        </View>
        {console.log('-=-=-=',...allSchedules)}
        {allSchedules.map(ScheduleItem => (
          <View style={styles.cards}>
            <View
              style={[
                styles.cardContent,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View
                style={[
                  styles.cardContent,
                  {alignItems: 'flex-start', width: windowWidth / 2.4},
                ]}>
                <Text style={[styles.lableText, {marginBottom: 5}]}>
                  Project Name
                </Text>
                <Text style={styles.infoText}>{ScheduleItem.project_name}</Text>
              </View>
              <TouchableOpacity
                title="orderMaterials"
                style={styles.viewSchedule}
                onPress={() =>
                  navigation.navigate('ViewSchedule', {
                    tasks: allSchedules,
                    proj_id: ScheduleItem.project_id,
                    proj_name: ScheduleItem.project_name,
                    project_stage: ScheduleItem.project_stage,
                  })
                }>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  View Schedule
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProjectSchedule;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  homeHeader: {
    marginTop: 35,
    marginBottom: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontFamily: 'Gilroy-Bold',
    color: 'black',
    alignItems: 'center',
  },
  searchInput: {
    color: 'black',
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    width: 300,
  },
  searchContainer: {
    backgroundColor: '#fff5f5',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    marginTop: 0,
    paddingLeft: 15,
    borderRadius: 10,
  },
  searchImg: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  viewSchedule: {
    backgroundColor: '#ffd142',
    width: windowWidth / 2.8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 15,
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
    width: windowWidth / 1.1,
    justifyContent: 'space-around',
    margin: 18,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.3)',
    borderRadius: 8,
  },
  cardContent: {
    margin: 10,
    paddingBottom: 5,
    paddingTop: 5,
    alignItems: 'center',
  },
  divCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
