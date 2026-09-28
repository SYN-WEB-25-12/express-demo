import type { Request, Response, NextFunction } from 'express'
import { UserAlreadyExists, UsernameTooShort } from './user.errors.js';

export const handleUserErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {    
  if (err instanceof UsernameTooShort) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof UserAlreadyExists) {
    return res.status(409).json({ error: err.message });
  }

  next(err)
}