const api = "http://127.0.0.1:3001"

const headers = {
	'Accept': 'application/json',
	'Authorization': '123'
}


export const getAll = () =>
	fetch(`${api}/comments`, {headers})
		.then(res => res.json());

export const create = (data) =>
	fetch(`${api}/comments`, {
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
	return 'cxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}