import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
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
  TextInput,
  Modal,
} from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [emailLabel, setEmailLabel] = useState(styles.lables);
  const [pswdLabel, setPswdLabel] = useState(styles.lables);
  const [checked, setChecked] = useState(false);
  const [emailInputBorder, setEmailInputBorder] = useState('#969696');
  const [emailLabelSize, setEmailLabelSize] = useState(15);
  const [pswdInputBorder, setPswdInputBorder] = useState('#969696');
  const [pswdLabelSize, setPswdLabelSize] = useState(15);
  const [emailError, setEmailError] = useState(1);
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const axios = require('axios').default;

  useEffect(() => {
    AsyncStorage.getItem('Name').then(item => {
      if (item !== null) {
        navigation.navigate('Home');
      }
    });
  }, []);

  function emailInput() {
    setEmailLabel(styles.lablesOnFocus);
    setEmailInputBorder('#F9C423');
    setPswdInputBorder('black');
    setEmailLabelSize(12);
  }
  function pswdInput() {
    setPswdLabel(styles.lablesOnFocus);
    setPswdInputBorder('#F9C423');
    setEmailInputBorder('black');
    setPswdLabelSize(12);
  }

  function validateEmail(e) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(e.nativeEvent.text)) {
      setEmailError(1);
      setEmail(e.nativeEvent.text.toLowerCase());
    } else {
      setEmailError(0);
    }
  }

  async function submitForm() {
    axios
      .post('https://94.237.65.99:4000/userlogin', {
        username: email,
        password: pswd,
      })
      .then(function (response) {
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('Name', response.data.Name);
        console.log(response.data.status);
        if (emailError && email !== '' && pswd !== '') {
          if (response.data.status === 'success') {
            navigation.navigate('Home');
          } else {
            setModalText('Invalid Email-ID or Password');
            setModalVisible(!modalVisible);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screen}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.errorInfoImg}
                  source={require('../../assets/images/errorInfo.png')}
                />
                <Text style={styles.modalText}>{modalText}</Text>
                {/* <Button
                  style={[styles.modalButtonClose,{backgroundColor: 'red'}]}
                  onPress={() => setModalVisible(!modalVisible)}
                  title="Close"
                /> */}
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    style={styles.modalButtonClose}
                    source={require('../../assets/images/tryAgain.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Image
            style={styles.cendrolImg}
            source={require('../../assets/images/bgimg.jpg')}
          />
          <View style={styles.loginCard}>
            <View style={styles.infoText}>
              <Text style={styles.headText}>Sign in to continue</Text>
              <Text style={styles.subText}>Order Material, Create tasks</Text>
              <Text style={styles.subText}>&amp; much more</Text>
            </View>
            <View style={[styles.textInput, {borderColor: emailInputBorder}]}>
              <Text
                style={[
                  emailLabel,
                  styles.inTextBox,
                  {fontSize: emailLabelSize},
                ]}>
                Email
              </Text>
              <TextInput
                color="black"
                onFocus={() => emailInput()}
                style={[styles.input, {fontFamily: 'Gilroy-SemiBold'}]}
                onChange={e => validateEmail(e)}
              />
            </View>
            {emailError ? null : (
              <Text
                style={{color: 'red', alignSelf: 'flex-start', marginTop: 10}}>
                Enter valid Email ID
              </Text>
            )}

            <View
              style={[
                styles.textInput,
                {borderColor: pswdInputBorder, marginBottom: 15},
              ]}>
              <Text
                style={[
                  pswdLabel,
                  styles.inTextBox,
                  {fontSize: pswdLabelSize},
                ]}>
                Password
              </Text>
              <View
                style={{
                  width: windowWidth / 1.3,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TextInput
                  color="black"
                  onFocus={() => pswdInput()}
                  style={[
                    styles.input,
                    {width: 250, fontFamily: 'Gilroy-SemiBold'},
                  ]}
                  onChange={e => setPswd(e.nativeEvent.text)}
                  secureTextEntry={hidePass ? true : false}></TextInput>
                <Icon
                  name={hidePass ? 'eye-slash' : 'eye'}
                  size={19}
                  style={[
                    styles.eye,
                    {height: 50, position: 'absolute', right: 15, bottom: 1},
                  ]}
                  color="grey"
                  onPress={() => setHidePass(!hidePass)}
                />
              </View>
            </View>

            {/* <View style={styles.chkbx}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color="#F9C423"
              />
              <Text style={styles.rememberMe}>Remember me</Text>
            </View> */}

            <TouchableOpacity
              title="Login"
              style={styles.loginButton}
              onPress={() => submitForm()}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Gilroy-SemiBold',
                  color: 'black',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  cendrolImg: {
    width: windowWidth,
    height: 215,
  },
  headText: {
    color: 'black',
    fontSize: 30,
    paddingBottom: 10,
    fontFamily: 'PlayfairDisplay-Bold',
    // fontWeight: 'ExtraBold',
  },
  subText: {
    color: '#8a8a8a',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  loginCard: {
    width: windowWidth / 1.3,
    // backgroundColor: '#ffbcb8',
    flex: 1,
    alignItems: 'center',
    // justifyContent: "flex-start",
    paddingTop: 55,
    // borderRadius:15,
  },
  infoText: {
    alignItems: 'center',
    marginBottom: 50,
    margintop: 75,
    height: 55,
  },
  textInput: {
    marginTop: 24,
    paddingTop: 5,
    paddingLeft: 18,
    borderWidth: 0.6,
    borderRadius: 8,
    borderColor: '#969696',
    height: 60,
    width: windowWidth / 1.2,
    alignContent: 'flex-start',
  },
  lables: {
    color: '#8a8a8a',
    fontSize: 15,
    marginTop: 15,
  },
  lablesOnFocus: {
    color: '#8a8a8a',
    fontSize: 15,
    paddingBottom: 10,
  },
  rememberMe: {
    color: 'black',
    fontSize: 15,
  },
  chkbx: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    width: windowWidth / 1.2,
    height: 30,
  },
  loginButton: {
    backgroundColor: '#F9C423',
    width: windowWidth / 1.2,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 14,
  },
  input: {
    marginTop: -15,
    height: 45,
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth / 1.2,
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
  },
  errorInfoImg: {
    // objectFit: 'contain',
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  modalButtonClose: {
    marginTop: 15,
    height: 45,
    width: windowWidth / 2,
    borderRadius: 5,
  },
  inTextBox: {
    fontFamily: 'Gilroy-Medium',
  },
});
