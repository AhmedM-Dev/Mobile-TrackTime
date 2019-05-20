import types from './types';

const groupReducers = (state = {}, action) => {
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
      case types.GET_GROUPS:
      return {
        ...state,
        groups: action.groups
      };

      case types.DELETE_GROUP:
      return {
        ...state,
        users: state.groups.filter(group => group.groupId !== action.payload)
      };

    default:
      return state;
  }
}

export default groupReducers;