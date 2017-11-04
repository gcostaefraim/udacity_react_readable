import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Input, Label, Menu} from 'semantic-ui-react'

import {fetchCategories, fetchPosts} from "../actions"
import {connect} from 'react-redux'


class NavSideBar extends Component {

	constructor(props) {
		super(props);

		// console.log('Contructor Navsidebar');
		// console.log(props);

		// Initial state
		this.state = {
			categoriesList: props.categoriesList,
			postsListByCategory: props.postsListByCategory
		}
	}

	componentDidMount() {
		// this.props.fetchPosts()
		// this.props.fetchCategories()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categoriesList: nextProps.categoriesList,
			postsListByCategory: nextProps.postsListByCategory
		})
	}


	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {

		const {activeItem, postsListByCategory} = this.state


		return (
			<Sidebar>
				<Menu size='large' vertical style={{border: 0, borderRadius: 0}}>

					<Menu.Item>
						<Input icon='search' placeholder='Search mail...'/>
					</Menu.Item>

					<Menu.Item
						as={Link}
						to={'/'}
						name={'All'}
						active={activeItem === 'All'}
						onClick={this.handleItemClick}
						key={'all'}
					>
						# All
					</Menu.Item>

					{this.state.categoriesList.map((category) => (
						<Menu.Item
							as={Link}
							to={`/${category.path}`}
							name={category.name}
							active={activeItem === category.name}
							onClick={this.handleItemClick}
							key={category.path}
						>
							<Label color='teal'>
								{postsListByCategory[category.name] ? postsListByCategory[category.name].length : 0}
							</Label>
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

function mapStateToProps({categories, posts}) {
	return {
		categoriesList: categories.list,
		postsListByCategory: posts.listByCategory
	}
}

/*
 * REDUX ACTIONS
 */

function mapDispatchToProps(dispatch) {
	return {
		fetchCategories: () => dispatch(fetchCategories()),
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