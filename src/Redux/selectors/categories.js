/* eslint-disable */
export const categoriesState = state => state.categories;
export const getCategories = state => categoriesState(state).details;
export const getLoading = state => categoriesState(state).loading
export const getError = state => categoriesState(state).error
export const getAllCategories = state => categoriesState(state).allCategories;