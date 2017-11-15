import * as CategoriesAPI from '../utils/CategoriesAPI'
import * as PostsAPI from '../utils/PostsAPI'

/*
 * action types
 */

export const TYPE = {
	FETCH_CATEGORIES: 'FETCH_CATEGORIES',
	FETCH_POST_COMMENTS: 'FETCH_POST_COMMENTS',

	FETCH_ALL_COMMENTS: 'FETCH_ALL_COMMENTS',


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

function _fetchAllComments(list) {

	return {
		type: TYPE.FETCH_ALL_COMMENTS,
		payload: normalizeComments(list)
	}
}

function _fetchPostComments(list) {

	return {
		type: TYPE.FETCH_POST_COMMENTS,
		payload: normalizeComments(list)
	}
}


function normalizeComments(list) {

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

	return _normalize
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

export function fetchPostWithComments() {
	return dispatch => {
		PostsAPI.getAll().then((list) => {
				let postIds = []
				list.map((post) => postIds.push(post.id))

				// postIds.map((id2) => {
				// 	PostsAPI.getComments(id2).then((list) => {
				// 		dispatch(_fetchPostComments(list))
				// 	})
				// })
				Promise.all(
					postIds.map((id2) =>
						PostsAPI.getComments(id2)
					)).then((allComments) => {
					dispatch(_fetchAllComments([].concat(...allComments)))
					console.log([].concat(...allComments));
				})

				dispatch(_fetchPosts(list))
			}
		)
	}
}