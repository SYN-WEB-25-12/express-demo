// Todos im Speicher (noch keine Datenbank)
// const Array: die Variable todos bleibt dieselbe Liste,
// aber wir dürfen Einträge mit .push() hinzufügen.

import { TodoEmpty } from "./todo.errors.js"

// Wichtig: Nach einem Server-Neustart ist die Liste wieder leer (nur RAM).
const todos: string[] = []

function createTodo(text: string) {
    if (text.trim() === "") {
        throw new TodoEmpty()
    }
    
    todos.push(text)
}

function getAllTodos() {
    return todos
}

export default {
    create: createTodo,
    getAll: getAllTodos
}