import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
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
        <Text style={styles.Ui}>Upload your Image </Text>
        <View style={styles.inputPos}>
          <StyledInput image={logoName} text={'User name'} textColor={'white'} />
          <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" />
          <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />
          <StyledInput image={PasswordIcon} text={'Confirm password'} textColor={'white'} secureTextEntry={true} />
        </View>
        <Button
          buttonStyle={{
            height: 50,
            width: 300,
            backgroundColor: '#235982',
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#235982',
            top: 430,
            padding: 10,
          }}
          title=" Sign up"
          onPress={() => this.props.navigation.navigate('Dashboard')} />
                <Text style={styles.dh}> Already have an account ?
             <Text style={{ color: 'white' , fontWeight:'bold' }}
            onPress={() => this.props.navigation.navigate('Login')}>
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
    top: 40,
  },
  Ui: {
    top: 60,
    fontSize: 30,
  },
  inputPos: {
    position: 'absolute',
    top: 200,
  },
  dh: {
    position: 'absolute',
    top: 600,
    color: 'white',
    fontSize: 18,
  },
    buttonText: {
      height: 50,
      color: 'white',
      fontSize: 18,
      width: 300,
      backgroundColor: '#235982',
      borderRadius: 30,
      borderColor: '#235982',
      textAlign: 'center',
      position: 'absolute',
      top: 530,
      padding: 10,
      borderWidth :1
  },

});