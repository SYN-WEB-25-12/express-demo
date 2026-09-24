import { type Request, type Response } from "express"
import userService from "./user.service.js"

function registerUser(req: Request<any, any, { username: string }>, res: Response) {
    const { username } = req.body

    userService.register(username)
    
    res.status(201).send()
}

export default {
    register: registerUser
}