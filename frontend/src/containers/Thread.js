import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import styled from 'styled-components'
import {Menu, Icon, Segment} from 'semantic-ui-react'
import PostForm from "./PostForm/PostForm";
import PostDetails from "./PostDetails/PostDetails";


class Thread extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// console.log('componentDidMount SecondaryColumn', rest);
	}

	componentWillReceiveProps(nextProps) {
		var routeChanged = nextProps.location !== this.props.location
	}

	render() {
		const {history, location} = this.props

		const pathToClose = location.pathname.split("/thread")[0]

		return (
			<div id="secondColumn">
				<Header>
					<Menu secondary size='massive'>
						<Menu.Item header>
							<span>Create Post</span>
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
				<Body>
				<SegmentStyled attached>
					<Route path="*/postcreate" component={PostForm}/>
					<Route path="*/postedit/:id" component={PostForm}/>
					<Route path="*/postdetails/:id" component={PostDetails}/>
				</SegmentStyled>
				</Body>
			</div>
		)
	}
}

export default Thread

/*
 * Component Style
 */
const SegmentStyled = styled(Segment) `
		height: calc(100% - 48px);
    overflow-x: auto;
    margin-left: 0;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1 1;
    flex: 1 1;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 1px;
    -webkit-box-shadow: inset 1px 0 0 0 #e8e8e8;
    box-shadow: inset 1px 0 0 0 #e8e8e8;
`;

const Header = styled.div `
		//background-color: #f9f9f9;
		background-color: #cccccc;
    //height: 100%;
    //width: 100%;
`;

const Body = styled.div `
		height: calc(100% - 48px);
    //height: 100%;
    //width: 100%;
`;