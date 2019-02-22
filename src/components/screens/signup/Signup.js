import React, { Component } from 'react'
import {
  Linking, ImageBackground, TextInput,
  StyleSheet, Text, View, Image, Button, TouchableHighlight, StatusBar
} from 'react-native'
import LogoApp from '../../../assets/img/logo2.png'
export default class Signup extends Component {


  render() {
    return (

      <ImageBackground source={require('../../../assets/img/background.png')}
        style={styles.container}>
        <View style={styles.container}>

          <StatusBar hidden />
          <Image style={styles.Logo1} source={LogoApp}></Image>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../../assets/img/name.png')} />
            <TextInput style={styles.inputs}
              placeholder="User name"
              placeholderTextColor="white"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../../assets/img/Email.png')} />
            <TextInput style={styles.inputs}
              placeholder="Email"
              placeholderTextColor="white"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../../assets/img/password.png')} />
            <TextInput style={styles.inputs}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={true}
            />

          </View>


          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../../assets/img/password.png')} />
            <TextInput style={styles.inputs}
              placeholder="Confirm password"
              placeholderTextColor="white"
              secureTextEntry={true}
            />

          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} >
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableHighlight>

          <Text style={styles.Su}> Already have an account ?
             <Text style={{ color: '#025F8D' }}
              onPress={() => Linking.openURL()}>
              <Text>  </Text>
              Log IN
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

  inputContainer: {
    backgroundColor: 'transparent',
    // borderRadius:30,
    width: 300,
    height: 60,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    top: -25,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    opacity: 0.7,

  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    color: 'white'
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
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


});