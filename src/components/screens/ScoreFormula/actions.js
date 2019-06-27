import { ToastAndroid } from 'react-native';

import types from './types';
import globals from '../../../store/types';

import HttpClient from '../../../services/HttpClient';

// const http = new HttpClient();

const domain = "formula";

export const setFormula = eventId => dispatch => {

  new HttpClient().post(`${domain}/${eventId}`)
    .then(response => {
      dispatch({
        type: types.SET_FORMULA,
        payload: eventId
      });
      // ToastAndroid.show("Event deleted successfully", ToastAndroid.LONG);
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}
