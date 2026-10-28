import { createHash, randomBytes, randomFill } from "crypto";

const SALT = "jfoiewjfiogewjf2893"

function sha256(input: string) {
    return createHash("sha256")
        .update(input)
        .digest("hex")
}

function sha256_n(input: string, n: number) {
    let output = input;
    for (let i=0; i<n; i++) {
        output = sha256(output)
    }
    return output
}

function hash(input: string, n: number, salt: string, pepper: string) {
    return sha256_n(input + salt + pepper , n)
}


const pepper = randomBytes(16).toString('hex')
const rounds = 10
const pwHash = hash("passwort1234", rounds, SALT, pepper)

console.log(SALT)   // jfoiewjfiogewjf2893
console.log(rounds) // 10
console.log(pepper) // 63fc4ddc3a2a7b7b953ceeb3d1d54f68
console.log(pwHash) // 4fc950be71e3823605261575f8b48258fafc3f08acf410ad65e5386bd4bc779c

// store: "{pwHash}:{rounds}:{pepper}"
// 4fc950be71e3823605261575f8b48258fafc3f08acf410ad65e5386bd4bc779c:10:63fc4ddc3a2a7b7b953ceeb3d1d54f68

const pwHashCheck = hash("passwort1234", 10, SALT, "63fc4ddc3a2a7b7b953ceeb3d1d54f68")

console.log(pwHashCheck)

// const hash = sha256_n("Hello, Syntax" + SALT, 3000000)


// console.log(hash)

// "Hello, Syntax"
// 11fe 1968 d546 3bb0 bc30 0cb8 a0d5 81c2 e733 1723 05f0 4336 a54d 0f89 2f10 59f3 (sha256,hex)
// Ef4ZaNVGO7C8MAy4oNWBwuczFyMF8EM2pU0PiS8QWfM= (sha256,base64)

// "Hello, Syntax!"
// 008f3c0bd8ec3424848e63a50ff9947ba9e1afcc8f8bde69876594db4c01de4d
// AI88C9jsNCSEjmOlD/mUe6nhr8yPi95ph2WU20wB3k0=


// b56363d07454d04a638ac94a9acbe457d929c1c878aa703ddf83b5e239ce87c8
// 3136585f339c532d55a2a17f7b9f06871d8bd4d5ca3379f2593fe584d7df52d0

// 8cac3b01bb472cb34b5371c4d5e4f1d20693251a97b0cebd8fdcfc27b033089a // rounds=100
// 4502b952d76cd9919c9210c937c86362b730a2a1ea6a91832ca87a3ac16fbca5 // rounds=101