import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar, Image
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
  state = {
    check: false,
    isConnected: false,
    email: '',
    pass: ''
  }

  CheckBoxTest = () => {
    this.setState({
      check: !this.state.check
    })
  }

  handleAuthentication = () => {
    axios.post("http://10.42.0.245:5000/tracktime/api/auth", {
      email: "ahmed.tux@protonmail.com",
      pass: "ahmed1989"
    })
      .then((res) => {
        console.log(res);
        this.setState({
          check: this.state.check,
          isConnected: true
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleTyping = (e) => {
    console.log("TARGET", e.target.value);
    // this.setState({
    //   check: false,
    //   isConnected: false,
    //   email: '',
    //   pass: ''
    // })
  }

  componentWillMount() {
    if (this.state.isConnected) {
      this.props.navigation.navigate('Dashboard');
    }
  }

  componentDidUpdate() {
    console.log("UPDATED");
    if (this.state.isConnected) {
      this.props.navigation.navigate('Dashboard');
    }
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Background}>
        <StatusBar hidden />
        <Image source={Logo} style={{ top: 30 }}></Image>
        <View style={styles.inputPos}>
          <StyledInput value={this.state.email} onChange={this.handleTyping} name="email" image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" require />
          <StyledInput value={this.state.pass} onChange={this.handleTyping}  name="pass" image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} />
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
            backgroundColor: '#235982',
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#235982',
            top: 250,
            padding: 10,
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
    fontSize: 14,
    left: -10
  },
});