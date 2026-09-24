import { Router } from "express"
import userController from "./user.controller.js"
import { checkUserErrors } from "./user.middleware.js"

const userRouter = Router()

userRouter.post("/", userController.register)
userRouter.get("/", userController.getAll)
userRouter.use(checkUserErrors)

export default userRouter