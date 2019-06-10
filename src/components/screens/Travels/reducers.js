import types from './types';

const travelsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TRAVELS:
      return {
        ...state,
        travels: action.travels
      };

    default:
      return state;
  }
}

export default travelsReducer;
