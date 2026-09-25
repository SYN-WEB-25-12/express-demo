export class UsernameTooShort extends Error {
    static readonly minLength = 4

    constructor(username: string) {
        const message = `The chosen username must have ${UsernameTooShort.minLength} characters. Current input: '${username}'.`
        console.log(message)
        super(message)
        this.name = new.target.name
    }
}

export class UserAlreadyExists extends Error {
    constructor(username: string) {
        const message = `A user with username '${username}' already exists.`
        console.log(message)
        super(message)
        this.name = new.target.name
    }
}