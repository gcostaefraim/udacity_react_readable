import React, {Component} from 'react'
import {connect} from 'react-redux'
import PostForm from '../PostForm'

import {fetchPosts, updatePost} from "../../actions/index";


class PostEdit extends Component {

	constructor(props) {
		super(props)

		const
			{id} = props.match.params,
			posts = props.posts.listById

		this.state = {
			postId: null,
			postEdit: posts && posts[id] ? posts[id] : {},
			formLoading: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		const
			{id} = nextProps.match.params,
			posts = nextProps.posts.listById

		this.setState({
			postId: id,
			postEdit: posts && posts[id] ? posts[id] : {},
		})
	}

	handleSubmit(fields) {
		this.setState({
			postEdit: fields,
			formLoading: true
		});

		const postId = this.props.match.params.id


		this.props.updatePost(postId, fields).then((r) => {
			this.setState({formLoading: false});
			this.props.history.push('/');
		})

	}

	render() {
		return (
			<div style={{padding: 15}}>
				<PostForm
					edit
					post={this.state.postEdit}
					categoriesList={this.props.categoriesList}
					handleSubmit={this.handleSubmit}
					loading={this.state.formLoading}/>
			</div>
		)
	}
}


/*
 * REDUX STATE
 */

function mapStateToProps({categories, posts}) {
	return {
		posts: {
			listById: posts.listById
		},
		categoriesList: categories.list
	}
}

/*
 * REDUX ACTIONS
 */

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: () => dispatch(fetchPosts()),
		updatePost: (postId, fields) => dispatch(updatePost(postId, fields)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostEdit);