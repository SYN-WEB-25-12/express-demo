import { UniqueConstraintViolated } from "../db/errors.js"
import { UserAlreadyExists, UsernameTooShort } from "./user.errors.js"
import userRepository from "./user.repository.js"
import type { User } from "./user.types.js"

async function registerUser(username: string) {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort(username)
    }

    let user: User

    try {
        user = await userRepository.create(username)        
    } catch (err) {
        if (err instanceof UniqueConstraintViolated) {
            throw new UserAlreadyExists(username)
        }
        
        throw err
    }

    return user
}

async function getAllUsers() {
    return await userRepository.getAll()
}

export default {
    register: registerUser,
    getAll: getAllUsers
}