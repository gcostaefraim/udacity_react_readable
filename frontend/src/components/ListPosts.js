import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import ListPostsItem from './ListPostsItem'

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
				<ListPostsItem post={post} key={id} />
		);

		return (
			<Container>
				{chanel}
				<List>
					{listPosts}
					{listPosts}
					{listPosts}
					{listPosts}
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

// export default ListComments;

const Container = styled.div `
    height: 100%;
`;

const List = styled.div `
		position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    height: calc(100% - 70px);
`;
const Input = styled.input `
    width: 95%;
    height: 30px;
`;