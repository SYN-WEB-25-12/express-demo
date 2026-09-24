import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import todoRouter from "./todo/todo.router.js"
import authRouter from "./auth/auth.router.js"
import experimentsRouter from "./experiments.js"
import { handleFallbackError, handleRouteNotFoundError } from './middleware.js'
import userRouter from './user/user.router.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

// Routers
app.use(experimentsRouter)
app.use(authRouter)
app.use("/todos", todoRouter)
app.use("/users", userRouter)

// Global errors
app.use(handleRouteNotFoundError)
app.use(handleFallbackError)

export default app