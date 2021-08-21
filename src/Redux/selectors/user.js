/* eslint-disable */
export const userState = state => state.user;
export const getUser = state => userState(state).user;
export const userIsAuth = state => userState(state).isAuth;
export const getToken = state => getUser(state).token;
