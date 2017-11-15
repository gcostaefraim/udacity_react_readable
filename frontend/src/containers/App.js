import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import '../App.css';

import NavTopBar from '../components/NavTopBar'
import NavSideBar from '../components/NavSideBar'
import BodyApp from '../components/BodyApp'
import {Route} from 'react-router-dom'


class App extends Component {


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
							{/*<Route path="/" component={Thread} >*/}
							{/*</Route>*/}
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
