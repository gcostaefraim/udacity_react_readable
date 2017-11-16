import React, {Component} from 'react'
import {Icon, Confirm, Comment, Header, Form, Button, TextArea, Message, Input} from 'semantic-ui-react'

import * as CommentsAPI from '../../utils/CommentsAPI'
import ListPostCommentsItem from "./ListPostCommentsItem";


class ListPostComments extends Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			fields: {
				author: '',
				body: ''
			},
			errorFields: {},
			errorMessages: [],
			openConfirmDelete: false
		}
	}

	resetForm() {
		this.setState({
			loading: false,
			fields: {
				author: '',
				body: ''
			},
			errorFields: {},
			errorMessages: [],
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			loading: false,
			fields: {
				author: '',
				body: ''
			},
			errorFields: {},
			errorMessages: [],
		});
	}


	handleFieldChanged(e, {name, value}) {
		this.setState((prevState) => {
				return {
					...prevState,
					fields: {...prevState.fields, [name]: value}
				}
			}
		)
	}


	handleSubmit() {

		const
			{fields} = this.state,
			{postId} = this.props

		this.setState({loading: true});

		CommentsAPI.create({...fields, parentId: postId}).then((r) => {
			this.props.reloadComments()
			this.setState({loading: false});
			this.resetForm();
		})
	}

	handleValidation(e) {

		const {fields} = this.state
		let errorFields = {}
		let errorMessages = []


		if (!fields.author) {
			errorFields.author = true;
			errorMessages.push("You need to enter a Author")
		}

		if (!fields.body) {
			errorFields.body = true;
			errorMessages.push("You need to enter the Body")
		}


		this.setState({
			errorMessages,
			errorFields
		})

		if (errorMessages.length > 0 || errorFields.length > 0)
			e.preventDefault();

	}


	confirmDeleteShow = () => this.setState({openConfirmDelete: true})

	handleCancelConfirmDelete = () => this.setState({openConfirmDelete: false})

	handleConfirConfirmDelete = () => {
		// PostAPI.del(this.state.post.id).then(() => {
		// 	this.props.fetchPosts()
		// 	this.setState({openConfirmDelete: false})
		// 	this.props.history.push('/');
		//
		// })
	}


	render() {

		const {comments, totalComments} = this.props
		const errorFields = this.state.errorFields;


		const MessageFormArea = () => (
			<Message
				color='red'
				header='There was some errors with your submission'
				list={this.state.errorMessages}
				hidden={this.state.errorMessages.length === 0}
			/>
		)

		return (
			<Comment.Group>
				<Header as='h3' dividing>Comments ({totalComments})</Header>

				{comments.map((comment) =>
					<ListPostCommentsItem
						key={comment.id}
						comment={comment}
						reloadComments={this.props.reloadComments}/>
				)}



				<Form reply onSubmit={this.handleSubmit.bind(this)} loading={this.state.loading}>
					<MessageFormArea/>

					<Form.Field
						name='author'
						onChange={this.handleFieldChanged.bind(this)}
						value={this.state.fields.author}
						control={Input}
						error={errorFields.author}
						width={8}
						label='Author*'
						placeholder='Author Name'/>
					<Form.Field
						name='body'
						onChange={this.handleFieldChanged.bind(this)}
						value={this.state.fields.body}
						control={TextArea}
						error={errorFields.body}
						label='Body*'
						placeholder='Body'/>
					<Form.Field
						color='blue'
						control={Button}
						onClick={this.handleValidation.bind(this)}
						content='Submit Comment'/>
					{/*<Form.TextArea style={{height: '6em', resize: 'none'}}/>*/}
					{/*<Button content='Add a new comment' labelPosition='left' icon='edit' primary/>*/}
				</Form>

			</Comment.Group>
		)
	}

}

export default ListPostComments