import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


const NavSideBar = () => (
    <Sidebar>
        <List>
            <Item>
                <ItemLink to="/abc/10">Canal 1</ItemLink>
            </Item>
            <Item>
                <ItemLink to="/abc/200">Canal 2</ItemLink>
            </Item>
            <Item>
                <ItemLink to="/abc/900">Canal 3</ItemLink>
            </Item>
        </List>
    </Sidebar>
)
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