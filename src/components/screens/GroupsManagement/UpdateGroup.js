import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import titleIcon from '../../../assets/img/titleIcon.png';
import leaderIcon from '../../../assets/img/leader.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';
import ImagePicker from 'react-native-image-picker';
import StyledInput from '../../ui/Input/addEventInput';
import { connect } from 'react-redux';
import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'
import { addGroup, getUsers, getGroups } from './actions';

import groupIcon from '../../../assets/img/group.png';


class UpdateGroup extends Component {
  constructor() {
    super();
    this.state = {
      selectedGroup: '',
      poleLead: '',
      shortName: '',
    }
  }



  handleSelectGroup = (group) => {
    this.setState({
      selectedGroup: group,
      poleLead: group.poleLead,
      shortName: group.shortName
    });
  }

  handleNameChange = (text) => {
    this.setState({
      selectedGroup: {
        ...this.state.selectedGroup,
        name: text
      }
    });
  }

  handleShortNameChange = (text) => {
    this.setState({
      selectedGroup: {
        ...this.state.selectedGroup,
        shortName: text
      }
    });
  }


  handlePoleLead = (poleLead) => {
    this.setState({
      ...this.state,
      poleLead: poleLead,
      selectedGroup: {
        ...this.state.selectedGroup,
        poleLead: poleLead
      }
    });
  }
  handleAddGroup = () => {
    const { name, poleLead, shortName } = this.state;
    if (name !== '' && shortName !== '' && poleLead !== '') {
      this.props.addGroup(this.state);
      ToastAndroid.show("Group updated successfully", ToastAndroid.LONG);

    }

    else {
      ToastAndroid.show("All infos are required.", ToastAndroid.LONG);
    }
  }

  componentDidMount() {
    this.props.getUsers();

  }

  componentDidMount() {
    this.props.getGroups();
    this.setState({
      selectedGroup: this.props.groups && this.props.groups[0],
      poleLead: this.props.groups && this.props.groups[0] && this.props.groups[0].poleLead
    });
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
            height: 45, width: 300,

            paddingLeft: 10
          }}>
            <Picker
              selectedValue={this.state.selectedGroup || ''}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
                color: 'white',

              }}
              name="group"
              onValueChange={this.handleSelectGroup}>
              {this.props.groups && this.props.groups.length > 0 && this.props.groups.map(group => <Picker.Item label={`${group.name}`} value={group} color="#021630" />)}
            </Picker>
          </View>


          <View style={{ marginBottom: 80, marginTop: 100 }}>
            <StyledInput
              value={this.state.selectedGroup && this.state.selectedGroup.name}
              text={'Group name'} textColor={'white'} onChange={this.handleNameChange} />

            <StyledInput
              value={this.state.selectedGroup && this.state.selectedGroup.shortName}
              text={'Group name'} textColor={'white'} onChange={this.handleShortNameChange} />

            <AdminPickers height={45} width={300} paddingLeft={20}>


              <Picker
                selectedValue={this.state.poleLead || ''}
                value={this.state.selectedGroup && this.state.selectedGroup.poleLead}
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'white',
                }}
                onValueChange={this.handlePoleLead}>
                {/* <Picker.Item label="Leader" value='' color="#021630" /> */}
                {this.props.users && this.props.users.length > 0 && this.props.users.map(user =>
                  <Picker.Item label={`${user.firstName} ${user.lastName}`} value={user.userId} color="#021630" />)}
              </Picker>
            </AdminPickers>

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
              onPress={() => { this.handleAddGroup() }}>
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
    users: state.groupsReducer.users,
    groups: state.groupsReducer.groups

  }
}

const mapDispatchToProps = dispatch => ({
  addGroup(group) { dispatch(addGroup(group)) },
  getGroups() { dispatch(getGroups()) },
  getUsers() { dispatch(getUsers()) },
  getGroups() { dispatch(getGroups()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGroup);
