import React, {Component} from 'react'
import styled from 'styled-components'

class ListComments extends Component {

    componentDidMount() {
        console.log("Mounted!");
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }

    render() {


        const chanel = parseInt(this.props.match.params.chanel);

        return (

            <Container>
                {chanel}
                <List>
                    <div>ULTIMO COMENTÁRIO</div>

                    {Array.apply(null, Array(chanel)).map(function(item, i){
                        return (
                            <div key={i}>COMENTÁRIO</div>
                        );
                    }, this)}

                    <div>PRIMEIRO COMENTÁRIO</div>
                </List>
                <Input>

                </Input>
            </Container>
        );
    }
}

export default ListComments;

const Container = styled.div `
    height: 100%;
`;

const List = styled.div `
    background-color: #3f70ac;
    height: calc(100% - 36px);
    display: flex;
    flex-direction: column-reverse;
    overflow: auto;
`;
const Input = styled.input `
    width: 95%;
    height: 30px;
`;