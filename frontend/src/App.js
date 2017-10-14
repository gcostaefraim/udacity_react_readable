import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import NavTopBar from './components/NavTopBar'
import NavSideBar from './components/NavSideBar'
import BodyApp from './components/BodyApp'

class App extends Component {
    render() {
        return (

            <div id="wrapper">
                <aside id="sidebar">
                    <NavSideBar/>
                </aside>

                <main id="main">
                    <header id="header">
                        <NavTopBar/>
                    </header>

                    <section id="content">
                        <BodyApp>ABC</BodyApp>
                    </section>

                </main>
            </div>

        );
    }
}

export default App;
