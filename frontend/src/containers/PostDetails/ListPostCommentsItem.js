import React, {Component} from 'react'
import {Icon, Confirm, Comment, Header, Form, Button, TextArea, Message, Input} from 'semantic-ui-react'
import * as CommentsAPI from '../../utils/CommentsAPI'


class ListPostCommentsItem extends Component {

	constructor(props) {
		super(props)

		this.state = {
			formEdit: {
				body: props.comment.body,
				loading: false
			},
			editing: false,
			openConfirmDelete: false
		}


		this.handleFieldChanged = this.handleFieldChanged.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

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
		//	this.props.reloadComments().then(() => (alert("FCPOOOO")))
			this.setState({openConfirmDelete: false})
		})
	}

	handleEdit = () => {
		this.setState({editing: true, formEdit: {body: this.props.comment.body}})
	}

	handleEditCancel = () => {
		 this.setState({editing: false, formEdit: {body: this.props.comment.body, loading: false}})
	}

	handleFieldChanged(e, {name, value}) {
		this.setState({formEdit: {body: value, loading: false}})
	}

	handleSubmit() {

		const
			{comment} = this.props,
			{body} = this.state.formEdit


		this.setState({formEdit: {loading: true, body}})


		CommentsAPI.update(comment.id, {body}).then((r) => {
			this.props.reloadComments();
			this.setState({editing: false, formEdit: {body, loading: false}})
		})


		this.setState({editing: true})
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
						<Comment.Text hidden={this.state.editing}>
							{comment.body}
						</Comment.Text>
						<Comment.Text hidden={!this.state.editing}>
							<Form reply onSubmit={this.handleSubmit} loading={this.state.formEdit.loading}>

								<Form.Field
									name='body'
									onChange={this.handleFieldChanged}
									control={TextArea}
									value={this.state.formEdit.body}
									placeholder='Body'/>

								<Form.Group inline>
									<Form.Field
										type='button'
										control={Button}
										onClick={this.handleEditCancel}
										content='Cancel'/>
									<Form.Field
										color='green'
										disabled={this.state.formEdit.body.length < 1}
										control={Button}
										content='Save Changes'/>
								</Form.Group>

							</Form>
						</Comment.Text>

						<Comment.Actions hidden={this.state.editing}>
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
							<Comment.Action title='Edit' as='a' onClick={this.handleEdit}>
								<Icon name='edit'/>
							</Comment.Action>
							<Comment.Action title='Delete' as='a' onClick={this.confirmDeleteShow}>
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