import React, {Component} from 'react'
import PostDetails from './PostDetails'
import {connect} from 'react-redux'
import {fetchPosts, fetchPostComments} from '../../actions'


class Index extends Component {

	constructor(props) {
		super(props);

		this.state = {
			post: {},
			comments: [],
			...this.initStateProps(props)
		}

	}


	componentWillReceiveProps(nextProps) {
		this.setState(this.initStateProps(nextProps))
	}


	initStateProps(props) {
		const
			{id} = props.match.params,
			prevId = this.props.match.params.id,
			{listByPostId} = props.comments,
			{postListById} = props,
			{fetchPostComments} = props

		if (id !== prevId)
			fetchPostComments(id)

		return {
			post: postListById && postListById[id] ? postListById[id] : {},
			comments: (listByPostId && listByPostId[id]) ? listByPostId[id] : []
		}
	}


	render() {
		return (
			<PostDetails
				params={this.params}
				post={this.state.post}
				comments={this.state.comments}
				fetchPosts={this.props.fetchPosts}
				fetchPostComments={this.props.fetchPostComments}
			/>
		)
	}
}


/*
 * REDUX STATE
 */

function mapStateToProps(state, props) {
	const
		postId = props.match.params.id,
		commentsByPostId = state.comments.listByPostId

	return {
		postListById: state.posts.listById,
		commentsByPostId: state.comments.listByPostId,
		comments: {
			listByPostId: state.comments.listByPostId
		},
	}
}

/*
 * REDUX ACTIONS
 */

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: () => dispatch(fetchPosts()),
		fetchPostComments: (id) => dispatch(fetchPostComments(id)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
