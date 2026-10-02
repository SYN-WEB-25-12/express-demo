export class UniqueConstraintViolated extends Error {    
    constructor(field: string, value: string) {
        const message = `A record with '${field}'=${value} already exists.`
        console.log(message)
        super(message)
        this.name = new.target.name
    }
}