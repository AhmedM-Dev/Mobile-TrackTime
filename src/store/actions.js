import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

import types from './types';
import { authenticate } from '../services/services';
import HttpClient from '../services/HttpClient';

// const http = new HttpClient();

export const authenticateWithRedux = payload => dispatch => {
  dispatch({
    type: types.AUTHENTICATE
  });

  authenticate(payload.email, payload.pass)
    .then(response => {
      dispatch({
        type: types.AUTHENTICATE_SUCCESS,
        user: response
      });
    })
    .catch(error => {
      dispatch({
        type: types.AUTHENTICATE_FAILED,
        error: error.response.data.error
      });
    });
}

export const logoutWithRedux = () => ({
  type: types.LOGOUT
});

export const getUserFromAsyncStorageToStore = () => dispatch => {
  AsyncStorage.getItem('user')
    .then(response => {
      console.log("response user:", JSON.parse(response));
      dispatch({
        type: types.GET_USER_FROM_ASYNCSTORAGE_TO_STORE,
        payload: JSON.parse(response)
      });
    })
    .catch(error => {
      dispatch({
        type: types.ADD_ERROR,
        error
      });
    });
}

export const getAvatar = () => dispatch => {
  new HttpClient().get("avatar")
    .then(response => {
      dispatch({
        type: types.GET_AVATAR,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: types.ADD_ERROR,
        error
      });
    });
}

export const getRequests = payload => dispatch => {

  console.log('payload get requests', payload);

  new HttpClient().get(`requests${payload.status ? `?status=${payload.status}` : ''}`)
    .then(response => {
      dispatch({
        type: types.GET_REQUESTS,
        payload: response.data.requests
      });
    })
    .catch(error => {
      dispatch({
        type: types.ADD_ERROR,
        error
      });
    });
}

export const createLeaveRequest = payload => dispatch => {

  dispatch({ type: types.SEND_LEAVE_REQUEST });

  new HttpClient().post("requests", payload)
    .then(response => {
      dispatch({
        type: types.LEAVE_REQUEST_SUCCESS,
        payload: response.data
      });

      Alert.alert(
        'Leave Request',
        'Your request has been successfully created.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );

      dispatch(getRequests({ status: 'pending' }));

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const createTravelRequest = payload => dispatch => {

  dispatch({ type: types.SEND_TRAVEl_REQUEST });

  new HttpClient().post("requests", payload)
    .then(response => {
      dispatch({
        type: types.TRAVEL_REQUEST_SUCCESS,
        payload: response.data
      });

      Alert.alert(
        'Travel Request',
        'Your travel request has been successfully created.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );

      dispatch(getRequests({ status: 'pending' }));

    })
    .catch(error => {
      dispatch({
        type: globals.ADD_ERROR,
        error
      });
    });
}

export const cancelRequest = payload => dispatch => {
  new HttpClient().put(`requests/${payload.requestId}/edit`, payload)
    .then(response => {

      dispatch({
        type: types.CANCEL_REQUEST,
        payload: response.data.request
      })

      Alert.alert(
        'Request Canceled',
        'Your request has been successfully canceled.',
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
    });
}

export const correctAttendanceRequest = payload => dispatch => {
  new HttpClient().post("requests", payload)
    .then(response => {
      dispatch({
        type: types.CREATE_ATTENDANCE_REQUEST,
      });

      Alert.alert(
        'Attendance Request',
        'Your attendance correction request has been successfully created.',
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
    });
}
