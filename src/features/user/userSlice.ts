import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    errors: undefined,
    isLoading: false,
    currentUser: undefined,
    user: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getCurrentUserStart(state, action) {
            state.isLoading = true;
        },
        getCurrentUserSucceess(state, action) {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        getCurrentUserFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        updateCurrentUserStart(state, action) {
            state.isLoading = true;
        },
        updateCurrentUserSucceess(state) {
            state.isLoading = false;
        },
        updateCurrentUserFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        //get user by id
        getUserInfoStart(state, action) {
            state.isLoading = true;
        },
        getUserInfoSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },
        getUserInfoFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },
    },
});

export const {
    getCurrentUserFailure,
    getCurrentUserStart,
    getCurrentUserSucceess,
    updateCurrentUserFailure,
    updateCurrentUserStart,
    updateCurrentUserSucceess,
    getUserInfoFailure,
    getUserInfoStart,
    getUserInfoSuccess,
} = userSlice.actions;
export default userSlice.reducer;
