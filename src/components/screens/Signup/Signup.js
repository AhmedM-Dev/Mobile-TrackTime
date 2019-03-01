import React, { Component } from 'react';
import { TouchableHighlight, TextInput, StatusBar, ImageBackground, Image, Platform, StyleSheet, Text, View } from 'react-native';
import StyledInput from '../../ui/Input';
import LogoApp from '../../../assets/img/appNAme.png'
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import logoName from '../../../assets/img/name.png';


export default class App extends Component {

  render() {
    return (

      <ImageBackground style={styles.container} source={Background}>

        <StatusBar hidden />
        <Image style={styles.logoStyle} source={LogoApp}></Image>

        <Text style={styles.Ui}>Uploade your Image </Text>

        <StyledInput image={logoName} text={'User name'} textColor={'white'} />
        <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" />
        <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />
        <StyledInput image={PasswordIcon} text={'Confirm password'} textColor={'white'} secureTextEntry={true} />



        <TouchableHighlight style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>


        <Text style={styles.dh}> Already have an account ?
             <Text style={{ color: '#6EB4F0' }}
            onPress={() => this.props.navigation.navigate('login')}>
            <Text>  </Text>
            Log in
              </Text>
        </Text>


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


  logoStyle: {
    top: 30,
  },

  Ui: {
    top: 40,
    fontSize: 30,
  },

  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    top: 480,
    position: 'absolute',
    backgroundColor: '#6EB4F0',
    borderWidth: 1,
    borderColor: '#6EB4F0',

  },

  dh: {
    position: 'absolute',
    top: 540,
    color: 'white',
    fontSize: 18,
  },

  buttonText: {
    color: 'white',
    fontSize: 16
  },

});