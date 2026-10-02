import { Router } from "express"

const router = Router()

// ============================================================
// WIEDERHOLUNG — gestern: Request-Response, Endpunkte, Status
// ============================================================

// GET = Daten LESEN. "/" ist der Pfad.
// "_" bedeutet: req wird hier nicht gebraucht.
// res.send() gibt einfachen Text zurück.
router.get("/", (_, res) => {
    res.send("Welcome, Syntax!")
})

// req.params  → Werte aus dem URL-Pfad   z.B. /hi/Renan  → name = "Renan"
// req.query   → Werte nach dem "?"       z.B. /hi/Renan?lang=en
router.get("/hi/:name", (req, res) => {
    const { name } = req.params
    const { lang } = req.query

    const greeting = lang == "en" ? "Welcome" : "Willkommen"
    const message = `${greeting}, ${name}!`

    res.json({ message })
})

export default router