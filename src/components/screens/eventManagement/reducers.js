import types from './types';

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_EVENT:
      return {
        ...state,
        event: action.payload
      };

    case types.GET_EVENTS:
      return {
        ...state,
        events: action.events
      };

    case types.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.eventId !== action.payload)
      };

    default:
      return state;
  }
}

export default eventsReducer;