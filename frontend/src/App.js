import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import NavTopBar from './components/NavTopBar'
import NavSideBar from './components/NavSideBar'

class App extends Component {
    render() {
        return (

            <div className="app">
                <NavTopBar/>
                <NavSideBar/>


                <div style={{
                    marginLeft: 220,
                    marginTop: 50,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'yellow'
                }}>
                    BODY DO APP
                </div>
            </div>

        );
    }
}

export default App;
