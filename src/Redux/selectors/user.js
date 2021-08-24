/* eslint-disable */
export const userState = state => state.user;
export const getUser = state => userState(state).user;
export const userIsAuth = state => userState(state).isAuth;
export const getToken = state => getUser(state).token;
export const getUserDetails = state => userState(state).details;
export const getLoading = state => userState(state).loading
export const getError = state => userState(state).error
