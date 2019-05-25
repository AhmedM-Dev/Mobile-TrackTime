import types from './types';

const calendarReducer = (state = {}, action) => {
    switch (action.type) {
            case types.GET_USERS:
            return {
              ...state,
              users: action.users
            };
            case types.GET_GROUPS:
            return {
              ...state,
              groups: action.groups
            };

        default:
            return state;
    }
}

export default calendarReducer;