export class AuthenticationFailed extends Error {
    constructor(username: string) {
        const message = `Authentication failed with username '${username}'`
        console.log(message)
        super(message)
        this.name = new.target.name
    }
}

export class SessionIdNotProvided extends Error {
    constructor() {
        const message = "No cookie field 'sessionId' provided"
        console.log(message)
        super(message)
        this.name = new.target.name
    }
}

export class SessionNotFound extends Error {
    constructor(sessionId: string) {
        console.log(`No session with id=${sessionId} found`)
        super(`No session found, you are not signed in`)
        this.name = new.target.name
    }
}