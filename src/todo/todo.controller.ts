import todoService from "./todo.service.js"
import type { Request, Response } from "express"

function createTodo(req: Request<any, any, { text: string }>, res: Response) {
    const { text } = req.body

    todoService.create(text)
    
    res.status(201).send()
}

function deleteTodo(req: Request<{ index: number }>, res: Response) {
    const { index } = req.params

    todoService.delete(index)

    res.json({ message: `Todo at index ${index} deleted` })
}

function getAllTodos(_: Request, res: Response) {
    const todos = todoService.getAll()
    res.status(200).json({ todos })
}

export default {
    create: createTodo,
    delete: deleteTodo,
    getAll: getAllTodos
}