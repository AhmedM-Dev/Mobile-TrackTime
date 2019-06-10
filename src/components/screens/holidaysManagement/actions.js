import types from './types';
import globals from '../../../store/types';
import HttpClient from '../../../services/HttpClient';
import { Alert } from 'react-native';

const http = new HttpClient();
const domain = 'holidays';

export const getHolidays = () => dispatch => {
  http.get(`${domain}`)
    .then(response => {
      dispatch({
        type: types.GET_HOLIDAYS,
        holidays: response.data.holidays
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const addHoliday = holiday => dispatch => {

  dispatch({
    type: types.ADD_HOLIDAY
  });

  http.post(`${domain}`, holiday)
    .then(response => {
      dispatch({
        type: types.ADD_HOLIDAY_SUCCESS,
        holiday: response.data.holiday
      });

      Alert.alert(
        'Add Holidays',
        'Holiday added successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    })
    .catch(error => {

      dispatch({
        type: types.ADD_HOLIDAY_FAILED
      });

      dispatch({
        type: globals.ADD_ERROR,
        error
      });

      Alert.alert(
        'Add Holidays',
        'Error adding holiday.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}

export const editHoliday = holiday => dispatch => {
  http.put(`${domain}/${holiday.holidayId}`, holiday)
    .then(response => {
      dispatch({
        type: types.EDIT_HOLIDAY,
        holiday: response.data.holiday
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const removeHoliday = holidayId => dispatch => {
  http.delete(`${domain}/${holidayId}`)
    .then(response => {
      dispatch({
        type: types.REMOVE_HOLIDAY,
        holiday: response.data.holiday
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}
