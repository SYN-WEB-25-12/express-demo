import { type Request } from "express";

export type SessionId = string;
export type Session = string;

export type RequestWithSession = Request & { session?: Session }
