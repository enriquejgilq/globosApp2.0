/* eslint-disable */
import { all } from 'redux-saga/effects';
import rootUserSaga from './user'

export default function* rootSaga() {
  yield all([
    rootUserSaga(),
  ]);
}

