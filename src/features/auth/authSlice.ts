import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    email: string;
    name: string;
    dob: string;
}
interface IAuth {
    user: IUser | undefined;
    isLoading: boolean;
    errors: any;
}

const initialState: IAuth = {
    errors: undefined,
    isLoading: false,
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // login process
        signInCheckStart(state, action) {
            state.isLoading = true;
        },
        signInCheckSuccess(state, action) {
            state.user = action.payload;
            state.isLoading = false;
        },
        signInCheckFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        clearAuthErrors(state) {
            state.isLoading = false;
            state.errors = undefined;
        },

        signInStart(state, action) {
            state.isLoading = true;
        },
        signInSuccess(state, action) {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload.user;
            state.isLoading = false;
        },
        signInFaliure(state, action) {
            state.errors = action.payload;
            state.isLoading = false;
        },

        // sign up process
        signUpStart(state, action) {
            state.isLoading = true;
        },
        signUpSuccess(state, action) {
            state.user = action.payload;
            state.isLoading = false;
        },
        signUpFaliure(state, action) {
            state.errors = action.payload;
            state.isLoading = false;
        },

        signUpVerifyStart(state, action) {
            state.isLoading = true;
        },
        signUpVerifySuccess(state, action) {
            state.isLoading = false;
        },
        signUpVerifyFaliure(state, action) {
            state.errors = action.payload;
            state.isLoading = false;
        },

        finishSignUpStart(state, action) {
            state.isLoading = true;
        },
        finishSignUpSuccess(state, action) {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload.user;
            state.isLoading = false;
        },
        finishSignUpFaliure(state, action) {
            state.errors = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    signInCheckFailure,
    signInCheckStart,
    signInCheckSuccess,
    signInFaliure,
    signInStart,
    signInSuccess,
    signUpFaliure,
    signUpStart,
    signUpSuccess,
    signUpVerifyFaliure,
    signUpVerifyStart,
    signUpVerifySuccess,
    finishSignUpFaliure,
    finishSignUpStart,
    finishSignUpSuccess,
    clearAuthErrors,
} = authSlice.actions;
export default authSlice.reducer;
