import {combineReducers} from 'redux'
import {TYPE} from '../actions'


/*
 * INITIAL STATE APPLICATION
 */

const initialState = {
    categories : {
        list: []
    }
}



/*
 * REDUCERS STORE CATEGORIES
 */

function categories(state = initialState, action) {
    switch (action.type) {
        case TYPE.RELOAD_CATEGORIES:
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    categories,
})