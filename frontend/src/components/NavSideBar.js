import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import * as CategoriesAPI from '../utils/CategoriesAPI'


class NavSideBar extends Component {

    constructor(){
        super();

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        CategoriesAPI.getAll().then((categories) => {
            this.setState({categories})
        })
    }

    render() {
        return (
            <Sidebar>
                {console.log(this.state.categories)}
                <List>
                    <Item>
                        <ItemLink to="/abc/10">All Categories</ItemLink>
                    </Item>

                    {this.state.categories.map((category) => (
                        <Item key={category.path}>
                            <ItemLink to={`/abc/${category.path}`}>{category.name}</ItemLink>
                        </Item>
                    ))}

                </List>
            </Sidebar>
        )
    }
}
export default NavSideBar


const Sidebar = styled.div `
    background-color: #563d7c;
    height: 100%;
`;

const List = styled.ul `
    padding-left: 0;
    margin-bottom: 0;
    margin-top: 0;
    list-style: none;
`;

const Item = styled.li `
    position: relative;
    display: block;
`;
const ItemLink = styled(Link) `
    position: relative;
    display: block;
    padding: 10px 15px;
    text-decoration: none !important;
    color: #eeeeee !important;
    
    &:hover {
        background-color: #2e274e;
	}
`;