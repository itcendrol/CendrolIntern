import React, {useEffect, useState} from 'react';
import AddLabourData from './AddLabourData';
import ViewMoreText from '../ViewMoreText/ViewMoreText';
import {
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  RefreshControl,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

function LabourData(props) {
  const [viewMoreStatus, setViewMoreStatus] = useState(false);
  const [addDataModal, setAddDataModal] = useState(false);
  const [labourForTask, setLabourForTask] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLabourForTask([]);

    getApiData();
    async function getApiData() {
      try {
        axios({
          method: 'get',
          url: `https://94.237.65.99:4000/getlabourfortask?_id=${props.route.params.task_id}`,
        }).then(response => {
          setLabourForTask([]);
          setLabourForTask(response.data.Labours);
        });
      } catch (e) {
        console.log(e);
      }
    }

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const axios = require('axios').default;

  function viewMore() {
    setViewMoreStatus(!viewMoreStatus);
  }

  function closePopup() {
    setAddDataModal(false);
  }

  useEffect(() => {
    getApiData();
    async function getApiData() {
      try {
        axios({
          method: 'get',
          url: `https://94.237.65.99:4000/getlabourfortask?_id=${props.route.params.task_id}`,
        }).then(response => {
          setLabourForTask([]);
          setLabourForTask(response.data.Labours);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', minHeight: windowHeight}}>
      {addDataModal && (
        <AddLabourData
          closePopup={closePopup}
          proj_id={props.route.params.proj_id}
          proj_name={props.route.params.proj_name}
          project_stage={props.route.params.project_stage}
          task_id={props.route.params.task_id}
        />
      )}
      <ScrollView
        style={{backgroundColor: 'white'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{paddingBottom: windowHeight / 5}}>
          {labourForTask.map(dets => {
            contName = dets;
            return dets.labour_data.map(innerdets => {
              date = contName.name;
              return (
                <View style={styles.cards}>
                  <View style={styles.leftBorder}>
                    <View style={styles.lines}>
                      <Text style={styles.lableText}>Contractor Name</Text>
                      <Text style={styles.infoText}>{contName.name}</Text>
                    </View>
                    <View style={styles.lines}>
                      <Text style={styles.lableText}>Date</Text>
                      <Text style={styles.infoText}>{innerdets.date}</Text>
                    </View>
                    <ViewMoreText
                      text={innerdets.work_description}
                      innerdets={innerdets}
                    />
                  </View>
                </View>
              );
            });
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => setAddDataModal(true)}>
        <Text>+ Add Labour Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LabourData;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cards: {
    padding: 25,
    paddingLeft: 0,
    margin: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  lines: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  leftBorder: {
    borderLeftColor: '#ffd142',
    borderLeftWidth: 5,
    paddingLeft: 25,
  },
  fixedButton: {
    alignSelf: 'center',
    backgroundColor: '#ffd142',
    width: windowWidth / 1.5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    bottom: windowHeight / 5,
  },
});
