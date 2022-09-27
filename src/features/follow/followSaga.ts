import { put, takeLatest, all, call } from "redux-saga/effects";
import { isValidRequest } from "./../../utils/checkResponse";
import axios from "../../utils/axios";
import { followTypes } from "./followTypes";
import {
    addFollowFailure,
    addFollowSuccess,
    getAllFollowFailure,
    getAllFollowSuccess,
    getFollowFailure,
    getFollowSuccess,
    removeFollowFailure,
    removeFollowSuccess,
} from "./followSlice";

const addFollow = async (userId: string) => {
    try {
        const response: any = await axios.post(`/follow/${userId}`);
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* addFollowSaga(action: any): any {
    const response = yield call(addFollow, action.payload.userId);
    if (response.status === 200) {
        yield put(addFollowSuccess());
        action.payload.next();
    } else {
        yield put(addFollowFailure(response.message));
    }
}

const removeFollow = async (userId: string) => {
    try {
        const response: any = await axios.delete(`/follow/${userId}`);
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* removeFollowSaga(action: any): any {
    const response = yield call(removeFollow, action.payload.userId);
    if (response.status === 200) {
        yield put(removeFollowSuccess());
        action.payload.next();
    } else {
        yield put(removeFollowFailure(response.message));
    }
}

const getFollowFollowing = async (userId: string) => {
    try {
        const response: any = await axios.get(`/follow/${userId}`);
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* getFollowFollowingSaga(action: any): any {
    const response = yield call(getFollowFollowing, action.payload);
    if (response.status === 200) {
        yield put(getFollowSuccess(response.data.data));
        // action.payload.next();
    } else {
        yield put(getFollowFailure(response.message));
    }
}

//all follower follwoing
const getAllFollowFollowing = async () => {
    try {
        const response: any = await axios.get(`/follow`);
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* getAllFollowFollowingSaga(action: any): any {
    const response = yield call(getAllFollowFollowing);
    if (response.status === 200) {
        yield put(getAllFollowSuccess(response.data.data));
        // action.payload.next();
    } else {
        yield put(getAllFollowFailure(response.message));
    }
}

export function* watchFollowSaga() {
    yield takeLatest(followTypes["follow/addFollowStart"] as any, addFollowSaga);
    yield takeLatest(followTypes["follow/removeFollowStart"] as any, removeFollowSaga);
    yield takeLatest(followTypes["follow/getFollowStart"] as any, getFollowFollowingSaga);
    yield takeLatest(followTypes["follow/getAllFollowStart"] as any, getAllFollowFollowingSaga);
}
