import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return {}
        },
    },
});

const { reducer, actions } = userSlice;

export const { login, logout } = actions;

export default reducer;