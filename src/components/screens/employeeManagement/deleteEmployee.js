import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform, ToastAndroid, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import logoName from '../../../assets/img/name.png';
import defaultAvatar from '../../../assets/img/user.png';

import { deleteUser, getUsers } from './actions';

const initialState = {
  email: '',
  password: null,
  selectedUser: null
};

class DeleteEmployee extends Component {
  state = initialState;

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

  handleSelectUser = (user) => {
    this.setState({
      selectedUser: user
    });
  }

  handleDeleteUser = () => {
    this.props.deleteUser(this.state.selectedUser.userId);
    ToastAndroid.show("user deleted successfully", ToastAndroid.LONG);
  }

  handleClear = () => {
    this.setState(initialState);
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
            backgroundColor: '#9C9C9C',
            marginBottom: 20,
            flexDirection: 'row',
            borderColor: '#9C9C9C',
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

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 80 }}>
            <TouchableHighlight style={{
              borderRadius: 100,
              height: 100,
              width: 100,
              top: 10
            }}>
              <Image source={this.state.selectedUser && this.state.selectedUser.photo ? { uri: this.state.selectedUser.photo } : defaultAvatar}
                style={{
                  borderRadius: 100,
                  height: 100,
                  width: 100,
                  borderWidth: 2,
                  borderColor: this.props.theme.imageSettingsBorderColor,
                }}></Image>
            </TouchableHighlight>
          </View>

          <ActionButton
            buttonColor="#9C9C9C"
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
              onPress={this.handleClear} >
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
    backgroundColor: '#D1D0D0',
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
