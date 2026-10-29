import { randomUUID } from 'node:crypto';
import { type SessionId, type Session } from './session.types.js';
import { SessionIdNotProvided, SessionNotFound } from './auth.errors.js';

const sessions = new Map<SessionId, Session>();

function createSession(username: string): SessionId {
    const sessionId = randomUUID()
    const session = makeSession(username)

    sessions.set(sessionId, session)

    return sessionId
}

function deleteSession(id: SessionId) {
    sessions.delete(id)
}

function makeSession(username: string): Session {
    return {
        username,
        createdAt: new Date()
    }
}

function getSession(sessionId: string) {
    if (!sessionId) {
        throw new SessionIdNotProvided()
    }

    if (!sessions.has(sessionId)) {
        throw new SessionNotFound(sessionId)
    }
    
    return sessions.get(sessionId)!
}

export default {
    create: createSession,
    get: getSession,
    delete: deleteSession,
}