import type { User } from "./user.types.js";
import { getPostgresPool } from "../db/config.postgres.js";
import { PG_ERROR, UniqueConstraintViolated } from "./user.errors.js";
import type { QueryResult } from "pg";

const pool = getPostgresPool()

async function createUser(username: string): Promise<User> {
    const sql = "INSERT INTO users (username) VALUES ($1) RETURNING id, username;"

    let result: QueryResult<User>

    try {
        result = await pool.query(sql, [username])
    } catch (err) {
        if (err instanceof Error && "code" in err && err.code == PG_ERROR.UNIQUE_CONSTRAINT_VIOLATED) {
            throw new UniqueConstraintViolated("username", username)
        }

        throw err
    }
    
    return result.rows[0]! // Always returns one row via RETURNING ...
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