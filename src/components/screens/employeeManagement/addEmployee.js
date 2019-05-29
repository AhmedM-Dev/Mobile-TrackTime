import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text, Picker } from 'native-base';
import ActionButton from 'react-native-circular-action-menu';
import axios from "axios";
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'

import { addUser, getGroups } from './actions';



import StyledInput from '../../ui/Input/lightInput';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import phoneIcon from '../../../assets/img/phoneIcon.png';
import logoName from '../../../assets/img/name.png';
import groupIcon from '../../../assets/img/group.png';
import jobLogo from '../../../assets/img/jobLogo.png';
import Background from '../../../assets/img/backgroundM.jpg';

import { API_URL } from "../../../../config";


class addEmployee extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      group: '',
      email: '',
      password: null,
      businessRole: '',
    }
  };


  handleFirstNAmeChange = (text) => {
    this.setState({
      ...this.state,
      firstName: text
    });
  }

  handleLastNameChange = (text) => {
    this.setState({
      ...this.state,
      lastName: text
    });
  }

  handleGroupChange = (group) => {
    this.setState({
      ...this.state,
      group: group
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
      password: text
    });
  }
  handleBusinessRoleChange = (text) => {
    this.setState({
      ...this.state,
      businessRole: text
    });
  }

  handleJobTitleChange = (text) => {
    this.setState({
      ...this.state,
      jobTitle: text
    });
  }

  handleAddUser = () => {
    const { firstName, lastName, jobTitle, group, email, password } = this.state;
    if (firstName !== '' && lastName !== '' && jobTitle !== '' && group !== '' && email !== '' && password !== '') {
      this.props.addUser(this.state);
      ToastAndroid.show("user added successfully", ToastAndroid.LONG);
    } else {
      ToastAndroid.show("All infos are required.", ToastAndroid.LONG);
    }
  }

  componentDidMount() {
    this.props.getGroups();
  }
  render() {
    return (
      <View style={styles.container} >
        <Content>
          <Icon
            name="md-arrow-round-back"
            style={{
              color: '#DA7373',
              margin:30,
              fontSize: 18,
              left:20
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />
          <View style={styles.inputPos}>
            <StyledInput image={logoName} text={'First name'} textColor={'white'} onChange={this.handleFirstNAmeChange} name="firstName" />
            <StyledInput image={logoName} text={'Last name'} textColor={'white'} onChange={this.handleLastNameChange} name="lastName" />
            <StyledInput image={jobLogo} text={'Job title'} textColor={'white'} onChange={this.handleJobTitleChange} name="jobTitle" />
            <StyledInput image={jobLogo} text={'Business role'} textColor={'white'} onChange={this.handleBusinessRoleChange} name="businessRole" />

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
                onValueChange={this.handleGroupChange}>
                {this.props.groups && this.props.groups.length > 0 && this.props.groups.map(groups => <Picker.Item label={`${groups.name}`} value={groups.name} color="#021630" />)}
              </Picker>
            </AdminPickers>

            <StyledInput image={EmailIcon} text={'Email'} textColor={'white'} keyboardType="email-address" onChange={this.handleEmailChange} name="email" />
            <StyledInput image={PasswordIcon} text={'Password'} textColor={'white'} secureTextEntry={true} onChange={this.handlePassChange} name="password" />
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
              onPress={() => { this.handleAddUser() }}>
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
    marginBottom: 80
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
    theme: state.settingsReducer.theme,
    groups: state.usersReducer.groups

  }
}

const mapDispatchToProps = dispatch => ({
  addUser(user) { dispatch(addUser(user)) },
  getGroups() { dispatch(getGroups()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(addEmployee);