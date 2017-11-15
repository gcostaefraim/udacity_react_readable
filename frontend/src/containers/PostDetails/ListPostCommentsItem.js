import React, {Component} from 'react'
import {Icon, Confirm, Comment, Header, Form, Button, TextArea, Message, Input} from 'semantic-ui-react'
import * as CommentsAPI from '../../utils/CommentsAPI'


class ListPostCommentsItem extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			openConfirmDelete: false
		}
	}

	onVote(vote) {
		CommentsAPI.vote(this.props.comment.id, vote).then((post) => {
			this.props.reloadComments()
		})
	};

	confirmDeleteShow = () => this.setState({openConfirmDelete: true})

	handleCancelConfirmDelete = () => this.setState({openConfirmDelete: false})

	handleConfirConfirmDelete = () => {
		CommentsAPI.del(this.props.comment.id).then(() => {
			this.props.reloadComments()
			this.setState({openConfirmDelete: false})
		})
	}


	render() {

		const {comment} = this.props

		return (
			<div>
				<Comment>
					<Comment.Avatar as='a' src='http://u.o0bc.com/avatars/no-user-image.gif'/>
					<Comment.Content>
						<Comment.Author as='a'>{comment.author}</Comment.Author>
						<Comment.Metadata>
							<span>{comment.timestamp}</span>
						</Comment.Metadata>
						<Comment.Text>
							{comment.body}
						</Comment.Text>
						<Comment.Actions>
							<a>Reply</a>
						</Comment.Actions>
						<Comment.Actions>
							<Comment.Action title='Like' onClick={() => this.onVote('upVote')}>
								<Icon name='like outline' color='blue'/>
							</Comment.Action>
							<Comment.Action title='Dislike' onClick={() => this.onVote('downVote')}>
								<Icon name='dislike outline' color='orange'/>
							</Comment.Action>
							<Comment.Action title='Vote Score'>
								<Icon name='signal' color='brown'/>
								{comment.voteScore}
							</Comment.Action>
							<Comment.Action title='Edit'>
								<Icon name='edit'/>
							</Comment.Action>
							<Comment.Action title='Delete' as='a' onClick={() => this.confirmDeleteShow()}>
								<Icon name='trash outline'/>
							</Comment.Action>
						</Comment.Actions>
					</Comment.Content>
				</Comment>


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


export default ListPostCommentsItem;