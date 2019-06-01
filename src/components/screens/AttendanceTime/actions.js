import { Alert } from 'react-native';

import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

const domain = 'attendances';

const formatDate = (date) => `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;

export const getAttendances = (filters = {}) => dispatch => {

  const { dateFrom, dateTo } = filters;

  console.log("DATE REQUEST", `${domain}${dateFrom ? `?dateFrom=${formatDate(dateFrom)}` : ''}${dateTo ? `&dateTo=${formatDate(dateTo)}` : ''}`);

  http.get(`${domain}${dateFrom ? `?dateFrom=${formatDate(dateFrom)}` : ''}${dateTo ? `${!dateFrom ? '?' : '&'}dateTo=${formatDate(dateTo)}` : ''}`)
    .then(response => {
      console.log("ATTENDANCES FROM ACTION:", response.data);

      dispatch({
        type: types.GET_ATTENDANCES,
        payload: response.data.attendances
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const checkIn = () => dispatch => {
  http.post(`${domain}`)
    .then(response => {
      dispatch({
        type: types.CHECK_IN,
        payload: response.data
      });

      Alert.alert(
        'Info',
        response.data.message,
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
        'Info',
        response.data,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}
