import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import styled from 'styled-components'
import {Menu, Icon, Segment} from 'semantic-ui-react'
import PostForm from "./PostForm";
import PostEdit from "./PostEdit"
import PostDetails from "./PostDetails";
import PostCreate from "./PostCreate/PostCreate";


class Thread extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// console.log('componentDidMount SecondaryColumn', rest);
	}

	componentWillReceiveProps(nextProps) {
	}

	render() {
		const {location} = this.props

		const pathToClose = location.pathname.split("/thread")[0]

		return (
			<ThreadColumn hide={location.pathname === '/'}>
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
					<Route path="/create" component={PostCreate}/>
					<Route path="*/edit/:id" component={PostEdit}/>
					<Route path="*/:category/:id" component={PostDetails}/>
				</SegmentStyled>
				</Body>
			</ThreadColumn>
		)
	}
}

export default Thread

/*
 * Component Style
 */
const ThreadColumn = styled.div  `
    display: ${props => props.hide ? 'none': 'flex'};
    flex-basis: 470px;
    flex-shrink: 0;
    min-width: 1px;
    border-left: 1px solid #e8e8e8;
    word-break:break-all;
    flex-direction: column;
    `

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