const api = "http://127.0.0.1:3001"

const headers = {
	'Accept': 'application/json',
	'Authorization': '123'
}


export const getAll = () =>
	fetch(`${api}/posts`, {headers})
		.then(res => res.json());


export const vote = (id, vote) =>
	fetch(`${api}/posts/${id}`, {
		headers: {
			...headers,
      "Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({option: vote})
	}).then(res => res.json())
		.catch(res => console.log(res) );


