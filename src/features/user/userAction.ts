import { userTypes } from "./userActionTypes";

export const getCurrentUserAction = () => ({
    type: userTypes["user/getCurrentUserStart"],
});

export const updateCurrentUserAction = (payload: any) => ({
    type: userTypes["user/updateCurrentUserStart"],
    payload,
});

export const getUserInfoAction = (payload: string) => ({
    type: userTypes["user/getUserInfoStart"],
    payload,
});
