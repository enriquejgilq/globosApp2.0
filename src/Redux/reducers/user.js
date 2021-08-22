/* eslint-disable */

import * as type from '../constants/user';
import { initialState } from '../states/user'

export default function user(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_USER:
        return {
            ...state,
            loading: true,
            error: false,
            user: {}
        }
    case type.LOGIN_USER_SUCCESS:
        return {
            ...state,
            user: action.user,
            loading: false,
            isAuth: true,
            error: null
        }
    case type.LOGIN_USER_ERROR:
        return {
            ...state,
            loading: false,
            error: action.message
        }
    case type.LOGOUT:
        return {
            initialState 
        }
    default:
      return state;
  }
}
