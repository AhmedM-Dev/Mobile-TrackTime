import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import titleIcon from '../../../assets/img/titleIcon.png';
import axios from "axios";
import { API_URL } from "../../../../config";
import Background from '../../../assets/img/backgroundM.jpg';
import ImagePicker from 'react-native-image-picker';
import StyledInput from '../../ui/Input/addEventInput';
import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'

import { connect } from 'react-redux';

import { deleteEvent, getEvents } from './actions';

class removeEvent extends Component {

  state = {
    selectedEvent: null
  }

  handleRemoveEvent = () => {
    const { selectedEvent } = this.state;
    if (selectedEvent !== null) {
      this.props.deleteEvent(selectedEvent.eventId);
      this.setState({
        selectedEvent: null
      });
      ToastAndroid.show("Event deleted successfully", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Event title is required.", ToastAndroid.LONG);
    }
  }

  componentDidMount() {
    this.props.getEvents();
  }

  handleEventChange = (event) => {
    this.setState({ selectedEvent: event });
  };

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
            marginBottom: 80,
            flexDirection: 'row',
            borderColor: '#9C9C9C',
            borderWidth: 1,
            borderRadius: 20,
            alignSelf: 'center',
            height: 45, width: 300
          }}>
            <Picker
              selectedValue={this.state.selectedEvent || ''}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
                color: 'white',

              }}
              name="event"
              onValueChange={this.handleEventChange}>
              {this.props && this.props.events && this.props.events.length > 0 && this.props.events.map(event => <Picker.Item label={`${event.title}`} value={event} color="#021630" />)}
            </Picker>
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
              onPress={this.handleRemoveEvent}>
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
    theme: state.settingsReducer.theme,
    events: state.eventsReducer.events
  }
}

const mapDispatchToProps = dispatch => ({
  deleteEvent(eventId) { dispatch(deleteEvent(eventId)) },
  getEvents() { dispatch(getEvents()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(removeEvent);
