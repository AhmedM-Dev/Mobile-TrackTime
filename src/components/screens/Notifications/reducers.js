import types from './types';

const notificationsReducer = (state = [], action) => {
    switch (action.type) {
        case types.GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            };

        default:
            return state;
    }
}

export default notificationsReducer;