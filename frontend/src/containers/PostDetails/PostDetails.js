import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Divider, Label, Icon, Confirm, Comment, Header, Form, Button} from 'semantic-ui-react'
import * as PostAPI from '../../utils/PostsAPI'
import ListPostComments from "./ListPostComments";

class PostDetails extends Component {



	constructor(props) {
		super(props)

		// const {id} = props.match.params;

		//this.props.fetchPostComments(id)

		this.state = {
			// id,
			// post: [],
			// comments: [],
			openConfirmDelete: false
		}

	}


	/*componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps PostDetails');
		console.log(nextProps);
		const
			{id} = nextProps.match.params,
			prevId = this.props.match.params.id,
			comments = nextProps.comments.listByPostId,
			posts = nextProps.postListById,
			{fetchPostComments} = nextProps

		//if (id !== prevId)
			//fetchPostComments(id)

		this.setState({
			post: posts && posts[id] ? posts[id] : [],
			comments: (comments && comments[id]) ? comments[id] : []
		})

	}
*/

	// onVote(vote) {
	// 	PostAPI.vote(this.props.post.id, vote).then((post) => {
	// 		this.setState({post})
	// 		this.props.fetchPosts()
	// 	})
	// };

	confirmDeleteShow = () => this.setState({openConfirmDelete: true})

	handleCancelConfirmDelete = () => this.setState({openConfirmDelete: false})

	handleConfirConfirmDelete = () => {
		PostAPI.del(this.state.post.id).then(() => {
			this.props.fetchPosts()
			this.setState({openConfirmDelete: false})
			this.props.history.push('/');

		})
	}



	render() {

		const
			{post, comments} = this.props,
			totalComments = comments ? comments.length : 0

		return (
			<div style={{padding: 15}}>
				<div style={{textAlign: 'center'}}><h1>{post.title}</h1></div>
				<Divider/>
				<div>
					<Label title='Author'>
						<Icon name='user'/>
						{post.author}
					</Label>
					<Label title='Created at'>
						<Icon name='time'/>
						{post.timestamp}
					</Label>
					<Label title='Like' as='a' onClick={() => this.onVote('upVote')}>
						<Icon name='like outline' color='blue'></Icon>
					</Label>
					<Label title='Dislike' as='a' onClick={() => this.onVote('downVote')}>
						<Icon name='dislike outline' color='orange'></Icon>
					</Label>
					<Label title='Vote Score' color={post.voteScore >= 0 ? 'blue' : 'red'}>
						<Icon name='signal'/>
						{post.voteScore}
					</Label>

					<Label title='Edit' as={Link} to={`/${post.category}/edit/${post.id}`} color='green'>
						<Icon name='edit'/>
					</Label>

					<Label title='Delete' as='a' onClick={() => this.confirmDeleteShow()}>
						<Icon name='trash outline'/>
					</Label>


				</div>
				<div style={{marginTop: 20}}>
					{post.body}

					<br/>
					I'm wondering what the best practice is for documenting a React component. I assume just normal JSdoc format
					for any methods, but what is the best place to capture things like props, redux state, component state (if at
					all)?
				</div>

				<ListPostComments
					totalComments={totalComments}
					comments={comments}
					postId={post.id}
					reloadComments={() => this.props.fetchPostComments(post.id)}/>

				{/* Modal Confirm to Delete Post*/}
				<Confirm
					open={this.state.openConfirmDelete}
					onCancel={this.handleCancelConfirmDelete}
					onConfirm={this.handleConfirConfirmDelete}
				/>

			</div>
		)
	}
}

export default PostDetails