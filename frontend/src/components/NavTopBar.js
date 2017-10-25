import React, {Component} from 'react'
import styled from 'styled-components'
//import {Link} from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'

const NavTopBar = () => (

        <TopBar>
          <Menu style={{border: 0, borderRadius: 0, marginBottom: 1}}>
            <Menu.Item header>Readable</Menu.Item>

            <Menu.Item position='right'>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu>
        </TopBar>

)
export default NavTopBar

const TopBar = styled.div `
    height: 100%;
`;