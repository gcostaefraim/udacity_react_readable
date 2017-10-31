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
			"id": uuidv4(),
			"timestamp": Date.now(),
		})
		,
	}).then(res => res.json())
		.catch(res => res.json());


function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}



/*
POST /posts
USAGE:
	Add a new post

PARAMS:
	id - UUID should be fine, but any unique id will work
timestamp - timestamp in whatever format you like, you can use Date.now() if you like
title - String
body - String
author - String
category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

*/


