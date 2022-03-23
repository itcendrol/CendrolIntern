import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

// npm install --save react-native-vector-icons
// react-native link react-native-vector-icons

function ViewMoreText(props) {
  const [showMore, setShowMore] = useState(false);
  console.log(props);
  return (
    <View>
      {showMore ? (
        <View>
          {props.innerdets.labour.map(labourers => {
            return (
              <View style={styles.lines}>
                <Text style={styles.infoText}>{labourers.labour_type}</Text>
                <Text style={styles.infoText}>{labourers.qty}</Text>
              </View>
            );
          })}
          <Text style={[styles.lableText, {marginBottom: 10}]}>
            Work Description
          </Text>
          <Text style={[styles.lines, {fontFamily: 'Gilroy-Medium'}]}>
            {props.text}
          </Text>
          <TouchableOpacity
            onPress={() => setShowMore(false)}
            style={{alignItems: 'center'}}>
            <Text>View Less  <Icon name="up" size={16} color="black" /></Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setShowMore(true)}
          style={{alignItems: 'center'}}>
          <Text>View More  <Icon name="down" size={16} color="black" /></Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ViewMoreText;

const styles = StyleSheet.create({
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
});
