import types from './types';

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };

    case types.VUE_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter(notif => notif.notifId !== action.payload.notifId),
          action.payload
        ]
      };

    case types.ACCEPT_REQUEST:
      return state;

    case types.REJECT_REQUEST:
      return state;

    default:
      return state;
  }
}

export default notificationsReducer;
