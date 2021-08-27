/* eslint-disable */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import Api from '../Api';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  POST_USER,
  POST_USER_SUCCESS,
  POST_USER_ERROR
} from '../constants/user';

function postLogin(action) {
  return axios({
    method: 'POST',
    url: `${Api}/auth/login`,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    data: JSON.stringify(action)
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data;
    });
}

function* fetchLogin(action) {
  try {
    const login = yield call(postLogin, action.payload);
    yield put({ type: LOGIN_USER_SUCCESS, user: login });
  } catch (e) {
    yield put({ type: LOGIN_USER_ERROR, message: e.msg });
  }
}

function postRegisterUser(action) {
  return axios({
    method: 'POST',
    url: `${Api}/auth/new`,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    data: JSON.stringify(action)
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data;
    });
}

function* fetchRegister(action) {
  try {
    const register = yield call(postRegisterUser, action.payload);
    yield put({ type: POST_USER_SUCCESS, details: register });
  } catch (e) {
    if (e.msg) {
      yield put({ type: POST_USER_ERROR, message: e.msg });
    }
    if (e.errors) {
      let errorAux = Object.values(e.errors);
      var reformattedArray = errorAux.map(function (obj) {
        var rObj = {};
        rObj = obj.msg;
        return rObj;
      });
      yield put({ type: POST_USER_ERROR, message: reformattedArray });
    }
  }
}
function* rootUserSaga() {
  yield takeEvery(LOGIN_USER, fetchLogin);
  yield takeEvery(POST_USER, fetchRegister);
}

export default rootUserSaga;
