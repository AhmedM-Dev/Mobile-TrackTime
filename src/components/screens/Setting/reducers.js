import AsyncStorage from '@react-native-community/async-storage';

import types from "./types";

import { lightTheme, darkTheme } from "../../../theme/theme";

const defaultSettings = {
  theme: lightTheme
}

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
    case types.CHANGE_THEME:
      return {
        ...state,
        theme: action.payload === 'light' ? lightTheme : darkTheme
      }

    default:
      return state;
  }
}

export default settingsReducer;
