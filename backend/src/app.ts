import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import todoRouter from "./features/todo/todo.router.js"
import authRouter from "./features/auth/auth.router.js"
import experimentsRouter from "./experiments.js"
import { handleFallbackError, handleRouteNotFoundError } from './middleware.js'
import userRouter from './features/user/user.router.js'

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

// Errors
app.use(handleRouteNotFoundError)
app.use(handleFallbackError)

export default app