import { isValidRequest } from "./../../utils/checkResponse";
import { put, takeLatest, all, call } from "redux-saga/effects";
import axios from "../../utils/axios";
import { userTypes } from "./userActionTypes";
import {
    getCurrentUserFailure,
    getCurrentUserSucceess,
    getUserInfoFailure,
    getUserInfoSuccess,
    updateCurrentUserFailure,
    updateCurrentUserSucceess,
} from "./userSlice";

const fetchCurrentUser = async () => {
    try {
        const response: any = await axios.get("/user");
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* fetchCurrentUserSaga(action: any): any {
    const response = yield call(fetchCurrentUser);
    if (response.status === 200) {
        yield put(getCurrentUserSucceess(response.data.data));
        // action.payload.next();
    } else {
        yield put(getCurrentUserFailure(response.message));
    }
}

const updateCurrentUser = async (data: any) => {
    try {
        const formData = new FormData();
        if (data.photo && data.photo.coverFile) {
            formData.append("cover", data.photo.coverFile);
        }
        if (data.photo && data.photo.profileFile) {
            formData.append("profile", data.photo.profileFile);
        }

        if (data && data?.data) {
            for (let param in data.data) {
                formData.append(param, data.data[param]);
            }
        }
        const response: any = await axios.patch("/user", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* updateCurrentUserSaga(action: any): any {
    const response = yield call(updateCurrentUser, action.payload);
    if (response.status === 200) {
        yield put(updateCurrentUserSucceess());
        action.payload.next();
    } else {
        yield put(updateCurrentUserFailure(response.message));
    }
}

//fetch user by id
const fetchUser = async (userId: string) => {
    try {
        const response: any = await axios.get(`/user/${userId}`);
        return response;
    } catch (error) {
        return isValidRequest(error);
    }
};
function* fetchUserSaga(action: any): any {
    const response = yield call(fetchUser, action.payload);
    if (response.status === 200) {
        yield put(getUserInfoSuccess(response.data.data));
        // action.payload.next();
    } else {
        yield put(getUserInfoFailure(response.message));
    }
}

export function* watchUserSaga() {
    yield takeLatest(userTypes["user/getCurrentUserStart"] as any, fetchCurrentUserSaga);
    yield takeLatest(userTypes["user/updateCurrentUserStart"] as any, updateCurrentUserSaga);
    yield takeLatest(userTypes["user/getUserInfoStart"] as any, fetchUserSaga);
}
