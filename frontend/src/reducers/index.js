import {combineReducers} from 'redux'
import {TYPE} from '../actions'

/*
 * REDUCERS STORE CATEGORIES
 */

function categories(state = {}, action) {
	switch (action.type) {
		case TYPE.FETCH_CATEGORIES:
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
/*
 * REDUCERS STORE MAIN FILTER
 */

function mainFilter(state = {}, action) {
	switch (action.type) {
		case TYPE.SET_MAIN_SORT:
			return {...state, sort: action.payload.sort}
		default:
			return state;
	}
}
/*
 * REDUCERS STORE COMMENTS
 */

function comments(state = {}, action) {
	switch (action.type) {
		case TYPE.FETCH_POST_COMMENTS:
			return action.payload
		case TYPE.FETCH_ALL_COMMENTS:
			return action.payload
		default:
			return state;
	}
}

export default combineReducers({
	categories,
	posts,
	mainFilter,
	comments
});