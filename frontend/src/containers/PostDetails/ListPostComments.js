import React, {Component} from 'react'
import {Icon, Comment, Header, Form, Button, TextArea, Message, Input} from 'semantic-ui-react'

import * as CommentsAPI from '../../utils/CommentsAPI'


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
		}
	}

	resetForm(){
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

	render() {

		const {comments} = this.props
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
				<Header as='h3' dividing>Comments</Header>

				{comments.map((comment) =>
					<Comment key={comment.id}>
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
								<Comment.Action title='Like'>
									<Icon name='like outline' color='blue'/>
								</Comment.Action>
								<Comment.Action title='Dislike'>
									<Icon name='dislike outline' color='orange'/>
								</Comment.Action>
								<Comment.Action title='Vote Score'>
									<Icon name='signal' color='brown'/>
									{comment.voteScore}
								</Comment.Action>
							</Comment.Actions>
						</Comment.Content>
					</Comment>
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
						control={Button}
						onClick={this.handleValidation.bind(this)}
						content='Create'/>
					{/*<Form.TextArea style={{height: '6em', resize: 'none'}}/>*/}
					{/*<Button content='Add a new comment' labelPosition='left' icon='edit' primary/>*/}
				</Form>
			</Comment.Group>
		)
	}

}

export default ListPostComments