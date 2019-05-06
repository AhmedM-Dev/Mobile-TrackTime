import { combineReducers } from "redux";

import types from './types';

export const statsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.GET_STATS:
            return {
                ...state,
                stats: action.payload
            };

        default:
            return state;
    }
}

export default combineReducers({
    statsReducer
});