import * as CategoriesAPI from '../utils/CategoriesAPI'
import * as PostsAPI from '../utils/PostsAPI'
import * as CommentsAPI from '../utils/CommentsAPI'

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


export function createPost(fields) {
	return dispatch => {
		return new Promise((resolve, reject) =>
			PostsAPI.create(fields).then((r) => {
				PostsAPI.getAll().then((list) => {
					dispatch(_fetchPosts(list))
					resolve()
				}).catch((err) => reject(err))
			}).catch((err) => reject(err))
		)
	}
}

export function updatePost(postId, fields) {
	return dispatch => {
		return new Promise((resolve, reject) =>
			PostsAPI.update(postId, fields).then((r) => {
				PostsAPI.getAll().then((list) => {
					dispatch(_fetchPosts(list))
					resolve()
				}).catch((err) => reject(err))
			}).catch((err) => reject(err))
		)
	}
}


export function deletePost(id) {
	return dispatch =>
		new Promise((resolve, reject) =>
			PostsAPI.del(id).then(() => {
				PostsAPI.getAll().then((list) => {
					dispatch(_fetchPosts(list))
					resolve()
				}).catch((err) => reject(err))
			}).catch((err) => reject(err))
		)
}


export function votePost(id, vote) {
	return dispatch =>
		new Promise((resolve, reject) =>
			PostsAPI.vote(id, vote).then((post) => {
				PostsAPI.getAll().then((list) => {
					dispatch(_fetchPosts(list))
					resolve()
				}).catch((err) => reject(err))
			}).catch((err) => reject(err))
		)
}


export function fetchPostComments(id) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			PostsAPI.getComments(id).then((list) => {
				dispatch(_fetchPostComments(list))
			}).then(() => resolve()).catch(() => reject())
		})
	}
}


export function fetchPostWithComments() {
	return dispatch => {
		PostsAPI.getAll().then((list) => {
				let postIds = []
				list.map((post) => postIds.push(post.id))

				Promise.all(
					postIds.map((id2) =>
						PostsAPI.getComments(id2)
					)).then((allComments) => {
					dispatch(_fetchAllComments([].concat(...allComments)))
				})

				dispatch(_fetchPosts(list))
			}
		)
	}
}


export function deleteComment(comment) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			CommentsAPI.del(comment.id).then(() => {

				PostsAPI.getComments(comment.parentId).then((list) => {
					dispatch(_fetchPostComments(list))
				}).then(() => resolve()).catch((err) => reject(err))

			}).catch((err) => reject(err))
		})
	}
}


export function voteComment(comment, vote) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			CommentsAPI.vote(comment.id, vote).then(() => {

				PostsAPI.getComments(comment.parentId).then((list) => {
					dispatch(_fetchPostComments(list))
				}).then(() => resolve()).catch((err) => reject(err))

			}).catch((err) => reject(err))
		})
	}
}


export function updateComment(comment, body) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			CommentsAPI.update(comment.id, {body}).then((r) => {

				PostsAPI.getComments(comment.parentId).then((list) => {
					dispatch(_fetchPostComments(list))
				}).then(() => resolve()).catch((err) => reject(err))

			}).catch((err) => reject(err))
		})
	}
}

export function createComment(postId, fields) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			CommentsAPI.create({...fields, parentId: postId}).then((r) => {

				PostsAPI.getComments(postId).then((list) => {
					dispatch(_fetchPostComments(list))
				}).then(() => resolve()).catch((err) => reject(err))

			}).catch((err) => reject(err))
		})
	}
}























