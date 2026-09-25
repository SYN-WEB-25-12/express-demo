import type { User } from "./user.types.js";
import { getPostgresPool } from "../db/config.postgres.js";
import { UserAlreadyExists } from "./user.errors.js";

const pool = getPostgresPool()

async function createUser(username: string): Promise<User> {
    const sql = "INSERT INTO users (username) VALUES ($1) RETURNING id, username;"

    let user: User

    try {
        const result = await pool.query<User>(sql, [username])
        user = result.rows[0]!
    } catch (err) {
        throw new UserAlreadyExists(username)
    }
    
    return user
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