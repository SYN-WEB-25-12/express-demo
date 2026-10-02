import { Router } from "express"
import { getPostgresPool } from "./postgres.config.js"

const router = Router()

router.get("/health", async (_, res) => {
    const pool = getPostgresPool()

    res.status(200).json({
        success: true,
        database: (await pool.query("SELECT 1;")).rowCount,
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
})

export default router