import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, StatusBar, Image, Icon, ToastAndroid, ActivityIndicator } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import { connect } from 'react-redux';

import StyledInput from '../../ui/Input';

import LogoApp from '../../../assets/img/appNAme.png'
import companyLogo from '../../../assets/img/proxym.png'
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import checkedIcon from '../../../assets/img/checkedIcon.png'
import uncheckedIcon from '../../../assets/img/uncheckedIcon.png'

import { authenticate, storeDataToAsyncStorage } from '../../../services/services';
import { authenticateWithRedux } from '../../../store/actions';

import styles from './styles';

class Login extends Component {

  state = {
    check: false,
    loading: false,
    email: "ahmed.tux@protonmail.com",
    pass: "ahmed1989",
  }

  CheckBoxTest = () => {
    this.setState({
      check: !this.state.check
    }, () => {
      storeDataToAsyncStorage('rememberMe', this.state.check);
    });
  }

  handleAuthentication = () => {
    this.props.authenticateWithRedux({
      email: this.state.email, pass: this.state.pass
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

  componentDidUpdate() {
    if (this.props.authenticated) {
      ToastAndroid.show("Successfully authenticated!", ToastAndroid.LONG);
      this.props.navigation.navigate('Dashboard');
    } else if (this.props.error) {
      ToastAndroid.show(this.props.error, ToastAndroid.LONG);
    }
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={Background}>
        {this.props.logging &&
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


const mapStateToProps = state => {
  return {
    logging: state.authReducer.logging,
    authenticated: state.authReducer.authenticated,
    error: state.authReducer.error,
    errors: state.errors.errors
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateWithRedux(payload) { dispatch(authenticateWithRedux(payload)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);