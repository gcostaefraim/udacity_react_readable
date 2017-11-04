import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Input, Menu, Dropdown, Icon} from 'semantic-ui-react'
import {} from '../actions'
import {setMainSort} from "../actions/index";


class NavTopBar extends Component {


	constructor(props) {
		super(props);

		this.state = {
			mainFilter: props.mainFilter
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			mainFilter: nextProps.mainFilter
		})
	}


	handleChangeSort(e, {value}) {
		if (value !== this.state.mainFilter.sort)
			this.props.setMainSort(value)
	}


	render() {

		const {location, history} = this.props;
		let pathCreate = ''

		if (location.pathname.includes('/thread')) {
			pathCreate = location.pathname.split("/thread")[0]
		} else {
			pathCreate = location.pathname
		}

		if (pathCreate.substr(-1) === '/') {
			pathCreate += `thread/postcreate`
		} else {
			pathCreate += `/thread/postcreate`
		}

		const DropdownSort = () => (
			<Dropdown
				onChange={this.handleChangeSort.bind(this)}
				text='Sort By'
				closeOnChange
				item
				options={[
					{key: 1, text: 'Vote Score (Hight to Low)', value: '-voteScore', selected: this.state.mainFilter.sort === '-voteScore'},
					{key: 2, text: 'Vote Score (Low to Hight)', value: 'voteScore', selected: this.state.mainFilter.sort === 'voteScore'},
					{key: 3, text: 'Date (Last to First)', value: '-timestamp', selected: this.state.mainFilter.sort === '-timestamp'},
					{key: 4, text: 'Date (First to Last)', value: 'timestamp', selected: this.state.mainFilter.sort === 'timestamp'},
				]}
			/>
		)

		return (


			<TopBar>
				<Menu style={{border: 0, borderRadius: 0, marginBottom: 1}}>
					<Menu.Item header>Readable</Menu.Item>
					<Menu.Item
						as={Link}
						to={pathCreate}
					>
						<Icon name='plus'/>
						Create a Post
					</Menu.Item>

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
	return {
		mainFilter: state.mainFilter
	}
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









