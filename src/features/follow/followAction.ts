import { followTypes } from "./followTypes";

export const addFollowAction = (payload: any) => ({
    type: followTypes["follow/addFollowStart"],
    payload,
});

export const removeFollowAction = (payload: any) => ({
    type: followTypes["follow/removeFollowStart"],
    payload,
});

export const getFollowAction = (payload: any) => ({
    type: followTypes["follow/getFollowStart"],
    payload,
});

export const getAllFollowAction = () => ({
    type: followTypes["follow/getAllFollowStart"],
});
