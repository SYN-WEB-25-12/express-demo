import { type Response, type NextFunction } from 'express'
import authService from './auth.service.js';
import { type RequestWithSession } from "./auth.types.js"

export const checkAuth = (req: RequestWithSession, res: Response, next: NextFunction) => {
  const { sessionId } = req.cookies;

  const session = authService.getSession(sessionId);

    if (!session) {
        return res.status(401).json({ error: "Not signed in." });
    }

    req.session = session

    next()
}
