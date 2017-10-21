import {combineReducers} from 'redux'
import {TYPE} from '../actions'

/*
 * REDUCERS STORE CATEGORIES
 */

function categories(state = {}, action) {
	switch (action.type) {
		case TYPE.RELOAD_CATEGORIES:
			return action.payload
		default:
			return state;
	}
}

/*
 * REDUCERS STORE POSTS
 */

function posts(state = {}, action) {
	switch (action.type) {
		case TYPE.FETCH_POSTS:
			return action.payload
		default:
			return state;
	}
}

export default combineReducers({
	categories,
	posts
})