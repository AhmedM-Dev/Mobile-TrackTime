import React, { Component } from 'react';
import { CheckBox, TouchableHighlight, TextInput, ImageBackground, Image, StatusBar, Platform, StyleSheet, Text, View } from 'react-native';
import StyledInput from '../../ui/Input';

import LogoApp from '../../../assets/img/appNAme.png'
import LogoApp2 from '../../../assets/img/fullLogo.png'
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';

export default class App extends Component {
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
      //  <View style={styles.container}>
      <ImageBackground style={styles.container} source={Background}>
        <StatusBar hidden />
        {/* <Image style={styles.logoStyle} source={LogoApp}></Image>
         <Image style={styles.logoStyle2} source={LogoApp2}></Image> */}
        <View style={styles.inputPos}>
          <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" />
          <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />

        </View>
        <View style={styles.checkPos}>
          <CheckBox style={styles.CheckBox}
            value={this.state.check} onChange={() => this.CheckBoxTest()} />
          <Text style={styles.remember}>Remember me</Text>
        </View>

        <TouchableHighlight style={styles.buttonContainer} >
          <Text style={styles.buttonText} onPress={() => this.props.navigation.navigate('Dashboard')} > Log in</Text>
        </TouchableHighlight>


        <Text style={styles.dh}> Don't have an account ?
             <Text style={{ color: '#6EB4F0' }}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>  </Text>
            Sign up
              </Text>
        </Text>

        {/* </View> */}
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
    top: 200,
    position: 'absolute',
  },

  logoStyle2: {
    top: 20,
    position: 'absolute'
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
  inputPos: {
    position: 'absolute',
    top: 220,
  },



  checkPos: {
    alignItems: 'center',
    position: 'absolute',
    top: 435,
    flexDirection: 'row',


  },
  remember: {
    color: 'black',
    fontSize: 18,
  },
});