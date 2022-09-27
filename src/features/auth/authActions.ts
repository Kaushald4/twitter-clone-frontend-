import { authTypes } from "./authActionTypes";

export const signUpAction = (payload: any) => ({
    type: authTypes["auth/signUpStart"],
    payload,
});

export const signUpVerifyAction = (payload: any) => ({
    type: authTypes["auth/signUpVerifyStart"],
    payload,
});

export const finishSignUpAction = (payload: any) => ({
    type: authTypes["auth/finishSignUpStart"],
    payload,
});

export const signInCheckAction = (payload: any) => ({
    type: authTypes["auth/signInCheckStart"],
    payload,
});

export const signInAction = (payload: any) => ({
    type: authTypes["auth/signInStart"],
    payload,
});
