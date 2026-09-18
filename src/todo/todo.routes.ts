import { Router } from "express"
import todoController from "./todo.controller.js"
import { checkTodoErrors } from "./todo.middleware.js"

const router = Router()

router.get("/", todoController.getAll)
router.post("/", todoController.create)
router.use(checkTodoErrors)

export default router