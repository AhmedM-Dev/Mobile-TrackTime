import types from './types';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return {
        ...state,
        users: [
          ...state.users,
          action.payload
        ]
      };

    case types.UPDATE_USER:
      return {
        ...state,
        users: [
          ...state.users.filter(user => user.userId !== action.payload.userId),
          action.payload
        ]
      };

    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.userId !== action.payload)
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

    case types.UPDATE_PROFILE:
      return {
        ...state,
        users: state.users && state.users.length > 0 ? [
          ...state.users.filter(user => user.userId !== action.user.userId),
          action.user
        ] : [action.user]
      };

    default:
      return state;
  }
}

export default usersReducer;
