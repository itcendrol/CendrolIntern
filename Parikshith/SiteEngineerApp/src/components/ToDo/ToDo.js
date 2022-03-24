import React, {useEffect, useState} from 'react';
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

function ToDo() {
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    function nth(d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();
    setTodayDate(date + nth(date) + ' ' + monthNames[month]);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: 'white', height: windowHeight}}>
        <View style={styles.headerBar}>
          <Text style={styles.infoText}>{todayDate}</Text>
          <TouchableOpacity style={styles.circleBtn}>
            <Image
              style={styles.calendarIcon}
              source={require('../../assets/images/CalendarDark.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ToDo;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  calendarIcon: {
    height: 20,
    width: 18.5,
  },
  circleBtn: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#F8F8F8',
  },
  headerBar: {
    width: windowWidth,
    padding: 20,
    alignItems: 'center',
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
});
