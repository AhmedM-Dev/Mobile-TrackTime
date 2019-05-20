import types from './types';
import globals from '../../../store/types';
import HttpClient from '../../../services/HttpClient';
import {ToastAndroid} from 'react-native'

const http = new HttpClient();
const domain = 'users';
const groupsdomain = 'groups';

export const getUsers = () => dispatch => {
  http.get(`${domain}`)
    .then(response => {
      dispatch({
        type: types.GET_USERS,
        users: response.data.users
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const getGroups = () => dispatch => {
  http.get(`${groupsdomain}`)
    .then(response => {
      dispatch({
        type: types.GET_GROUPS,
        groups: response.data.groups
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const deleteGroup = groupId => dispatch => {
  http.delete(`${groupsdomain}/${groupId}`)
    .then(response => {
      dispatch({
        type: types.DELETE_GROUP,
        payload: groupId
      });
      ToastAndroid.show("Group removed successfully", ToastAndroid.LONG);
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const addGroup = payload => dispatch => {
  http.post(`${groupsdomain}`, payload)
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

