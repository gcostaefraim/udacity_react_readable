import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';

import NavTopBar from './components/NavTopBar'
import NavSideBar from './components/NavSideBar'
import BodyApp from './components/BodyApp'

class App extends Component {
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

                        <section id="content">
                            <BodyApp>ABC</BodyApp>
                        </section>

                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
