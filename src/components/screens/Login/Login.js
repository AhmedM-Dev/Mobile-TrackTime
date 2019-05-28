import React, { Component } from 'react';
import { ImageBackground, Text, TextInput, View, StatusBar, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import Dialog, { DialogContent, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';

import StyledInput from '../../ui/Input';

import LogoApp from '../../../assets/img/appNAme.png'
import companyLogo from '../../../assets/img/proxym.png'
import Background from '../../../assets/img/background.jpg';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import checkedIcon from '../../../assets/img/checkedIcon.png';
import uncheckedIcon from '../../../assets/img/uncheckedIcon.png';

import { storeDataToAsyncStorage } from '../../../services/services';
import { authenticateWithRedux } from '../../../store/actions';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { API_URL } from "../../../../config";

class Login extends Component {

  state = {
    check: false,
    loading: false,
    // email: "becka.holden@tracktime.com",
    email:"asma.bahmed19@hotmail.com",
    pass: "123",
    countClick: 0,
    promptAPIURL: false,
    apiURL: API_URL
  }

  handleLogoClick = () => {
    this.setState({
      countClick: this.state.countClick + 1
    }, () => {
      console.log("clicks:", this.state.countClick);
      if (this.state.countClick > 2) {
        this.setState({
          promptAPIURL: true,
          countClick: 0
        });
      }
    });
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
      <>
        <Dialog
          onDismiss={() => {
            this.setState({ promptAPIURL: false });
          }}
          onTouchOutside={() => {
            this.setState({ promptAPIURL: false });
          }}
          visible={this.state.promptAPIURL}
          dialogTitle={<DialogTitle title="Change API http address" />}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        >
          <DialogContent>
            <Text>Slide Animation</Text>
            <TextInput name="apiUrl" value={this.state.apiURL} placeholder="API URL" defaultValue={API_URL} />
            <StyledInput defaultValue={API_URL} value={this.state.apiURL} onChange={null} name="apiUrl" text={'API URL'} textColor={'black'} />
          </DialogContent>
        </Dialog>
        {/* <Dialog
          style={{ width: '80%' }}
          visible={this.state.promptAPIURL}
          onTouchOutside={() => {
            this.setState({ promptAPIURL: false });
          }}
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                onPress={() => { }}
              />
              <DialogButton
                text="OK"
                onPress={() => { }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>Hello there</Text>
          </DialogContent>
        </Dialog> */}
        <ImageBackground style={styles.container} source={Background}>
          {this.props.logging &&
            <View style={styles.loading}>
            <Image source={companyLogo} style={{marginBottom:50}}></Image>
                    <ActivityIndicator size={80} color="#0000ff" />
            </View>
          }
          <StatusBar hidden />
          <View style={{ flexDirection: 'row', top: 100 }}>
            <Image source={companyLogo} style={{ height: 50, width: 50, marginRight: 15 }}></Image>
            <TouchableOpacity onPress={this.handleLogoClick}>
              <Image source={LogoApp}></Image>
            </TouchableOpacity>
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
      </>
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
  authenticateWithRedux(payload) { dispatch(authenticateWithRedux(payload)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);