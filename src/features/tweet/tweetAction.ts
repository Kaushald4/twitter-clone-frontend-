import { tweetTypes } from "./tweetActionTypes";

export const postTweetAction = (payload: any) => ({
    type: tweetTypes["tweet/postTweetStart"],
    payload,
});

export const fetchAllTweetAction = () => ({
    type: tweetTypes["tweet/fetchAllTweetStart"],
});

export const updateTweetLikesAction = (payload: any) => ({
    type: tweetTypes["tweet/updateTweetLikesStart"],
    payload,
});
export const getCurrentUserTweetsAction = () => ({
    type: tweetTypes["tweet/getCurrentUserTweetsStart"],
});

export const getUserTweetsAction = (payload: string) => ({
    type: tweetTypes["tweet/getUserTweetsStart"],
    payload,
});
