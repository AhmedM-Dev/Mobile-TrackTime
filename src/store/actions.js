import types from './types';
import AsyncStorage from '@react-native-community/async-storage';

import { authenticate } from '../services/services';
import HttpClient from '../services/HttpClient';

const http = new HttpClient();

export const authenticateWithRedux = payload => dispatch => {
    dispatch({
        type: types.AUTHENTICATE
    });

    authenticate(payload.email, payload.pass)
    .then(response => {
        dispatch({
            type: types.AUTHENTICATE_SUCCESS,
            user: response
        });
    })
    .catch(error => {
        dispatch({
            type: types.AUTHENTICATE_FAILED,
            error: error.response.data.error
        });
    });
}

export const getUserFromAsyncStorageToStore = () => dispatch => {
    AsyncStorage.getItem('user')
    .then(response => {
        console.log("response user:", JSON.parse(response));
        dispatch({
            type: types.GET_USER_FROM_ASYNCSTORAGE_TO_STORE,
            payload: JSON.parse(response)
        });
    })
    .catch(error => {
        dispatch({
            type: types.ADD_ERROR,
            error
        });
    });
}

export const getAvatar = () => dispatch => {
    http.get("avatar")
    .then(response => {
        dispatch({
            type: types.GET_AVATAR,
            payload: response.data
        });
    })
    .catch(error => {
        dispatch({
            type: types.ADD_ERROR,
            error
        });
    });
}