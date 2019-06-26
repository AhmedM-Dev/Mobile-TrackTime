import { Alert } from 'react-native';

import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const domain = 'attendances';

const formatDate = (date) => `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;

export const getAttendances = (filters = {}) => dispatch => {
  // const http = new HttpClient();
  const { dateFrom, dateTo, userId } = filters;

  console.log("DATE REQUEST", `${domain}${dateFrom ? `?dateFrom=${formatDate(dateFrom)}` : ''}${dateTo ? `&dateTo=${formatDate(dateTo)}` : ''}`);

  new HttpClient().get(`${domain}${userId ? `?userId=${userId}` : ''}${Object.keys(filters).length > 1 ? '&' : '?'}${dateFrom ? `dateFrom=${formatDate(dateFrom)}` : ''}${Object.keys(filters).length > 1 ? '&' : '?'}${dateTo ? `dateTo=${formatDate(dateTo)}` : ''}`)
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
        'Info',
        response.data,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}
