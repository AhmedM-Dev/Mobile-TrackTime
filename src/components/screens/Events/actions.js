import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

const http = new HttpClient();

const domain = 'events';


export const getEvents = (filters = {}) => dispatch => {

  const { dateFrom, dateTo } = filters;

  console.log("DATE REQUEST", `${domain}${dateFrom ? `?dateFrom=${formatDate(dateFrom)}` : ''}${dateTo ? `&dateTo=${formatDate(dateTo)}` : ''}`);
  
  http.get(`${domain}`)
    .then(response => {
      console.log("EVENTS FROM ACTION:", response.data);

      dispatch({
        type: types.GET_EVENTS,
        payload: response.data.events
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}