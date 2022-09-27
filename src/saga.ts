import { all } from "redux-saga/effects";
import { watchSignUpSaga } from "./features/auth/authSaga";
import { watchFollowSaga } from "./features/follow/followSaga";
import { watchTweetSaga } from "./features/tweet/tweetSaga";
import { watchUserSaga } from "./features/user/userSaga";

export function* rootSaga() {
    yield all([watchSignUpSaga(), watchTweetSaga(), watchUserSaga(), watchFollowSaga()]);
}
