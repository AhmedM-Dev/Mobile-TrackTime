import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

// const http = new HttpClient();
const domain = 'users';

export const getAvailableYears = () => dispatch => {

  new HttpClient().get(`years`)
    .then(response => {
      dispatch({
        type: types.GET_AVAILABLE_YEARS,
        payload: response.data.years.availableYears
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

  new HttpClient().get(`stats?year=${payload.year}`)
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

export const getAllStats = (payload = { year: new Date().getFullYear() }) => dispatch => {

  new HttpClient().get(`stats?year=${payload.year}&all=true`)
    .then(response => {

      console.log("RESPONSE FROM GET_STATS ACTION:", response.data);

      dispatch({
        type: types.GET_ALL_STATS,
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


export const getUsers = (filter = null) => dispatch => {
  new HttpClient().get(`${domain}${filter && filter.all ? `?all=${filter.all}` : ''}`)
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
