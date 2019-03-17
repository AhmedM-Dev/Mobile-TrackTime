import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View
}from 'react-native';
import StyledInput from '../../ui/Input';



import LogoApp from '../../../assets/img/appNAme.png'
import LogoApp2 from '../../../assets/img/log.png'
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';

export default class App extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'pink'
    }
  }

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
      <ImageBackground style={styles.container} source={Background}>

        {/* <Image style={styles.logoStyle} source={LogoApp2}></Image> */}
        {/* <Image style={styles.logoStyle2} source={LogoApp2}></Image>  */}

        <View style={styles.inputPos}>
          <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" />
          <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />
        </View>

        {/*         
        <View style={styles.checkPos}>
          <CheckBox style={styles.CheckBox}
            value={this.state.check} onChange={() => this.CheckBoxTest()} />
          <Text style={styles.remember}>Remember me</Text>
        </View> */}

        <Text style={styles.buttonText}
          onPress={() => this.props.navigation.navigate('Dashboard')} >
          Log in
          </Text> 

         {/* <Button
          title='Log in'
            buttonStyle={{ height: 50, width: 300, backgroundColor: '#2D5DC8', borderRadius: 30 }}
            textStyle={{  fontSize: 18 }}
            onPress={() => this.props.navigation.navigate('Dashboard')}
          /> */}

        <Text style={styles.dh}> Don't have an account ?
             <Text style={{ color: 'white', fontWeight: 'bold' }}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>  </Text>
            Sign up
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
    position: 'absolute',
    left: 25,
  },

  logoStyle2: {
    top: 20,
    position: 'absolute'
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
    backgroundColor: '#2D5DC8',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#2D5DC8',
    textAlign: 'center',
    position: 'absolute',
    top: 530,
    padding: 10
  },

  inputPos: {
    position: 'absolute',
    top: 320,
  },

  checkPos: {
    alignItems: 'center',
    position: 'absolute',
    top: 550,
    flexDirection: 'row',

  },
  remember: {
    color: 'black',
    fontSize: 18,

  },
});