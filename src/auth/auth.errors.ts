export class AuthenticationFailed extends Error {
    constructor(username: string) {
        super(`Authentication failed with username '${username}'`)
        this.name = new.target.name
    }
}