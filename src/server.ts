import express from 'express'

const PORT = 3000
const server = express()

server.get("/", (_, res) => {
    res.send("Welcome, Syntax!")
})

server.get("/hi/:name", (req, res) => {
    const { name } = req.params
    const { lang } = req.query

    const greeting = lang == "en" ? "Welcome" : "Willkommen"
    const message = `${greeting}, ${name}!`

    res.json({ message })
})

server.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
})

server.listen(PORT, () => {
    console.log("Server started on port", PORT)
})