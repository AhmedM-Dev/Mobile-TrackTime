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

    default:
      return state;
  }
}

export default notificationsReducer;