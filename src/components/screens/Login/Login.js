import React, { Component } from 'react'
import {
  Linking, CheckBox, ImageBackground, TextInput, ScrollView, Platform,
  StyleSheet, Text, View, Image, Button, TouchableHighlight, StatusBar
} from 'react-native'

import StyledInput from '../../ui/Input';

import LogoApp from '../../../assets/img/logo1.png'
import Background from '../../../assets/img/background.png';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';

import { white } from 'ansi-colors';
export default class Login extends Component {
  constructor() {

    super();
    this.state = {
      check: false
    }

  }
  CheckBoxTest() {
    this.setState({

      check: !this.state.check
    })

  }
  render() {
    return (

      <ImageBackground source={Background}
        style={styles.container}>
        <View style={styles.container}>

          <StatusBar hidden />
          <Image style={styles.Logo1} source={LogoApp}></Image>

          <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} />

          <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} />


          <View style={styles.checkk}>
            <CheckBox style={styles.CheckBox}
              value={this.state.check} onChange={() => this.CheckBoxTest()}
            />

            <Text>     </Text>

            <Text style={styles.remember}>Remember me</Text>
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} >
            <Text style={styles.loginText}>Log in</Text>
          </TouchableHighlight>

          <Text style={styles.Su}> Don't have an account ?
             <Text style={{ color: '#025F8D' }}
              onPress={() => Linking()}>
              <Text>  </Text>
              Sign UP
              </Text>
          </Text>



        </View>


      </ImageBackground>



    );
  }
}

const styles = StyleSheet.create({


  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },


  Logo1: {
    top: -40,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  },

  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    borderRadius: 50,
    top: 40,

  },
  loginButton: {
    backgroundColor: "#252525",
    borderWidth: 2,
    borderColor: 'white',
  },
  loginText: {
    color: 'white',
  },

  Su: {
    top: 50,
    color: 'black'
  },
  checkk: {
    alignItems: 'center',
    top: -15,
    flexDirection: 'row',

  },
  remember: {
    color: 'white',
    opacity: 0.5
  },
  CheckBox: {
    opacity: 0.5,


  }

});