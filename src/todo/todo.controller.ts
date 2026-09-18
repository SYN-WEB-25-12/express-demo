import todoService from "./todo.service.js"
import { type Request, type Response } from "express"

function createTodo(req: Request, res: Response) {
    const { text } = req.body

    todoService.create(String(text))
    
    res.status(201).send()
}

function getAllTodos(req: Request, res: Response) {
    const todos = todoService.getAll()
    res.status(200).json({ todos })
}

export default {
    create: createTodo,
    getAll: getAllTodos
}