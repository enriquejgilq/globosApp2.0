/* eslint-disable */
import { call, put, takeEvery, select } from "redux-saga/effects";
import Api from "../Api";
import {
    POST_CATEGORIES_ERROR, POST_CATEGORIES_SUCCESS, POST_CATEGORIES
} from '../constants/categories';
import { useSelector } from 'react-redux';
import { getToken } from "../selectors/user";


function postCategories(token,data) {
    const url = `${Api}/events`;
    return fetch(
        url,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-type': "application/json",
             Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            'x-token': token 
          },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
    }
function* fetchCategories(action) {
        try {
            const token = yield select(getToken);
            const categories = yield call(postCategories, token, action.payload);
            yield put({ type: POST_CATEGORIES_SUCCESS, details: categories });
          } catch (e) {
            yield put({ type: POST_CATEGORIES_ERROR, message: e ? String(e.message) : "Error de conexión" });
          }
        
}
function* rootCategoriesSaga() {
    yield takeEvery(POST_CATEGORIES, fetchCategories);

}

export default rootCategoriesSaga;