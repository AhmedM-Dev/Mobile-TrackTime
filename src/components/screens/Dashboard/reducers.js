import { combineReducers } from "redux";

import types from './types';

export const statsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.GET_STATS:
            return {
                ...state,
                stats: action.payload
            };
            case types.GET_USERS:
            return {
              ...state,
              users: action.users
            };

        default:
            return state;
    }
}

export default combineReducers({
    statsReducer
});