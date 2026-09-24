import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import todoRoutes from "./todo/todo.routes.js"
import authRoutes from "./auth/auth.routes.js"
import experimentsRouter from "./experiments.js"
import { handleFallbackError, handleRouteNotFoundError } from './errors.js'
import { getPostgresPool } from './db/config.postgres.js'
import userRoutes from './user/user.routes.js'

const PORT = 3000
const server = express()

server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));

server.use(experimentsRouter)
server.use(authRoutes)
server.use("/todos", todoRoutes);
server.use("/users", userRoutes)
server.use(handleRouteNotFoundError)
server.use(handleFallbackError)

const pool = getPostgresPool()
const result = await pool.query("SELECT 1;")

server.listen(PORT, () => {
    console.log("Server started on port", PORT)
})