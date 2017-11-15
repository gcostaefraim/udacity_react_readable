import uuidv1 from 'uuid/v1'

const api = "http://127.0.0.1:3001"

const headers = {
	'Accept': 'application/json',
	'Authorization': '123'
}


export const getAll = () =>
	fetch(`${api}/comments`, {headers})
		.then(res => res.json());

export const vote = (id, vote) =>
	fetch(`${api}/comments/${id}`, {
		"method": "POST",
		"headers": {
			...headers,
			"Content-Type": "application/json"
		},
		"body": JSON.stringify({option: vote})
	}).then(res => res.json())
		.catch(res => res.json());

export const del = (id) =>
	fetch(`${api}/comments/${id}`, {
		"method": "DELETE",
		"headers": {
			...headers,
			"Content-Type": "application/json"
		}
	}).then(res => res.json())
		.catch(res => res.json());

export const create = (data) =>
	fetch(`${api}/comments`, {
		"method": "POST",
		"headers": {
			...headers,
			"Content-Type": "application/json",
		},
		"body": JSON.stringify({
			...data,
			"id": uuidv1(),
			"timestamp": Date.now(),
		})
		,
	}).then(res => res.json())
		.catch(res => res.json());