import todoService from "./todo.service.js"
import { type Request, type Response } from "express"

function createTodo(req: Request, res: Response) {
    const { text } = req.body

    if (text) {
        todoService.create(String(text))
        res.status(201).send()
    } else {
        res.status(400).send()
    }
}

function getAllTodos(req: Request, res: Response) {
    const todos = todoService.getAll()
    res.status(200).json({ todos })
}

export default {
    create: createTodo,
    getAll: getAllTodos
}