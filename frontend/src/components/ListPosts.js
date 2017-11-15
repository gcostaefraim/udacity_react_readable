import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import ListPostsItem from './ListPostsItem'


import sortBy from 'sort-by'


class ListPosts extends Component {

	constructor(props) {

		super(props);

		let postsList = []
		const {category} = props.match.params
		const {listByCategory, postsListAll} = props.posts

		// if (chanel && chanel !== 'thread') {
		//
		// 	if (listByCategory[chanel])
		// 		postsList = postsByCategory[chanel];
		// } else {
		// 	postsList = postsListAll;
		// }

	}


	componentWillReceiveProps(nextProps) {

		let postsList = []
		const {category} = nextProps.match.params
		const {postsByCategory} = nextProps

		// if (chanel && chanel !== 'thread') {
		// 	if (postsByCategory[chanel])
		// 		postsList = postsByCategory[chanel];
		// } else {
		// 	postsList = nextProps.postsListAll;
		// }
	}


	render() {

		const
			{category} = this.props.match.params,
			commentsByPostId = this.props.comments.listByPostId,
			postsListAll = this.props.posts.listAll || [],
			postsByCategory = this.props.posts.listByCategory,
			{mainFilter} = this.props


		/* === FILTERED === */
		let postsListFiltered = []
		if (category && category !== 'thread') {
			if (postsByCategory[category])
				postsListFiltered = postsByCategory[category];
		} else {
			postsListFiltered = postsListAll;
		}

		/* === ORDER === */
		const postsListOrdered = postsListFiltered.sort(sortBy(mainFilter.sort))

		// console.log('=====');
		// console.log(commentsByPostId);
		// console.log(postsListAll);

		/* === LIST OF POSTS === */
		const ListPosts = () => postsListOrdered.map((post) =>
			<ListPostsItem
				post={post}
				key={post.id}
				totalComments={commentsByPostId[post.id] ? commentsByPostId[post.id].length : 0}
			/>
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
		posts: {
			listAll: state.posts.listAll,
			listByCategory: state.posts.listByCategory,
		},
		comments: {
			listByPostId: state.comments.listByPostId
		},
		mainFilter: state.mainFilter
	}
}

export default connect(
	mapStateToProps,
)(ListPosts);

const Container = styled.div `
`;

const List = styled.div `
`;
