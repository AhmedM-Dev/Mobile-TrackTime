import React, { Component } from 'react';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import { StatusBar, ImageBackground, Image, StyleSheet, Platform, ToastAndroid } from 'react-native';
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

import { updateUser, getUsers, getGroups } from './actions';
import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'

class UpdateEmployee extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: null,
      selectedUser: null,
      group: ''
    }
  };
  componentDidMount() {
    this.props.getGroups();
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

  handleChangeGroup = (group) => {
    this.setState({
      ...this.state,
      group: group,
      selectedUser: {
        ...this.state.selectedUser,
        group: group
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
      ToastAndroid.show("user updated successfully", ToastAndroid.LONG);

    } else {
      ToastAndroid.show("All infos are required.", ToastAndroid.LONG);

    }
  }

  render() {
    return (
      <View style={styles.container} >
        <Content>
          <Icon
            name="md-arrow-round-back"
            style={{
              color: '#DA7373',
              margin: 30,
              fontSize: 18,
              left: 20
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />
          <View style={{
            backgroundColor: '#AA7979',
            marginBottom: 20,
            flexDirection: 'row',
            borderColor: '#CB9090',
            borderWidth: 1,
            borderRadius: 20,
            alignSelf: 'center',
            height: 45, width: 300
          }} >
            <Image source={logoName} style={{ width: 15, height: 15, marginLeft: 15, marginRight: 10, top: 15 }}></Image>

            <Picker
              selectedValue={this.state.selectedUser || ''}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
                color: 'white',
              }}


              onValueChange={this.handleSelectUser}>
              {this.props.users && this.props.users.length > 0 && orderBy(this.props.users, 'firstName', 'asc').map(user => <Picker.Item label={`${user.firstName} ${user.lastName}`} value={user} color="#021630" />)}
            </Picker>
          </View>

          <View style={styles.inputPos}>
            <StyledInput name="firstName" value={this.state.selectedUser && this.state.selectedUser.firstName} image={logoName} text={'First name'} textColor={'white'} onChange={this.handleChangeFirstName} />
            <StyledInput name="lastName" value={this.state.selectedUser && this.state.selectedUser.lastName} image={logoName} text={'Last name'} textColor={'white'} onChange={this.handleChangeLastName} />
            <StyledInput name="jobTitle" value={this.state.selectedUser && this.state.selectedUser.jobTitle} image={jobLogo} text={'Job title'} textColor={'white'} onChange={this.handleChangeJobTitle} />


            <AdminPickers height={45} width={300}>
              <Image source={groupIcon} style={{ width: 15, height: 15, marginLeft: 15, marginRight: 10, top: 15 }}></Image>
              <Picker
                selectedValue={this.state.group || ''}
                width={300}
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'white',
                }}
                name="group"
                onValueChange={this.handleChangeGroup}>
                {this.props.groups && this.props.groups.length > 0 && this.props.groups.map(groups => <Picker.Item label={`${groups.name}`} value={groups.name} color="#021630" />)}
              </Picker>
            </AdminPickers>


            <StyledInput name="email" value={this.state.selectedUser && this.state.selectedUser.email} image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" onChange={this.handleChangeEmail} />
            <StyledInput name="password" image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} onChange={this.handleChangePass} />
          </View>

          <ActionButton
            buttonColor="#072152"
            btnOutRange="#C8593C"
            icon={<Icon name='md-arrow-dropup' style={styles.actionButtonIcon} />}
            degrees={180}
            size={40}
            radius={50}
            outRangeScale={0.5}
          >
            <ActionButton.Item
              buttonColor='#A9A91C'
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
    backgroundColor: '#D1D0D0',
  },

  inputPos: {
    marginBottom: 70,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
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
    theme: state.settingsReducer.theme,
    groups: state.groupsReducer.groups

  }
}

const mapDispatchToProps = dispatch => ({
  getUsers() { dispatch(getUsers()) },
  updateUser(user) { dispatch(updateUser(user)) },
  getGroups() { dispatch(getGroups()) },

});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployee);