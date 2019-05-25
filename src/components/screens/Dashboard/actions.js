import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();
const domain = 'users';
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


export const getUsers = () => dispatch => {
    http.get(`${domain}`)
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
