import types from './types';

export const eventReducer = (state = [], action) => {
    switch (action.type) {
        case types.GET_EVENTS:
            return {
                ...state,
                eventsList: action.payload
            };

        default:
            return state;
    }
}

export default eventReducer;