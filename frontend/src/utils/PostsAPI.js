const api = "http://127.0.0.1:3001"

const headers = {
	'Accept': 'application/json',
	'Authorization': '_'
}


export const getAll = () =>
	fetch(`${api}/posts`, {headers})
		.then(res => res.json())
