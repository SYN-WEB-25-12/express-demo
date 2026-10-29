import { type Request } from "express";

export type SessionId = string;
export type Session = {
    username: string,
    createdAt: Date
};

export type RequestWithSession = Request & { session?: Session }
