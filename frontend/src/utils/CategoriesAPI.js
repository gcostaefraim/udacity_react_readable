const api = "http://127.0.0.1:3001"

const headers = {
    'Accept': 'application/json',
    'Authorization': '123'
}

// export const get = (bookId) =>
//     fetch(`${api}/books/${bookId}`, { headers })
//         .then(res => res.json())
//         .then(data => data.book)



export const getAll = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

/*export const getAll = () =>
    fetch(`${api}/books`, { headers })
        .then(res => res.json())
        .then(data => data.books)*/