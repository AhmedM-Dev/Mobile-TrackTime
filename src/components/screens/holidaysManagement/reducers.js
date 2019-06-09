import types from './types';

const holidaysReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_HOLIDAYS:
      return {
        ...state,
        holidays: action.holidays
      };

    case types.ADD_HOLIDAY:
      return {
        ...state,
        holidays: [...state.holidays, action.holiday]
      };

    case types.EDIT_HOLIDAY:
      return {
        ...state,
        holidays: [...state.holidays.filter(item => item.holidayId !== action.holiday.holidayId), action.holiday]
      };

    case types.DELETE_GROUP:
      return {
        ...state,
        holidays: state.holidays.filter(item => item.holidayId !== action.holiday.holidayId)
      };

    default:
      return state;
  }
}

export default holidaysReducer;
