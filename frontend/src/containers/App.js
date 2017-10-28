import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import '../App.css';

import NavTopBar from '../components/NavTopBar'
import NavSideBar from '../components/NavSideBar'
import BodyApp from '../components/BodyApp'
import SecondaryColumn from "./SecondaryColumn";


class App extends Component {


	// state = {visible: true}
	//
	// toggleVisibility = () => this.setState({visible: !this.state.visible})
	//
	// 	const {visible} = this.state
	// 	return (
	// 		<BrowserRouter>
	// 			<div>
	// 				<Sidebar as={Menu} animation='push' width='thin' visible={visible}  vertical inverted>
	// 					<Menu.Item name='home'>
	// 						<Icon name='home'/>
	// 						Home
	// 					</Menu.Item>
	// 					<Menu.Item name='gamepad'>
	// 						<Icon name='gamepad'/>
	// 						Games
	// 					</Menu.Item>
	// 					<Menu.Item name='camera'>
	// 						<Icon name='camera'/>
	// 						Channels
	// 					</Menu.Item>
	// 				</Sidebar>
	//
	//
	// 				<Sidebar.Pushable style={{height: '100vh', marginLeft: 150}}>
	// 					<Segment basic>
	// 						<Header as='h3' fixed>Application Content</Header>
	// 						<BodyApp></BodyApp>
	// 						<Image src='/assets/images/wireframe/paragraph.png'/>
	// 					</Segment>
	// 				</Sidebar.Pushable>
	//
	//
	// 			</div>
	// 		</BrowserRouter>
	// 	);

	render() {

		return (
			<BrowserRouter>
				<div id="wrapper">
					<aside id="sidebar">
						<NavSideBar/>
					</aside>

					<main id="main">
						<header id="header">
							<NavTopBar/>
						</header>
						<div id="mainBoby">
							<div id="mainColumn">
								<BodyApp />
							</div>
							<div id="secondColumn">
								<SecondaryColumn/>
							</div>
						</div>
					</main>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
