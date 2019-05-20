import types from './types';
import globals from '../../../store/types';
import {ToastAndroid} from 'react-native'
import HttpClient from '../../../services/HttpClient';

const http = new HttpClient();
const domain = 'groups';



export const addGroup = payload => dispatch => {
  http.post(`${domain}`, payload)
    .then(response => {
      dispatch({
        type: types.ADD_GROUP,
        payload: response.data
      });
      ToastAndroid.show("Group added successfully", ToastAndroid.LONG);

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error,
        
      });
      ToastAndroid.show("A group with this name already exist.", ToastAndroid.LONG);
    });
}

