import { createSlice, current } from "@reduxjs/toolkit";

const initialState: any = {
    errors: undefined,
    isLoading: false,
    tweets: [],
    uploadProgress: 0,
    isLikesLoading: false,
    currentUserTweets: [],
};

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        postTweetStart(state, action) {
            state.isLoading = true;
        },
        postTweetSuccess(state, action) {
            const newTweets = [...state.tweets, action.payload];
            state.isLoading = false;
            state.tweets = newTweets.reverse();
        },
        postTweetFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        // fetching all tweets
        fetchAllTweetStart(state, action) {
            state.isLoading = true;
        },
        fetchAllTweetSuccess(state, action) {
            state.isLoading = false;
            state.tweets = action.payload;
        },
        fetchAllTweetFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },

        tweetUploadProgress(state, action) {
            state.uploadProgress = action.payload;
        },

        // updating likes
        updateTweetLikesStart(state, action) {
            state.isLikesLoading = true;
        },
        updateTweetLikesSuccess(state, action) {
            state.tweets.map((tweet: any) => {
                if (tweet._id === action.payload._id) {
                    tweet.likes = action.payload.likes;
                }
            });

            state.currentUserTweets.map((tweet: any) => {
                if (tweet._id === action.payload._id) {
                    tweet.likes = action.payload.likes;
                }
            });
        },
        updateTweetLikesFailure(state, action) {},

        //get all current authenticated tweets
        getCurrentUserTweetsStart(state, action) {
            state.isLoading = true;
        },
        getCurrentUserTweetsSuccess(state, action) {
            state.isLoading = false;
            state.currentUserTweets = action.payload;
        },
        getCurrentUserTweetsFailure(state, action) {
            state.isLoading = false;
            state.currentUserTweets = action.payload;
        },

        //get user tweets
        getUserTweetsStart(state, action) {
            state.isLoading = true;
        },
        getUserTweetsSuccess(state, action) {
            state.isLoading = false;
            state.currentUserTweets = action.payload;
        },
        getUserTweetsFailure(state, action) {
            state.isLoading = false;
            state.errors = action.payload;
        },
    },
});

export const {
    postTweetFailure,
    postTweetSuccess,
    fetchAllTweetFailure,
    fetchAllTweetSuccess,
    tweetUploadProgress,
    updateTweetLikesFailure,
    updateTweetLikesSuccess,
    getCurrentUserTweetsFailure,
    getCurrentUserTweetsSuccess,
    getUserTweetsSuccess,
    getUserTweetsFailure,
} = tweetSlice.actions;
export default tweetSlice.reducer;
