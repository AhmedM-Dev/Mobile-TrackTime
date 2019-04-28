import { combineReducers } from "redux";

import types from './types';

export const attendancesReducer = (state = [], action) => {
    switch (action.type) {
        case types.GET_ATTENDANCES:
            return {
                ...state,
                attendances: action.payload
            };

        default:
            return state;
    }
}

export default combineReducers({
    attendancesReducer
});