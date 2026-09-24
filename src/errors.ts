import { type Response, type Request, type NextFunction } from 'express'

export const handleRouteNotFoundError = (req: Request, res: Response) => {
    const message = `Route not found: ${req.originalUrl}`
    console.log(message)
    return res.status(404).json({ error: message })
}

export const handleFallbackError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: "The request body could not be parsed." })
    }

    console.log("An unknown error was thrown:", err)
    return res.status(500).json({ error: "Internal Server Error" });
}