import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import PostForm from '../PostForm'

import {fetchPosts, createPost} from "../../actions/index";


class PostCreate extends Component {

	constructor(props) {
		super(props)

		this.state = {
			formLoading: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)

	}

	handleSubmit(fields) {
		const {location} = this.props
		const pathToClose = location.pathname.split("/create")[0]

		this.setState({formLoading: true});

/*		PostsAPI.create(fields).then((r) => {
			this.props.fetchPosts()
			this.setState({formLoading: false});
			this.props.history.goBack();
		})*/


		this.props.createPost(fields).then((r) => {
			this.setState({formLoading: false});
			this.props.history.goBack();
		})
	}


	render() {
		return (
			<div style={{padding: 15}}>
				<PostForm
					categoriesList={this.props.categoriesList}
					handleSubmit={this.handleSubmit}
					loading={this.state.formLoading}/>
			</div>
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
		createPost: (fields) => dispatch(createPost(fields)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostCreate);