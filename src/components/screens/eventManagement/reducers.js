import types from './types';

const eventsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ADD_EVENT:
            return {
                ...state,
                event: action.payload
            };

        default:
            return state;
    }
}

export default eventsReducer;