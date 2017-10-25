import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Input, Label, Menu, Icon} from 'semantic-ui-react'

import {reloadCategories, fetchPosts} from "../actions"
import {connect} from 'react-redux'


class NavSideBar extends Component {

	constructor(props) {
		super(props);

		// Initial state
		this.state = {
			categoriesList: []
		}
	}

	componentDidMount() {
		// this.props.fetchPosts()
		// this.props.reloadCategories()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categoriesList: nextProps.categoriesList
		})
	}

	state = {activeItem: 'inbox'}

	// handleItemClick = (e, b) => console.log(e);
	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	// handleItemClick = (e, {name}) => console.log(name);

	render() {
		console.log(this.context);

		const {activeItem} = this.state

		return (
			<Sidebar>
				<Menu size='large' vertical style={{border: 0, borderRadius: 0}}>

					<Menu.Item>
						<Input icon='search' placeholder='Search mail...'/>
					</Menu.Item>

					{this.state.categoriesList.map((category) => (
						<Menu.Item
							as={Link}
							to={`/abc/${category.path}`}
							name={category.name}
							active={activeItem === category.name}
							onClick={this.handleItemClick}
							key={category.path}
						>
							{/*/!*<Icon name='home' />*!/*/}
							<Label color='teal'>1</Label>
							# {category.name}
						</Menu.Item>
					))}
				</Menu>
			</Sidebar>
		)
	}
}


/*
 * REDUX STATE
 */

function mapStateToProps({categories}) {
	return {
		categoriesList: categories.list
	}
}

/*
 * REDUX ACTIONS
 */

function mapDispatchToProps(dispatch) {
	return {
		reloadCategories: () => dispatch(reloadCategories()),
		fetchPosts: () => dispatch(fetchPosts()),
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavSideBar)


/*
 * Component Style
 */
const Sidebar = styled.div `
    height: 100%;
`;