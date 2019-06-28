import types from './types';
import globals from '../../../store/types';
import HttpClient from '../../../services/HttpClient';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';

// const http = new HttpClient();
const domain = 'users';
const groupsdomain = 'groups';

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
  new HttpClient().get(`${groupsdomain}`)
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

export const deleteGroup = groupId => dispatch => {
  new HttpClient().delete(`${groupsdomain}/${groupId}`)
    .then(response => {
      dispatch({
        type: types.DELETE_GROUP,
        payload: groupId
      });

      Alert.alert(
        'Info',
        'Group removed successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });

      Alert.alert(
        'Error',
        'Error deleting a group.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}

export const addGroup = payload => dispatch => {
  new HttpClient().post(`${groupsdomain}`, payload)
    .then(response => {
      dispatch({
        type: types.ADD_GROUP,
        payload: response.data.group
      });

      Alert.alert(
        'Info',
        'Group added successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error,

      });
      Alert.alert(
        'Info',
        'A group with this name already exist.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}

export const editGroup = payload => dispatch => {
  const { groupId, ...body } = payload;

  new HttpClient().post(`${groupsdomain}/${groupId}`, body)
    .then(response => {
      dispatch({
        type: types.ADD_GROUP,
        payload: response.data.group
      });

      Alert.alert(
        'Info',
        'Group updated successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error,

      });
      Alert.alert(
        'Info',
        'Error updating a group.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
}
