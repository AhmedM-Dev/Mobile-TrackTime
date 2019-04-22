import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar, Image, Icon, ToastAndroid, ActivityIndicator } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import axios from 'axios';

import StyledInput from '../../ui/Input';

import LogoApp from '../../../assets/img/appNAme.png'
import companyLogo from '../../../assets/img/proxym.png'
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import checkedIcon from '../../../assets/img/checkedIcon.png'
import uncheckedIcon from '../../../assets/img/uncheckedIcon.png'

import { authenticate, storeDataToAsyncStorage } from '../../../services/services';

export default class Login extends Component {

  state = {
    check: false,
    loading: false,
    isConnected: false,
    email: "asma.bahmed19@hotmail.com",
    pass: "92333520",
  }

  CheckBoxTest = () => {
    this.setState({
      check: !this.state.check
    }, () => {
      storeDataToAsyncStorage('rememberMe', this.state.check);
    });
  }

  handleAuthentication = () => {
    this.setState({ loading: true });

    authenticate(this.state.email, this.state.pass)
      .then(res => {
        this.setState({ isConnected: true, loading: false });
        ToastAndroid.show("Successfully authenticated!", ToastAndroid.LONG);
        this.props.navigation.navigate('Dashboard');
      })
      .catch(error => {
        this.setState({ isConnected: false, loading: false });
        ToastAndroid.show(error.response.data.error, ToastAndroid.LONG);
      });
  }

  handleEmailChange = (text) => {
    this.setState({
      ...this.state,
      email: text
    });
  }

  handlePassChange = (text) => {
    this.setState({
      ...this.state,
      pass: text
    });
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Background}>
        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size={80} color="#0000ff" />
          </View>
        }
        <StatusBar hidden />
        <View style={{ flexDirection: 'row', top: 100 }}>
          <Image source={companyLogo} style={{ height: 50, width: 50, marginRight: 15 }}></Image>
          <Image source={LogoApp}></Image>
        </View>
        <View style={styles.inputPos}>
          <StyledInput value={this.state.email} onChange={this.handleEmailChange} name="email" image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" require />
          <StyledInput value={this.state.pass} onChange={this.handlePassChange} name="pass" image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />
        </View>
        {/* <View style={styles.checkPos}>
          <CheckBox
            checkedIcon={<Image source={checkedIcon} style={{ height: 20, width: 20, marginRight: -10 }} />}
            uncheckedIcon={<Image source={uncheckedIcon} style={{ height: 20, width: 20, marginRight: -10 }} />}
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />
          <Text style={styles.remember}> Remember me </Text>
        </View> */}
        <Button
          buttonStyle={{
            height: 50,
            width: 300,
            backgroundColor: '#19678F',
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#19678F',
            top: 350,
            padding: 10,
            position: 'relative',
            opacity: 0.8
          }}
          title="Log in"
          onPress={() => this.handleAuthentication()} />

      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: 'white',
    opacity: 0.5
  },

  dh: {
    position: 'absolute',
    top: 550,
    color: 'white',
    fontSize: 18,
  },
  inputPos: {
    position: 'absolute',
    top: 230,
  },
  checkPos: {
    alignItems: 'center',
    position: 'absolute',
    top: 480,
    flexDirection: 'row',
  },
  remember: {
    color: 'white',
    opacity: 0.6,
    fontSize: 14,
    left: -10
  },
  logoStyle: {
    top: 100,
  },
});