# Express Demo 25-12

Ein modernes Full-Stack-Demo- und Lernprojekt, das eine containerisierte Webanwendung mit **React**, **Express 5**, **TypeScript** und **PostgreSQL** implementiert. Das Projekt demonstriert Authentifizierung (Cookie-basiertes Session-Management, Argon2-Hashing), Benutzerverwaltung, REST-APIs sowie Multi-Container-Orchestrierung mit Docker Compose.

---

## Inhaltsverzeichnis

- [Tech-Stack](#tech-stack)
- [Architektur & Projektstruktur](#architektur--projektstruktur)
- [API-Endpunkte](#api-endpunkte)
  - [Authentifizierung (`/`)](#authentifizierung-)
  - [Benutzerverwaltung (`/users`)](#benutzerverwaltung-users)
  - [Todo-Verwaltung (`/todos`)](#todo-verwaltung-todos)
- [Schnellstart mit Docker Compose](#schnellstart-mit-docker-compose)
- [Lokale Entwicklung (ohne Docker)](#lokale-entwicklung-ohne-docker)
- [Umgebungsvariablen](#umgebungsvariablen)

---

## Tech-Stack

### Backend
* **Runtime & Framework:** Node.js, [Express 5](https://expressjs.com/)
* **Sprache:** TypeScript (ausgeführt via [`tsx`](https://github.com/privatenumber/tsx))
* **Sicherheit & Auth:** [Argon2](https://github.com/ranisalt/node-argon2) für Passwort-Hashing, `cookie-parser` & In-Memory Session-Store
* **Datenbanktreiber:** `pg` (node-postgres)
* **Logging & Hilfsmittel:** `morgan`, `cors`, `dotenv`, `uuid`

### Frontend
* **Framework:** [React](https://react.dev/) mit TypeScript
* **Build-Tool:** [Vite](https://vitejs.dev/) mit HMR und API-Reverse-Proxy (`/api` -> Backend)

### Datenbank & DevOps
* **Datenbank:** PostgreSQL 15 (inkl. automatischer DB-Initialisierung via SQL-Skripte)
* **Container:** Docker & Docker Compose für lokale Entwicklung mit Hot-Reloading

---

## Architektur & Projektstruktur

```text
express-demo-25-12/
├── backend/                  # Express-Backend (TypeScript)
│   ├── src/
│   │   ├── db/               # PostgreSQL-Konfiguration & Migrations-/Init-Skripte
│   │   │   └── init/         # SQL-Dateien (Tabellen & Seeds für Docker)
│   │   ├── features/         # Feature-basierte Modularisierung
│   │   │   ├── auth/         # Login, Logout, Session-Management & Middleware
│   │   │   ├── user/         # Benutzerverwaltung & PostgreSQL-Repository
│   │   │   └── todo/         # Todo-Verwaltung (In-Memory Service & Controller)
│   │   ├── lib/              # Helfer (z.B. Argon2 Password-Hashing)
│   │   ├── app.ts            # Express-App-Konfiguration & Middleware-Setup
│   │   ├── middleware.ts     # Globales 404- und Fallback-Fehlerhandling
│   │   └── server.ts         # Server-Entrypoint
│   └── Dockerfile
├── frontend/                 # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── App.tsx           # React-Hauptkomponente
│   │   └── main.tsx          # Client-Entrypoint
│   ├── vite.config.ts        # Vite-Konfiguration inklusive Backend-Proxy
│   └── Dockerfile
├── .env.docker-compose       # Umgebungsvariablen für Docker Compose
├── docker-compose.yml        # Multi-Container-Setup (Frontend, Backend, DB)
└── README.md
```

---

## API-Endpunkte

### Authentifizierung (`/`)
| Methode | Pfad | Beschreibung | Details |
|---|---|---|---|
| `POST` | `/login` | Benutzer einloggen | Erwartet `{ "username": "...", "password": "..." }`, setzt ein Session-Cookie (`sessionId`) |
| `POST` | `/logout` | Benutzer ausloggen | Löscht die Session und invalidiert das Session-Cookie |
| `GET` | `/me` | Aktuellen Benutzer abrufen | Validiert das Session-Cookie und gibt Benutzerdaten zurück |

### Benutzerverwaltung (`/users`)
| Methode | Pfad | Beschreibung | Details |
|---|---|---|---|
| `GET` | `/users` | Alle Benutzer abrufen | Gibt Liste aller in PostgreSQL registrierten Benutzer zurück |
| `POST` | `/users` | Neuen Benutzer anlegen | Registriert einen neuen Benutzer mit sicher gehashtem Passwort |

### Todo-Verwaltung (`/todos`)
| Methode | Pfad | Beschreibung | Details |
|---|---|---|---|
| `GET` | `/todos` | Alle Todos abrufen | Gibt die gespeicherten Todos zurück |
| `POST` | `/todos` | Neues Todo erstellen | Erwartet `{ "text": "..." }` im Request-Body |
| `DELETE`| `/todos/:index`| Todo nach Index löschen | Entfernt das Todo am angegebenen Index |

---

## Schnellstart mit Docker Compose

Die einfachste Möglichkeit, die gesamte Umgebung (Frontend, Backend und Datenbank) inklusive Hot-Reloading zu starten:

```bash
docker compose up --build
```

Nach erfolgreichem Start stehen folgende Dienste zur Verfügung:
* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:3000](http://localhost:3000)
* **PostgreSQL:** `localhost:5432`

---

## Lokale Entwicklung (ohne Docker)

Falls du die Dienste separat lokal ausführen möchtest:

### 1. PostgreSQL starten
Stelle sicher, dass eine PostgreSQL-Instanz läuft und die Tabellen aus `backend/src/db/init/` ausgeführt wurden.

### 2. Backend starten
```bash
cd backend
npm install
npm run dev
```
Der Entwicklungsserver startet mit `tsx watch` auf Port `3000`.

### 3. Frontend starten
```bash
cd frontend
npm install
npm run dev
```
Das Frontend ist standardmäßig unter [http://localhost:5173](http://localhost:5173) erreichbar.

---

## Umgebungsvariablen

Für Docker Compose sind Standardwerte in [`.env.docker-compose`](file:///.env.docker-compose) definiert:

```env
POSTGRES_HOST=database
POSTGRES_PORT=5432
POSTGRES_DB=syntax_db
POSTGRES_USER=admin
POSTGRES_PASSWORD="1234"
```
