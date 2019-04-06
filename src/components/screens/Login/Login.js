import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar, 
  Image , 
  Icon ,
  ToastAndroid,
  AsyncStorage
} from 'react-native';

import { CheckBox, Button } from 'react-native-elements'
import StyledInput from '../../ui/Input';
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import Logo from '../../../assets/img/l.png';
import checkedIcon from '../../../assets/img/checkedIcon.png'
import uncheckedIcon from '../../../assets/img/uncheckedIcon.png'

import axios from 'axios';

export default class App extends Component {
  // static navigationOptions ={
  //   drawerIcon : (
  //     <Icon name="md-log-out"  />
  //   )
  // }

  state = {
    check: false,
    isConnected: false,
    email: "ahmed.tux@protonmail.com",
    pass: "ahmed1989"
  }

  CheckBoxTest = () => {
    this.setState({
      check: !this.state.check
    })
  }

  
  handleAuthentication = async () => {
    axios.post("http://10.42.0.150:5000/tracktime/api/auth", {
      email: this.state.email,
      pass: this.state.pass
    })
    .then((response) => {
      
      axios.get("http://10.42.0.150:5000/tracktime/api/users?email=" + response.data.user.user.email)
      .then(async (userByEmail) => {
        
        this.setState({
          check: this.state.check, 
          isConnected: true
        });
        
        ToastAndroid.show("Successfully authenticated!", ToastAndroid.SHORT);
        
        await AsyncStorage.setItem("user", JSON.stringify(userByEmail.data.user));
      })
      .done();
      
      
      
    })
    .catch((error) => {
      // alert("Authentication failed !");
        ToastAndroid.show("Authentication failed !", ToastAndroid.LONG);
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
  
  componentWillMount() {
    if (this.state.isConnected) {
      this.props.navigation.navigate('Dashboard');
    }
  }
  
  componentDidUpdate() {
    if (this.state.isConnected) {
      this.props.navigation.navigate('Dashboard');
    }
  }
  
  
  render() {
    return (
      <ImageBackground style={styles.container} source={Background}>
        <StatusBar hidden />
        {/* <Image source={Logo} style={{ top: 30 }}></Image> */}
        <View style={styles.inputPos}>
          <StyledInput value={this.state.email} onChange={this.handleEmailChange} name="email" image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" require />
          <StyledInput value={this.state.pass} onChange={this.handlePassChange}  name="pass" image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />
        </View>
        <View style={styles.checkPos}>
          <CheckBox
            checkedIcon={<Image source={checkedIcon} style={{ height: 20, width: 20, marginRight: -10 }} />}
            uncheckedIcon={<Image source={uncheckedIcon} style={{ height: 20, width: 20, marginRight: -10 }} />}
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />
          <Text style={styles.remember}> Remember me </Text>
        </View>
        <Button
          buttonStyle={{
            height: 50,
            width: 300,
            backgroundColor: '#1253D1',
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#1253D1',
            top: 530,
            left:-150,
            padding: 10,
            position:'absolute',
          }}
          title="Log in"
          onPress={() => this.handleAuthentication()} />
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
  dh: {
    position: 'absolute',
    top: 600,
    color: 'white',
    fontSize: 18,
  },
  inputPos: {
    position: 'absolute',
    top: 342,
  },
  checkPos: {
    alignItems: 'center',
    position: 'absolute',
    top: 480,
    flexDirection: 'row',
  },
  remember: {
    color: 'black',
    opacity: 0.6 ,
    fontSize: 14,
    left: -10
  },
});