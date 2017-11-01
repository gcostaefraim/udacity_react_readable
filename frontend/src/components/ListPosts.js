import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import ListPostsItem from './ListPostsItem'


import sortBy from 'sort-by'


class ListComments extends Component {

	constructor(props) {

		super(props);

		let postsList = []
		const {chanel} = props.match.params
		const {postsByCategory, postsListAll} = props

		if (chanel && chanel !== 'thread') {
			if (postsByCategory[chanel])
				postsList = postsByCategory[chanel];
		} else {
			postsList = postsListAll;
		}

		this.state = {
			postsList: postsList,
			sort: props.mainFilter.sort
		}


	}


	componentWillReceiveProps(nextProps) {

		let postsList = []
		const {chanel} = nextProps.match.params
		const {postsByCategory} = nextProps

		if (chanel && chanel !== 'thread') {
			if (postsByCategory[chanel])
				postsList = postsByCategory[chanel];
		} else {
			postsList = nextProps.postsListAll;
		}

		this.setState({
			postsList: postsList,
			sort: nextProps.mainFilter.sort
		})
	}


	render() {

		const chanel = this.props.match.params.chanel;


		/* === ORDER === */
		const postsListOrdered = this.state.postsList.sort(sortBy(this.state.sort))

		/* === LIST OF POSTS === */
		const ListPosts = () => postsListOrdered.map((post) =>
			<ListPostsItem post={post} key={post.id}/>
		)

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
		postsListAll: state.posts.listAll,
		postsByCategory: state.posts.listByCategory,
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
