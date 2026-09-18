export class TodoEmpty extends Error {
    constructor() {
        const message = `The field 'text' was empty`
        console.log(message)
        super(message)
        this.name = new.target.name
    }
}

export class TodoIsNull extends Error {
    constructor() {
        const message = `The field 'text' is not defined`
        console.log(message)
        super(message)
        this.name = new.target.name
    }
}
