import { ToastAndroid } from 'react-native';

import types from './types';
import globals from '../../../store/types';

import HttpClient from '../../../services/HttpClient';

const domain = "formula";

export const setFormula = payload => dispatch => {

  new HttpClient().post(`${domain}`, payload)
    .then(response => {
      dispatch({
        type: types.SET_FORMULA,
        payload: response.data
      });
      // ToastAndroid.show("Formula added successfully.", ToastAndroid.LONG);
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}
