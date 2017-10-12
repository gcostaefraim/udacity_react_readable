import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const NavTopBar = () => (
    <div className="container-fluid">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
            </button>
            <button className="btn-link navbar-brand">My Reads</button>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
                <li><Link to="/"className="nav-item nav-link active">Home</Link></li>
                <li><Link to="/search" className="nav-item nav-link">Search Page</Link></li>
            </ul>
        </div>
    </div>
)
export default NavTopBar