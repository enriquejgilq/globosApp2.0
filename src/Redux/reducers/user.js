/* eslint-disable */

import * as type from '../constants/user';
import { initialState } from '../states/user'

export default function user(state = initialState, action) {
  switch (action.type) {
    case type.GET_LOGIN:
      return {
        ...state,
        loading: true,
        error: false,
        user: {}
      }
    case type.GET_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.login,
        loading: false,
        isAuth: true,
        error: null
      }
    case type.GET_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.message
      }
    default:
      return state;
  }
}
