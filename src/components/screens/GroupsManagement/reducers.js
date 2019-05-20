import types from './types';

const groupsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GROUP:
      return {
        ...state,
        groups: action.payload
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

export default groupsReducer;