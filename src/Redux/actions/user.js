/* eslint-disable */

import * as type from '../constants/user';

export function getUser(user) {
    return {
        type: type.GET_USERS,
        payload: user,
    }
}
export function postLogin(login) {
    return {
        type: type.LOGIN_USER,
        payload: login,
    }
}
export function logoutUser(){
    return {
         type: type.LOGOUT
    }
}

export function postUser(data){
    return {
         type: type.POST_USER,
         payload: data
    }
}