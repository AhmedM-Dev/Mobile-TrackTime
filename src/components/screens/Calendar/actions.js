import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';


const domain = 'users';
const groupsDomain = 'groups';

export const getUsers = () => dispatch => {
  new HttpClient().get(`${domain}`)
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

export const getGroups = () => dispatch => {
  new HttpClient().get(`${groupsDomain}`)
    .then(response => {
      dispatch({
        type: types.GET_GROUPS,
        groups: response.data.groups
      });
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const getCalendarData = params => dispatch => {
  console.log('Params', params);

  return new Promise((resolve, reject) => {
    new HttpClient().get(`calendar${params.dateFilter ? `?dateFilter=${params.dateFilter}` : ''}${params.groupId ? (params.dateFilter ? `&groupId=${params.groupId}` : `?groupId=${params.groupId}`) : '' } `)
    .then(response => {

      dispatch({
        type: types.GET_CALENDAR_DATA,
        data: response.data.calendar
      });

      resolve(response.data.calendar);
    })
    .catch(error => {
      reject(error);
    });
  });
}
