import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

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

	render() {
		return (
			<Sidebar>
				<List>
					<Item>
						<ItemLink to="/abc/10">All Categories</ItemLink>
					</Item>

					{this.state.categoriesList.map((category) => (
						<Item key={category.path}>
							<ItemLink to={`/abc/${category.path}`}>{category.name}</ItemLink>
						</Item>
					))}

				</List>
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
    background-color: #563d7c;
    height: 100%;
`;

const List = styled.ul `
    padding-left: 0;
    margin-bottom: 0;
    margin-top: 0;
    list-style: none;
`;

const Item = styled.li `
    position: relative;
    display: block;
`;
const ItemLink = styled(Link) `
    position: relative;
    display: block;
    padding: 10px 15px;
    text-decoration: none !important;
    color: #eeeeee !important;
    
    &:hover {
        background-color: #2e274e;
	}
`;