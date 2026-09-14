import express from 'express'

const PORT = 3000
const server = express()

server.get("/", (_, res) => {
    res.send("Welcome, Syntax!")
})

server.listen(PORT, () => {
    console.log("Server started on port", PORT)
})