import { type Response, type NextFunction } from 'express'
import authService from './auth.service.js';
import { type RequestWithSession } from "./auth.types.js"
import { AuthenticationFailed, SessionIdNotProvided } from './auth.errors.js';

export const checkAuth = (req: RequestWithSession, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  const session = authService.getSession(sessionId);

    if (!session) {
        return res.status(401).json({ error: "Not signed in." });
    }

    req.session = session

    next()
}

export const checkAuthErrors = (err: Error, _: RequestWithSession, res: Response, next: NextFunction) => {
  if (err instanceof AuthenticationFailed) {
    return res.status(401).json({ error: err.message });
  }
  if (err instanceof SessionIdNotProvided) {
    return res.status(400).json({ error: err.message });
  }

  next(err)
}