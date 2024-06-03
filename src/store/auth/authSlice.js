// Desc: Auth slice for redux store
// Path: src/store/auth/authSlice.js

import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const selectUser = createSelector(
    (state) => state.auth,
    (auth) => auth.user
);

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
