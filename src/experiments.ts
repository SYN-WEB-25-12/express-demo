import { Router } from "express"
import { checkAuth } from "./auth/auth.middleware.js"
import { type RequestWithSession } from "./auth/auth.types.js"
import cors from 'cors'

const router = Router()

// ============================================================
// CORS = Cross-Origin Resource Sharing
// ============================================================
//
// Origin (dt: Herkunft) = Protokoll + Host + Port
//   Frontend (React/Vite): http://localhost:5173
//   Backend  (Express):    http://localhost:3000
// → Nur der Port ist anders, aber das sind ZWEI verschiedene Origins.
//
// Same-Origin-Policy: Der Browser lässt eine Seite die Antwort einer
// anderen Origin nur lesen, wenn der Server das ausdrücklich erlaubt.
// cors() setzt dafür den Header: Access-Control-Allow-Origin
//
// Ohne cors() beim fetch aus React:
//   - Die Anfrage kommt hier trotzdem an, der Server antwortet.
//   - Aber der Browser VERSTECKT die Antwort vor dem JavaScript.
//   - Ergebnis: fetch schlägt fehl, Fehler in der Konsole.
//
// Wichtig: CORS ist KEIN Passwort und KEINE Anmeldung.
// Es ist eine Regel des BROWSERS. Deshalb funktioniert Postman
// auch ohne cors() — Postman ist kein Browser.
router.use(cors())

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
router.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
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