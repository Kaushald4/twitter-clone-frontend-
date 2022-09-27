import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authSlice from "./features/auth/authSlice";
import followSlice from "./features/follow/followSlice";
import tweetSlice from "./features/tweet/tweetSlice";
import userSlice from "./features/user/userSlice";
import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authSlice,
        tweet: tweetSlice,
        user: userSlice,
        follow: followSlice,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [
                    "auth/finishSignUpStart",
                    "auth/signUpStart",
                    "auth/signUpVerifyStart",
                    "tweet/postTweetStart",
                    "user/updateCurrentUserStart",
                    "auth/signInCheckStart",
                    "follow/addFollowStart",
                    "follow/removeFollowStart",
                ],
            },
        }).concat(sagaMiddleware);
    },
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
