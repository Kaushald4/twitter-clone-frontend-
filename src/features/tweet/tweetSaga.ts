import { isValidRequest } from "./../../utils/checkResponse";
import { put, takeLatest, all, call } from "redux-saga/effects";
import axios from "../../utils/axios";
import { tweetTypes } from "./tweetActionTypes";
import {
    postTweetFailure,
    postTweetSuccess,
    fetchAllTweetSuccess,
    fetchAllTweetFailure,
    updateTweetLikesSuccess,
    updateTweetLikesFailure,
    getCurrentUserTweetsSuccess,
    getCurrentUserTweetsFailure,
    getUserTweetsSuccess,
    getUserTweetsFailure,
} from "./tweetSlice";
import { socket } from "../../utils/socket";
import store from "../../store";

const postTweet = async (data: any) => {
    try {
        const { file, title } = data.data;
        const formData = new FormData();
        formData.append("post", file);
        formData.append("title", title);

        const response: any = await axios.post("/tweet/post", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress(progressEvent) {
                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                data.onUploadProgress(progress);
            },
        });
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* postTweetSaga(action: any): any {
    const response = yield call(postTweet, action.payload);
    if (response.status === 201) {
        yield put(postTweetSuccess(response.data.data));
        action.payload.next();
    } else {
        yield put(postTweetFailure(response.message));
    }
}

// fetching all tweets
const fetchAllTweet = async () => {
    try {
        const response: any = await axios.get("/tweets");
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* fetchAllTweetSaga(action: any): any {
    const response = yield call(fetchAllTweet);
    if (response.status === 200) {
        yield put(fetchAllTweetSuccess(response.data.data));
        // action.payload.next();
    } else {
        yield put(fetchAllTweetFailure(response.message));
    }
}

// updatig likes
const updateTweetLikes = async (tweetId: string) => {
    try {
        const response: any = await axios.put(`/tweets/likes/inc/${tweetId}`);
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* updateTweetLikesSaga(action: any): any {
    const response = yield call(updateTweetLikes, action.payload);
    if (response.status === 200) {
        yield put(updateTweetLikesSuccess(response.data.data));
        // action.payload.next();
    } else {
        yield put(updateTweetLikesFailure(response.message));
    }
}

// fetching all tweets of current authenticated user
const fetchCurrentUserTweets = async () => {
    try {
        const response: any = await axios.get("/tweets/user");
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* fetchCurrentUserTweetsSaga(action: any): any {
    const response = yield call(fetchCurrentUserTweets);
    if (response.status === 200) {
        yield put(getCurrentUserTweetsSuccess(response.data.data));
        // action.payload.next();
    } else {
        yield put(getCurrentUserTweetsFailure(response.message));
    }
}

// fetch user tweets
const fetchUserTweets = async (userId: string) => {
    try {
        const response: any = await axios.get(`/tweets/user/${userId}`);
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* fetchUserTweetsSaga(action: any): any {
    const response = yield call(fetchUserTweets, action.payload);
    if (response.status === 200) {
        yield put(getUserTweetsSuccess(response.data.data));
    } else {
        yield put(getUserTweetsFailure(response.message));
    }
}

export function* watchTweetSaga() {
    yield takeLatest(tweetTypes["tweet/postTweetStart"] as any, postTweetSaga);
    yield takeLatest(tweetTypes["tweet/fetchAllTweetStart"] as any, fetchAllTweetSaga);
    yield takeLatest(tweetTypes["tweet/updateTweetLikesStart"] as any, updateTweetLikesSaga);
    yield takeLatest(
        tweetTypes["tweet/getCurrentUserTweetsStart"] as any,
        fetchCurrentUserTweetsSaga
    );
    yield takeLatest(tweetTypes["tweet/getUserTweetsStart"] as any, fetchUserTweetsSaga);
}
