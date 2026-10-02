import { type Request, type Response } from "express"
import authService from "./auth.service.js";
import type { RequestWithSession } from "./auth.types.js";

function login(req: Request<any, any, { username: string, password: string }>, res: Response) {
    const { username, password } = req.body;

    const sessionId = authService.login(username, password);

    res.cookie('sessionId', sessionId, { 
        httpOnly: true, 
        secure: false,
        sameSite: 'lax' 
    });

    res.json({ message: "Login succeeded!" });
}

function logout(req: RequestWithSession, res: Response) {
    const { sessionId } = req.cookies;

    authService.logout(sessionId)

    res.clearCookie('sessionId', {
        httpOnly: true,
        sameSite: 'lax'
    })

    res.json({
        message: "Erfolgreich abgemeldet."
    })
}

export default {
    login,
    logout
}