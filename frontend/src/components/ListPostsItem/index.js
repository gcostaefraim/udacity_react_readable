import React, {Component} from 'react'
import styled from 'styled-components'


const icons = {
	trash: 'M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z',
	facebook: 'M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z',
	arrowDown: 'M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428 s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z',
	arrowUp: 'M286.935,197.287L159.028,69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.287 C1.807,200.904,0,205.186,0,210.134s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.425,12.85,5.425h255.813 c4.949,0,9.233-1.808,12.848-5.425c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.904,286.935,197.287z',

};

const Icon = props => (
	<svg width={props.width || '100%'} height={props.height || '100%'} viewBox="0 0 292.362 292.361">
		<path d={icons[props.icon]}></path>
	</svg>
);




export default class postsItem extends Component {

	timeStampToDate(t) {
		return new Date(t).toDateString()
	}




	constructor(props) {
		super(props);


		// Initial state
		// this.state = {
		// 	this.props.postsList: {}
		// }
	}


	render() {

		return (
			<Container>
				{Icon}
				<Score>
					<ScoreUp>
						<Icon icon={'arrowUp'} />
					</ScoreUp>
					<ScoreCount score={this.props.post.voteScore}>{this.props.post.voteScore}</ScoreCount>
					<ScoreUp>
						<Icon icon={'arrowDown'} />
					</ScoreUp>
				</Score>
				<Main>
					<Title>{this.props.post.title}</Title>
					<Author>By: {this.props.post.author}</Author>
					<Comments>171 comments(s)</Comments>

					<Actions>
						<button>Editar</button>
						<button>Excluir</button>
					</Actions>

				</Main>
			</Container>
		);
	}
}

/*
As postagens listadas são exibidas com título, autor, número de comentários, pontuação atual e
 um mecanismo de votos para que seja possível votar contra ou a favor dela. Ela deve conter botões
 ou links para que possa ser editada ou excluída.
 */


const Container = styled.div `
		height: 75px;
    background-color: #fdf6f7;
    margin-bottom: 2px;
    padding: 8px 7px 7px 7px;
    display: flex;
    &:hover{
        background-color: #f6eff0;
    }
`;

const Score = styled.div `
	width: 27px;
	padding: 0 14px 0 2px;
`;

const ScoreUp = styled.div `
	cursor: pointer;
	
	svg{
		fill: #999999;
	}
	
	&:hover svg{
		fill: #666666;
	}
	
`
const ScoreCount = styled.div `
	text-align: center;
	color: ${props => props.score < 0 ? 'red' : 'blue'}

`


const Main = styled.div `
	padding-top: 10px;
	width: 100%;
	position:relative;
`

const Author = styled.span `
		color: #a6a6a6;
		font-size: 12px;
`;

const Title = styled.span `
    font-weight: bold;
    display: block;
    font-size: 20px;
    cursor: pointer;
`;

const Timestamp = styled.span `
`;

const Comments = styled.span `
 	font-size: 13px;
	display: block;
`

const Actions = styled.span `
    top: 13px;
    position: absolute;
    right: 7px;
`