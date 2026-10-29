import { UniqueConstraintViolated } from "../../db/db.errors.js"
import { UserAlreadyExists, UsernameTooShort } from "./user.errors.js"
import userRepository from "./user.repository.js"
import type { User } from "./user.types.js"

async function registerUser(username: string, password: string) {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort(username)
    }

    const passwordDigest = await hashPassword(password)

    let user: User

    try {
        user = await userRepository.create(username, passwordDigest)        
    } catch (err) {
        if (err instanceof UniqueConstraintViolated) {
            throw new UserAlreadyExists(username)
        }
        
        throw err
    }

    return user
}
import { hashPassword } from "../../lib/password_hashing.js"

async function getAllUsers() {
    return await userRepository.getAll()
}

export default {
    register: registerUser,
    getAll: getAllUsers
}