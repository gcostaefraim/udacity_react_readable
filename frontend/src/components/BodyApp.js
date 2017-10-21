import React from 'react'
import styled from 'styled-components'
import ListPosts from './ListPosts'
import {Route} from 'react-router-dom';

const BodyApp = (props) => (
	<Body>
		<Route path={"/"} component={ListPosts}/>
		<Route path={"/abc/:chanel"} component={ListPosts}/>
	</Body>
)
export default BodyApp


/*
 * Component Style
 */

const Body = styled.div `
    height: 100%;
    width: 100%;
    background-color: yellow;
`;