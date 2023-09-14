const API_URL = `http://localhost:8000/api/v1/`

export function getAllUsers() {
    return fetch(`${API_URL}/users`).then(response => response.json())
}

export function createUser(email: string) {
    return fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    }).then(response => response.json())
}

export function createTodo(userId: string, title: string) {
    return fetch(`${API_URL}/users/${userId}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    }).then(response => response.json())
}

export function removeTodo(userId: string, todoId: string) {
    return fetch(`${API_URL}/users/${userId}/todos/${todoId}`, {
        method: "DELETE",
    }).then(response => response.json())
}

export function updateTodo(userId: string, todoId: string, title: string, done: boolean) {
    return fetch(`${API_URL}/users/${userId}/todos/${todoId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, done })
    }).then(response => response.json()) 
}