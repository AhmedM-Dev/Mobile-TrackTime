import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements'
import StyledInput from '../../ui/Input';
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import logoName from '../../../assets/img/name.png';
import {Icon} from 'native-base'
export default class App extends Component {
  
  render() {
    return (
      <ImageBackground style={styles.container} source={Background}>
        <StatusBar hidden />
      {/* <Icon name={'return-left'} style={{top:20,left}}></Icon> */}
        {/* <Image style={styles.logoStyle} source={LogoApp}></Image> */}
        <View style={styles.inputPos}>
        <StyledInput image={logoName} text={'First name'} textColor={'white'} />
          <StyledInput image={logoName} text={'Last name'} textColor={'white'} />
          <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" />
          <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />
          <StyledInput image={PasswordIcon} text={'Confirm password'} textColor={'white'} secureTextEntry={true} />
        </View>
        <Button
          buttonStyle={{
            height: 50,
            width: 300,
            backgroundColor: '#19678F',
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#19678F',
            top: 480,
            padding: 10,
          }}
          title=" Sign up"
          onPress={() => this.props.navigation.navigate('Avatar')} />
                <Text style={styles.dh}> Already have an account ?
             <Text style={{ color: '#B3D8E3' , fontWeight:'bold' }}
            onPress={() => this.props.navigation.navigate('Logout')}>
            <Text> </Text>
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
    top: 45,
  },
  Ui: {
    top: 60,
    fontSize: 30,
  },
  inputPos: {
    position: 'absolute',
    top: 80,
  },
  dh: {
    position: 'absolute',
    top: 570,
    color: 'white',
    fontSize: 18,
  },
   

});