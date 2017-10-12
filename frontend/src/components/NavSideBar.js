import React from 'react'
import styled from 'styled-components'
// import {Link} from 'react-router-dom'


const NavSideBar = () => (
    <Sidebar>
        <List>
            <Item>
                <ItemLink href='#'>Canal 1</ItemLink>
            </Item>            <Item>
                <ItemLink href='#'>Canal 2</ItemLink>
            </Item>            <Item>
                <ItemLink href='#'>Canal 3</ItemLink>
            </Item>
        </List>
    </Sidebar>
)
export default NavSideBar


const Sidebar = styled.div `
    width: 220px;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #563d7c;
`;

const List = styled.ul `
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
`;

const Item = styled.li `
    position: relative;
    display: block;
`;
const ItemLink = styled.a `
    position: relative;
    display: block;
    padding: 10px 15px;
    text-decoration: none !important;
    color: #eeeeee !important;
    
    /* pseudo selectors work as well */
    &:hover {
        background-color: #2e274e;
		/*background: palevioletred;*/
	}
`;