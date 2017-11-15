import {createStore, applyMiddleware, compose} from 'redux'
import reducers from '../reducers/index'
import thunk from 'redux-thunk'
import {fetchCategories, fetchPosts, fetchComments} from "../actions"

const initialState = {
	categories: {
		list: []
	},
	posts: {
		listAll: [],
		listByCategory: {},
		listIds: []
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

	return store;
}


export default configStore;