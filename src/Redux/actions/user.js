/* eslint-disable */

import * as type from '../constants/user';

export function getUser(user) {
    return {
        type: type.GET_USERS,
        payload: user,
    }
}
export function getLogin(login) {
    return {
        type: type.GET_LOGIN,
        payload: login,
    }
}