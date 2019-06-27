import { ToastAndroid } from 'react-native';

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
      })
    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
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
