import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import todoRoutes from "./todo/todo.routes.js"
import authRoutes from "./auth/auth.routes.js"
import experimentsRouter from "./experiments.js"

const PORT = 3000
const server = express()

// Middlewares registrieren

server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use("/todos", todoRoutes);
server.use(authRoutes)
server.use(experimentsRouter)

server.listen(PORT, () => {
    console.log("Server started on port", PORT)
})