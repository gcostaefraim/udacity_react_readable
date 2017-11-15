import React from 'react'
import styled from 'styled-components'
import ListPosts from './ListPosts'
import PostCreate from '../containers/PostCreate'
import PostDetails from '../containers/PostDetails'
import {Route} from 'react-router-dom';
import PostEdit from "../containers/PostEdit";


const BodyApp = (props) => (
	<Body>
		<Route path={"/"} exact component={ListPosts}/>
		<Route path={"/:category"} exact component={ListPosts}/>
		<Route path={"/:category/:id"} exact component={PostDetails}/>
		<Route path={"/create"} exact component={PostCreate}/>
		<Route path={"/:category/edit/:id"} exact component={PostEdit}/>
		{/*<Route path="/:category/:id" exact component={PostDetails}/>*/}
		{/*<Route path="/create" component={PostCreate}/>*/}
		{/*<Route path="/:category/:id/edit" exact component={PostEdit}/>*/}

	</Body>
)
export default BodyApp


/*
 * Component Style
 */

const Body = styled.div `
    //height: 100%;
    //width: 100%;
`;