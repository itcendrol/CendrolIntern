import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

function ViewSchedule(props, {navigation}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(props.route.params.tasks);
  });

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: windowHeight}}>
      <ScrollView style={{backgroundColor: 'white', paddingTop: 15}}>
        {tasks.map(taskName => (
          <View style={styles.cards}>
            <View
              style={[
                styles.cardContent,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: '#3ADD5E',
                  borderRadius: 100,
                  marginLeft: 5,
                }}
              />
              <View
                style={[
                  styles.cardContent,
                  {alignItems: 'flex-start', width: windowWidth / 2.5},
                ]}>
                <Text style={styles.infoText}>{taskName.main_task}</Text>
              </View>
              <TouchableOpacity
                title="orderMaterials"
                style={styles.viewSchedule}
                onPress={() =>
                  props.navigation.navigate('ViewDetails', {
                    taskDets: taskName.tasks,
                    main_task: taskName.main_task,
                    from_date: taskName.from_date,
                    to_date: taskName.to_date,
                    total_days: taskName.total_days,
                    proj_id: props.route.params.proj_id,
                    proj_name: props.route.params.proj_name,
                    project_stage: props.route.params.project_stage,
                  })
                }>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ViewSchedule;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    fontSize: 16,
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
