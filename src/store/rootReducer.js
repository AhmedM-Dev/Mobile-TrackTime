import { combineReducers } from "redux";

import dashboardReducer from "../components/screens/Dashboard/reducers";
import settingsReducer from "../components/screens/Setting/reducers";
import attendancesReducer from "../components/screens/AttendanceTime/reducers";
import usersReducer from "../components/screens/employeeManagement/reducers";

import types from './types';

export const errors = (state = [], action) => {
    switch (action.type) {
        case types.ADD_ERROR:
            return [
                ...state,
                { key: state.length, ...action.error }
            ]

        case types.REMOVE_ERROR:
            return state.filter(item => item.key !== action.payload.key);

        default:
            return state;
    }
};

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case types.AUTHENTICATE:
            return {
                ...state,
                logging: true
            }

        case types.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                logging: false,
                authenticated: true,
                user: action.user
            }

        case types.AUTHENTICATE_FAILED:
            return {
                ...state,
                logging: false,
                error: action.error,
            }

        case types.GET_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }

        case types.GET_USER_FROM_ASYNCSTORAGE_TO_STORE:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}

export const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true
            }

        case types.LOADING_SUCCESS:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default combineReducers({
    errors,
    authReducer,
    loadingReducer,
    settingsReducer,
    dashboardReducer,
    attendancesReducer,
    usersReducer
});
