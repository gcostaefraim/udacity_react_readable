import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import ListPostsItem from './ListPostsItem'
import sortBy from 'sort-by'

class ListComments extends Component {

	constructor(props) {
		super(props);

		this.state = {
			postsList: []
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

	render() {

		const chanel = this.props.match.params.chanel;

		let arrayPosts = this.state.postsList
		arrayPosts.sort(sortBy('-voteScore'))

		const listPosts = arrayPosts.map((post) =>
			<ListPostsItem post={post} key={post.id} />
		);

		return (
			<Container>
				{chanel}
				<List>
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
