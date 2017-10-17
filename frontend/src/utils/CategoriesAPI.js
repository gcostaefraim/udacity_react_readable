const api = "http://127.0.0.1:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token
// if (!token)
//     token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': 'abc'
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