import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

const domain = 'attendances';

export const getAttendances = payload => dispatch => {
    http.get(`${domain}?userId=${payload.userId}&year=${payload.year}`)
    .then(response => {
        dispatch({
            type: types.GET_ATTENDANCES,
            payload: response.data.attendances
        });
    })
    .catch(error => {
        dispatch({
            type: globals.ADD_ERROR,
            error
        });
    });
}