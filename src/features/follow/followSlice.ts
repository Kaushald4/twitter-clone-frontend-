import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    errors: undefined,
    isLoading: false,
    follow: undefined,
    allFollow: undefined,
};

const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        addFollowStart(state, action) {
            state.isLoading = true;
        },
        addFollowSuccess(state) {
            state.isLoading = false;
        },
        addFollowFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        removeFollowStart(state, action) {
            state.isLoading = true;
        },
        removeFollowSuccess(state) {
            state.isLoading = false;
        },
        removeFollowFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        getFollowStart(state, action) {
            state.isLoading = true;
        },
        getFollowSuccess(state, action) {
            state.isLoading = false;
            state.follow = action.payload;
        },
        getFollowFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        getAllFollowStart(state, action) {
            state.isLoading = true;
        },
        getAllFollowSuccess(state, action) {
            state.isLoading = false;
            state.allFollow = action.payload;
        },
        getAllFollowFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },
    },
});

export const {
    addFollowFailure,
    addFollowSuccess,
    getFollowFailure,
    getFollowSuccess,
    removeFollowFailure,
    removeFollowSuccess,
    getAllFollowSuccess,
    getAllFollowFailure,
} = followSlice.actions;
export default followSlice.reducer;
