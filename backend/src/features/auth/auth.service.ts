import { AuthenticationFailed } from './auth.errors.js';
import userRepository from '../user/user.repository.js';
import { checkPassword } from '../../lib/password_hashing.js';
import sessionService from './session.service.js';

async function login(username: string, password: string) {
    const user = await userRepository.getWithPwDigest(username);

    const storedDigest = user?.pw_digest ?? "DIGEST_STUB" // gegen Timing-Attacken

    const isPasswordCorrect = await checkPassword(password, storedDigest)

    if (!isPasswordCorrect) {
        throw new AuthenticationFailed(username)
    }

    const sessionId = sessionService.create(username)

    return sessionId;
}

function logout(sessionId: string) {
    sessionService.delete(sessionId)
}

export default {
    login,
    logout
}