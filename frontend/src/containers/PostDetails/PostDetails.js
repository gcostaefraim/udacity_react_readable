import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Divider, Label, Icon, Confirm, Comment, Header, Form, Button} from 'semantic-ui-react'
import ListPostComments from "./ListPostComments";

import moment from 'moment'

class PostDetails extends Component {



	constructor(props) {
		super(props)

		// const {id} = props.match.params;

		//this.props.fetchPostComments(id)

		this.state = {
			openConfirmDelete: false
		}

	}


	onVote(vote) {
		this.props.votePost(this.props.post.id, vote).then((post) => {
			this.setState({post})
		})
	};


	confirmDeleteShow = () => this.setState({openConfirmDelete: true})

	handleCancelConfirmDelete = () => this.setState({openConfirmDelete: false})

	handleConfirConfirmDelete = () => {
		this.props.deletePost(this.props.post.id).then(() => {
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
						{moment(post.timestamp).format("DD/MM/YYYY - HH:mm:ss")}
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
				</div>

				<ListPostComments
					totalComments={totalComments}
					comments={comments}
					postId={post.id}
					deleteComment={this.props.deleteComment}
					voteComment={this.props.voteComment}
					updateComment={this.props.updateComment}
					createComment={this.props.createComment}
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