import React,{Component} from 'react'
import {Link} from 'react-router-dom'

const NavSideBar = () => (
    <div className="bd-sidebar">
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/" className="nav-link active">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link">Search Page</Link>
                </li>
            </ul>
        </nav>
    </div>
)
export default NavSideBar
