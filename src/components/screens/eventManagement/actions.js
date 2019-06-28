import { Alert } from 'react-native';

import types from './types';
import globals from '../../../store/types';

import HttpClient from '../../../services/HttpClient';

// const http = new HttpClient();

const domain = "events";

export const deleteEvent = eventId => dispatch => {
  console.log("PAYLOAD", eventId);
  new HttpClient().delete(`${domain}/${eventId}`)
    .then(response => {
      dispatch({
        type: types.DELETE_EVENT,
        payload: eventId
      });

      Alert.alert(
        'Event',
        'Event deleted successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });

      Alert.alert(
        'Error',
        'Error deleting the event.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}

export const getEvents = () => dispatch => {
  new HttpClient().get(`${domain}`)
    .then(response => {
      dispatch({
        type: types.GET_EVENTS,
        events: response.data.events
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const updateEvent = payload => dispatch => {

  const { eventId, ...body } = payload;

  new HttpClient().put(`${domain}/${eventId}`, body)
    .then(response => {
      dispatch({
        type: types.UPDATE_EVENT,
        payload: response.data.event
      });

      Alert.alert(
        'Event',
        'Event updated successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });

      Alert.alert(
        'Error',
        'Error updating the event.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}

export const createEvent = payload => dispatch => {
  new HttpClient().post(`${domain}`, payload)
    .then(response => {
      dispatch({
        type: types.ADD_EVENT,
        payload: response.data.event
      });

      Alert.alert(
        'Event',
        'Event added successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });

      Alert.alert(
        'Error',
        'Error creating the event.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}
