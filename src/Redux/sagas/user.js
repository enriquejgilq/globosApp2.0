/* eslint-disable */
import { call, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";
import Api from "../Api";
import {
    GET_LOGIN, GET_LOGIN_ERROR, GET_LOGIN_SUCCESS
} from '../constants/user';

function postLogin(action) {
    return axios({
        method: "POST",
        url: `${Api}/auth`,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        data: JSON.stringify(action.payload),
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error.response?.data;
            consoe
        });
}

function* fetchLogin(action) {
    try {
        const login = yield call(postLogin, action.payload);
        if (login.type_user) {
            yield put({ type: GET_LOGIN_SUCCESS, login: login });
        } else {
            yield put({ type: GET_LOGIN_ERROR, message: "Error" });
        }
    } catch (e) {
        
        yield put({
            type: GET_LOGIN_ERROR,
            message: e ? String(e.message) : "Error de conexión",
        });
    }
}
function* rootUserSaga() {
    yield takeEvery(GET_LOGIN, fetchLogin);
}

export default rootUserSaga;