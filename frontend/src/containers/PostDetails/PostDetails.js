import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Divider, Label, Icon, Comment, Header, Form, Button} from 'semantic-ui-react'
import * as PostAPI from '../../utils/PostsAPI'
import {fetchPosts, fetchPostComments} from '../../actions'
import ListPostComments from "./ListPostComments";

class PostDetails extends Component {


	constructor(props) {
		super(props)

		const {id} = props.match.params;

		this.props.fetchPostComments(id)


		this.state = {
			post: [],
			comments: []
		}

	}


	componentWillReceiveProps(nextProps) {

		const {id} = nextProps.match.params,
			comments = nextProps.commentsByPostId,
			posts = nextProps.postListById

		console.log(nextProps);

		this.setState({
			post: posts[id],
			comments: (comments && comments[id]) ? comments[id] : []
		})

	}


	onVote(vote) {
		PostAPI.vote(this.state.post.id, vote).then((post) => {
			this.setState({post})
			this.props.fetchPosts()
		})
	};


	render() {





		//alert(id)

		console.log('------------');
		console.log(this.state.comments);
		console.log('------------');

		const {post, comments} = this.state


		return (
			<div>
				{/*<Label ribbon color='green' title='Category'>*/}
				{/*<Icon name='tags'/>*/}
				{/*{post.category}*/}
				{/*</Label>*/}
				<div style={{textAlign: 'center'}}>{post.title}</div>
				<Divider/>
				<div>
					<Label title='Author'>
						<Icon name='user'/>
						{post.author}
					</Label>
					<Label title='Created at'>
						<Icon name='time'/>
						{post.timestamp}
					</Label>
					<Label title='Like' as='a' onClick={() => this.onVote('upVote')}>
						<Icon link name='like outline' color='blue'></Icon>
					</Label>
					<Label title='Dislike' as='a' onClick={() => this.onVote('downVote')}>
						<Icon name='dislike outline' color='orange'></Icon>
					</Label>
					<Label title='Vote Score' color={post.voteScore >= 0 ? 'blue' : 'red'}>
						<Icon name='signal'/>
						{post.voteScore}
					</Label>
				</div>
				<div style={{marginTop: 20}}>
					{post.body}

					<br/>
					I'm wondering what the best practice is for documenting a React component. I assume just normal JSdoc format
					for any methods, but what is the best place to capture things like props, redux state, component state (if at
					all)?
				</div>

				<ListPostComments comments={comments} postId={post.id} reloadComments={() => this.props.fetchPostComments(post.id)}/>

			</div>
		)
	}
}

/*
 * REDUX STATE
 */

function mapStateToProps(state) {
	return {
		postListById: state.posts.listById,
		commentsByPostId: state.comments.listByPostId,
	}
}

/*
 * REDUX ACTIONS
 */

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: () => dispatch(fetchPosts()),
		fetchPostComments: (id) => dispatch(fetchPostComments(id)),
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostDetails)