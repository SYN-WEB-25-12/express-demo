import type { User } from "./user.types.js";
import { getPostgresPool } from "../db/config.postgres.js";

const pool = getPostgresPool()

async function createUser(username: string): Promise<User | null> {
    const sql = "INSERT INTO users (username) VALUES ($1) RETURNING (id, username);"

    const result = await pool.query<User>(sql, [username])
    
    return result.rows[0] ?? null
}

async function getAllUsers(): Promise<User[]> {
    const sql = "SELECT id, username FROM users;"

    const result = await pool.query<User>(sql)
    
    return result.rows
}

export default {
    create: createUser,
    getAll: getAllUsers
}