import type { User } from "./user.types.js";
import { getPostgresPool } from "../db/postgres.config.js";
import type { QueryResult } from "pg";
import { isPgError, PG_ERROR } from "../db/postgres.errors.js";
import { UniqueConstraintViolated } from "../db/errors.js";

const pool = getPostgresPool()

async function createUser(username: string): Promise<User> {
    const sql = "INSERT INTO users (username) VALUES ($1) RETURNING id, username;"

    let result: QueryResult<User>

    try {
        result = await pool.query(sql, [username])
    } catch (err) {
        if (isPgError(err) && PG_ERROR.UNIQUE_CONSTRAINT_VIOLATED == err.code) {
            throw new UniqueConstraintViolated("username", username)
        }

        throw err
    }
    
    return result.rows[0]! // always returns one row on INSERT ... RETURNING
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