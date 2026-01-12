import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // ---------------- AUTH ----------------
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        signOutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ---------------- UPDATE USER ----------------
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ---------------- DELETE USER ----------------
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ---------------- UTIL ----------------
        clearUserError: (state) => {
            state.error = null;
        },
        clearLoading: (state) => {
            state.loading = false;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    clearUserError,
    clearLoading,
} = userSlice.actions;

export default userSlice.reducer;
