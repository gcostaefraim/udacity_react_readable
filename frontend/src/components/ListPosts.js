import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

import * as PostsAPI from '../utils/PostsAPI'

class ListComments extends Component {

	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			postsList: {}
		}
	}


	componentDidMount() {
		console.log("Mounted!");
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			postsList: nextProps.postsList
		})
	}

	render() {

		const chanel = this.props.match.params.chanel;

		const listPosts = Object.entries(this.state.postsList).map(([id, post]) =>
			<div key={post.id}>
				<div>Title: {post.title}</div>
				<div>Author: {post.author}</div>
				<div>Category: {post.category}</div>
				<br/>
			</div>
		);


	console.log(listPosts);
		return (
			<Container>
				{chanel}
				<List>
					<div>PRIMEIRO POST</div>
					{listPosts}
					<div>ULTIMO POST</div>
				</List>
				<Input>

				</Input>
			</Container>
		);
	}
}

/*
 * REDUX STATE
 */

function mapStateToProps(state) {
	return {
		postsList: state.posts.listAll
	}
}


export default connect(
	mapStateToProps,
)(ListComments)

// export default ListComments;

const Container = styled.div `
    height: 100%;
`;

const List = styled.div `
    background-color: #3f70ac;
    height: calc(100% - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
const Input = styled.input `
    width: 95%;
    height: 30px;
`;