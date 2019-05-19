import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

export const getNotifications = () => dispatch => {
    http.get(domain)
    .then(response => {
        dispatch({
            type: types.GET_NOTIFICATIONS,
            payload: response.data
        });
    })
    .catch(error => {
        dispatch({
            type: globals.ADD_ERROR,
            error: error
        });
    });
}