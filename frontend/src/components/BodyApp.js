import React from 'react'
import styled from 'styled-components'
import ListComments from './ListComments'

const BodyApp = (props) => (
    <Body>
    <ListComments/>
    {props.children}
    </Body>
)
export default BodyApp

const Body = styled.div `
    height: 100%;
    width: 100%;
    background-color: yellow;
`;