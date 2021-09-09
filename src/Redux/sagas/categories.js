/* eslint-disable */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import Api from '../Api';
import {
    POST_CATEGORIES_ERROR,
    POST_CATEGORIES_SUCCESS,
    POST_CATEGORIES,GET_CATEGORIES,GET_CATEGORIES_ERROR,GET_CATEGORIES_SUCCESS
} from '../constants/categories';
import { getToken, getUser } from '../selectors/user';

function postCategories(token, data) {
    const url = `${Api}/events`;
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-token': token
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(function (response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return response.json();
        })
        .then(function (data) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            return data;
        });
}
function* fetchCategories(action) {
    try {
        const token = yield select(getToken);
        const details = yield call(postCategories, token, action.payload);
        if (details.ok) {
            yield put({ type: POST_CATEGORIES_SUCCESS, details: details.evento });
        } else {
            let errorAux = Object.values(details.errors);
            var reformattedArray = errorAux.map(function (obj) {
                var rObj = {};
                rObj = obj.msg;
                return rObj;
            });
            yield put({ type: POST_CATEGORIES_ERROR, error: reformattedArray });
        }
    } catch (e) {
        yield put({ type: POST_CATEGORIES_ERROR, message: e ? e.msg : 'Algo no funcionó!' });
    }
}

function apiCategories(token) {
    const url = `${Api}/events`;
    return fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-token': token
        },
       // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            return data;
        });
}
function* fetchgetCategories() {
    try {
      //  debugger
        const token = yield select(getToken);
        const allCategories = yield call(apiCategories, token);
        yield put({ type: GET_CATEGORIES_SUCCESS, allCategories: allCategories});
    } catch (e) {
        console.log(e)
        yield put({ type: GET_CATEGORIES_ERROR, message: e ? e.msg : 'Algo no funcionó!' });
    }
}

function* rootCategoriesSaga() {
    yield takeEvery(POST_CATEGORIES, fetchCategories);
    yield takeEvery(GET_CATEGORIES, fetchgetCategories);

}

export default rootCategoriesSaga;
