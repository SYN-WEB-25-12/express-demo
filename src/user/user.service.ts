import { UsernameTooShort } from "./user.errors.js"
import userRepository from "./user.repository.js"

async function registerUser(username: string) {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort(username)
    }

    const user = await userRepository.create(username)

    return user
}

async function getAllUsers() {
    return await userRepository.getAll()
}

export default {
    register: registerUser,
    getAll: getAllUsers
}