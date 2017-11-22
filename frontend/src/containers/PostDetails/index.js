import React, {Component} from 'react'
import PostDetails from './PostDetails'
import {connect} from 'react-redux'
import {fetchPosts, fetchPostComments} from '../../actions'
import {createComment, deleteComment, deletePost, updateComment, voteComment, votePost} from "../../actions/index";


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

		const showNotFound = Object.keys(this.state.post).length < 1


		if (showNotFound) {
			return (<div>NOT FOUND</div>)
		}

		return (
			<PostDetails
				history={this.props.history}
				params={this.params}
				post={this.state.post}
				comments={this.state.comments}
				fetchPosts={this.props.fetchPosts}
				fetchPostComments={this.props.fetchPostComments}
				deleteComment={this.props.deleteComment}
				deletePost={this.props.deletePost}
				votePost={this.props.votePost}
				voteComment={this.props.voteComment}
				updateComment={this.props.updateComment}
				createComment={this.props.createComment}
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
		deleteComment: (id) => dispatch(deleteComment(id)),
		deletePost: (id) => dispatch(deletePost(id)),
		votePost: (id, vote) => dispatch(votePost(id, vote)),
		voteComment: (comment, vote) => dispatch(voteComment(comment, vote)),
		updateComment: (comment, body) => dispatch(updateComment(comment, body)),
		createComment: (postId, fields) => dispatch(createComment(postId, fields)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
