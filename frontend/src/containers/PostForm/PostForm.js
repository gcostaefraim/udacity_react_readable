import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Input, TextArea, Button, Dropdown, Message} from 'semantic-ui-react'
import {fetchPosts} from "../../actions/index";


class PostForm extends Component {


	constructor(props) {
		super(props)

		const {loading, post, categoriesList} = props

		this.state = {
			loading,
			categoriesOptions: this.createCategoriesOptions(categoriesList),
			fields: post && post.id ? post : {
				title: '',
				author: '',
				category: '',
				body: ''
			},
			errorFields: {},
			errorMessages: [],
		}


		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFieldChanged = this.handleFieldChanged.bind(this)
		this.handleValidation = this.handleValidation.bind(this)

	}

	componentWillReceiveProps(nextProps) {
		const {loading, post, categoriesList} = nextProps

		this.setState((prevState) => ({
			loading,
			categoriesOptions: this.createCategoriesOptions(categoriesList),
			fields: post && post.id ? post : prevState.fields
		}))

	}

	createCategoriesOptions(categories) {
		return categories.map((c) => (
			{key: c.path, text: c.name, value: c.name}
		))
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
		this.props.handleSubmit(this.state.fields)
	}

	handleValidation(e) {

		const {fields} = this.state
		let errorFields = {}
		let errorMessages = []


		if (!fields.title) {
			errorFields.title = true;
			errorMessages.push("You need to enter a Title")
		}
		if (!fields.author) {
			errorFields.author = true;
			errorMessages.push("You need to enter a Author")
		}
		if (!fields.category) {
			errorFields.category = true;
			errorMessages.push("You need to select a Category")
		}
		if (!fields.body) {
			errorFields.body = true;
			errorMessages.push("You need to enter the Body")
		}

		if (errorMessages.length > 0 || errorFields.length > 0)
			e.preventDefault();

		this.setState({
			errorMessages,
			errorFields
		})

	}


	render() {

		const {
			fields,
			errorFields,
			errorMessages,
			categoriesOptions,
			loading
		} = this.state;


		const MessageExampleError = () => (
			<Message
				color='red'
				header='There was some errors with your submission'
				list={errorMessages}
				hidden={errorMessages.length === 0}
			/>
		)


		return (

			<Form onSubmit={this.handleSubmit} loading={loading}>
				<MessageExampleError/>

				<Form.Field
					name='title'
					onChange={this.handleFieldChanged}
					control={Input}
					error={errorFields.title}
					value={fields.title}
					label='Title*'
					placeholder='Title'/>

				<Form.Group widths='equal'>
					<Form.Field
						name='author'
						onChange={this.handleFieldChanged}
						control={Input}
						error={errorFields.author}
						value={fields.author}
						label='Author*'
						placeholder='Author Name'/>

					<Form.Field
						name='category'
						onChange={this.handleFieldChanged}
						control={Dropdown}
						error={errorFields.category}
						value={fields.category}
						label='Category*'
						options={categoriesOptions}
						selection
						placeholder='Select a Category'/>
				</Form.Group>

				<Form.Field
					name='body'
					onChange={this.handleFieldChanged}
					control={TextArea}
					error={errorFields.body}
					value={fields.body}
					label='Body*'
					placeholder='Body'/>
				<Form.Field
					control={Button}
					onClick={this.handleValidation}
					content='Confirm'/>
			</Form>
		)
	}
}

export default PostForm;