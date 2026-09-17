import { Router } from "express"
import todoController from "./todo.controller.js"

const router = Router()

router.get("/", todoController.getAll)
router.post("/", todoController.create)

export default router