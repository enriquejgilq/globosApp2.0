/* eslint-disable */

import * as type from '../constants/categories';

export function getCategories() {
    return {
        type: type.GET_CATEGORIES,
    }
}

export function getCategories_id(byid) {
    return {
        type: type.GET_CATEGORIES_ID,
        payload: byid,
    }
}

export function deleteCategories_id(byid) {
    return {
        type: type.DELETE_CATEGORIES,
        payload: byid,
    }
}

export function updateCategories_id(byid) {
    return {
        type: type.DELETE_CATEGORIES,
        payload: byid,
    }
}
export  function postCategories(data) {
    return {
        type: type.POST_CATEGORIES,
        payload: data
    }
    
}