import { put, takeLatest, all, call } from "redux-saga/effects";
import axios from "../../utils/axios";
import { authTypes } from "./authActionTypes";
import {
    signInFaliure,
    signUpFaliure,
    signUpSuccess,
    signUpVerifyFaliure,
    signUpVerifySuccess,
    finishSignUpSuccess,
    finishSignUpFaliure,
    signInCheckSuccess,
    signInCheckFailure,
    signInSuccess,
} from "./authSlice";

interface IUser {
    name: string;
    password: string;
    email: string;
    dob: string;
}
// sign up
const signUp = async (user: IUser) => {
    try {
        const response: any = await axios.post("/signup", user);
        return response;
    } catch (error) {
        return error;
    }
};
const verifySignUp = async (data: any) => {
    const userData = {
        verificationCode: data.code,
        email: data.email,
    };
    try {
        const response: any = await axios.post("/signup-verify", userData);
        return response;
    } catch (error) {
        return error;
    }
};
const finishSignUp = async (data: any) => {
    const userData = {
        password: data.password,
        email: data.email,
    };
    try {
        const response: any = await axios.post("/signup-finish", userData);
        return response;
    } catch (error) {
        return error;
    }
};

function* SignUpSaga(action: any): any {
    const response = yield call(signUp, action.payload);
    if (response.status === 201) {
        yield put(signUpSuccess(response.data.data.user));
        action.payload.next();
    } else {
        yield put(signUpFaliure(response.message));
    }
}
function* SignUpVerifySaga(action: any): any {
    const response = yield call(verifySignUp, action.payload);
    if (response.status === 200) {
        yield put(signUpVerifySuccess("success"));
        action.payload.next();
    } else {
        yield put(signUpVerifyFaliure(response.message));
    }
}
function* finishSignUpSaga(action: any): any {
    const response = yield call(finishSignUp, action.payload);
    if (response.status === 200) {
        yield put(finishSignUpSuccess(response.data.data));
        action.payload.next();
    } else {
        yield put(finishSignUpFaliure(response.message));
    }
}

// login
const loginCheck = async (data: any) => {
    try {
        const response: any = await axios.post("/login-check", JSON.stringify({ data: data.data }));
        return response;
    } catch (error) {
        return error;
    }
};

function* loginCheckSaga(action: any): any {
    const response = yield call(loginCheck, action.payload);
    if (response.status === 200) {
        yield put(signInCheckSuccess(response.data.data));
        action.payload.next(response.data.data);
    } else {
        yield put(signInCheckFailure(response.response.data.message));
    }
}

const login = async (data: any) => {
    try {
        const response: any = await axios.post("/login", JSON.stringify(data));
        return response;
    } catch (error) {
        return error;
    }
};

function* loginSaga(action: any): any {
    const response = yield call(login, action.payload);
    if (response.status === 200) {
        yield put(signInSuccess(response.data.data));
        action.payload.next(response.data.data);
    } else {
        yield put(signInFaliure(response.response.data.message));
    }
}

export function* watchSignUpSaga() {
    yield takeLatest(authTypes["auth/signUpStart"] as any, SignUpSaga);
    yield takeLatest(authTypes["auth/signUpVerifyStart"] as any, SignUpVerifySaga);
    yield takeLatest(authTypes["auth/finishSignUpStart"] as any, finishSignUpSaga);
    yield takeLatest(authTypes["auth/signInCheckStart"] as any, loginCheckSaga);
    yield takeLatest(authTypes["auth/signInStart"] as any, loginSaga);
}
