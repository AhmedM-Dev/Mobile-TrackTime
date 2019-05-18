import React, { Component } from 'react';
import { connect } from 'react-redux';
import { orderBy, split } from 'lodash';

import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import StyledInput from '../../ui/Input/lightInput';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';
import groupIcon from '../../../assets/img/group.png';
import jobLogo from '../../../assets/img/jobLogo.png';
import logoName from '../../../assets/img/name.png';

import { updateUser, getUsers } from './actions';

class UpdateEmployee extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: null,
      selectedUser: null
    }
  };


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
    AsyncStorage.getItem("user").then(user => {

      this.setState({
        connectedUser: JSON.parse(user)
      });
    })
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleSelectUser = (user) => {
    this.setState({
      selectedUser: user
    });
  }

  handleChangeFirstName = (text) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        firstName: text
      }
    });
  }

  handleChangeLastName = (text) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        lastName: text
      }
    });
  }

  handleChangeJobTitle = (text) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        jobTitle: text
      }
    });
  }

  handleChangeGroup = (text) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        groupId: text
      }
    });
  }

  handleChangeEmail = (text) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        email: text
      }
    });
  }

  handleChangePass = (text) => {
    this.setState({
      selectedUser: {
        ...this.state.selectedUser,
        password: text
      }
    });
  }

  submitUser = () => {
    const { firstName, lastName, jobTitle, groupId, email, password, userId } = this.state.selectedUser;

    if (firstName !== '' && lastName !== '' && jobTitle !== '' && groupId !== '' && email !== '' && password !== '') {
      this.props.updateUser({
        userId,
        ...this.state.selectedUser
      });
    } else {
      alert("All infos are required.");
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <Content>
          <Icon
            name="md-keypad"
            style={{
              color: 'black',
              margin: 15,
              top: 10
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />
          <View style={styles.inputPos}>
            <Picker
              selectedValue={this.state.selectedUser || ''}
              style={{
                height: 50,
                width: '100%',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
                color: this.props.theme.fontColor,
                backgroundColor: this.props.theme.backgroundColor,
                marginLeft: 10
              }}
              onValueChange={this.handleSelectUser}>
              {this.props.users && this.props.users.length > 0 && orderBy(this.props.users, 'firstName', 'asc').map(user => <Picker.Item label={`${user.firstName} ${user.lastName}`} value={user} color="#021630" />)}
            </Picker>

            <StyledInput name="firstName" value={this.state.selectedUser && this.state.selectedUser.firstName} image={logoName} text={'First name'} textColor={'white'} onChange={this.handleChangeFirstName} />
            <StyledInput name="lastName" value={this.state.selectedUser && this.state.selectedUser.lastName} image={logoName} text={'Last name'} textColor={'white'} onChange={this.handleChangeLastName} />
            <StyledInput name="jobTitle" value={this.state.selectedUser && this.state.selectedUser.jobTitle} image={jobLogo} text={'Job title'} textColor={'white'} onChange={this.handleChangeJobTitle} />
            <StyledInput name="groupId" value={this.state.selectedUser && this.state.selectedUser.groupId.toString()} image={groupIcon} text={'Group ID'} textColor={'white'} onChange={this.handleChangeGroup} />
            {/* <StyledInput image={phoneIcon} text={'Phone number'} textColor={'white'} onChange={this.handlePhoneNumberChange} /> */}
            <StyledInput name="email" value={this.state.selectedUser && this.state.selectedUser.email} image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" onChange={this.handleChangeEmail} />
            <StyledInput name="password" image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} onChange={this.handleChangePass} />
          </View>

          <ActionButton
            buttonColor="black"
            btnOutRange="#C8593C"
            icon={<Icon name='md-arrow-dropup' style={styles.actionButtonIcon} />}
            degrees={180}
            size={40}
            radius={50}
          // outRangeScale={0.5}       
          >
            <ActionButton.Item
              buttonColor='#C9CF57'
              title="Reset"
              onPress={() => alert('refresh')} >
              <Icon
                name="md-refresh"
                style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#006B4C'
              title="Save"
              onPress={() => this.submitUser()}
            >
              <Icon
                name="md-done-all"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
  },

  inputPos: {
    top: 30,
    marginBottom: 100
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  instructions2: {
    color: 'white',
    marginBottom: 15,
    fontSize: 16
  },
});

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    users: state.usersReducer.users,
    theme: state.settingsReducer.theme
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers() { dispatch(getUsers()) },
  updateUser(user) { dispatch(updateUser(user)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployee);