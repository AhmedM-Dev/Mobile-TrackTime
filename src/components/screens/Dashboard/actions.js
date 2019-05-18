import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

export const getStats = payload => dispatch => {

    http.get(`stats?year=${payload.year}`)
        .then(response => {

            console.log("RESPONSE FROM GET_STATS ACTION:", response.data);

            dispatch({
                type: types.GET_STATS,
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
            type: types.AUTHENTICATE_FAILED,
            error: error.response.data.error
        });
    });
}