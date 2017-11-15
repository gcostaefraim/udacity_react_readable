import uuidv1 from 'uuid/v1'

const api = "http://127.0.0.1:3001"

const headers = {
	'method': 'GET',
	'Accept': 'application/json',
	'Authorization': '123'
}


export const getAll = () =>
	fetch(`${api}/posts`, {headers})
		.then(res => res.json());

export const getComments = (id) =>
	fetch(`${api}/posts/${id}/comments`, {headers})
		.then(res => res.json());


export const vote = (id, vote) =>
	fetch(`${api}/posts/${id}`, {
		"method": "POST",
		"headers": {
			...headers,
			"Content-Type": "application/json"
		},
		"body": JSON.stringify({option: vote})
	}).then(res => res.json())
		.catch(res => res.json());


export const del = (id) =>
	fetch(`${api}/posts/${id}`, {
		"method": "DELETE",
		"headers": {
			...headers,
			"Content-Type": "application/json"
		}
	}).then(res => res.json())
		.catch(res => res.json());


export const create = (data) =>
	fetch(`${api}/posts`, {
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


export const update = (id, data) =>
	fetch(`${api}/posts/${id}`, {
		"method": "PUT",
		"headers": {
			...headers,
			"Content-Type": "application/json",
		},
		"body": JSON.stringify({
			...data
		})
		,
	}).then(res => res.json())
		.catch(res => res.json());



