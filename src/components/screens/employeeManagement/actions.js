import { ToastAndroid } from 'react-native';

import types from './types';
import globals from '../../../store/types';

import HttpClient from '../../../services/HttpClient';

const http = new HttpClient();
const domain = 'users';
const groupsDomain = 'groups';

export const getUsers = (payload = null) => dispatch => {
  http.get(`${domain}${payload ? `?${payload.filterName}=${payload.filterValue}` : ''}`)
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

export const addUser = payload => dispatch => {
  http.post(`${domain}`, payload)
    .then(response => {
      dispatch({
        type: types.ADD_USER,
        payload: response.data
      });
      ToastAndroid.show("User added successfully", ToastAndroid.LONG);

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
      ToastAndroid.show("Email already used.", ToastAndroid.LONG);

    });
}

export const updateUser = payload => dispatch => {
  http.put(`${domain}/${payload.userId}`, payload)
    .then(response => {
      dispatch({
        type: types.UPDATE_USER,
        payload: response.data.user
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const deleteUser = userId => dispatch => {
  http.delete(`${domain}/${userId}`)
    .then(response => {
      dispatch({
        type: types.DELETE_USER,
        payload: userId
      });
      ToastAndroid.show("User delated successfully", ToastAndroid.LONG);

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}


export const getGroups = () => dispatch => {
  http.get(`${groupsDomain}`)
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
