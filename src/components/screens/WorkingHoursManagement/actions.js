import types from './types';
import globals from '../../../store/types';
import HttpClient from '../../../services/HttpClient';
import { Alert } from 'react-native';

const http = new HttpClient();
const domain = 'hoursplan';

export const setHoursPlan = payload => dispatch => {
  http.post(domain, payload)
  .then(response => {
    dispatch({
      type: types.SET_HOURS_PLAN
    });
  })
  .catch(error => {
    dispatch({
      type: globals.ADD_ERROR,
      error
    })
  })
}
