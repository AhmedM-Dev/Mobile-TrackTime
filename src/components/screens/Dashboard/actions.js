import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

const domain = 'attendances';

export const getAttendances = payload => dispatch => {

    http.get(`${domain}?userId=${payload.userId}&year=${payload.year}`)
        .then(response => {

            console.log("RESPONSE FROM ACTION:", response.data);

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