import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import todoRouter from "./features/todo/todo.router.js"
import authRouter from "./features/auth/auth.router.js"
import { handleFallbackError, handleRouteNotFoundError } from './middleware.js'
import userRouter from './features/user/user.router.js'

const app = express()

// Middleware
app.use(cors())
app.use(cookieParser())
app.use(json())
app.use(morgan("dev"))

// Routers
app.use(authRouter)
app.use("/todos", todoRouter)
app.use("/users", userRouter)

// Errors
app.use(handleRouteNotFoundError)
app.use(handleFallbackError)

export default app