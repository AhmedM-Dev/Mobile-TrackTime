import types from './types';
import globals from '../../../store/types';
import HttpClient from '../../../services/HttpClient';
import { Alert } from 'react-native';

const http = new HttpClient();
const domain = 'travels';

export const getTravels = () => dispatch => {
  http.get(`${domain}`)
    .then(response => {
      dispatch({
        type: types.GET_TRAVELS,
        travels: response.data.travels
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}
