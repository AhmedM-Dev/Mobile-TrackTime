import types from './types';
import globals from '../../../store/types';
import HttpClient from '../../../services/HttpClient';
import { Alert } from 'react-native';

// const http = new HttpClient();
const domain = 'hoursplan';

export const setHoursPlan = payload => dispatch => {
  new HttpClient().post(domain, payload)
    .then(() => {
      dispatch({
        type: types.SET_HOURS_PLAN
      });

      Alert.alert(
        'Hours Plan',
        'Hours Plan added successfully.',
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
        error.response && error.response.data && error.response.data.error,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    })
}
