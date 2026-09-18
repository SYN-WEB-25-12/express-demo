import type { Request, Response, NextFunction } from 'express'
import { TodoIsEmpty, TodoIsNull, TodoNotFound } from './todo.errors.js';

export const checkTodoErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof TodoIsNull || err instanceof TodoIsEmpty) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof TodoNotFound) {
    return res.status(404).json({ error: err.message });
  }

  next(err)
}