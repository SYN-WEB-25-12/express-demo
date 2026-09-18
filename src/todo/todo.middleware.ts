import type { Request, Response, NextFunction } from 'express'
import { TodoEmpty } from './todo.errors.js';

export const checkTodoErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof TodoEmpty) {
    return res.status(400).json({ error: err.message });
  }

  next(err)
}