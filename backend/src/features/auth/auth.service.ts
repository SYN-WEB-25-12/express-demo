import { v4 as uuid } from 'uuid';
import { type SessionId, type Session } from './auth.types.js';
import { AuthenticationFailed, SessionIdNotProvided, SessionNotFound } from './auth.errors.js';
import userRepository from '../user/user.repository.js';
import { checkPassword } from '../../lib/password_hashing.js';

const sessions = new Map<SessionId, Session>();

async function login(username: string, password: string) {
    const user = await userRepository.getWithPwDigest(username);

    const storedDigest = user?.pw_digest ?? "DIGEST_STUB" // gegen Timing-Attacken

    const isPasswordCorrect = await checkPassword(password, storedDigest)

    if (!isPasswordCorrect) {
        throw new AuthenticationFailed(username)
    }

    const sessionId = uuid();
    sessions.set(sessionId, username);

    return sessionId;
}

function logout(sessionId: string) {
    getSession(sessionId)

    sessions.delete(sessionId);
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
    login,
    logout,
    getSession
}