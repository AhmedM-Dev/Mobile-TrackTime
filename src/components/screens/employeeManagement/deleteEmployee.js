import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform , ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import StyledInput from '../../ui/Input/lightInput';
import EmailIcon from '../../../assets/img/Email.png';
import PasswordIcon from '../../../assets/img/password.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';
import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'

import { deleteUser, getUsers } from './actions';

class DeleteEmployee extends Component {
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

  handleSelectUser = (user) => {
    this.setState({
      selectedUser: user
    });
  }

  handleDeleteUser = () => {
    this.props.deleteUser(this.state.selectedUser.userId);
    ToastAndroid.show("user deleted successfully", ToastAndroid.LONG);
  }


  render() {
    return (
      <View style={styles.container} >
        <Content>
          <Icon
            name="md-arrow-dropleft"
            style={{
              color: 'black',
              margin: 15,
              top: 10
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />

          <View style={styles.inputPos}>
          <AdminPickers height={55} width={300} paddingLeft={20}>
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
            </AdminPickers>
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
              onPress={this.handleDeleteUser}>
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
    top: 150,
    marginBottom: 250
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',

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
  deleteUser(userId) { dispatch(deleteUser(userId)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEmployee);