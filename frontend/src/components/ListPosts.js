import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import ListPostsItem from './ListPostsItem'


import sortBy from 'sort-by'


class ListComments extends Component {

	constructor(props) {
		// console.log('Contructor ListPosts');
		// console.log(props);

		super(props);
		this.state = {
			postsList: props.postsList,
			sort: props.mainFilter.sort
		}
	}

	componentDidMount() {
		// console.log("Mounted!");
	}

	componentWillReceiveProps(nextProps) {
		 // console.log('ListPost componentWillReceiveProps');
		// console.log(nextProps);

		this.setState({
			postsList: nextProps.postsList,
			sort: nextProps.mainFilter.sort
		})
	}


	render() {

		const chanel = this.props.match.params.chanel;

		/* === ORDER === */
		const postsListOrdered = this.state.postsList.sort(sortBy(this.state.sort))

		/* === LIST OF POSTS === */
		const ListPosts = () => postsListOrdered.map((post) =>
			<ListPostsItem post={post} key={post.id} />
		)
		// console.log('Render ListPosts');
		// console.log(postsListOrdered);

		return (
			<Container>
				<List>
					<ListPosts/>
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
		postsList: state.posts.listAll,
		mainFilter: state.mainFilter
	}
}

export default connect(
	mapStateToProps,
)(ListComments);

const Container = styled.div `
`;

const List = styled.div `
`;
