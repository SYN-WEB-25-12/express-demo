import { UserCreationFailed, UsernameTooShort } from "./user.errors.js"
import userRepository from "./user.repository.js"

function registerUser(username: string) {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort(username)
    }

    const user = userRepository.create(username)

    if (!user) {
        throw new UserCreationFailed(username)
    }

    return user
}


export default {
    register: registerUser
}