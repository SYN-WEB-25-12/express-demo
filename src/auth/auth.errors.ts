export class AuthenticationFailed extends Error {
    constructor(username: string) {
        super(`Authentication failed with username '${username}'`)
        this.name = new.target.name
    }
}

export class SessionIdNotProvided extends Error {
    constructor() {
        super(`No cookie field 'sessionId' provided`)
        this.name = new.target.name
    }
}