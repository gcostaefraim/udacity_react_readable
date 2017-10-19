import * as CategoriesAPI from '../utils/CategoriesAPI'

/*
 * action types
 */

export const TYPE = {
    RELOAD_CATEGORIES : 'RELOAD_CATEGORIES'
}


/*
 * action creators
 */

function _reloadCategories(list) {
    return {
        type: TYPE.RELOAD_CATEGORIES,
        payload : {
            list: list
        }
    }
}


/*
 * action thunk
 */

export function reloadCategories() {
    return dispatch => {
        CategoriesAPI.getAll().then((list) => {
            dispatch(_reloadCategories(list))
        })

    }
}

