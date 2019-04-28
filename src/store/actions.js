import types from './types';
import AsyncStorage from '@react-native-community/async-storage';

import { authenticate } from '../services/services';
import HttpClient from '../services/HttpClient';

const http = new HttpClient();

export const authenticateWithRedux = payload => dispatch => {
    http.post('http://192.168.1.16:5000/tracktime/api/auth', {
        email: 'ahmed.tux@protonmail.com',
        pass: 'ahmed1989'
    })
    .then(async response => {
        dispatch({
            type: types.AUTHENTICATE,
            user: response.data.user
        });

        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    })
    .catch(error => {
        dispatch({
            type: types.ADD_ERROR,
            error
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