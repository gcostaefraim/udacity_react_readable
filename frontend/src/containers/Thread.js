import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import styled from 'styled-components'
import {Menu, Icon, Segment} from 'semantic-ui-react'
import PostForm from "./PostForm/PostForm";


class Thread extends Component {

	constructor(props) {
		super(props)
		console.log('Contructor SecondaryColumn');
		console.log(props.location);
	}

	componentDidMount() {
		// console.log('componentDidMount SecondaryColumn', rest);
	}

	componentWillReceiveProps(nextProps) {
		var routeChanged = nextProps.location !== this.props.location
		console.log('componentWillReceiveProps SecondaryColumn', nextProps);
	}

	render() {
		const {history, location} = this.props

		const pathToClose = location.pathname.split("/thread")[0]


		console.log(this.props.match);
		return (
			<div id="secondColumn">
				<Header>
					<Menu secondary size='massive'>
						<Menu.Item header>
							Create Post
						</Menu.Item>
						<Menu.Menu position='right'>
							<Menu.Item
								as={Link}
								to={pathToClose}
							>
								<Icon name='close'/>
							</Menu.Item>
						</Menu.Menu>
					</Menu>
				</Header>
				{/*<Component {...props}/>*/}
				<Body>
				<Segment attached>
					<Route path="*/postcreate" component={PostForm}/>
					<Route path="*/postedit/:id" component={PostForm}/>
				</Segment>
				</Body>
			</div>
		)
	}
}

export default Thread

/*
 * Component Style
 */

const Header = styled.div `
		//background-color: #f9f9f9;
		background-color: #cccccc;
    //height: 100%;
    //width: 100%;
`;
const Body = styled.div `
    //height: 100%;
    //width: 100%;
`;