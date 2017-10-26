import React, {Component} from 'react'
import {connect} from 'react-redux'

import { Menu, Dropdown } from 'semantic-ui-react'

import styled from 'styled-components'

import ListPostsItem from './ListPostsItem'


import sortBy from 'sort-by'


class ListComments extends Component {

	constructor(props) {
		super(props);

		this.state = {
			postsList: [],
			order: '-voteScore'
		}
	}

	componentDidMount() {
		console.log("Mounted!");
	}

	componentWillReceiveProps(nextProps) {
		console.log('ListPost componentWillReceiveProps');
		console.log(nextProps);

		this.setState({
			postsList: nextProps.postsList
		})
	}

	setOrder(order = 'title'){
		this.setState({
			order
		})
	}


	render() {

		const chanel = this.props.match.params.chanel;

		/* === ORDER === */
		const postsListOrdered = this.state.postsList.sort(sortBy(this.state.order))

		/* === LIST OF POSTS === */
		const listPosts = postsListOrdered.map((post) =>
			<ListPostsItem post={post} key={post.id} />
		)


		return (
			<Container>
				{chanel}
				<List>
					<button onClick={() => this.setOrder('-voteScore')}>Order Por Vote Score</button>
					<button onClick={() => this.setOrder('title')}>Order Por Data</button>
					{listPosts}
				</List>
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

const Container = styled.div `
`;

const List = styled.div `
`;
