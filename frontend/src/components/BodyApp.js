import React from 'react'
import styled from 'styled-components'
import ListComments from './ListComments'
import {Route} from 'react-router-dom';

const BodyApp = (props) => (
    <Body>
        <Route path={"/abc/:chanel"} component={ListComments} />
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