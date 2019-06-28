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
        sendingRequest: true,
        success: false,
      };

    case types.ADD_HOLIDAY_SUCCESS:
      return {
        ...state,
        sendingRequest: false,
        success: true,
        holidays: [...state.holidays, action.holiday]
      };

    case types.ADD_HOLIDAY_FAILED:
      return {
        ...state,
        sendingRequest: false,
        success: false,
      };

    case types.EDIT_HOLIDAY:
      return {
        ...state,
        sendingRequest: true,
        success: false,
      };

    case types.EDIT_HOLIDAY_SUCCESS:
      return {
        ...state,
        sendingRequest: false,
        success: true,
        holidays: [...state.holidays.filter(item => item.holidayId !== action.holiday.holidayId), action.holiday]
      };

    case types.EDIT_HOLIDAY_FAILED:
      return {
        ...state,
        sendingRequest: false,
        success: false,
      };

    case types.REMOVE_HOLIDAY:
      return {
        ...state,
        sendingRequest: true,
        success: false,
      };

    case types.REMOVE_HOLIDAY_SUCCESS:
      return {
        ...state,
        sendingRequest: false,
        success: true,
        holidays: state.holidays.filter(item => item.holidayId !== action.holiday.holidayId)
      };

    case types.REMOVE_HOLIDAY_FAILED:
      return {
        ...state,
        sendingRequest: false,
        success: false,
      };

    default:
      return state;
  }
}

export default holidaysReducer;
