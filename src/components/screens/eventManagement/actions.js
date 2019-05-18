import types from './types';
import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';

const http = new HttpClient();

const domain = "events";

// export const getEvents = () => dispatch => {

// }

export const createEvent = payload => dispatch => {
  http.post(domain, payload)
    .then(response => {
      dispatch({
        type: types.ADD_EVENT,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

// export const updateEvent = () => dispatch => {

// }

// export const deleteEvent = () => dispatch => {

// }