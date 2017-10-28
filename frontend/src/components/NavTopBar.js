import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
//import {Link} from 'react-router-dom'
import {Input, Menu, Dropdown,} from 'semantic-ui-react'
import {} from '../actions'
import {setMainSort} from "../actions/index";


class NavTopBar extends Component {


	constructor(props) {
		super(props);
	}



	render() {
		const DropdownSort = () => (
			<Dropdown
				onChange={(e, {value}) => this.props.setMainSort(value)}
				text='Sort By' item
				options={[
					{key: 1, text: 'Vote Score (Hight to Low)', value: '-voteScore'},
					{key: 2, text: 'Vote Score (Low to Hight)', value: 'voteScore'},
					{key: 3, text: 'Title', value: 'title'},
				]}
			/>
		)

		return (
			<TopBar>
				<Menu style={{border: 0, borderRadius: 0, marginBottom: 1}}>
					<Menu.Item header>Readable</Menu.Item>
					<Menu.Menu position='right'>
						<DropdownSort/>
						<Menu.Item>
							<Input icon='search' placeholder='Search...'/>
						</Menu.Item>
					</Menu.Menu>
				</Menu>
			</TopBar>
		)
	}
}


/*
 * REDUX STATE
 */

function mapStateToProps(state) {
	return {}
}

/*
 * REDUX ACTIONS
 */

function mapDispatchToProps(dispatch) {
	return {
		setMainSort: (sort) => dispatch(setMainSort(sort)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NavTopBar)


const TopBar = styled.div `
    height: 100%;
`;









