import types from "./types";

export const changeTheme = theme => ({
    type: types.CHANGE_THEME,
    payload: theme
})