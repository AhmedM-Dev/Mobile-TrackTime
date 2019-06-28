import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';

import HttpClient from '../../../services/HttpClient';
import globals from '../../../store/types';
import types from './types';

import { getAvatar } from '../../../store/actions';

// const http = new HttpClient();

export const changeTheme = theme => ({
  type: types.CHANGE_THEME,
  payload: theme
});

export const changeUserProfile = payload => dispatch => {
  new HttpClient().put(`profile/${payload.userId}`, payload)
    .then(response => {
      dispatch({
        type: types.UPDATE_PROFILE,
        user: response.data
      });

      Alert.alert(
        'Updated',
        'Profile updated successfully.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    })
    .catch(error => {
      console.log('ERRRRRRR', JSON.stringify());

      dispatch({
        type: globals.ADD_ERROR,
        error
      });

      Alert.alert(
        'Error',
        error.response && error.response.data && error.response.data.error,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    })
}

export const uploadPhoto = payload => dispatch => {
  new HttpClient().post(`avatar`, payload)
    .then(response => {
      dispatch({
        type: types.UPLOAD_AVATAR,
        avatar: response.data
      })

      dispatch(getAvatar());
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    })
}
