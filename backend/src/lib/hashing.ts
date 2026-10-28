import { createHash } from "crypto";

function sha256(input: string) {
    return createHash("sha256")
        .update(input)
        .digest("hex")
}

const hash = sha256("Hello, Syntax")

console.log(hash)

// "Hello, Syntax"
// 11fe 1968 d546 3bb0 bc30 0cb8 a0d5 81c2 e733 1723 05f0 4336 a54d 0f89 2f10 59f3 (sha256,hex)
// Ef4ZaNVGO7C8MAy4oNWBwuczFyMF8EM2pU0PiS8QWfM= (sha256,base64)

// "Hello, Syntax!"
// 008f3c0bd8ec3424848e63a50ff9947ba9e1afcc8f8bde69876594db4c01de4d
// AI88C9jsNCSEjmOlD/mUe6nhr8yPi95ph2WU20wB3k0=