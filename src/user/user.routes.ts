import { Router } from "express"
import userController from "./user.controller.js"
import { handleUserErrors } from "./user.middleware.js"

const userRouter = Router()

userRouter.post("/", userController.register)
userRouter.get("/", userController.getAll)
userRouter.use(handleUserErrors)

export default userRouter