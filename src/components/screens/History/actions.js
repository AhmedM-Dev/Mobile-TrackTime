import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

// const http = new HttpClient();

const domain = 'history';


export const getRequests = (filters = {}) => dispatch => {

  let list = [];

  const { year, status, category } = filters;

  if (filters.year) {
    list.push(filters.year);
  }

  if (filters.status) {
    list.push(filters.status);
  }

  if (filters.category) {
    list.push(filters.category);
  }

  new HttpClient().get(`${domain}${year ? `?year=${year}` : ''}${list.length > 1 ? (status ? `&status=${status}` : '') : (status ? `?status=${status}` : '')}${list.length > 1 ? (category ? `&category=${category}` : '') : (category ? `?category=${category}` : '')}`)
    .then(response => {
      console.log("HISTORY FROM ACTION:", response.data);

      dispatch({
        type: types.GET_HISTORY,
        payload: response.data.history
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}
