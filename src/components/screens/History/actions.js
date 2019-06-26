import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

// const http = new HttpClient();

const domain = 'requests';


export const getRequests = (filters = {}) => dispatch => {


  
  new HttpClient().get(`${domain}`)
    .then(response => {
      console.log("HISTORY FROM ACTION:", response.data);

      dispatch({
        type: types.GET_HISTORY,
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
