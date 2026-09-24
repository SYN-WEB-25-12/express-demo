import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import todoRouter from "./todo/todo.router.js"
import authRouter from "./auth/auth.router.js"
import experimentsRouter from "./experiments.js"
import { handleFallbackError, handleRouteNotFoundError } from './middleware.js'
import { getPostgresPool } from './db/config.postgres.js'
import userRouter from './user/user.router.js'

const PORT = 3000
const server = express()

server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));

server.use(experimentsRouter)
server.use(authRouter)
server.use("/todos", todoRouter);
server.use("/users", userRouter)
server.use(handleRouteNotFoundError)
server.use(handleFallbackError)

server.listen(PORT, () => {
    console.log("Server started on port", PORT)
})