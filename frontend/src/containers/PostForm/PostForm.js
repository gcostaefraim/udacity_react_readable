import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Input, TextArea, Button, Dropdown, Message} from 'semantic-ui-react'
import {fetchPosts} from "../../actions/index";


import * as PostsAPI from '../../utils/PostsAPI'

class PostForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			categoriesOptions: this.createCategoriesOptions(props.categoriesList),
			fields: {
				title: '',
				author: '',
				category: '',
				body: ''
			},
			errorFields: {},
			errorMessages: [],
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categoriesOptions: this.createCategoriesOptions(nextProps.categoriesList)
		})
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
		this.setState({loading: true});

		PostsAPI.create(this.state.fields).then((r) => {
			this.props.fetchPosts()
			this.setState({loading: false});
		})
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


		this.setState({
			errorMessages,
			errorFields
		})

		if (errorMessages.length > 0 || errorFields.length > 0)
			e.preventDefault();

	}


	render() {

		const errorFields = this.state.errorFields;


		const MessageExampleError = () => (
			<Message
				color='red'
				header='There was some errors with your submission'
				list={this.state.errorMessages}
				hidden={this.state.errorMessages.length === 0}
			/>
		)


		return (
			<Form onSubmit={this.handleSubmit.bind(this)} loading={this.state.loading}>
				<MessageExampleError/>
				<Form.Field
					name='title'
					onChange={this.handleFieldChanged.bind(this)}
					control={Input}
					error={errorFields.title}
					label='Title*'
					placeholder='Post Title'/>

				<Form.Group widths='equal'>
					<Form.Field
						name='author'
						onChange={this.handleFieldChanged.bind(this)}
						control={Input}
						error={errorFields.author}
						label='Author*'
						placeholder='Author Name'/>

					<Form.Field
						name='category'
						onChange={this.handleFieldChanged.bind(this)}
						control={Dropdown}
						error={errorFields.category}
						label='Category*'
						options={this.state.categoriesOptions}
						selection
						placeholder='Select a Category'/>
				</Form.Group>

				<Form.Field
					name='body'
					onChange={this.handleFieldChanged.bind(this)}
					control={TextArea}
					error={errorFields.body}
					label='Body*'
					placeholder='Body'/>
				<Form.Field
					control={Button}
					onClick={this.handleValidation.bind(this)}
					content='Create'/>
			</Form>
		)
	}
}


/*
 * REDUX STATE
 */

function mapStateToProps({categories}) {
	return {
		categoriesList: categories.list
	}
}

/*
 * REDUX ACTIONS
 */

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: () => dispatch(fetchPosts()),
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostForm);


/*

    POST /posts
      USAGE:
        Add a new post

      PARAMS:
        id - UUID should be fine, but any unique id will work
        timestamp - timestamp in whatever format you like, you can use Date.now() if you like
        title - String
        body - String
        author - String
        category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.


 */