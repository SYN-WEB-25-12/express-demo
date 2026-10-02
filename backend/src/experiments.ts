import { Router } from "express"
import { checkAuth } from "./features/auth/auth.middleware.js"
import { type RequestWithSession } from "./features/auth/auth.types.js"
import { getPostgresPool } from "./db/postgres.config.js"

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

// .status(CODE) setzt den HTTP-Status (200 = OK)
// .json(...) setzt den Body als JSON (nicht als Text)
router.get("/health", async (_, res) => {
    const pool = getPostgresPool()

    res.status(200).json({
        success: true,
        database: (await pool.query("SELECT 1;")).rowCount,
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
})

router.post("/me", checkAuth, (req: RequestWithSession, res) => {
    res.json({ 
        message: "My profile", 
        session: req.session 
    });
})

export default router