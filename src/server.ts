import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import { v4 as uuid } from 'uuid';
import cookieParser from 'cookie-parser'

const PORT = 3000
const server = express()

// Middlewares registrieren

server.use(express.json());
server.use(cookieParser());

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
server.use(cors())

// ============================================================
// WIEDERHOLUNG — gestern: Request-Response, Endpunkte, Status
// ============================================================

// GET = Daten LESEN. "/" ist der Pfad.
// "_" bedeutet: req wird hier nicht gebraucht.
// res.send() gibt einfachen Text zurück.
server.get("/", (_, res) => {
    res.send("Welcome, Syntax!")
})

// req.params  → Werte aus dem URL-Pfad   z.B. /hi/Renan  → name = "Renan"
// req.query   → Werte nach dem "?"       z.B. /hi/Renan?lang=en
server.get("/hi/:name", (req, res) => {
    const { name } = req.params
    const { lang } = req.query

    const greeting = lang == "en" ? "Welcome" : "Willkommen"
    const message = `${greeting}, ${name}!`

    res.json({ message })
})

// .status(CODE) setzt den HTTP-Status (200 = OK)
// .json(...) setzt den Body als JSON (nicht als Text)
server.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
})

// Todos im Speicher (noch keine Datenbank)
// const Array: die Variable todos bleibt dieselbe Liste,
// aber wir dürfen Einträge mit .push() hinzufügen.
// Wichtig: Nach einem Server-Neustart ist die Liste wieder leer (nur RAM).
const todos: string[] = []

// POST = neue Daten ANLEGEN (nicht lesen)
// Query: POST / todos?text=Wasser
// 201 -> Created -> Ressource wurde ertellt
// 400 -> Bad Request -> Anfrage war fehlerhaft(hier: text fehlt)
server.post("/todos", (req, res) => {
    const { text } = req.query

    if (text) {
        todos.push(String(text))
        res.status(201).send()
    } else {
        res.status(400).send()
    }
})

//GET /todos -> die aktuelle Liste als JSON zurückgeben
server.get("/todos", (_, res) => {
    res.status(200).json({ todos })
})

type SessionId = string;
type Session = string;
const sessions = new Map<SessionId, Session>();

type RequestWithSession = Request & { session?: Session }

const checkAuth = (req: RequestWithSession, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  const session = sessions.get(sessionId);

    if (!session) {
        return res.status(401).json({ error: "Not signed in." });
    }

    req.session = session

    next()
}

server.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username !== 'admin' || password !== '123') {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const sessionId = uuid();
    sessions.set(sessionId, username);

    res.cookie('sessionId', sessionId, { 
        httpOnly: true, 
        secure: false,
        sameSite: 'lax' 
    });
    res.json({ message: "Login succeeded!" });
})

server.post("/me", checkAuth, (req: RequestWithSession, res) => {
    res.json({ 
        message: "My profile", 
        session: req.session 
    });
})

server.post("/logout", (req, res) => {
    const { sessionId } = req.cookies;
    
    if (sessionId) {
        sessions.delete(sessionId);
    }

    res.clearCookie('sessionId', {
        httpOnly: true,
        sameSite: 'lax'
    })

    res.json({
        message: "Erfolgreich abgemeldet."
    })
})

server.listen(PORT, () => {
    console.log("Server started on port", PORT)
})