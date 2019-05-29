import types from './types';
import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';

const http = new HttpClient();

const domain = "events";

export const deleteEvent = eventId => dispatch => {
  http.delete(`${domain}/${eventId}`)
    .then(response => {
      dispatch({
        type: types.DELETE_EVENT,
        payload: eventId
      });
      ToastAndroid.show("Event deleted successfully", ToastAndroid.LONG);

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const getEvents = () => dispatch => {
  http.get(`${domain}`)
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

export const createEvent = payload => dispatch => {
  http.post(`${domain}`, payload)
    .then(response => {
      dispatch({
        type: types.EVENT,
        payload: response.data
      });
      ToastAndroid.show("Event added successfully", ToastAndroid.LONG);

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}
