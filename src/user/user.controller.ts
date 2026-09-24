import { type Request, type Response } from "express"
import userService from "./user.service.js"

async function registerUser(req: Request<any, any, { username: string }>, res: Response) {
    const { username } = req.body

    const user = await userService.register(username)
    
    res.status(201).json(user)
    
}

async function getAllUsers(req: Request, res: Response) {
    const users = await userService.getAll()
    
    res.json(users)
}


export default {
    register: registerUser,
    getAll: getAllUsers
}