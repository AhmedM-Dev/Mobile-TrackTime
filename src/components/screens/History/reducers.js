import types from './types';

export const historyReducer = (state = [], action) => {
    switch (action.type) {
        case types.GET_HISTORY:
            return {
                ...state,
                requestsList: action.payload
            };

        default:
            return state;
    }
}

export default historyReducer;