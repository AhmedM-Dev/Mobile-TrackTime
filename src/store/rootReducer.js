import { combineReducers } from "redux";

import dashboardReducer from "../components/screens/Dashboard/reducers";


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
                user: action.user
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

export default combineReducers({
    errors,
    authReducer,
    dashboardReducer
});
