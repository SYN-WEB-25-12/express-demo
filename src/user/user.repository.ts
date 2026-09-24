import type { User } from "./user.types.js";
import { getPostgresPool } from "../db/config.postgres.js";


export async function createUser(username: string): Promise<User | null> {
    const sql = "INSERT INTO users (username) VALUES ($1) RETURNING (id, username)"
    const pool = getPostgresPool()

    const result = await pool.query<User>(sql, [username])
    
    return result.rows[0] ?? null
}

export default {
    create: createUser
}