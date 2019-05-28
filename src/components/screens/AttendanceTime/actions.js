import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

const domain = 'attendances';

export const getAttendances = () => dispatch => {

  http.get(`${domain}`)
    .then(response => {
      console.log("ATTENDANCES FROM ACTION:", response.data);

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