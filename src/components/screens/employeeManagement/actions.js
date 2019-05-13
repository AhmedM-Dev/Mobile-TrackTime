import types from './types';
import globals from '../../../store/types';

import HttpClient from '../../../services/HttpClient';

const http = new HttpClient();
const domain = 'users';

export const getUsers = () => dispatch => {
  http.get(`${domain}`)
    .then(response => {
      dispatch({
        type: types.ADD_USER,
        payload: response.data
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
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const updateUser = payload => dispatch => {
  http.post(`${domain}`, payload)
    .then(response => {
      dispatch({
        type: types.ADD_USER,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const deleteUser = payload => dispatch => {
  http.delete(`${domain}/${payload.userId}`)
    .then(response => {
      dispatch({
        type: types.ADD_USER,
        payload: response
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
  http.get(`groups`)
    .then(response => {
      dispatch({
        type: types.ADD_USER,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}