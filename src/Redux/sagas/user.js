/* eslint-disable */
import { call, put, takeEvery, select } from "redux-saga/effects";
import axios from "axios";
import Api from "../Api";
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from '../constants/user';

function postLogin(action) {
    return axios({
        method: "POST",
        url: `${Api}/auth/login`,
        headers: {
            'Content-type': "application/json",
             Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
    data: JSON.stringify(action),
  })
    .then((response) => response.data)
    .catch(error => {
      throw error.response?.data
    });
};


function* fetchLogin(action) {
    try {
        const login = yield call(postLogin, action.payload);
        console.log(login)
        yield put({ type: LOGIN_USER_SUCCESS, user: login});
      } catch (e) {
        console.log(e.msg)

        yield put({ type: LOGIN_USER_ERROR, message: e.msg});
      }
    }
    
function* rootUserSaga() {
    yield takeEvery(LOGIN_USER, fetchLogin);
}

export default rootUserSaga;