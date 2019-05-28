import types from './types';

export const attendancesReducer = (state = [], action) => {
    switch (action.type) {
        case types.GET_ATTENDANCES:
            return {
                ...state,
                attendancesList: action.payload
            };

        default:
            return state;
    }
}

export default attendancesReducer;