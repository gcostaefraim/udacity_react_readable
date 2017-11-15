import * as CategoriesAPI from '../utils/CategoriesAPI'
import * as PostsAPI from '../utils/PostsAPI'
import * as CommentsAPI from '../utils/CommentsAPI'

/*
 * action types
 */

export const TYPE = {
	FETCH_CATEGORIES: 'FETCH_CATEGORIES',
	FETCH_POST_COMMENTS: 'FETCH_POST_COMMENTS',

	FETCH_POSTS: 'FETCH_POSTS',

	SET_MAIN_SORT: 'SET_MAIN_SORT',
}


/*
 * action creators
 */


export function setMainSort(sort) {
	return {
		type: TYPE.SET_MAIN_SORT,
		payload: {
			sort: sort
		}
	}
}

function _fetchCategories(list) {
	return {
		type: TYPE.FETCH_CATEGORIES,
		payload: {
			list: list
		}
	}
}

function _fetchPostComments(list) {


	/* === Normalize === */
	let _normalize = {
		listAll: [],
		listById: [],
		listByPostId: {}
	}


	/* === LIST ALL === */
	_normalize.listAll = list

	for (const item of list) {

		/* === By Post ID === */
		if (_normalize.listByPostId[item.parentId] === undefined)
			_normalize.listByPostId[item.parentId] = []
		_normalize.listByPostId[item.parentId].push(item)

	}

	console.log(_normalize);

	return {
		type: TYPE.FETCH_POST_COMMENTS,
		payload: {
			list: _normalize
		}
	}
}

function _fetchPosts(list) {
	
	/* === Normalize === */
	let _normalize = {
		listAll: [],
		listByCategory: {},
		listById: [],
		listIds: []
	}


	/* === LIST ALL === */
	_normalize.listAll = list

	for (const item of list) {

		/* === By ID === */
		if (_normalize.listById[item.id] === undefined)
			_normalize.listById[item.id] = {}
		_normalize.listById[item.id] = item;


		/* === By Category === */
		if (_normalize.listByCategory[item.category] === undefined)
		 	_normalize.listByCategory[item.category] = []
		_normalize.listByCategory[item.category].push(item)


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

export function fetchCategories() {
	return dispatch => {
		CategoriesAPI.getAll().then((list) => {
			dispatch(_fetchCategories(list))
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
export function fetchPostComments(id) {
	return dispatch => {
		PostsAPI.getComments(id).then((list) => {
			dispatch(_fetchPostComments(list))
		})
	}
}