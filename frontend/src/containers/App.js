import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import '../App.css';

import NavTopBar from '../components/NavTopBar'
import NavSideBar from '../components/NavSideBar'
import BodyApp from '../components/BodyApp'
import {Route} from 'react-router-dom'
import Thread from "./Thread";


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
						<Route path="/:chanel?" component={NavSideBar}/>
					</aside>
					<main id="main">
						<header id="header">
							{/*<Route path="/" exact component={NavTopBar}/>*/}
							<Route path="/:chanel?" component={NavTopBar}/>
						</header>
						<div id="mainBoby">
							<div id="mainColumn">
								<BodyApp/>
							</div>
							<Route path="*/thread" component={Thread} >
							</Route>
							{/*<SecondaryColumn path="/:chanel/create" previousPath="/:chanel" component={NavSideBar}/>*/}
							{/*<SecondaryColumn/>*/}

						</div>
					</main>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
