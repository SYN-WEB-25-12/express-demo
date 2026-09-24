import { Router } from "express"
import userController from "./user.controller.js"
import { checkUserErrors } from "./user.middleware.js"

const userRouter = Router()

userRouter.post("/", userController.register)
userRouter.use(checkUserErrors)

export default userRouter