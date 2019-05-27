import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

const domain = 'notifications';

export const getNotifications = () => dispatch => {
    http.get(`${domain}`)
    .then(response => {
        dispatch({
            type: types.GET_NOTIFICATIONS,
            payload: response.data.notifications
        });
    })
    .catch(error => {
        dispatch({
            type: globals.ADD_ERROR,
            error: error
        });
    });
}

export const vueNotification = payload => dispatch => {
    http.put(`${domain}/${payload.notifId}`)
    .then(response => {
        dispatch({
            type: types.VUE_NOTIFICATION,
            payload: response.data.notification
        });
    })
    .catch(error => {
        dispatch({
            type: globals.ADD_ERROR,
            error: error
        });
    });
}