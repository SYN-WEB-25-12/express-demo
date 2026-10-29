import { type Response, type NextFunction } from 'express'
import { type RequestWithSession } from "./session.types.js"
import { AuthenticationFailed, SessionIdNotProvided, SessionNotFound } from './auth.errors.js';
import sessionService from './session.service.js';

export const checkAuth = (req: RequestWithSession, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  const session = sessionService.get(sessionId);

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
  if (err instanceof SessionNotFound) {
    return res.status(401).json({ error: err.message });
  }

  next(err)
}