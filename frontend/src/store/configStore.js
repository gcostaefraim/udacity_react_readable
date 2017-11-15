import {createStore, applyMiddleware, compose} from 'redux'
import reducers from '../reducers/index'
import thunk from 'redux-thunk'
import {fetchCategories, fetchPosts, fetchPostWithComments, fetchPostComments} from "../actions"

const initialState = {
	categories: {
		list: []
	},
	posts: {
		listAll: [],
		listByCategory: {},
		listIds: []
	},
	comments: {
		listByPostId: []
	},
	mainFilter: {
		sort: '-voteScore',
		search: null
	}
};



const configStore = () => {
	const store = createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		)
	)

	/* === BEGIN FETCH INITIAL STATE OF APPLICATION  === */
	store.dispatch(fetchCategories());
	store.dispatch(fetchPosts());
	// store.dispatch(fetchPostComments(['8xf0y6ziyjabvozdd253nd', '6ni6ok3ym7mf1p33lnez']));
	store.dispatch(fetchPostWithComments())
	return store;
}


export default configStore;