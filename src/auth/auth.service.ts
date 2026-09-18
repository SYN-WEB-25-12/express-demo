import { v4 as uuid } from 'uuid';
import { type SessionId, type Session } from './auth.types.js';
import { AuthenticationFailed } from './auth.errors.js';

const sessions = new Map<SessionId, Session>();

function login(username: string, password: string) {
    if (username !== 'admin' || password !== '123') {
        throw new AuthenticationFailed(username)
    }

    const sessionId = uuid();
    sessions.set(sessionId, username);

    return sessionId;
}

function logout(sessionId: string) {
    sessions.delete(sessionId);
}

function getSession(sessionId: string) {
    return sessions.get(sessionId)
}

export default {
    login,
    logout,
    getSession
}