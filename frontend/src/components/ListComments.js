import React, {Component} from 'react'
import styled from 'styled-components'

class ListComments extends Component{
    render(){
        return (
            <List>
                <div>List Comments</div>
                <div>List Comments</div>
            </List>
        );
    }
}

export default ListComments;

const List = styled.div `
    background-color: #3f70ac;
    height: 100%;
`;
