/* eslint-disable */
import { all } from 'redux-saga/effects';
import rootUserSaga from './user'
import rootCategoriesSaga from './categories'

export default function* rootSaga() {
  yield all([
    rootUserSaga(),
    rootCategoriesSaga(),
  ]);
}

