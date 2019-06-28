import { Alert } from 'react-native';

import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const domain = 'attendances';

const formatDate = (date) => `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;

export const getAttendances = (filters = {}) => dispatch => {
  // const http = new HttpClient();
  const { dateFrom, dateTo } = filters;

  let list = [];

  if (dateFrom) {
    list.push(dateFrom);
  }

  if (dateTo) {
    list.push(dateTo);
  }

  console.log('sdfsdfsdf', filters);

  console.log("DATE REQUEST", `${domain}${dateFrom ? `?dateFrom=${formatDate(dateFrom)}` : ''}${dateTo ? `&dateTo=${formatDate(dateTo)}` : ''}`);

  new HttpClient().get(`${domain}${dateFrom ? `?dateFrom=${dateFrom}` : ''}${dateTo ? list.length > 1 ? `&dateTo=${dateTo}` : `?dateTo=${dateTo}` : ''}`)
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
  // const http = new HttpClient();
  new HttpClient().post(`${domain}`)
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
        'Error',
        'An error occured while checking in.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}
