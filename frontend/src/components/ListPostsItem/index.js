import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPosts} from "../../actions"
import styled from 'styled-components'
import {Icon, Confirm} from 'semantic-ui-react'
import * as PostAPI from '../../utils/PostsAPI'

class ListPostsItem extends Component {

	constructor(props) {
		super(props);
		console.log(props.post);
		this.state = {
			post: props.post,
			openConfirmDelete: false
		}
	}

	confirmDeleteShow = () => this.setState({openConfirmDelete: true})
	handleCancelConfirmDelete = () => this.setState({openConfirmDelete: false})
	handleConfirConfirmDelete = () => {
		PostAPI.del(this.state.post.id).then(() => {
			this.props.fetchPosts()
			this.setState({openConfirmDelete: false})
		})
	}


	onVote(vote) {
		PostAPI.vote(this.state.post.id, vote).then((post) => {
			this.setState({post})
			this.props.fetchPosts()
		})
	};

	onDelete() {
		PostAPI.del(this.state.post.id).then(() => {
			this.props.fetchPosts()
		})
	};

	render() {

		return (
			<Container>
				<Score>
					<ScoreUp>
						<Icon name='caret up' size='large' onClick={() => this.onVote('upVote')}></Icon>
					</ScoreUp>
					<ScoreCount score={this.state.post.voteScore}>{this.state.post.voteScore}</ScoreCount>
					<ScoreUp>
						<Icon name='caret down' size='large' onClick={() => this.onVote('downVote')}></Icon>
					</ScoreUp>
				</Score>
				<Main>
					<Title>{this.state.post.title}</Title>
					<Author>By: {this.state.post.author}</Author>
					<Comments>171 comments(s)</Comments>

					<Actions>
						<Icon name='edit' size='large' style={{marginTop: 4}} link title='Edit Post'></Icon>
						<Icon name='trash outline' size='large' link title='Delete Post'
									onClick={() => this.confirmDeleteShow()}></Icon>
					</Actions>

				</Main>

				{/* Modal Confirm to Delete Post*/}
				<Confirm
					open={this.state.openConfirmDelete}
					onCancel={this.handleCancelConfirmDelete}
					onConfirm={this.handleConfirConfirmDelete}
				/>

			</Container>
		)
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
)(ListPostsItem)


const Container = styled.div `
		height: 75px;
    background-color: #fdf6f7;
    margin-bottom: 2px;
    padding: 0 7px 0 2px;
    display: flex;
    &:hover{
			background-color: #f6eff0;
    }
`;


const Score = styled.div `
	width: 33px;
	padding: 6px 30px 0 0;
`;

const ScoreUp = styled.div `
	cursor: pointer;
	
	i{
		color: #999999 !important;
	}
	
	&:hover i{
		color: #666666 !important;
	}
	
`;


const ScoreCount = styled.div `
	margin-left: ${({score}) => score < 0 || score > 9 ? '4px' : '8px'};
	color: ${props => props.score < 0 ? 'red' : 'blue'};

`;


const Main = styled.div `
	padding-top: 10px;
	width: 100%;
	position:relative;
`;

const Author = styled.span `
		color: #a6a6a6;
		display: block;
		font-size: 12px;
`;

const Title = styled.span `
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
`;

const Timestamp = styled.span `
`;

const Comments = styled.span `
 	font-size: 13px;
	display: block;
`

const Actions = styled.span `
		display: none;
    top: 13px;
    position: absolute;
    right: 7px;
    ${Container}:hover & {
    	display: block;
    }
`