/* eslint-disable */

import * as type from '../constants/categories';
import { initialState } from '../states/categories'

export default function categories(state = initialState, action) {
    switch (action.type) {
        case type.GET_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: false,
                details: {}
            }
        case type.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                details: action.details,
                loading: false,
                error: null
            }
        case type.GET_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.message
            }
        case type.POST_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: false,
                details: {},
            }
        case type.POST_CATEGORIES_SUCCESS:
            return {
                ...state,
                details: action.details,
                loading: false,
                error: null
            }
        case type.POST_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                details: {},

            }
        default:
            return state;
    }
}
