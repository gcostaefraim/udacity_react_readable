import * as CategoriesAPI from '../utils/CategoriesAPI'
import * as PostsAPI from '../utils/PostsAPI'

/*
 * action types
 */

export const TYPE = {
	RELOAD_CATEGORIES: 'RELOAD_CATEGORIES',

	FETCH_POSTS: 'FETCH_POSTS'
}


/*
 * action creators
 */

function _reloadCategories(list) {
	return {
		type: TYPE.RELOAD_CATEGORIES,
		payload: {
			list: list
		}
	}
}

function _fetchPosts(list) {
	/* === Normalize === */
	let _normalize = {
		listAll: {},
		listByCategory: {},
		listIds: []
	}

	for (const item of list) {

		/* === By ID === */
		if (_normalize.listAll[item.id] === undefined)
			_normalize.listAll[item.id] = {}

		_normalize.listAll[item.id] = item;


		/* === By Category === */
		if (_normalize.listByCategory[item.category] === undefined)
		 	_normalize.listByCategory[item.category] = []

		_normalize.listByCategory[item.category].push(item.id)

		/* === All IDS === */
		_normalize.listIds.push(item.id);
	}

	return {
		type: TYPE.FETCH_POSTS,
		payload: _normalize
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

export function fetchPosts() {
	return dispatch => {
		PostsAPI.getAll().then((list) => {
			dispatch(_fetchPosts(list))
		})
	}
}

